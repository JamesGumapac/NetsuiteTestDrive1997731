/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define(['N/record','N/search'],

function(record,search) {

	
	

    function doGet(requestParams) {
    	
    	var array = [];
    	var resultArr = [];
    	var str= '';
    	var current = ''
			var newCur = ''
    	
      var soSearch = search.create({
    		type: search.Type.EMPLOYEE,
    	    		columns: ['altname','email','lastmodifieddate'],
    	    		filters: [
    	    		search.createFilter({
    	    		name:'supervisor',
    	    		operator: search.Operator.ANYOF,
    	    		values: '@NONE@'
    	    				})
    	    		   ]                                                                                                
    	    	})
    
    	.run()
    	
    	
    	
    	
  
    	var result = soSearch.getRange({
    		start: 0,
    		end: 17
    	});
    	for (var i = 0; i <result.length; i++) {
    		
    		var a = result[i].getValue('altname');
			var b = result[i].getValue('email');
			var c = result[i].getValue('lastmodifieddate');
			

			var resultobj = {}
			resultobj.name = a;
			resultobj.email = b;
			resultobj.lastmodifieddate = c;
	
	
			array[i] = resultobj
		//	array[i] = [result[i].getValue('altname'),result[i].getValue('email'),result[i].getValue('lastmodifieddate')]
			//array[i] = result[i].getValue('altname')+ result[i].getValue('email') + result[i].getValue('lastmodifieddate') + ' | '
		
	
    	}
     
    	return JSON.stringify(array);
    
     		
    }
    	
    	
    	
// log.debug('Record type : ' +requestParams.recordtype);
// log.debug('Record ID: ' + requestParams.recordid);
// var myRec = record.load({
// type: requestParams.recordtype,
// id: requestParams.recordid
// });
// return JSON.stringify(myRec);
    	
    
    
    function doPost(requestBody) {
//    	var empId = requestBody.admin;
//    	var newmemo = requestBody.newmemo;
//    	record.submitFields({
//    		type: record.Type.EMPLOYEE,
//    		id: empId,
//    		values:{
//    			comments: newmemo
//    		}
//    	});
//    	var empId = requestBody.id;
//    	var objRecord = record.load({
//    		    type: record.Type.EMPLOYEE, 
//    		    id: empId,
//    		   isDynamic : true
//    		});
//    	 var subrec = objRecord.getSubrecord({
//    	    	fieldId: 'shippingaddress'
//    	    });
//    	 var country = subrec.getValue({
//    	    	fieldId: 'country'
//    	    });
    	var empId = requestBody.admin;
    	var country = requestBody.country;
    	var city = requestBody.city;
    	var state = requestBody.state;
    	var zip = requestBody.zip;
  
    	
        var myRec = record.load({
            type : record.Type.EMPLOYEE,
            isDynamic : true,
            id: empId
        }) 
        myRec.selectNewLine({
            sublistId : 'addressbook'
        }) 
        var myAddressSubRecord = myRec.getCurrentSublistSubrecord({
            sublistId : 'addressbook',
            fieldId : 'addressbookaddress'
        }) 
        myAddressSubRecord.setValue({
            fieldId : 'country',
            value : country
        }) 
        myAddressSubRecord.setValue({
            fieldId : 'city',
            value: city
        }) 
          myAddressSubRecord.setValue({
            fieldId : 'state',
            value: state
        }) 
          myAddressSubRecord.setValue({
            fieldId : 'zip',
            value: zip
        }) 
           myAddressSubRecord.setValue({
            fieldId : 'defaultshipping',
            value: 'true'
        }) 

        myRec.commitLine({
            sublistId : 'addressbook'
        }) 

        myRec.save({
            enableSourcing : false,
            ignoreMandatoryFields : true	
        })
   

    	console.log(ent);
    	return 'Update successful'
    }


    return {
        'get': doGet,
        post: doPost
    };
    
});
