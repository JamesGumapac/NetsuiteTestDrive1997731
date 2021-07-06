/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Feb 2019     jpgumapac
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
	var purchaseOrder = nlapiLoadRecord('salesorder', 7587, {recordmode: 'dynamic'});
	var i=1;
	var totalLine = purchaseOrder.getLineItemCount('item');
	 
	for(i; i<=totalLine; i++)
	{
	   purchaseOrder.selectLineItem('item', i);
	   var invDetailSubrecord = purchaseOrder.viewCurrentLineItemSubrecord('item',
	     'inventorydetail');
	   if(invDetailSubrecord != null)
	   {
	               purchaseOrder.removeCurrentLineItemSubrecord('item', 'inventorydetail');
	               purchaseOrder.commitLineItem('item');
	   }
	}
	nlapiSubmitRecord(purchaseOrder);
}
