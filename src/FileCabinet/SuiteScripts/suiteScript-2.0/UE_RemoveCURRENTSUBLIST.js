/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search'],
/**
 * @param {record} record
 * @param {search} search
 */
function(record, search) {
   
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

        var _nsRecord = record.load({ type: record.Type.SALES_ORDER, id: 7585, isDynamic: true });

        var lineCount = _nsRecord.getLineCount({ sublistId: 'item' });

        for (var i = 0; i < lineCount; i++) {

          _nsRecord.selectLine({ sublistId: 'item', line: i });
         var objSubrecord = _nsRecord.getCurrentSublistSubrecord({
                 sublistId: 'item',
                fieldId: 'inventorydetail'
          });
           if(objSubrecord != null)
          {
                 
                   _nsRecord.removeCurrentSublistSubrecord({
                    sublistId: 'item',
                    fieldId: 'inventorydetail'
                      });
                   _nsRecord.commitLine({ sublistId: 'item' });
          }

            
          }
      var recordId = _nsRecord.save({
                 enableSourcing: true,
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
