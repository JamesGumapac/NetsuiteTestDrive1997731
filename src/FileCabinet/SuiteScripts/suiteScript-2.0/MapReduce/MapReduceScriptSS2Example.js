/**
 * @NApiVersion 2.0
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/runtime'],
    
    function (record, search, runtime) {
    
        function getInputData() {
            //   log.debug('get input data', 'start')
            return {
                type: 'search',
                id: 53
            }
        
        }
    
        /**
         * Executes when the map entry point is triggered and applies to each
         * key/value pair.
         *
         * @param {MapSummary}
         *            context - Data collection containing the key/value pairs to
         *            process through the map stage
         * @since 2015.1
         */
        function map(context) {
            var sRes = JSON.parse(context.value);
            //log.debug('ORIGINAL JSON', sRes);
            context.write({
                key: sRes.values.entity.value,
                value: sRes.values.internalid
            });
            // log.debug({
            //     title: 'SrES',
            //     details: sRes
            // });
            //log.debug('Key Value', sRes.values.entity.value);
        }
    
        /**
         * Executes when the reduce entry point is triggered and applies to each
         * group.
         *
         * @param {ReduceSummary}
         *            context - Data collection containing the groups to process
         *            through the reduce stage
         * @since 2015.1
         */
        function reduce(context) {
        
            var num = context.values.length;
            var cust = context.key;
        
            log.debug({title: 'Customer Internal ID', details: cust});
        
            var objRecord = record.load({
                type: record.Type.CUSTOMER,
                id: cust,
                isDynamic: true
            });
            var custname = objRecord.getText('entityid');
        
        
            log.debug({title: 'Customer order Info', details: num + ' ORDERS FROM ' + custname});
        
            // var rec = JSON.parse(objRecord);
            // log.debug({
            //     title: 'Employee Record',
            //     details: rec
            // })
        
        
            var salesrep = objRecord.getValue({
                fieldId: 'salesrep'
            });
            var salesrepName = objRecord.getText({
                fieldId: 'salesrep'
            });
            var createTask = record.create({
                type: record.Type.TASK
            })
            
            //
            if (salesrep == null) {
                var createTask = record.create({
                    type: record.Type.TASK,
                });
                createTask.setValue({
                    fieldId: 'title',
                    value: ' SEND ' + num + '  GIFT BASKET TO ' + custname
                });
                createTask.setValue({
                    fieldId: 'assigned',
                    value: 2
                });
                var taskId = createTask.save({
                    ignoreMandatoryFields: true
                });
                log.debug({title: 'Created Task ' + taskId, details: 'Assigned to sales rep :' + context.runtime.getCurrentUser()});
            
            }
            
             else {
                var createTask1 = record.create({
                    type: record.Type.TASK,
                });
                createTask1.setValue({
                    fieldId: 'title',
                    value: 'SEND ' + num + ' GIFT BASKET TO ' + custname
                });
                createTask1.setValue({
                    fieldId: 'assigned',
                    value: salesrep
                });

                var taskId = createTask1.save();
                log.debug({title: 'Created Task ' + taskId, details: 'Assigned to sales rep :' + salesrep});

            }
        }
    
    
        /**
         * Executes when the summarize entry point is triggered and applies to the
         * result set.
         *
         * @param {Summary}
         *            summary - Holds statistics regarding the execution of a
         *            map/reduce script
         * @since 2015.1
         */
        function summarize(summary) {
            
            log.debug({
                title: "Number of USAGE",
                details: summary.usage
            })
            log.debug({
                title: "Number of QUEUE",
                details: summary.concurrency
            })
            log.debug({
                title: "Number of YIELDS",
                details: summary.yields
            })
            
        }
        
        return {
            getInputData: getInputData,
            map: map,
            reduce: reduce,
            summarize: summarize
        };
        
    });
