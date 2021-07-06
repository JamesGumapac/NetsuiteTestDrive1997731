/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/runtime',
        'N/search',
        '/Suitescript-Global/sdr_processorder_lib'],
    /**
 * @param{runtime} runtime
 * @param{search} search
 */
    (runtime, search,sdr) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            let scriptRef = runtime.getCurrentScript();
            let customerId = scriptRef.getParameter(({
                name: 'customscript_sdr_ss_generate_so_report'
            }));
            let orderSearch = search.create({
                type: search.Type.TRANSACTION,
                filters: [
                    ['type', 'anyof','SalesOrd'], 'and',
                    ['mainline', 'is', true]
                ],
                columns: ['entity', 'trandate', 'tranid','salesrep','total']
            });
            sdr.sendReport(orderSearch);
        }

        return {execute}

    });
