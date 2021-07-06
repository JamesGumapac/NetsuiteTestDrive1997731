/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/runtime'],
/**
 * @param{runtime} runtime
 */
function(runtime) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) {
        var sdr = runtime.getCurrentScript().getParameter({
            name: "custscript_sdr_checkbox"
        })
        log.debug({title: 'SDR Value ', details: sdr})
                if(sdr == true){
                    var custRec = scriptContext.currentRecord;
                    var custName = custRec.getValue('companyname')
                    var myvar = confirm('Please call ' + custName +  'to welcome them as a customer before saving the record. Click cancel to go back to the record');
                    log.debug({title: 'myVar ', details: myvar})
                    return myvar
                }
                
       
        else{
            return true
        }
    }



    return {
        saveRecord: saveRecord

    };
    
});
