/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       17 Nov 2018     jpgumapac
 *
 */

/**
 * @param {nlobjRequest}
 *            request Request object
 * @param {nlobjResponse}
 *            response Response object
 * @returns {Void} Any output is written via response object
 */
var sublist;
function suitelet(request, response) {

	if (request.getMethod() == 'GET') {
		
	
		
		
		
//		for(x = 0; x < searchobj.length; x++)
//		{
//		var internalId = searchobj[x].getValue('internalid');
//		
//		}
//		
		
		
		var searchID = nlapiGetContext().getSetting('SCRIPT', 'custscript_customcustomer');
		
		var itemId = nlapiGetContext().getSetting('SCRIPT', 'custscript_custdefaultitem');
		var form = nlapiCreateForm('SuiteLet ACT', false);
		
		form.setScript('customscript_common_client');
		
//		
//		var select = form.addField('selectfield', 'select', 'My Custom Select Field');
//		for(x = 0; x < searchobj.length; x++)
//		{
//		var internalId = searchobj[x].getValue('internalid');
//		var item = searchobj[x].getValue('itemid');
//		select.addSelectOption(internalId,item);
//		
//		}
		
	


		
		
		
		
		
		var customer = form.addField('custpage_custname', 'select', 'Customer',
				'customer');
		
		customer.setMandatory(true);
	
	
		sublist = form.addSubList('custpage_itemsublist', 'inlineeditor',
				'items');
		
		var items = sublist.addField('custpage_items', 'select', 'Items');
		
		var filters = new Array();
		filters[0] = new nlobjSearchFilter('type', null, 'anyof', 'InvtPart');
		var columns = new Array();
		columns[0] = new nlobjSearchColumn('internalid');
		columns[1] = new nlobjSearchColumn('itemid');
		var searchobj = ('item',null,filters,columns);
	  	items.addSelectOption('','');
	  	
	    for(x = 0; x < searchobj.length; x++)
	    {
		var internalId = searchobj[x].getValue('internalid');
		var item = searchobj[x].getValue('itemid');
		items.addSelectOption(internalId,item);		
		}
	    
	    
	    
	    
	//var items = sublist.addField('custpage_items', 'select', 'Item', '-10');
				items.setMandatory(true);
		var quantity = sublist
				.addField('custpage_quantity', 'text', 'Quantity');
		quantity.setDefaultValue('1');
		
		var id = request.getParameter('custID');
		
		if (id == null) {
			customer.setDefaultValue(searchID);
			items.setDefaultValue(itemId);
			
		}
		else
			{
			customer.setDefaultValue(id);
			}

			
			
		
		//sublist.setLineItemValue('custpage_items', 1, itemId);

		form.addSubmitButton('Submit');

		response.writePage(form);

	} else {

		
		    
		
			var customer = request.getParameter('custpage_custname');
			var count = request.lineCount('custpage_itemsublist');
			var so = nlapiCreateRecord('salesorder');
			so.setFieldValue('entity', customer);
			
			
			for (var x = 1; x <= count; x++) {

				var item = request.getLineItemValue('custpage_itemsublist',
						'custpage_items', x);
				var quantity = request.getLineItemValue('custpage_itemsublist',
						'custpage_quantity', x);

				so.selectNewLineItem('item');
				so.setCurrentLineItemValue('item', 'item', item);
				so.setCurrentLineItemValue('item', 'quantity', quantity);
				so.setCurrentLineItemValue('item', 'amount', 10);
				
				so.commitLineItem('item');
			}
		
			var soID = nlapiSubmitRecord(so);
			var records = new Object();
			   records['transaction'] = soID;
				
				nlapiSendEmail(nlapiGetUser(), customer, 'sales order Created',' sales order Created ' +soID ,null,null,records);
			var form2 = nlapiCreateForm('Email SUCCESS!');
			
			form2.addSubmitButton('Submit');
			var script = 'helloworld(' +soID+ ')';
			form2.setScript('customscript_common_client');
			form2.addButton('custpage_button1', 'Go to Record!', script);
		
			var successmsg = form2.addField('custpage_successmessage', 'text','Sales Order Id: ' +soID);
			
			successmsg.setDisplayType('inline');
			
		
			
			response.writePage(form2);

		
		


	}
}
/*
 * function createPO(id, linecount, itemid, quanti) {
 * 
 * for (var x = 0; x < linecount.length; x++) {
 * 
 * 
 * var so = nlapiCreateRecord('salesorder'); so.setFieldValue('entity', id);
 * 
 * so.selectNewLineItem('item'); so.setCurrentLineItemValue('custpage_items',x,
 * itemid); so.setCurrentLineItemValue('custpage_quantity',x, quanti);
 * so.commitLineItem('item'); var soID = nlapiSubmitRecord(so); return soID; } }
 */

