/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/plugin'],
/**
 * @param{plugin} plugin
 */
function(plugin) {
    // let numberManupulationDflt = plugin.loadImplementation({
    //     type: 'customscript_number_manipulation_plugin'
    // })
    //
    // let formattedNumberDflt = numberManupulationDflt.setPrecision(86.234, 8);
    // let randomNumDflt = numberManupulationDflt.generateRandomNumber(100,3);
    //
    // let numberManipulationAlt = plugin.loadImplementation({
    //     type: 'customscript_number_manipulation_plugin',
    //     implementation: 'customscript_number_manipulation_alt'
    // })
    //
    // let formattedNumberAlt = numberManipulationAlt.setPrecision(86.234, 8);
    // let randomNumDfltAlt = numberManipulationAlt.generateRandomNumber(100,3);
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {
   // alert(`${formattedNumberDflt}, ${randomNumDflt} , ALT ${formattedNumberAlt}, ${randomNumDfltAlt} `)
    }

    return {
      //  pageInit: pageInit
    };
    
});
