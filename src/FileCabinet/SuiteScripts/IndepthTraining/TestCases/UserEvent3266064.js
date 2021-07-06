/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Dec 2018     jpgumapac
 *
 */

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
	
 var recordType = nlapiGetRecordType();
 var recordId = nlapiGetRecordId();
 nlapiLogExecution('DEBUG', 'Record Type',recordType)
 nlapiLogExecution('DEBUG','Record ID' ,recordId);

}
