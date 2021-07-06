/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Nov 2018     jpgumapac
 *
 */

/**
 * @returns {Void} Any or no return value
 */
function workflowAction() {

	var user = nlapiLookupField('employee', 2, 'altname');

	var date = new Date();

	for (var x = 1; x <= nlapiGetLineItemCount('item'); x++) {

		var item = nlapiGetLineItemValue('item', 'item', x);
		var rec = nlapiLoadRecord('inventoryitem', item);
		var current = rec.getFieldValue('custitem3');
		if (current == null) {
			rec.setFieldValue('custitem3', 'Purchase by : ' + user + ' on '
					+ date + '\n');
			nlapiSubmitRecord(rec);
		} else {
			rec.setFieldValue('custitem3', current + '\n' + 'Purchase by : '
					+ user + ' on ' + date + '\n');
			nlapiSubmitRecord(rec);
		}

	}

}
