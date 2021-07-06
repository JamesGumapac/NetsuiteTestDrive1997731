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
	function disableLineField(scriptContext) {
		try {
			var currentRecord = scriptContext.currentRecord;
			var sublistId = scriptContext.sublistId;

			if (sublistId !== 'item') return;

			// In SuiteScript 2.0 Line count starts with index 0;
			var lineToDisable = 0;

			var selectedLine = currentRecord.getCurrentSublistIndex({
				sublistId: 'item'
			});

			log.debug({ title: 'selectedLine', details: JSON.stringify(selectedLine) });

			var field = currentRecord.getSublistField({
				sublistId: 'item',
				fieldId: 'description',
				line: lineToDisable
			});

			if (selectedLine == lineToDisable) {
				field.isDisabled = true;
			}
		} catch (error) {
			log.debug({ title: 'Catch Error', details: error });
		}
	}

	return {
		lineInit: disableLineField
	};
});