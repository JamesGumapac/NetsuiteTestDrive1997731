/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record'],

function(record) {
   
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(scriptContext) {
    	  var _nsRecord = record.load({ type: record.Type.SALES_ORDER, id: 7587, isDynamic: true });
          log.debug('debug', 'record', _nsRecord )

          var lineCount = _nsRecord.getLineCount({ sublistId: 'item' });
          var lineNum = _nsRecord.selectLine({
        	    sublistId: 'item',
        	    line: 1
        	});

         // for (var i = 0; i < lineCount; i++) {

        

//           var invDetailSubrecord = _nsRecord.getCurrentSublistSubrecord({
//                   sublistId: 'item',
//                  fieldId: 'inventorydetail'
//            });
//             if(invDetailSubrecord != null)
//            {
//                   
//                     _nsRecord.removeCurrentSublistSubrecord({
//                      sublistId: 'item',
//                      fieldId: 'inventorydetail'
//                        });
//                     _nsRecord.commitLine({ sublistId: 'item' });
//            }

              
            //}
        var recordId = _nsRecord.save({
                 
                   ignoreMandatoryFields: true
                    });
          
        }
       
   

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(scriptContext) {
    
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
