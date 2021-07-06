function TEST_BeforeLoad(type, form, request){

                if(type == 'create' && request != null){

                                var newSO = nlapiCreateRecord(nlapiGetRecordType(), {recordmode: 'dynamic'});

               newSO.setFieldValue('entity', 859);

                                //Now go back over the new Sales Order and set the fields on the current sales order.

                                //We need to do this to fake the sourcing that would normally happen client-side. As of May 2017, NetSuite does not include

                                //sourcing of fields on BeforeLoad.

                                var allBodyFields = newSO.getAllFields();

                                allBodyFields.sort();

               var fieldId = '';

                                for(var i = 0; i < allBodyFields.length; i++){

                                               

               if (i == 0){

              fieldId = 'shipstate';

              nlapiSetFieldValue(fieldId, newSO.getFieldValue(fieldId));

              fieldId = 'shipcountry';

              nlapiSetFieldValue(fieldId, newSO.getFieldValue(fieldId));

             fieldId = 'billaddress';

              nlapiSetFieldValue(fieldId, newSO.getFieldValue(fieldId));

              fieldId = 'shipzip';

              nlapiSetFieldValue(fieldId, newSO.getFieldValue(fieldId));

              fieldId = 'shipoverride';

              nlapiSetFieldValue(fieldId, newSO.getFieldValue(fieldId));

              fieldId = 'shipaddress';

              nlapiSetFieldValue(fieldId, newSO.getFieldValue(fieldId));

            }

               fieldId = allBodyFields[i];

               if (fieldId != 'billaddress' && fieldId != 'shipstate' && fieldId != 'shipcountry' && fieldId != 'shipzip' && fieldId != 'shipoverride' && fieldId != 'shipaddress'){

 

              nlapiLogExecution('debug', 'fieldId', fieldId + ' - ' + newSO.getFieldValue(fieldId));

                               nlapiSetFieldValue(fieldId, newSO.getFieldValue(fieldId));

           }

                                }

                }

}