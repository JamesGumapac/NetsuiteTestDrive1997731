/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Nov 2018     jpgumapac
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response){
	// nlapiLogExecution('DEBUG', 'im called', 'running')
	// var custId = request.getParameter('customerId');
	// var record = nlapiCreateRecord('task');
	// record.setFieldValue( 'title', 'Created Automatically via SuiteLet');
	// record.setFieldValue('company', custId);
	// nlapiSubmitRecord(record);
	
	var fileOBJ = nlapiPrintRecord('transaction', 1209, 'PDF');
	response.setContentType('PDF','Your SO.pdf','inline');
	response.write(fileOBJ.getValue());
}
