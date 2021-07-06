/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define([ 'N/search','N/record' ],

function(search,record) {

	function execute(scriptContext) {
		var mySearch = search.load({
			id: 133
		});
		var myResults = mySearch.run();

			myResults.each(function(result){
				var itemId = result.id;
				log.debug(itemId)
				record.submitFields({
					type: record.Type.INVENTORY_ITEM,
					id: itemId,
					values:{
						isonline : 'T'
					},
					options: {
						enableSourcing: false,
						ignoreMandatoryFields : true
					}
				})
				return true;
		});
		
	}

    return {
        execute: execute
    };
    
});


//var soRec = record.load({
//type: record.Type.SALES_ORDER,
//id: soId
//})
//soRec.setValue({
//fieldId: 'memo',
//value: 'Altered by scheduled script ss2'
//});
//soRec.save();
