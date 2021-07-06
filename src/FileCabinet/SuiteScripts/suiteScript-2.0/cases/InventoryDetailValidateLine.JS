function validateLine(type) {

	// this variable will hold all serial numbers per line
	var serial_nos = '';

	var invdetail = nlapiCreateCurrentLineItemSubrecord('item', 'inventorydetail');

	if(invdetail){
		var cnt = nlapiGetLineItemCount('inventoryassignment');

		for(var i = 0; i < cnt; i++){
			invdetail.selectLineItem('inventoryassignment', i+1);

			var id = nlapiViewCurrentLineItemSubrecord('inventoryassignment', 'issueinventorynumber')
			var serialno = nlapiLookupField('inventorynumber', id, 'inventorynumber')

			if(serialno){
				if (i < (cnt-1)) {
					serial_nos += serialno + '\n';
				} else {
					serial_nos += serialno;
				}
			}
		}
	}

	nlapiSetCurrentLineItemValue('item','custcol10',serial_nos)
}