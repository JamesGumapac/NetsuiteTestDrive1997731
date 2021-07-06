/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['./customModule'],function(simpmond) {
   
	function pageInit(scriptContext) {
    	simpmond.Sabrin();
    }

    return {
        pageInit: pageInit
    
    };
    
});
