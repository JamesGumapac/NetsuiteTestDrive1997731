/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord'],
    /**
     * @param{currentRecord} currentRecord
     */
    function (currentRecord) {
        
        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
    
        
        
        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        function fieldChanged(scriptContext) {
            
            // var rec = scriptContext.currentRecord;
            // var startDate = rec.getValue({
            //     fieldId: 'startdate'
            // })
            //
            // var endDate = rec.getValue({
            //     fieldId: 'enddate'
            // })
            // log.debug({title: 'startDate', details: startDate})
            // log.debug({title: 'endDate', details:endDate})
            // if(startDate){
            //     rec.setValue({
            //         fieldId: 'enddate',
            //         value: startDate
            //     })
            //
            // }
            return true;
        }
        
        /**
         * Function to be executed when field is slaved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         *
         * @since 2015.2
         */
        
        
        return {
      
            fieldChanged: fieldChanged
    
        };
        
    });
