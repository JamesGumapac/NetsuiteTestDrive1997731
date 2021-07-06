/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
// This sample shows how to render search results into a PDF file.
define(['N/render', 'N/file'], function(render, file) {
	function onRequest(options) {
		var request = options.request;
		var response = options.response;
	var xmlfile = file.load('Templates/xmltest.xml');
	var myFile = render.create();
	myFile.templateContent = xmlfile.getContents();

var invoicePdf = myFile.renderAsPdf();
		
		response.writeFile(invoicePdf, false);
	}
	
	return {
		onRequest: onRequest
	};
});