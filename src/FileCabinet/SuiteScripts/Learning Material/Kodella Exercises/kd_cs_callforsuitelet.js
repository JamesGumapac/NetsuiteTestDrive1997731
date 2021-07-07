/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/log', 'N/url'], function (currentRecord, log, url) {
    function pageInit(context) {
    }

    function CallforSuitelet(){

        var record = currentRecord.get();
        var recId = record.id;
        var recType = record.type
        var suiteletURL = url.resolveScript({
            scriptId:'customscript_kd_sl_print_transaction',//Please make sure to replace this with the script ID of your Suitelet
            deploymentId: 'customdeploy_kd_sl_print_transaction',//Please make sure to replace this with the deployment ID of your Suitelet
            params: {
                'recId':recId,
                'recType':recType
            }

        });
        document.location=suiteletURL;
    }

    return {
        pageInit: pageInit,
        CallforSuitelet: CallforSuitelet
    };
});
