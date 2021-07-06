/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Nov 2018     jpgumapac
 *
 */

/**
 * @param {Object}
 *            dataIn Parameter object
 * @returns {Object} Output object
 */
function getRESTlet(dataIn) {

	var flags = dataIn.flags;

	if (flags == 1) {
		var filters = new Array();
		filters[0] = new nlobjSearchFilter('type', null, 'anyof', 'InvtPart');
		filters[1] = new nlobjSearchFilter('locationquantityavailable', null,
				'greaterthan', 0);
		filters[2] = new nlobjSearchFilter('internalid', null, 'anyof', 82);

		var columns = new Array();
		columns[0] = new nlobjSearchColumn('locationquantityonhand');
		var total = 0;
		var searchobj = nlapiSearchRecord('item', null, filters, columns);

		for (var x = 0; x < searchobj.length; x++) {
			var a = searchobj[x].getValue('locationquantityonhand');
			var b = a * 1;

			total = b + total
		}

		var retObj = nlapiLoadRecord('inventoryitem', 82);
		var itemname = retObj.getFieldValue('itemid');
		var costingmethoddisplay = retObj.getFieldValue('costingmethoddisplay');
		var totalvalue = retObj.getFieldValue('totalvalue');

		var returnobj = {};

		returnobj.itemName = 'item name : ' + itemname;
		returnobj.costingmethod = 'costingmethod : ' + costingmethoddisplay;
		returnobj.totalvalue = 'totalvalue : ' + totalvalue;
		returnobj.locationquantityavailable = 'location quantity available : '
				+ total;

		return returnobj;

	}

	else if (flags == 2) {
		var recId = dataIn.employeeid;

		var retObj = nlapiLoadRecord('employee', recId);
		var firstname = retObj.getFieldValue('firstname');
		var lastname = retObj.getFieldValue('lastname');
		var email = retObj.getFieldValue('email');
		var supervisor = retObj.getFieldText('supervisor');
		var custentitycustomvl_total_days = retObj
				.getFieldValue('custentitycustomvl_total_days');
	//	nlapiLogExecution('DEBUG', 'TEST', recId)

		var returnobj = {};

		returnobj.firstname = 'firstname ' + firstname;
		returnobj.lastname = 'lastname ' + lastname;
		returnobj.email = 'email ' + email;
		returnobj.supervisor = 'supervisor is' + supervisor;
		returnobj.Total_Vacation_Leave = 'Total Vacation Leave '
				+ custentitycustomvl_total_days;
		return returnobj;
	}

	else if (flags == 3) {
		var filters = new Array();
		filters[0] = new nlobjSearchFilter('type', null, 'anyof', 'SalesOrd');
		filters[1] = new nlobjSearchFilter('datecreated', null, 'within',
				"1/1/2016 12:00 am", "12/31/2018 11:59 pm");

		var columns = new Array();
		columns[0] = new nlobjSearchColumn('tranid');
		columns[1] = new nlobjSearchColumn('datecreated');
		columns[2] = new nlobjSearchColumn('entityid', 'customer');
		columns[3] = new nlobjSearchColumn('amount');
		var searchobj = nlapiSearchRecord('transaction', null, filters, columns);
		var array = [];
		
		for (var i = 0; i < 29; i++) {
//			searchobj[i] = resultobj[i]
			var a = searchobj[i].getValue('tranid');
			var b = searchobj[i].getValue('datecreated');
			var c = searchobj[i].getValue('entityid', 'customer');
			var d = searchobj[i].getValue('amount');

			var resultobj = {}
			resultobj.id = a;
			resultobj.dateCreated = b;
			resultobj.customer = c;
			resultobj.amount = d;
			array[i] = resultobj
		}
		return array;
	}

	else {
		return 'wrong flag number'
	}

}
/**
 * @param {Object}
 *            dataIn Parameter object
 * @returns {Object} Output object
 */
function postRESTlet(dataIn) {

	var flag = dataIn.flag
	if (flag == 1 ) {
	
		 	
	var notes = dataIn.notes;
	var id = dataIn.empId;		
	
	var name = nlapiLookupField('employee', id, 'altname');
		var memo1  = nlapiLookupField('employee', id, 'comments');	 nlapiSendEmail(2,id, name + ' record change notification ',' the value of your notes field was change from' + memo1 + ' to ' + notes);
	 nlapiSubmitField('employee', id, 'comments', notes);
		
	}
	else if (flag == 2 ) {
		
		var soID = dataIn.soID;
		var cust = nlapiLookupField('salesorder', soID, 'entity')
		
		var itemFulfillment = nlapiTransformRecord('salesorder', soID, 'itemfulfillment');
		var itemId = nlapiSubmitRecord(itemFulfillment);
		
		var records = new Object();
		records['transaction'] = itemId;
		var file = nlapiPrintRecord('TRANSACTION', itemId);
		
		//nlapiSendEmail(2, cust, ' Item fullfillment' , 'Item FullFill',null,null,null,null);
		returnObj = {};
		returnObj.itemfullid = itemId;
		
		
	}
	else
		{
		return 'wrong flag'
		}

	
	 
	
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
