function beforeLoad(){
  if (type != 'create'){
      var empID = nlapiGetUser();
      var record = nlapiGetRecordId();
      if (empID != record){
        throw 'Bawal';
      }
  }
}