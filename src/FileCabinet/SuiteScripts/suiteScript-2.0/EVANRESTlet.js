/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define(['N/record','N/search'],
/**
 * @param {record} record
 */
function(record,search) {
   
    /**
     * Function called upon sending a GET request to the RESTlet.
     *
     * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.1
     */
    function doGet(requestParams) {

    }

    /**
     * Function called upon sending a PUT request to the RESTlet.
     *
     * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain'
     * or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.2
     */
    function doPut(requestBody) {

    }


    /**
     * Function called upon sending a POST request to the RESTlet.
     *
     * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain'
     * or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.2
     */
    function doPost(requestBody) {
    	var itemsArray = requestBody.items;
    	var entity = requestBody.entity; //drop ship
      	var location = requestBody.location;
      	
      	
      	
      	var objRecord = record.create({
    	    type: record.Type.SALES_ORDER, 
    	    isDynamic: true,
    	    defaultValues: {
    	        entity: entity
    	     
    	    }
    	  
    	  });
      	
    	objRecord.setValue({
    		fieldId: 'location',
    		value: location
    	});
    	
    	
    	
    	var cus = record.load({
            type: record.Type.CUSTOMER,
            id: entity,
            isDynamic: false
       });
  
    	
    	var addressSubrec = cus.getSublistSubrecord({
    	    sublistId: 'addressbook',
    	    fieldId: 'addressbookaddress',
    		line: 0
    	});
    	
    	
    	var cuscityValue = addressSubrec.getValue({
            fieldId: 'city'
        });
    	
    	var cuscountry = addressSubrec.getValue({
    	    fieldId: 'country'
    	});
    	
    	
    	
    	var shipAddress = objRecord.getSubrecord({
    		fieldId: 'shippingaddress'
    	});
    	
	
    	
  
        	
        	shipAddress.setText({
        		fieldId: 'country',
        		value: requestBody.shipAddresscountry
        	});
        	shipAddress.setValue({
        		fieldId: 'zip',
        		value: requestBody.shipAddressZip
        	});
        	
        	shipAddress.setValue({
        		fieldId: 'addr2',
        		value: requestBody.shipAddressAddr2
        	});
        	
        	
        	
        	
        	
        	
        	
        	var billAddress = objRecord.getSubrecord({
        		fieldId: 'billingaddress'
        	});
        	
        	
        	billAddress.setValue({
        		fieldId: 'zip',
        		value: requestBody.billAddressZip
        	});
        	
        	billAddress.setText({
        		fieldId: 'country',
        		value: requestBody.billAddresscountry
        	});
        	
           	billAddress.setValue({
        		fieldId: 'addr2',
        		value: requestBody.billAddressAddr2
        	});
    		

    	

    	
    	
//    	objRecord.selectNewLine({
//    		sublistId: 'item'
//    			});
//    	objRecord.setCurrentSublistValue({
//    		sublistId: 'item',
//            fieldId: 'item',
//            value: item1
//        }); 
//    	var subrec = objRecord.getCurrentSublistSubrecord({
//            sublistId: 'item',
//            fieldId: 'inventorydetail'
//        });
//    	
//    	subrec.selectNewLine({
//            sublistId: 'inventoryassignment'
//        });
//    	
//    	subrec.setCurrentSublistValue({
//            sublistId: 'inventoryassignment',
//            fieldId: 'quantity',
//            value: 1
//        });
//    	
//    	 subrec.setCurrentSublistValue({
//             sublistId: 'inventoryassignment',
//             fieldId: 'receiptinventorynumber',
//             value: 'qwe11221'
//         });
//    	 
//    	 subrec.commitLine({
//              sublistId: 'inventoryassignment'
//          });
//    		objRecord.commitLine({
//    			sublistId: 'item'
//    		});
//    		
//    		objRecord.selectNewLine({sublistId: 'item'});
//        	objRecord.setCurrentSublistValue({sublistId: 'item',
//                fieldId: 'item',
//             
//                value: item2
//            }); 
//    	
//    	objRecord.commitLine({
//    		sublistId: 'item'
//    		});
//    	
//		objRecord.selectNewLine({
//			sublistId: 'item'
//				});
//    	objRecord.setCurrentSublistValue({
//    		sublistId: 'item',
//            fieldId: 'item',
//         
//            value: item3
//        }); 
//	
//		objRecord.commitLine({sublistId: 'item'
//		});
//		
//		
//		objRecord.selectNewLine({
//			sublistId: 'item'
//				});		
//    	objRecord.setCurrentSublistValue({
//    		sublistId: 'item',
//            fieldId: 'item',
//         
//            value: item4
//        }); 
//    	objRecord.setCurrentSublistValue({
//    		sublistId: 'item',
//            fieldId: 'amount',
//         
//            value: 100 	
//        }); 
//	
//		objRecord.commitLine({sublistId: 'item'
//		});
               var itemsArray = requestBody.items;
           
        	for(var i = 0; i<itemsArray.length; i++){
        		
        
        	
        		for(var i = 0; i<itemsArray.length; i++){
            		
            		var fieldLookUp = search.lookupFields({
            			type: search.Type.ITEM,
            			id: itemsArray[i] , //pass the id of the item here
            			columns: 'islotitem'
            			});
            		var x = fieldLookUp.islotitem;
    		
    		if(x == true){
    	    	objRecord.selectNewLine({
        		sublistId: 'item'
        			});
        	objRecord.setCurrentSublistValue({
        		sublistId: 'item',
                fieldId: 'item',
                value: itemsArray[i]
            }); 
        	var subrec = objRecord.getCurrentSublistSubrecord({
                sublistId: 'item',
                fieldId: 'inventorydetail'
            });
        	
        	subrec.selectNewLine({
                sublistId: 'inventoryassignment'
            });
        	
        	subrec.setCurrentSublistValue({
                sublistId: 'inventoryassignment',
                fieldId: 'quantity',
                value: 1
            });
        	
        	 subrec.setCurrentSublistValue({
                 sublistId: 'inventoryassignment',
                 fieldId: 'receiptinventorynumber',
                 value: 'qwe11221'
             });
        	 
        	 subrec.commitLine({
                  sublistId: 'inventoryassignment'
             });
       		objRecord.commitLine({
       			sublistId: 'item'
        		});
            }
    			else 
    			{
    				objRecord.selectNewLine({
   				sublistId: 'item'
   					});		
    	    	objRecord.setCurrentSublistValue({
   	    		sublistId: 'item',
    	            fieldId: 'item',
    	         
   	            value: itemsArray[i]
    	        }); 
    	    	objRecord.setCurrentSublistValue({
    	    		sublistId: 'item',
    	            fieldId: 'amount',
    	         
    	            value: 100 	
   	        }); 
    	
   			objRecord.commitLine({sublistId: 'item'
    			});
            	}
        	}
        	}		
    
        	var id = objRecord.save();
    
    	return id;
    }

    /**
     * Function called upon sending a DELETE request to the RESTlet.
     *
     * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.2
     */
    function doDelete(requestParams) {

    }

    return {
        'get': doGet,
        put: doPut,
        post: doPost,
        'delete': doDelete
    };
    
});
