/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(
		[ 'N/ui/serverWidget', 'N/search', 'N/record', 'N/url' ],

		function(widget, search, record, url) {

			/**
			 * Definition of the Suitelet script trigger point.
			 * 
			 * @param {Object}
			 *            context
			 * @param {ServerRequest}
			 *            context.request - Encapsulation of the incoming
			 *            request
			 * @param {ServerResponse}
			 *            context.response - Encapsulation of the Suitelet
			 *            response
			 * @Since 2015.2
			 */
			function onRequest(context) {
				if (context.request.method == 'GET') {
					var form = widget.createForm({
						title : 'SS2 SuiteLet Activity'
					})

					var salesOrder = form.addField({
						id : 'custpage_soid',
						label : 'SALES ORDER',
						type : widget.FieldType.SELECT

					})
					// var a = salesOrder.addSelectOption({
					// value : 'a',
					// text : 'Albert'
					// });

					var soSearch = search.create({
						type : search.Type.TRANSACTION,
						columns : [ 'internalid', 'transactionname' ],
						filters : [ search.createFilter({
							name : 'type',
							operator : search.Operator.ANYOF,
							values : 'SalesOrd'
						}), search.createFilter({
							name : 'mainline',
							operator : search.Operator.IS,
							values : 'T'
						}), search.createFilter({
							name : 'status',
							operator : search.Operator.ANYOF,
							values : 'SalesOrd:B'
						}) ]
					}).run()
					var result = soSearch.getRange({
						start : 0,
						end : 100
					});
					for (var i = 0; i < result.length; i++) {
						var id = result[i].getValue('internalid');
						var tname = result[i].getValue('transactionname');
						salesOrder.addSelectOption({
							value : id,
							text : tname
						});

					}

					form.addSubmitButton({
						label : 'Submit'
					});

					context.response.writePage(form)
				} else {
					var req = context.request
					var form2 = widget.createForm({
						title : 'SS2 SuiteLet Submit'
					})

//					var id = req.parameters.custpage_soid
//					var objRecord = record.transform({
//						fromType : record.Type.SALES_ORDER,
//						fromId : id,
//						toType : record.Type.ITEM_FULFILLMENT,
//						isDynamic : true,
//					});
//
//					var recordId = objRecord.save({
//						enableSourcing : true,
//						ignoreMandatoryFields : true
//
//					})

					var output = url.resolveRecord({
						recordType : 'salesOrder',
						recordId : 7241,
						isEditMode : true
					});
				//	var url = 'https://system.netsuite.com/app/accounting/transactions/itemship.nl?whence=&id='
//
					var result = form2.addField({
						id : 'custpage_textfield',
						type : widget.FieldType.URL,
						label : 'URL LINK'
					});
//					result.defaultValue = output;
//					result.updateDisplayType({
//						displayType : widget.FieldDisplayType.INLINE
//					});
					context.response.writePage(form2);
				}

			}

			return {
				onRequest : onRequest
			};

		});
