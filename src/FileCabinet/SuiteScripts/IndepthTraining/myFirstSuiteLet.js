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
function suitelet(request, response) {

	nlapiLogExecution('DEBUG', 'natawag', 'NATAWAG SI SUITELET');
	// if nag get
	if (request.getMethod() == 'GET') {
		var form = nlapiCreateForm('Email Sender Sept 2018', false);
	
		var recipient = form.addField('custpage_recipient', 'email',
				'Recipient');
		recipient.setMandatory(true);
		var subject = form.addField('custpage_subject', 'text', 'SUBJECT');
		subject.setMandatory(true);
		form.addField('custpage_body', 'textarea', 'MESSAGE');
		var sublist1 = form.addSubList('custpage_sublist1', 'inlineeditor',
				'Inline Editor Sublist');
		sublist1.addField('custpage_field1', 'text', 'Field1');
		sublist1.addField('custpage_field2', 'select', 'items', '-10');

		form.addSubmitButton('Submit');
		form.setScript('customscript_common_client');
		form.addButton('custpage_button1', 'Hello World!', 'helloworld()');
		
		response.writePage(form);
	} else {
		var field = request.getLineItemValue('custpage_sublist1', 'custpage_field1',1);
		var recipient = request.getParameter('custpage_recipient');
		var subject = request.getParameter('custpage_subject');
		var body = request.getParameter('custpage_body');
		
	
		nlapiLogExecution('DEBUG', 'PARAMETERS', 'field1 : ' + field
				+ ' subject : ' + subject + ' body : ' + body);
		
		nlapiSendEmail(2, recipient, subject, body);
		
		var form2 = nlapiCreateForm('Email SUCCESS!');
		var successmsg = form2.addField('custpage_successmessage', 'text', ' ');
		successmsg.setDefaultValue('SENT!!!');
		successmsg.setDisplayType('inline');
		
		response.writePage(form2);

	}

	// if nag post

};

