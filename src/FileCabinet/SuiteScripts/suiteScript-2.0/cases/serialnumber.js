function test(type){
    try{
        var rec = nlapiLoadRecord(nlapiGetRecordType(),nlapiGetRecordId(),{recordmode:'dynamic'});
        if (type != 'delete'){
           
            var count = rec.getLineItemCount('item');
       
            for (var i = 1; i <= count; i++) {
                var subrecord = rec.viewLineItemSubrecord('item','inventorydetail',i);
                     nlapiLogExecution('DEBUG','SubRecord',subrecord);
                if (subrecord) {
                rec.setLineItemValue('item','custcol_inventorystatus',i,'T');
                nlapiLogExecution('DEBUG','SubRecord','my laman ung subrecord',i);
              }
              
               
            }
            
            nlapiSubmitRecord(rec);
        }
    }
    catch (e){
        nlapiLogExecution('DEBUG','Error',e.message);
    }
    
}