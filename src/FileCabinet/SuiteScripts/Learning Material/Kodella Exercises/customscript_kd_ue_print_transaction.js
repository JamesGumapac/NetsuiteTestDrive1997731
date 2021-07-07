/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record','N/log'],

    function(record,log) {

            /**
             * Function definition to be triggered before record is loaded.
             *
             * @param {Object} scriptContext
             * @param {Record} scriptContext.newRecord - New record
             * @param {string} scriptContext.type - Trigger type
             * @param {Form} scriptContext.form - Current form
             * @Since 2015.2
             */
            function beforeLoad(scriptContext) {

                    var recordId = scriptContext.newRecord.id;
                    var type = scriptContext.newRecord.type;
                    log.debug('type', type)
                    var form = scriptContext.form;
                    scriptContext.form.addButton({
                            id:'custpage_cool',
                            label:'Print',
                           functionName:'CallforSuitelet()'

                    });

                   form.clientScriptFileId = 12253; //internal id of the script file

            }





            return {
                    beforeLoad: beforeLoad
            };

    });