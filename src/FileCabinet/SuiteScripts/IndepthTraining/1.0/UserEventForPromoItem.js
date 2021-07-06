/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       11 Jan 2019     jpgumapac
 *
 */

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
	var arr = [];
	for(var i = 1; i <= nlapiGetLineItemCount('items'); i++){
		arr.push(nlapiGetLineItemValue('items', 'item', i))
		nlapiLogExecution('DEBUG', 'Array', arr)
	}
	nlapiSetFieldValue('custrecord_custom_promo_items',arr)
 
}
