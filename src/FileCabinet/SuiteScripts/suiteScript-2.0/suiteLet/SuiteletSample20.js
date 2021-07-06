/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define([ 'N/ui/serverWidget','N/email','N/runtime' ],

function(widget,email,runtime) {

	function onRequest(context) {
		if (context.request.method == 'GET') {
			var form = widget.createForm({
				title : 'SS2 new Suitelet from'
			})
			var subField = form.addField({
				id : 'custpage_subject',
				label : 'Subject',
				type : widget.FieldType.TEXT
			})
			subField.isMandatory = true;
			var subEmail = form.addField({
				id : 'custpage_email',
				label : 'Email',
				type : widget.FieldType.EMAIL
			})
			subEmail.isMandatory = true;
			var subBody = form.addField({
				id : 'custpage_body',
				label : 'BODY',
				type : widget.FieldType.TEXTAREA
			})
			subBody.isMandatory = true;
			subBody.displaySize = {
				width: 60,
				height: 10
			}

			form.addSubmitButton({
				label : 'Send Email'
			});
			context.response.writePage(form)
		}
		else{
			var req = context.request
			email.send({
				author: runtime.getCurrentUser().id,
				recipients: req.parameters.custpage_email,
				subject: req.parameters.custpage_subject,
				body: req.parameters.custpage_body
				
			}) 
			context.response.write("<h1> email sent! </h1>");
		}
	}

	return {
		onRequest : onRequest
	};

});
