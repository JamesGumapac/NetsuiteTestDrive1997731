/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Nov 2018     jpgumapac
 *
 */

/**
 * @param {Object}
 *            dataIn Parameter object
 * @returns {Object} Output object
 */
function getRESTlet(dataIn) {

	var recId = dataIn.typeId;
//	var recordtype = dataIn.recType;
//	nlapiLogExecution('DEBUG', 'TEST', recID+ ' ' + type);
//	var retObj = nlapiLoadRecord(recordtype, recId);
//	var reID = retObj.nlapiGetRecordId()
	var retObj = nlapiLoadRecord(employee, recId);
	nlapiLogExecution('DEBUG', 'TEST', reId)
	

	return retObj;
}

/**
 * @param {Object}
 *            dataIn Parameter object
 * @returns {Object} Output object
 */
function postRESTlet(dataIn) {

	return {};
}

/**
 * @param {Object}
 *            dataIn Parameter object
 * @returns {Void}
 */
function deleteRESTlet(dataIn) {

}

/**
 * @param {Object}
 *            dataIn Parameter object
 * @returns {Object} Output object
 */
function putRESTlet(dataIn) {

	return {};
}
