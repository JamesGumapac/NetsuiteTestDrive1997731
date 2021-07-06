/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Nov 2018     jpgumapac
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Access mode: create, copy, edit
 * @returns {Void}
 */
var numOfDays = 0;
var update;
var memo ;
var nn;
var xyz ="";
//var additional_note;
function clientPageInit(type) {
	if (type == 'create') {
		var numOfDays;
		var userId;
		var endday = nlapiGetFieldValue('custrecord_vl_enddate');
		var startday = nlapiGetFieldValue('custrecord_vl_startdate');
		var username = nlapiGetFieldText('custrecord_vl_employee');
		var leaveType = nlapiGetFieldText('custrecord_vl_leave_type');
		var supervisor = nlapiGetFieldText('custrecord_vl_supervisor');
		var notes = nlapiGetFieldValue('custrecord_vl_memo');
		var numOfdays;
		additonal_note = "";
		userId = nlapiGetUser();
		nlapiSetFieldValue('custrecord_vl_employee', userId);
		nlapiSetFieldValue('custrecord_vl_status', 1);

		if (leaveType == "") {
			nlapiDisableField('custrecord_vl_startdate', true);
			nlapiDisableField('custrecord_vl_enddate', true);

		} else {
			nlapiDisableField('custrecord_vl_startdate', false);
			nlapiDisableField('custrecord_vl_enddate', false);
		}
	}
	
	
	if (type == 'edit')
		{
		var notes = nlapiGetFieldValue('custrecord_vl_memo');
		xyz = notes.split('notes: ').pop();
		nlapiSetFieldValue('custrecord_vl_memo',notes );
		
		}

		

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @returns {Boolean} True to continue save, false to abort save
 */
function clientSaveRecord() {
	
	
	
	
var additional_note = window.prompt('enter additional note');
xyz = additional_note;
if (additional_note != null) {

	nlapiSetFieldValue('custrecord_vl_memo', memo + additional_note);
	return true;
}




    if (additional_note == null) {
	return false;
	
}


	
	}



/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @param {Number}
 *            linenum Optional line item number, starts from 1
 * @returns {Boolean} True to continue changing field value, false to abort
 *          value change
 */
function clientValidateField(type, name, linenum) {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @param {Number}
 *            linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChanged(type, name, linenum) {
	if (name == 'custrecord_vl_leave_type') {
		var lt = nlapiGetFieldValue('custrecord_vl_leave_type');
		if (lt != "") {

			nlapiDisableField('custrecord_vl_startdate', false);
			nlapiDisableField('custrecord_vl_enddate', false);

		}
		if (lt == "") {
			nlapiSetFieldValue('custrecord_vl_startdate', "");
			nlapiSetFieldValue('custrecord_vl_startdate', "");
			nlapiDisableField('custrecord_vl_startdate', true);

			nlapiDisableField('custrecord_vl_enddate', true);

		}
	}

	var startday = nlapiGetFieldValue('custrecord_vl_startdate');
	var a = startday.substring(3, 5);
	var endday = nlapiGetFieldValue('custrecord_vl_enddate');
	var b = endday.substring(3, 5);
	var smon = startday.substring(0, 2);
	var emon = endday.substring(0, 2);

	if (startday != "" && endday != "") {
		if (smon > emon || a > b) {
			alert('wrong date');

			nlapiSetFieldValue('custrecord_vl_enddate', "");
		}

	}

	if (startday == "" || endday == "") {
		numOfDays = 0;
	}

	else if (startday == endday) {
		numOfDays = 1;
	} else if (a.charAt(0) == '/' && b.charAt(0) == '/') {
		(numOfDays = b.charAt(2) - a.charAt(2)) + 1;
	} else {
		numOfDays = (b - a) + 1;
	}
	var userId;

	var startday = nlapiGetFieldValue('custrecord_vl_startdate');

	var eDay = nlapiGetFieldValue('custrecord_vl_enddate')
	var username = nlapiGetFieldText('custrecord_vl_employee');
	var leaveType = nlapiGetFieldText('custrecord_vl_leave_type');
	var supervisor = nlapiGetFieldText('custrecord_vl_supervisor');

	memo = 'Employee: ' + username + '\n' + 'Leave Type: ' + leaveType + '\n'
			+ 'StartDate :' + startday + '\n' + 'End date: ' + eDay + '\n'
			+ 'Number of Days: ' + numOfDays + '\n' + 'Approver: ' + supervisor
			+ '\n' + 'additionl notes: ';
	if (name == 'custrecord_vl_employee' || name == 'custrecord_vl_startdate'
			|| name == 'custrecord_vl_leave_type'
			|| name == 'custrecord_vl_supervisor'
			|| name == 'custrecord_vl_enddate'
				) {

		nlapiSetFieldValue('custrecord_vl_memo', memo + xyz);
		nlapiSetFieldValue('custrecord_vl_days', numOfDays);

	}

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @returns {Void}
 */
function clientPostSourcing(type, name) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Void}
 */
function clientLineInit(type) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to save line item, false to abort save
 */
function clientValidateLine(type) {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Void}
 */
function clientRecalc(type) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to continue line item insert, false to abort insert
 */
function clientValidateInsert(type) {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to continue line item delete, false to abort delete
 */
function clientValidateDelete(type) {

	return true;
}
