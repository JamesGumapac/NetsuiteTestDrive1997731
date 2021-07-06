/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.
 */
/**
 * @param {String}
 *            type Context Types: scheduled, ondemand, userinterface, aborted,
 *            skipped
 * @returns {Void}
 */
function scheduled(type) {
	/*
	 * var filters = []; filters[0] = new nlobjSearchFilter('email', null,
	 * 'doesnotcontain', '@netsuite.com'); var searchObj =
	 * nlapiCreateSearch('employee', filters); var searchResult =
	 * searchObj.runSearch(); // searchResult.forEachResult(search);
	 * 
	 * //function search(searchResult) {
	 * 
	 * var results = nlapiSearchRecord('employee', null, filters); for (var x =
	 * 0; x < results.length; x++) {
	 * 
	 * 
	 * var rec = nlapiLoadRecord('employee',results[x].getId());
	 * rec.setFieldValue('comments', 'HOY SINO KA, BAWAL EMAIL MO');
	 * nlapiSubmitRecord(rec); var remainingUsage =
	 * nlapiGetContext().getRemainingUsage(); nlapiLogExecution('DEBUG',
	 * 'Remaining Usage', remainingUsage); if (remainingUsage < 9450) {
	 * nlapiYieldScript(); }
	 *  }
	 */
	// load employEe search
	var searchID = nlapiGetContext().getSetting('SCRIPT', 'custscript1')
	
	var results = nlapiSearchRecord('employee', searchID);

	// iterate employees using the id
	
		nlapiLogExecution('DEBUG', 'Sample', 'ID')

	

}
