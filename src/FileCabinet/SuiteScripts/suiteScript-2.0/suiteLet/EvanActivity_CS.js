/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([ 'N/currentRecord', 'N/error', 'N/record', 'N/runtime', 'N/ui/dialog',
		'N/ui/message' ],
/**
 * @param {error}
 *            error
 * @param {record}
 *            record
 * @param {runtime}
 *            runtime
 * @param {dialog}
 *            dialog
 * @param {message}
 *            message
 */
function(currentRecord, error, record, runtime, dialog, message) {

	/**
	 * Function to be executed after page is initialized.
	 * 
	 * @param {Object}
	 *            scriptContext
	 * @param {Record}
	 *            scriptContext.currentRecord - Current form record
	 * @param {string}
	 *            scriptContext.mode - The mode in which the record is being
	 *            accessed (create, copy, or edit)
	 * 
	 * @since 2015.2
	 */
	var rec = currentRecord.get();
	function pageInit(scriptContext) {

	}

	/**
	 * Function to be executed when field is changed.
	 * 
	 * @param {Object}
	 *            scriptContext
	 * @param {Record}
	 *            scriptContext.currentRecord - Current form record
	 * @param {string}
	 *            scriptContext.sublistId - Sublist name
	 * @param {string}
	 *            scriptContext.fieldId - Field name
	 * @param {number}
	 *            scriptContext.lineNum - Line number. Will be undefined if not
	 *            a sublist or matrix field
	 * @param {number}
	 *            scriptContext.columnNum - Line number. Will be undefined if
	 *            not a matrix field
	 * 
	 * @since 2015.2
	 */
	function fieldChanged(scriptContext) {
		var date1 = rec.getValue({
			fieldId : 'custpage_datefrom'
		})
		var date1 = rec.getValue({
			fieldId : 'custpage_datefrom'
		})

	}

	/**
	 * Function to be executed when field is slaved.
	 * 
	 * @param {Object}
	 *            scriptContext
	 * @param {Record}
	 *            scriptContext.currentRecord - Current form record
	 * @param {string}
	 *            scriptContext.sublistId - Sublist name
	 * @param {string}
	 *            scriptContext.fieldId - Field name
	 * 
	 * @since 2015.2
	 */
	function postSourcing(scriptContext) {

	}

	/**
	 * Function to be executed after sublist is inserted, removed, or edited.
	 * 
	 * @param {Object}
	 *            scriptContext
	 * @param {Record}
	 *            scriptContext.currentRecord - Current form record
	 * @param {string}
	 *            scriptContext.sublistId - Sublist name
	 * 
	 * @since 2015.2
	 */
	function sublistChanged(scriptContext) {

	}

	/**
	 * Function to be executed after line is selected.
	 * 
	 * @param {Object}
	 *            scriptContext
	 * @param {Record}
	 *            scriptContext.currentRecord - Current form record
	 * @param {string}
	 *            scriptContext.sublistId - Sublist name
	 * 
	 * @since 2015.2
	 */
	function lineInit(scriptContext) {

	}

	/**
	 * Validation function to be executed when field is changed.
	 * 
	 * @param {Object}
	 *            scriptContext
	 * @param {Record}
	 *            scriptContext.currentRecord - Current form record
	 * @param {string}
	 *            scriptContext.sublistId - Sublist name
	 * @param {string}
	 *            scriptContext.fieldId - Field name
	 * @param {number}
	 *            scriptContext.lineNum - Line number. Will be undefined if not
	 *            a sublist or matrix field
	 * @param {number}
	 *            scriptContext.columnNum - Line number. Will be undefined if
	 *            not a matrix field
	 * 
	 * @returns {boolean} Return true if field is valid
	 * 
	 * @since 2015.2
	 */
	function validateField(scriptContext) {

	}

	/**
	 * Validation function to be executed when sublist line is committed.
	 * 
	 * @param {Object}
	 *            scriptContext
	 * @param {Record}
	 *            scriptContext.currentRecord - Current form record
	 * @param {string}
	 *            scriptContext.sublistId - Sublist name
	 * 
	 * @returns {boolean} Return true if sublist line is valid
	 * 
	 * @since 2015.2
	 */
	function validateLine(scriptContext) {

	}

	/**
	 * Validation function to be executed when sublist line is inserted.
	 * 
	 * @param {Object}
	 *            scriptContext
	 * @param {Record}
	 *            scriptContext.currentRecord - Current form record
	 * @param {string}
	 *            scriptContext.sublistId - Sublist name
	 * 
	 * @returns {boolean} Return true if sublist line is valid
	 * 
	 * @since 2015.2
	 */
	function validateInsert(scriptContext) {

	}

	/**
	 * Validation function to be executed when record is deleted.
	 * 
	 * @param {Object}
	 *            scriptContext
	 * @param {Record}
	 *            scriptContext.currentRecord - Current form record
	 * @param {string}
	 *            scriptContext.sublistId - Sublist name
	 * 
	 * @returns {boolean} Return true if sublist line is valid
	 * 
	 * @since 2015.2
	 */
	function validateDelete(scriptContext) {

	}

	/**
	 * Validation function to be executed when record is saved.
	 * 
	 * @param {Object}
	 *            scriptContext
	 * @param {Record}
	 *            scriptContext.currentRecord - Current form record
	 * @returns {boolean} Return true if record is valid
	 * 
	 * @since 2015.2
	 */
	function saveRecord(scriptContext) {
		var date1 = rec.getValue({
			fieldId : 'custpage_datefrom'
		})
		var date2 = rec.getValue({
			fieldId : 'custpage_dateto'
		})
		if (date1 < date2) {

		} else {
			alert('Incorrect Date')
			rec.setValue({
				fieldId : 'custpage_datefrom',
				value : ''
			})
			rec.setValue({
				fieldId : 'custpage_dateto',
				value : ''
			})

		}

	}

	return {
		pageInit : pageInit,
		fieldChanged : fieldChanged,
		postSourcing : postSourcing,
		sublistChanged : sublistChanged,
		lineInit : lineInit,
		validateField : validateField,
		validateLine : validateLine,
		validateInsert : validateInsert,
		validateDelete : validateDelete,
		saveRecord : saveRecord
	};

});
