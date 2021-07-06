/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget'],
/**
 * @param {serverWidget} serverWidget
 */
function(serverWidget) {
   
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
    	var form = scriptContext.form;
    	var html = '<style type="text/css"> .btn-nav { height: 150px; width: 250px; border: 1px solid black; position: relative; }.hyperspan { background: red; opacity: .3; position:absolute; width:100%; height:100%; left:0; top:0; z-index:1; } </style> <script type="text/javascript">function trial(){ nlapiSetFieldValue("memo","Hello MEME"); }</script>';
        //form.clientScriptModulePath = 'SuiteScripts/SS2.0/UECallClientScript.js';
         html+= '<div id="music" class="btn-nav">Add Freight <a onclick="trial()"> <span class="hyperspan"></span> </a> </div>'
        
        var field = form.addField({
            id : 'custpage_abc_text',
            type : serverWidget.FieldType.INLINEHTML,
            label : 'Add freight Quote',
            container : 'shipping'
        
        });
        field.defaultValue = html;
    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(scriptContext) {

    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});