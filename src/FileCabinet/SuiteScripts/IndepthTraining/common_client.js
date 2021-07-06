
function review(auth , reciever ,task) {
	

	nlapiSendEmail(auth, reciever, 'Review in Progress', 'Review in Progress');
	nlapiSubmitField('task', task, 'status', 'PROGRESS');
	location.reload();
}

function approved(auth , reciever ,task, recId) {
	

	nlapiSendEmail(auth, reciever, 'Review Completed', 'Approved');

	nlapiSubmitField('task', task, 'status', 'COMPLETE');
	nlapiSubmitField('employee',recId,'custentity_employee_status',2);
	location.reload();
}

function reject(auth , reciever ,task, recId) {
	

	nlapiSendEmail(auth, reciever, 'Review Completed', 'Rejected');

	nlapiSubmitField('task', task, 'status', 'COMPLETE');
	nlapiSubmitField('employee',recId,'custentity_employee_status',3);
	location.reload();
}
function helloworld(url)
{
	alert(url);
	var url = "https://system.netsuite.com/app/accounting/transactions/salesord.nl?id=" + url + "&whence=";
	 window.open(url);
}
function myFunction() {
}

function SuiteLet()
{
	var user = nlapiGetRecordId();

	
	var url = "https://system.netsuite.com/app/site/hosting/scriptlet.nl?script=88&deploy=1&custID="+ user ;
   window.open(url);
}
function createTask(customerId){

	alert(customerId);
	//call suitelet
	var url = nlapiResolveURL('SUITELET', 'customscript_frstbackendscrpt', 'customdeploy_myfirstbackendscrpt');
	url = url +'&customerId='+customerId;
	alert(url);
	nlapiRequestURL(url);
}
function printSO() {
	alert('Print')
	var url = nlapiResolveURL('SUITELET', 'customscript_frstbackendscrpt', 'customdeploy_myfirstbackendscrpt');
	window.open(url);
}