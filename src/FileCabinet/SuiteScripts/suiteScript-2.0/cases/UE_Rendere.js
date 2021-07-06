/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/email', 'N/file', 'N/record', 'N/render', 'N/search'],
/**
 * @param {email} email
 * @param {file} file
 * @param {record} record
 * @param {render} render
 * @param {search} search
 */
function(email, file, record, render, search) {
   
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(scriptContext) {

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {
    	if (scriptContext.type == 'edit') {
 		   
            
    	      

            var renderer = render.create();
          
            renderer.setTemplateById(100);
            var xml = renderer.renderAsString();
            renderer.templateContent = xml.getContents();
            renderer.addRecord({
           	    templateName: 'Standard Invoice PDF/HTML Template',
           	    record: record.load({
           	        type: record.Type.INVOICE,
           	        id: 1026
           	        })
           	    });
          
            var invoicePdf = renderer.renderAsPdf();
 
          var attachment = new Array;
          attachment.push(invoicePdf);

        var mergeResultObj = render.mergeEmail({
            templateId: 2
        });
          
          
           senderId = 2; // test employee
     
       
          
            email.send({
                author: senderId,
                recipients: '5132', // test customer
                subject: mergeResultObj.subject,
                body: mergeResultObj.body,                        
                attachments: attachment
            });
          
     
            return true;

	}
    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(scriptContext) {

    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
