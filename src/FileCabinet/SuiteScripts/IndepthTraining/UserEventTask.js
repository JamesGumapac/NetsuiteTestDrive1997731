/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Nov 2018     jpgumapac
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
 
function userEventBeforeLoad(type, form, request){
	
	 var emp = nlapiGetFieldValue('custevent_emp_id');
	 var user = nlapiGetUser();
	 var status = nlapiLookupField('employee', emp, 'custentity_employee_status');
	 var supervisor = nlapiLookupField('employee', emp, 'supervisor');
	
	function button() {
		form.setScript('customscript_usreventact_1');
		 function revEmployee() {
			 //nlapiSendEmail( user,emp, 'Review in Progress','Review in Progress');
			 alert('send Email');
//			 nlapiSetFieldValue('status', 'PROGRESS');
//			  location.reload();
			
		}
		 var script = revEmployee();
		 if (user == supervisor ) {
			 
		      form.addButton('custpage_buttonRE', 'Review Employee',script);
		}
		
		
		
	}
	if(type == 'view')
		{
      button();
		}
	
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit
 *                      approve, reject, cancel (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF)
 *                      markcomplete (Call, Task)
 *                      reassign (Case)
 *                      editforecast (Opp, Estimate)
 * @returns {Void}
 */
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
  
}
