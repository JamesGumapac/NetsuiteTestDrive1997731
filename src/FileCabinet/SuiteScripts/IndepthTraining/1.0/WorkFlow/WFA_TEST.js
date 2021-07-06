/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Feb 2019     jpgumapac
 *
 */

/**
 * @returns {Void} Any or no return value
 */
function workflowAction() {

	try {
	    var lineCount = nlapiGetLineItemCount('item');
	    nlapiLogExecution('debug', 'item count: ', lineCount);
	    for (var currLine = 1; currLine < (lineCount + 1); currLine++) {
	        var itemID = nlapiGetLineItemValue('item', 'item', currLine);
	        nlapiLogExecution('debug', 'line: ', currLine + ' id  ' + itemID);
	        if (itemID != 0) {
	            var etailOrderLine = nlapiGetLineItemValue('item', 'amount', 1);
	            nlapiSetFieldValue('memo', etailOrderLine)

	        }
	    }
	} catch (e) {
	    nlapiLogExecution('DEBUG', 'e', e);
	}

}