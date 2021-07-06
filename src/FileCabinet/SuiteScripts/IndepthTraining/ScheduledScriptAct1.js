/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       16 Nov 2018     jpgumapac
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function scheduled(type) {
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('type', null, 'anyof', 'PurchOrd');
	filters[1] = new nlobjSearchFilter('datecreated',null,'within','today');
	filters[2] = new nlobjSearchFilter('status',null,'anyof','PurchOrd:A');

	var columns = new Array();
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('status');

	var searchobj = nlapiSearchRecord('transaction',null,filters,columns);
	for( var x = 0; x < searchobj.length; x++)
	{
	var internalId = searchobj[x].getValue('internalid');
	var status = searchobj[x].getValue('status');
	nlapiLogExecution('DEBUG','Remaining Usage', 'status' + status + ' id: ' + internalId);

	nlapiSubmitField('purchaseorder', internalId, 'approvalstatus', 2);
	            }

}
