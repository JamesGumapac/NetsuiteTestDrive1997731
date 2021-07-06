/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord'],
/**
 * @param{currentRecord} currentRecord
 */
function(currentRecord) {
    
    
    function validateLine(scriptContext) {
        

// this variable will hold all serial numbers per line
            // this variable will hold all serial numbers per line
        var serial_nos = '';
    
        var invdetail = scriptContext.currentRecord.getCurrentSublistSubrecord({
            sublistId: 'item',
            fieldId: 'inventorydetail'
        });
    
        if (invdetail) {
            var cnt = invdetail.getLineCount({
                sublistId: 'inventoryassignment'
            });
        
            for (var i = 0; i < cnt; i++) {
                   var id = invdetail.getSublistValue({
                    sublistId: 'inventoryassignment',
                    fieldId: 'issueinventorynumber',
                    line: i + 1
                });
            
            
            
                var serialno = search.lookupFields({
                    type: search.Type.INVENTORY_NUMBER,
                    id: id,
                    columns: ['inventorynumber']
                });
            
                if (serialno) {
                    if (i < (cnt - 1)) {
                        serial_nos += serialno + '\n';
                    } else {
                        serial_nos += serialno;
                    }
                }
            
            }
        
            // For this example, "custcol_serial_numbers" is the Script Id of the Custom Transaction Line Field
           var id = invdetail.getSublistValue({
                    sublistId: 'inventoryassignment',
                    fieldId: 'issueinventorynumber',
                    line: i + 1
                });
        
        
        }
    }

    return {
      
        validateLine: validateLine
    };
    
});
