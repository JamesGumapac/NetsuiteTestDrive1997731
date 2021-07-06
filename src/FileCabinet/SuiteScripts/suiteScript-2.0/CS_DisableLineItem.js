/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord'], /**
 * @param {record} record
 */ function (currentRecord) {
	/**
	 * Function to be executed after line is selected.
	 *
	 * @param {Object} scriptContext
	 * @param {Record} scriptContext.currentRecord - Current form record
	 * @param {string} scriptContext.sublistId - Sublist name
	 *
	 * @since 2015.2
	 */
  function pageInit(scriptContext){
    log.deubg('testing')
    return true;
  }
	function disableLineField(scriptContext) {

			var currentRecord = scriptContext.currentRecord;
			var sublistId = scriptContext.sublistId;
			log.debug({title: 'currentRecord', details: currentRecord});
			if (sublistId !== 'item') return;

			// In SuiteScript 2.0 Line count starts with index 0;
			var lineToDisable = 0;

			var selectedLine = currentRecord.getCurrentSublistIndex({
				sublistId: 'item'
			});

			log.debug({title: 'selectedLine', details: selectedLine});
          
			log.debug({title: 'lineToDisable ', details: lineToDisable});
                    
			var field = currentRecord.getSublistField({
				sublistId: 'item',
				fieldId: 'description',
				line: lineToDisable
			});

			if (selectedLine) {
              	
				field.isDisabled = true;
			}
	
	}

	return {
      	pageInit: pageInit,
		lineInit: disableLineField
	};
});