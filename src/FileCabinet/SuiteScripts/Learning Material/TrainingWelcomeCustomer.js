/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record'],
    /**
     * @param{email} email
     * @param{record} record
     */
    (email, record) => {
        
        
        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {
            if (scriptContext.type == 'create') {
                let customer = scriptContext.newRecord;
                log.debug({title: 'Customer', details: customer})
                if(customer){
                    let customerId = customer.id;
                    let salesRepId = customer.getValue('salesrep');
                    let customerName = customer.getValue('entityid');
           
                    let salesRepName = customer.getText('salesrep');
    
                    email.send({
                        author: salesRepId,
                        recipients: customerId,
                        subject: 'Welcome to Netsuite',
                        body: 'Welcome! We are glad that you choose Netsuite'
                    });
                    record.submitFields({
                        type: record.Type.EMPLOYEE,
                        id: salesRepId,
                        values:{
                            comments: `Welcome email sent to ${customerName}`
                        },
                        options: {
                            enableSourcing: false,
                            ignoreMandatoryFields : true
                        }
                    });
    
                    log.debug({title: 'Welcome email', details:`Semt To: ${customerName} By: ${salesRepName}`})
    
                }
       
            }
        }
        
        return {afterSubmit}
        
    });
