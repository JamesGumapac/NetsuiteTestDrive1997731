/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Nov 2018     jpgumapac
 *
 */

/**
 * @param {Object} dataIn Parameter object
 * @returns {Object} Output object
 */
function getRESTlet(dataIn) {
	var employeeId = dataIn.empid;
var retObj = nlapiLoadRecord('employee',employeeId);
	return retObj;
}

/**
 * @param {Object} dataIn Parameter object
 * @returns {Object} Output object
 */
function postRESTlet(dataIn) {
	
	return {};
}

/**
 * @param {Object} dataIn Parameter object
 * @returns {Void} 
 */
function deleteRESTlet(dataIn) {
	
}

/**
 * @param {Object} dataIn Parameter object
 * @returns {Object} Output object 
 */
function putRESTlet(dataIn) {
	
	return {};
}
