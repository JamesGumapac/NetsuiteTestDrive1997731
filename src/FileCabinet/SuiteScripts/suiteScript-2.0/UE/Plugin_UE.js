/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/plugin','N/runtime'],
    /**
 * @param{plugin} plugin
 */
    (plugin,runtime) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {
            let rec = scriptContext.newRecord;
            let numberManupulationDflt = plugin.loadImplementation({
                type: 'customscript_number_manipulation_plugin'
            })
    
            let formattedNumberDflt = numberManupulationDflt.setPrecision(86.234, 8);
            let randomNumDflt = numberManupulationDflt.generateRandomNumber(100,3);
    
            let numberManipulationAlt = plugin.loadImplementation({
                type: 'customscript_number_manipulation_plugin',
                implementation: 'customscript_number_manipulation_alt'
            })
    
            let formattedNumberAlt = numberManipulationAlt.setPrecision(86.234, 8);
            let randomNumDfltAlt = numberManipulationAlt.generateRandomNumber(100,3);
    
            rec.setValue({
               fieldId: 'memo',
               value: `formattedNumberDflt: ${formattedNumberDflt} , randomNumDflt: ${randomNumDflt} --- formattedNumberAlt: ${formattedNumberAlt}, randomNumDfltAlt: ${randomNumDfltAlt} `
           })
           
        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
