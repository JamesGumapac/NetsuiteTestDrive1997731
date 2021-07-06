/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/redirect', 'N/search', 'N/ui/message', 'N/ui/serverWidget', 'N/url','N/ui/dialog'],
/**
 * @param {record} record
 * @param {redirect} redirect
 * @param {search} search
 * @param {message} message
 * @param {serverWidget} serverWidget
 * @param {url} url
 * @param {dialog} dialog
 */
function(record, redirect, search, message, widget, url,dialog) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
    function onRequest(context) {
    	
    	if (context.request.method == 'GET') {
    		
    	var form = widget.createForm({
			title : 'Evan Activity'
		})
		 //form.clientScriptFileId = 7906;
			var title = form.addField({
				id : 'custpage_title',
				label : 'Saved Search Title',
				type : widget.FieldType.TEXT
			})
			
			var subDateFrom = form.addField({
				id : 'custpage_datefrom',
				label : 'Date from',
				type : widget.FieldType.DATE
			})
			
				var subDateTo = form.addField({
				id : 'custpage_dateto',
				label : 'Date To',
				type : widget.FieldType.DATE
			})
			
				var status = form.addField({
				id : 'custpage_status',
				label : 'Status',
				type : widget.FieldType.SELECT
			})
			status.addSelectOption({
	  			value: 'SalesOrd:A',
	  			text: 'Pending Approval'
	  		});
    	  	status.addSelectOption({
	  			value: 'SalesOrd:B',
	  			text: 'Pending Fulfillment'
	  		});
    	  	status.addSelectOption({
	  			value: 'SalesOrd:C',
	  			text: 'Cancelled'
	  		});
    	  	status.addSelectOption({
	  			value: 'SalesOrd:D',
	  			text: 'Partially Fulfilled'
	  		});
    	  	status.addSelectOption({
	  			value: 'SalesOrd:E',
	  			text: 'Pending Billing/Partially Fulfilled'
	  		});
		    status.addSelectOption({
                    value: 'SalesOrd:F',
                    text: 'Pending BillingSales Order:Billed '
                });
    	  	status.addSelectOption({
    	  			value: 'SalesOrd:H',
    	  			text: 'Closed'
    	  		});
    	  	
    		var currencyFrom = form.addField({
				id : 'custpage_amountfrom',
				label : 'Amount From',
				type : widget.FieldType.CURRENCY
			})
    	  	var currencyTo = form.addField({
				id : 'custpage_amountto',
				label : 'Amount To',
				type : widget.FieldType.CURRENCY
			})
			
			var tranId = form.addField({
				id : 'custpage_tranid',
				label : 'TRANSACTION ID',
				type : widget.FieldType.TEXT
			})
			
			var mainlineT = form.addField({
				id : 'custpage_mainline',
				label : 'Main Line T',
				type : widget.FieldType.RADIO,
				source: 'T'
			})
				var mainlineF = form.addField({
				id : 'custpage_mainline',
				label : 'Main Line F',
				type : widget.FieldType.RADIO,
				source: 'F'
			})
    	  	form.addSubmitButton({
				label : 'Save Search',
				functionName: 'saveRecord'
			});

			context.response.writePage(form)
   	} else
   		{
   		var req = context.request
			var datefrom = req.parameters.custpage_datefrom
		
			
 	var salesorderSearchObj = search.create({
   			   type: "salesorder",
   			   title: req.parameters.custpage_title,
   			   filters:
   			   [
   			      ["datecreated","within",req.parameters.custpage_datefrom,req.parameters.custpage_dateto],
   			      "AND",
   			      ["type","anyof","SalesOrd"],
   			      "AND",
   			      ["status","anyof",req.parameters.custpage_status],
   			      "AND",
   			      ["mainline","is",req.parameters.custpage_mainline]
   			   ],
   			   columns:
   			   [
   			     search.createColumn({name: "internalid", label: "Internal ID"}),
   			      search.createColumn({name: "transactionnumber", label: "Transaction Number"}),
   			      search.createColumn({name: "amount", label: "Amount"}),
   			      search.createColumn({name: "datecreated", label: "Date Created"}),
   			      search.createColumn({name: "statusref", label: "Status"})
   			   ]
   			});
   		var a = salesorderSearchObj.save();

   		log.debug({
   		    title: 'SAVED SEACH ID',
   		    details: a
   		    });
   		if(a)
   			{

   			redirect.toSavedSearchResult({id: a});

   			}
   		else{
   			alert('Incorrect Information')
   		}

    		
    		context.response.write(datefrom);
    		}
    }

    return {
        onRequest: onRequest
    };
    
});
