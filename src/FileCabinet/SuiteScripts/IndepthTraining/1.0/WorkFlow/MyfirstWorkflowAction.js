/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Nov 2018     jpgumapac
 *
 */

/**
 * @returns {Void} Any or no return value
 */
function workflowAction() {
	nlapiSetFieldValue(memo,'testtest');
	alert('hello')	
	nlapiLogExecution('Debug', 'Test', 'test')
}
