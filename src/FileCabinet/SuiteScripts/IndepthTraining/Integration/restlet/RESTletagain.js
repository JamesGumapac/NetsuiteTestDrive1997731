/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Nov 2018     jpgumapac
 *
 */

/**
 * @param {Object} dataIn Parameter object
 * @returns {Object} Output object
 */
function getRESTlet(dataIn) {
	
	return {};
}

/**
 * @param {Object} dataIn Parameter object
 * @returns {Object} Output object
 */
function postRESTlet(dataIn) {
	
	var soID = dataIn.soID;
	var cust = nlapiLookupField('salesorder', soID, 'entity')
	
	var itemFulfillment = nlapiTransformRecord('salesorder', soID, 'itemfulfillment');
	var itemId = nlapiSubmitRecord(itemFulfillment);
	
	var records = new Object();
//records['transaction'] = itemId;
	//var file = nlapiPrintRecord('TRANSACTION', itemId);
	
	//nlapiSendEmail(2,cust,'Item fullfillment','Item FullFill',null,null,null,null);
	
	
	returnObj = {};
	returnObj.itemfullid = cust;
	

}
