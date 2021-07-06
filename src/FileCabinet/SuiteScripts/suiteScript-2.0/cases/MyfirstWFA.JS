function workflowAction() {
	var entityId = nlapiGetFieldValue("employee");
	var recObj = nlapiLoadRecord('employee',entityId);
	recObj.setFieldValue('comments','Created a Purchase Order last ' + new Date());
	nlapiSubmitRecord(recObj);
}
