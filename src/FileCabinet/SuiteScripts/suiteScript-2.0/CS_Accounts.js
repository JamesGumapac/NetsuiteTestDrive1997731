/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(["N/runtime"],
/**
 * @param {runtime} runtime
 */
function(runtime) {
    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
		var currec = scriptContext.currentRecord;
		var currentFieldID = scriptContext.fieldId;
      if(currentFieldID === 'memo'){
        log.debug('dom',currec);
      }
    }
    return {
        fieldChanged: fieldChanged
    };
});