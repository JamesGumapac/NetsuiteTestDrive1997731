/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define([ 'N/search','N/record' ],

function(search,record) {

	function execute(scriptContext) {
		var mySearch = search.load({
			id: 38
		});
		var myResults = mySearch.run();
		myResults.each(function(result){
			var soId = result.id;
          log.debug('SOID', soId)
			record.submitFields({
				type: record.Type.SALES_ORDER,
				id: soId,
				values:{
					memo : 'altered via ss2'
				}
			})
//			var soRec = record.load({
//				type: record.Type.SALES_ORDER,
//				id: soId
//			})
//			soRec.setValue({
//				fieldId: 'memo',
//				value: 'Altered by scheduled script ss2'
//			});
//			soRec.save();
		});
		return true;
	}

	return {
		execute : execute
	};

});
