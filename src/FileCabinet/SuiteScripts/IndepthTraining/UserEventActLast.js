/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       19 Nov 2018     jpgumapac
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
	var user = nlapiGetFieldValue('entityid');
	//var script = 'SuiteLet('+user+')';
	var script2 =  'SuiteLet()';
	form.setScript('customscript_common_client');
	form.addButton('custpage_button1', 'Go to SuiteLet', script2);

	

	form.addButton('custpage_button2', 'Create Task Record', 'createTask('+	nlapiGetRecordId()+')');
	form.addButton('custpage_button4', 'Print Latest SO','printSO()');

	

}
function userEventBeforeSubmit(type) {

}
function userEventAfterSubmit(type)
{
		
}