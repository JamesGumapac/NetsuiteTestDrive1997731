/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/cache', 'N/redirect', 'N/search', 'N/task', 'N/task/accounting/recognition', 'N/ui/serverWidget', 'N/url'],
    /**
     * @param{cache} cache
     * @param{redirect} redirect
     * @param{search} search
     * @param{task} task
     * @param{recognition} recognition
     * @param{serverWidget} serverWidget
     * @param{url} url
     */
    (cache, redirect, search, task, recognition, serverWidget, url) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        let PAGE_SIZE = 50;
        const onRequest = (context) => {
            let request = context.request;
            let response = context.response;
    
            let form = serverWidget.createForm({title: 'Sales Order Pending Approval'})
            try {
          
                if(context.request.method === 'GET'){
                    form.addFieldGroup({
                        id: 'custpage_available_filter',
                        label: 'Filters'
                    });
                    
                    let location = form.addField({
                        id: 'custpage_locpage_filter',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Location',
                        source: 'location',
                        container: 'custpage_available_filter'
                        
                    })
                }
                response.writePage(form)
            } catch (e){
                log.error({title: 'Error Message', details: e.message})
            }
        }
        
        return {onRequest}
        
    });
