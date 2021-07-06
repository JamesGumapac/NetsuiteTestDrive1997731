/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Nov 2018     jpgumapac
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm}
 *            form Current form
 * @param {nlobjRequest}
 *            request Request object
 * @returns {Void}
 */


function userEventBeforeLoad(type, form, request) {

	if (type == 'create') {
		var field = nlapiGetField('supervisor');
		field.setMandatory(true);
		nlapiSetFieldText('custentity_employee_status', 'Pending Approval');
	}

	if (type == 'view') {
		var sup = nlapiGetFieldValue('supervisor');
		var user = nlapiGetUser();
		var recId = nlapiGetRecordId();
		var taskId = nlapiGetFieldValue('custentity2');
		var loadRec = nlapiLoadRecord('task', taskId);
		var checkStatus = loadRec.getFieldValue('status');

		if (user == sup && checkStatus == 'NOTSTART') {

			var review = 'review(\'' + user + '\', \'' + recId + '\' , \''
					+ taskId + '\')';
			form.setScript('customscript_common_client');
			form.addButton('custpage_button1', 'Review Employee', review);

		} else if (user == sup && checkStatus == 'PROGRESS') {

			var approved = 'approved(\'' + user + '\', \'' + recId + '\' , \''
					+ taskId + '\' ,  \'' + recId + '\')';
			form.setScript('customscript_common_client');
			form.addButton('custpage_button2', 'Approved Employee', approved);

			nlapiSetFieldValue('custentity_employee_status', 2);

			var reject = 'reject(\'' + user + '\', \'' + recId + '\' , \''
					+ taskId + '\' ,  \'' + recId + '\')';
			form.setScript('customscript_common_client');
			form.addButton('custpage_button3', 'Reject Employee', reject);

			nlapiSetFieldValue('custentity_employee_status', 2);

		} else {
			if (checkStatus == '') {
				throw 'not allowed';

			}
		}

	}

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, delete, xedit approve, reject,
 *            cancel (SO, ER, Time Bill, PO & RMA only) pack, ship (IF)
 *            markcomplete (Call, Task) reassign (Case) editforecast (Opp,
 *            Estimate)
 * @returns {Void}
 */

function createTaskRecord() {

	record = nlapiCreateRecord('task');
	record.setFieldValue('title', 'Employee for Approval');
	record.setFieldValue('assigned', sup);
	record.setFieldValue('status', 'NOTSTART');

	record.setFieldValue('custevent_emp_id', createdId);
	var rec = nlapiSubmitRecord(record);
	var recId = nlapiGetRecordId('record');
	var recType = nlapiGetRecordType();

	nlapiSubmitField(recType, recId, 'custentity2', rec);

}
function userEventBeforeSubmit(type) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, delete, xedit, approve,
 *            cancel, reject (SO, ER, Time Bill, PO & RMA only) pack, ship (IF
 *            only) dropship, specialorder, orderitems (PO only) paybills
 *            (vendor payments)
 * @returns {Void}
 */
function userEventAfterSubmit(type) {
	if (type == 'create') {
		createTaskRecord();
	}

}
