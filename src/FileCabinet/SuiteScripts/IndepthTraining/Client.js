/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       31 Jan 2019     jpgumapac
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @returns {Boolean} True to continue save, false to abort save
 */
function itemFulfillmentSave(){
    var rec = nlapiLoadRecord('salesorder', nlapiGetFieldValue('createdfrom')); //loads sales order that this item fulfillment is created from
    for(var i = 1; i <= nlapiGetLineItemCount('item'); i++) { //loop through the items in the item fulfillment
        var binNumbers = nlapiGetLineItemValue('item', 'binnumbers', i); //get bin numbers selected
        rec.setLineItemValue('item', 'custcol_bin_number', i, binNumbers); //set our created custom column field bin number to the binNumbers retrieved
    }

    nlapiSubmitRecord(rec);//submit changes to sales order record
    return true;
}

