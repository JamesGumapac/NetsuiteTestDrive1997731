/**
 * Copyright (c) 2018 S3 Consulting Group (www.s3consgrp.com). All rights
 * reserved.
 * 
 * This software is the confidential and proprietary information of S3
 * Consulting Group, Inc. ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with S3 Consulting Group*
 * 
 * 
 * @NApiVersion 2.x
 * @author APH
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 * 
 * Version Date Author Remarks 1.00 12-04-2018 APH Initial Development
 * 
 * 
 * 
 * 
 */

define([ 'N/record', 'N/render', 'N/file', 'N/xml', 'N/runtime' ], function(
		record, render, file, xml, runtime) {

	function afterSubmit(context) {
		
		var DEBUG_IDENTIFIER = 'afterSubmit';
		log.debug(DEBUG_IDENTIFIER, '---Start---');

	
			var type = context.type;
			var newRec = context.newRecord;

			var recID = newRec.id;
			var recType = newRec.type;
			var execContext = runtime.executionContext;
			// log.debug(DEBUG_IDENTIFIER, 'execContext: ' + execContext +'
			// recID: '+recID+' recType: '+recType);

			var rec = record.load({
				type : recType,
				id : recID,
				isDynamic : true
			});

			var isConcurCCExpense = rec.getValue({
				fieldId : 'custbody_bgcsf_concur_corp_cc'
			});
			var concurCorpCard = rec.getText({
				fieldId : 'custbody_bgsf_conc_corp_card'
			});

			log.debug(DEBUG_IDENTIFIER, 'isConcurCCExpense: '	+ isConcurCCExpense);
			log.debug(DEBUG_IDENTIFIER, ' concurCorpCard : ' + concurCorpCard)
			
			log.debug('Line number ', 'line 57')
			
//			rec.setValue({
//				fieldId : 'corpcardbydefault',
//				value : false
//			});
//			log.debug('Setvalues first ', 'Pumasok sya sa pag seset values')
			rec.setText({
				fieldId : 'acctcorpcardexp',
				value : concurCorpCard
			});
			log.debug('Setvalues ', 'Pumasok sya sa pag seset values ng acctcorpcardexp')

			var acctCorp = rec.getText({
				fieldId : 'acctcorpcardexp'
			});
			log.debug(DEBUG_IDENTIFIER, 'acctcorpcardexp ' + acctCorp)
//			var CorpCardcheckboxValue = rec.getValue({
//				fieldId : 'corpcardbydefault'
//			});
//			
//
//		
//			log.debug(DEBUG_IDENTIFIER, 'CorpCardcheckboxValue'
//					+ CorpCardcheckboxValue)
					
			var updatedERId = rec.save({
				enableSourcing : true,
				ignoreMandatoryFields : true
			});
			log.debug(DEBUG_IDENTIFIER,'New Id' , updatedERId)
			
			var recrd = record.load({
				type : recType,
				id : updatedERId,
				isDynamic : true
			});
			var corpValue = recrd.getText({
				fieldId : 'acctcorpcardexp'
			});
			log.debug('corpValue new value' + corpValue)
			//					
			// if(concurCorpCard != null && concurCorpCard != " ")
			// {
			// rec.setValue({
			// fieldId: 'acctcorpcardexp',
			// value: concurCorpCard
			// });
			// }
			// if(isConcurCCExpense == true)
			// {
			// rec.setValue({
			// fieldId: 'corpcardbydefault',
			// value: isConcurCCExpense
			// });
			//						
			// var erLineCount = rec.getLineCount({
			// sublistId: 'expense'
			// });
			// log.debug(DEBUG_IDENTIFIER,'ER Line Count: ' + erLineCount);
			//						
			// for(var j = 0; j < erLineCount; j++)
			// {
			//                          
			// /*rec.setSublistValue({
			// sublistId: 'expense',
			// fieldId: 'corporatecreditcard',
			// line: j,
			// value: isConcurCCExpense
			// });*/
			//                          
			// rec.selectLine({
			// sublistId: 'expense',
			// line: j
			// });
			// rec.setCurrentSublistValue({
			// sublistId: 'expense',
			// fieldId: 'corporatecreditcard',
			// value: isConcurCCExpense
			// });
			//										
			// rec.commitLine({
			// sublistId: 'expense'
			// });
			// }
			// }
			// var updatedERId = rec.save({
			// enableSourcing : true,
			// ignoreMandatoryFields : true
			// });
			// log.debug(DEBUG_IDENTIFIER,'Expense Report: ' + updatedERId + '
			// has been updated successfully.');
			// //}
	
	}
	return {
		afterSubmit : afterSubmit
	};
});