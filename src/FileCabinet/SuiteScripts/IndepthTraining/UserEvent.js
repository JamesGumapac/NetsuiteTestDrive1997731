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
 *            type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm}
 *            form Current form
 * @param {nlobjRequest}
 *            request Request object
 * @returns {Void}
 */
// display type
var createdId;
	var record;
	var recId;
function userEventBeforeLoad(type, form, request) {
	
	 var emp = nlapiGetFieldValue('custevent_emp_id');
	 var user = nlapiGetUser();
	 var status = nlapiLookupField('employee', emp, 'custentity_employee_status');
	 var supervisor = nlapiLookupField('employee', emp, 'supervisor');
	
	supervisor();

	nlapiSetFieldText('custentity_employee_status', 'Pending Approval');
	
	var script = 'helloWorld()';

form.setScript('customscript_common_client');
form.addButton('custpage_button1', 'click me!', script);	
	
}
function supervisor(){
    var field = nlapiGetField('supervisor');
    field.setMandatory(true);
    
 
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
function createTaskRecord()
{
   var supervisor = nlapiGetFieldValue('supervisor');
   record = nlapiCreateRecord('task');
   record.setFieldValue( 'title', 'Employee for Approval');
   record.setFieldValue( 'assigned', supervisor);
   record.setFieldValue('status', 'NOTSTART');
  
   record.setFieldValue('custevent_emp_id', createdId);
   recId = nlapiSubmitRecord(record);
   nlapiSetFieldText('custentity2', recId);
}
function userEventBeforeSubmit(type){

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */
function userEventAfterSubmit(type){
	createdId = nlapiGetRecordId();
	createTaskRecord();

	
}