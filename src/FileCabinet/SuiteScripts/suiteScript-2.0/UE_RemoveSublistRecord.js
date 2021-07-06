require(['N/search', 'N/record'], function(search, record) {



  function afterSubmitExecution(context) {
    try {
      var _nsRecord = record.load({ type: record.Type.SALES_ORDER, id: 7585, isDynamic: true });

      var lineCount = _nsRecord.getLineCount({ sublistId: 'item' });

      for (var i = 0; i < lineCount; i++) {

        _nsRecord.selectLine({ sublistId: 'item', line: i });

       
          var _nsSubRecordInvDetail = _nsRecord.removeCurrentSublistSubrecord({ sublistId: 'item', fieldId: 'inventorydetail' });
          _nsSubRecordInvDetail.save();
        }

      
      _nsRecord.commitLine({ sublistId: 'item' });
      var changeRecordId = _nsRecord.save();
      log.debug({ title: 'afterSubmitExecution', details: 'changeRecordId ::' + changeRecordId });
      var ss = 0;

    } catch (err) {
      log.error({ title: 'afterSubmitExecution', details: err });
      throw err;
    }
  }
});