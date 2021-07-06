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

	// nlapiSetFieldValue('otherrefnum', 123456);
	// return 'mamampapa';
	// 1
//	var found = false;
	//var user = nlapiGetFieldValue('entity');
   //  var tex;
	
	for (var x = 1; x <= nlapiGetLineItemCount('item'); x++) {
		var item = nlapiGetLineItemValue('item', 'item', x);
		
		nlapiSubmitField('item',item,'custitem3','test');
		
		//var date = nlapiGetCurrentLineItemDateTimeValue('item');
		//tex = 'Purchased by ' + user+ ' on ' + item + ' ';
		
		
		}
	


//	if(!found){
//		nlapiSelectNewLineItem('item');
//		nlapiSetCurrentLineItemValue('item','item', 30);
//		
//		nlapiCommitLineItem('item');
//	}
	
}
