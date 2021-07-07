/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */
define(['N/render', 'N/record'],
    function (render, record) {

        function onRequest(context) {
           try {
                var requestparam = context.request.parameters;
                var recId = requestparam.recId;
                var recType = requestparam.recType;

                log.debug('recordId',recId)
                log.debug('recordType',recType)

                var objRecord = record.load({
                    type: recType,
                    id: recId
                });
                var numLines = objRecord.getLineCount({sublistId:'item'})
                log.debug('Number of lines', numLines)
                log.debug('SalesOrder OBJ', objRecord)

                xml = '<?xml version="1.0"?>'
                xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">'
                xml += '<pdf>'
                xml += '<body>'

                xml += '<table style="width: 100%; margin-top: 10px;"><tr>'
                xml += '<td colspan="3" style="font-size: 8pt; padding: 6px 0 2px; font-weight: bold; color: #333333;">Customer Name</td>'
                xml += '<td colspan="3" style="font-size: 8pt; padding: 6px 0 2px; font-weight: bold; color: #333333;">Customer Email</td>'
                xml += '<td colspan="3" style="font-size: 8pt; padding: 6px 0 2px; font-weight: bold; color: #333333;">Customer Phone</td>'
                xml += '</tr>'
                xml += '<tr>'
                xml += '<td colspan="3" style="padding: 0;">' + objRecord.getText({fieldId: 'entity'}) + '</td>'
                xml += '<td colspan="3" style="padding: 0;">' + objRecord.getValue({fieldId: 'email'}) + '</td>'
                xml += '<td colspan="3" style="padding: 0;">' + objRecord.getValue({fieldId: 'phone'}) + '</td>'
                xml += '</tr>'
                xml += '</table>'
                xml += '<table style="width: 100%; margin-top: 10px;"><tr>'
                xml += '<th>Item Name</th>'
                xml += '<th>Quantity</th>'
                xml += '<th>Amount</th>'
                xml += '</tr>'
            for (var i = 0; i < numLines; i++) {
                var item = objRecord.getSublistText({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: i
                });
                log.debug('item',item)

                var quantity = objRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: i
                });
                log.debug('quantity',quantity)
                var amount = objRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'amount',
                    line: i
                });

                log.debug('amount',amount)
                xml += '<tr>'
                xml += '<td style="padding-top: 2px;">' + item + '</td>'
                xml += '<td style="padding-top: 2px;">' + quantity + '</td>'
                xml += '<td style="padding-top: 2px;">' + amount + '</td>'
                xml += '</tr>'


            };

            xml += '</table>'
                xml += '</body>'
                xml += '</pdf>'



                log.debug('xml ',xml)
                var response = context.response;

                var renderer = render.create();
                renderer.templateContent = xml
                var transactionFile = renderer.renderAsPdf()
                log.debug('Transaction file', transactionFile)
                response.writeFile(transactionFile)

            } catch (e) {
                log.error({
                    title: 'Error : ' + e.name,
                    details: e.message
                });
            }
        }

        return {
            onRequest: onRequest
        };

    });