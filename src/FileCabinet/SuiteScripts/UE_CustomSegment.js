/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/currentRecord', 'N/record', 'N/search'],
    /**
     * @param{currentRecord} currentRecord
     * @param{record} record
     */
    (currentRecord, record, search) => {
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
            var rec = scriptContext.newRecord;
            log.debug({
                title: 'Record',
                details: rec
            })
            try {
                var linecount = rec.getLineCount('item')
                rec.setValue({fieldId: 'memo', value: linecount})
                
                
                for (var lineItem = 0; lineItem <= linecount; lineItem++) {
                    var itemId = rec.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'item',
                        line: lineItem
                    }); // get the item id on the line item
                    log.debug({title: 'Line 49 Item ID', details: itemId})
                    
                    var itemSubtypeLookUp = search.lookupFields({
                        type: search.Type.ITEM,
                        id: itemId,
                        columns: 'subtype'
                    })
                    log.debug({title: 'itemSubtypeLookUp ', details: itemSubtypeLookUp})
                    
                    var subtype = itemSubtypeLookUp.subtype;
                    log.debug({title: 'Line 59: subtype ', details: subtype})
                    if (subtype == "") {
                        var incomeaccountLookup = search.lookupFields({
                            type: search.Type.ITEM,
                            id: itemId,
                            columns: 'incomeaccount'
                        }) // get the itemsubtype of the item and use it for the next search
                        log.debug({title: 'Line 66: incomeaccountLookup ', details: incomeaccountLookup})
                        
                        var incomeaccountobj = incomeaccountLookup.incomeaccount[0];
                        log.debug({title: 'Line 69: incomeaccountobj ', details: incomeaccountobj})
                        var incomeaccount = incomeaccountobj.value;
                        log.debug({title: 'Line 71: incomeaccount ', details: incomeaccount})
                        
                        var cseglookup = search.lookupFields({
                            type: search.Type.ACCOUNT,
                            id: incomeaccount,
                            columns: 'cseg2'
                        })
                        
                        var csegobj = cseglookup.cseg2[0];
                        log.debug({title: 'line 80: csegobj ', details: csegobj})
                        var cseg = csegobj.value;
                        log.debug({title: 'line 82: cseg value ', details: cseg})
                        
                        rec.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'cseg2',
                            line: lineItem,
                            value: cseg
                        });
                    } else {
                        var expenseaccountLookUp = search.lookupFields({
                            type: search.Type.ITEM,
                            id: itemId,
                            columns: 'expenseaccount'
                        }) // get the itemsubtype of the item and use it for the next search
                        log.debug({title: 'line 96 expenseaccountLookUp ', details: expenseaccountLookUp})
                        
                        var expenseaccountObj = expenseaccountLookUp.expenseaccount[0];
                        log.debug({title: 'line 99: expenseaccountObj ', details: expenseaccountObj})
                        var expenseaccount = expenseaccountObj.value;
                        log.debug({title: 'line 101: expenseaccount ', details: expenseaccount})
                        
                        var cseglookup = search.lookupFields({
                            type: search.Type.ACCOUNT,
                            id: expenseaccount,
                            columns: 'cseg2'
                        })
                        
                        var csegobj = cseglookup.cseg2[0];
                        log.debug({title: 'line 110: csegobj ', details: csegobj})
                        var cseg = csegobj.value;
                        log.debug({title: 'line 112: csegvalue ', details: cseg})
                        
                        rec.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'cseg2',
                            line: lineItem,
                            value: cseg
                        });
                        
                    }
                    
                    
                }
            } catch (e) {
                log.debug('DEBUG', e.name + ' ' + e.message)
            }
            
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
