/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget'],

function(ui) {
   
 
    function onRequest(context) {
    	if (context.request.method == 'GET') {
			var form = ui.createForm({
				title: 'Demo Dialog'
			})
			form.clientScriptModulePath = './SuiteLetDialog.js'
			form.addButton({
				label: 'how are you!!',
				id: 'custpage_moodbutton',
				functionName: 'moodRing'
			})
			context.response.writePage(form)
		}
    }

    return {
        onRequest: onRequest
    };
    
});
