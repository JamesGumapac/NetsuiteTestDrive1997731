/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       13 Nov 2018     jpgumapac
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
var numOfDays;
var userId;
var endday = nlapiGetFieldValue('custrecord_vl_enddate');
var startday = nlapiGetFieldValue('custrecord_vl_startdate');
var username = nlapiGetFieldText('custrecord_vl_employee');
var leaveType = nlapiGetFieldText('custrecord_vl_leave_type');
var supervisor = nlapiGetFieldText('custrecord_vl_supervisor');

function clientPageInit(type) {

	userId = nlapiGetUser();
	nlapiSetFieldValue('custrecord_vl_employee', userId);
	nlapiSetFieldValue('custrecord_vl_status', 1);
	nlapiDisableField('custrecord_vl_startdate', true);
	nlapiDisableField('custrecord_vl_enddate', true);
	//nlapiSetFieldValue('custrecord_vl_startdate', null, true, true);
	
	
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
 * @returns {Boolean} True to continue changing field value, false to abort
 *          value change
 */
function clientValidateField(type, name, linenum) {
//	var memo = 'Employee: ' + username + '\n' + 'Leave Type: ' + leaveType + '\n' + 'StartDate :' + startday + '\n' +'End date: ' + endday + '\n' +'Number of Days' + numOfDays + '\n' + 'Approver' + supervisor  ;
//	nlapiSetFieldValue('custrecord_vl_memo', memo, true, true);
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


	var lt = nlapiGetFieldValue('custrecord_vl_leave_type');
	if (lt != "") {
		
		nlapiDisableField('custrecord_vl_startdate', false);
		nlapiDisableField('custrecord_vl_enddate', false);
		
	}
if (lt == "")
	{			
		nlapiSetFieldValue(custrecord_vl_startdate, "");
		nlapiDisableField('custrecord_vl_startdate', true);
	
		nlapiDisableField('custrecord_vl_enddate', true);
		//nlapiSetFieldValue('custrecord_vl_startdate', "");	
} 

//var startday = nlapiGetFieldValue('custrecord_vl_startdate');
//var a = startday.substring(3, 5);
//var endday = nlapiGetFieldValue('custrecord_vl_enddate');
//var b = endday.substring(3, 5);
//
//if (a.charAt(0) == '/' && b.charAt(0) == '/') {
//	numOfDays = b.charAt(1) - a.charAt(1);
//}
//else
//	{
//	numOfDays = b - a;
//	}
//if(startday != "" && endday != "")
//	{
//	alert('date to should be greater than or equal to date from');
//
//	}

//	else if (lt == '')
//	{
//		
//		nlapiDisableField('custrecord_vl_startdate', true);
//	
//		nlapiDisableField('custrecord_vl_enddate', true);
//	
//
//
//	}
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
	nlapiSetFieldValue('custrecord_vl_memo', memo, true, true);
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
 * @returns {Boolean} True to continue line item delete, false to abort delete
 */
function clientValidateDelete(type) {

	return true;
}
