/**
 *
 */
define(['N/render', 'N/file','N/email']
,function(render,file,email){
        /**
         *
         */
        function processTemplateData(orderSearch){
            var orders = [];
            var customerName;
            orderSearch.search.run().each(function(result){
                customerName = result.getText('entity');
                orders.push({
                    trandate : result.getValue('trandate'),
                    tranid   : result.getValue('tranid'),
                    salesrep : result.getValue('salesrep'),
                    total    : result.getValue('total')
                })
                return true;
            });
            
            return {
                customerName : customerName,
                orders       : orders
            }
        }
        
        /**
         *
         */
        function generateReport(templateData){
            var reportTemplate = file.load({
                id: 'Templates/SampleLOGO.xml'
            })
            var myFile = render.create();
            myFile.templateContent = reportTemplate.getContents();
            myFile.addCustomDataSource({
                format : render.DataSource.OBJECT,
                alias  : 'orderData',
                data   : templateData
            })         ;
            return myFile.renderAsPdf();
        }
        
        function sendEmail(attachment){
            email.send({
                author: -5,
                recipient: -5,
                subject: 'Sales Order Report',
                body: 'Sales Order Report',
                attachment: [attachment]
            })
        }
    return{
        /**
         *
         */
        sendReport: function(orderSearch){
            var templateData = processTemplateData(orderSearch);
            var soReport = generateReport(templateData)
            sendEmail(soReport)
        }
    }
    
    
    
    
    
    })