/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Feb 2019     jpgumapac
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
var recId = nlapiGetRecordId();
var recType = nlapiGetRecordType();
var rec = nlapiLoadRecord(recType, recId);
  var count = rec.getLineItemCount('item');
  nlapiLogExecution('DEBUG', 'id',recId )
   nlapiLogExecution('DEBUG', 'recType',recType )
   
  for(var i = 1; i <=count; i++)
	  {
	  var itemID = rec.getLineItemValue('item', 'item', i)
	   nlapiLogExecution('DEBUG', 'item', itemID )

	   if (itemID != 0) {
        var etailOrderLine = rec.getLineItemValue('item', 'item', i)
        nlapiSubmitField('salesorder', recId, 'memo', etailOrderLine)
  nlapiLogExecution('DEBUG', 'item', etailOrderLine )
     }
	  }
  

}
