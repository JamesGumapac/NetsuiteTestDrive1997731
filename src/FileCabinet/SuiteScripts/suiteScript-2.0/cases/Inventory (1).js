function test(type){
    try{
        var rec = nlapiLoadRecord(nlapiGetRecordType(),nlapiGetRecordId(),{recordmode:'dynamic'});
            nlapiLogExecution('DEBUG','Start','Script is running');
                if (type != 'delete'){
            var serial = new Array();
            var count = rec.getLineItemCount('item');
                   nlapiLogExecution('DEBUG','Item count',count);
            var val = '';    
            for (var i = 1; i <= count; i++) {
                var subrecord = rec.viewLineItemSubrecord('item','inventorydetail',i);    nlapiLogExecution('DEBUG','subrecord : ',subrecord);
                if (subrecord == null) continue;
                var search = nlapiSearchRecord('inventorydetail',null,['internalid','is',subrecord.getFieldValue('id')]);
                var inventoryDetailCount = search.length;        
                for (var j = 1; j <= inventoryDetailCount; j++){
                    subrecord.selectLineItem('inventoryassignment',j);
                    var id = subrecord.getCurrentLineItemValue('inventoryassignment','issueinventorynumber');
                      nlapiLogExecution('DEBUG','SubRecord Internal Id',id);
                    if (id){
                        serial.push(nlapiLookupField('inventorynumber', id, 'inventorynumber'));
                    }            
                }        
                for (var x = 0; x < serial.length; x++){
                  if (x != serial.length -1){
                    val += serial[x] + '\n';
                  }
                  else{
                    val += serial[x];
                  }
                }          
                rec.setLineItemValue('item','custcol13',i,val);
                serial = [];
                val = '';
            }
            
            nlapiSubmitRecord(rec);
        }
    }
    catch (e){
        nlapiLogExecution('DEBUG','Error',e.message);
    }
    
}