/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord'],
/**
 * @param {currentRecord} currentRecord
 */
function(currentRecord) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */

    function lineInit(scriptContext) {
var record  = scriptContext.currentRecord;
	 var linecount = record.getLineCount('item')
     for (var lineItem = 0 ; lineItem <= linecount ; lineItem++) {
       record.selectNewLine({
           sublistId: 'item'
       })
         record.setCurrentSublistValue({
             sublistId: 'item',
             fieldId: 'cseg2',
             value: 1
         });
      
     }
    }

 

    return {

        lineInit: lineInit,

    };

});
