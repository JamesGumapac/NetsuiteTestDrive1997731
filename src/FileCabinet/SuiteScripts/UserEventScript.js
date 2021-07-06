/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/task','N/log','N/serveWidget'],
    /**
 * @param{record} record
 * @param{task} task
 */
    (record, task) => {
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
            if(scriptContext.type == 'edit'){

              var record =  scriptContext.newRecord;

              var employee = record.getValue({
                 fieldId:  'entity'
              })

                

                //scriptContext.form.clientScriptModulePath = './CSEstimate.js'
                scriptContext.form.clientScriptFileId = 5501
                var html = '<button onclick="trial()";>add Freight to Quote</button>'

                var field = form.addField({
                    id : 'custpage_abc_text',
                    type : serverWidget.FieldType.INLINEHTML,
                    label : 'Add freight Quote',
                    container : 'shipping'

                });
                field.defaultValue = html;


            }

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
