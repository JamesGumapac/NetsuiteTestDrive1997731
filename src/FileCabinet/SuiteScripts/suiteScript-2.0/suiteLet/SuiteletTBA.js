/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/crypto', 'N/ui/serverWidget', './hmac','./enc64'],
    /**
 * @param{crypto} crypto
 * @param{serverWidget} serverWidget
 */
    (crypto, serverWidget, hmac, enc64) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
   
       
        const onRequest = (scriptContext) => {
            var form = serverWidget.createForm({
                title: 'TBA SUITELET'
            })
    
          
            function getNonce(length) {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < length; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }
           
        if(scriptContext.request.method === "GET") {
           
            generateForm(form);
           
            
        }
    
        

        else
            {
                var req = scriptContext.request;
        
                var CONSUMER_KEY = req.parameters.custpage_conkey;
                var CONSUMER_SECRET = req.parameters.custpage_consecret;
                var TOKEN_ID = req.parameters.custpage_tokenid;
                var TOKEN_SECRET = req.parameters.custpage_tokensecret;
                var SCRIPT_DEPLOYMENT_ID = req.parameters.custpage_deploymentid;
                var OAUTH_NONCE = getNonce(32);
                var TIME_STAMP = Math.round(+new Date() / 1000);
                var OAUTH_VERSION = '1.0';
                var SCRIPT_ID = req.parameters.custpage_scriptid;
                var HTTP_METHOD = req.parameters.custpage_httpmethod.toUpperCase();
                var BASE_URL = req.parameters.custpage_restleturl;
                var NETSUITE_ACCOUNT_ID = req.parameters.custpage_account_id;
        
                log.debug({title: 'CONSUMER_KEY', details: CONSUMER_KEY})
                log.debug({title: 'CONSUMER_SECRET', details: CONSUMER_SECRET});
                log.debug({title: 'TOKEN_ID', details: TOKEN_ID});
                log.debug({title: 'TOKEN SECRET', details: TOKEN_SECRET})
                log.debug({title: 'DEPLOYMENT ID ', details: SCRIPT_DEPLOYMENT_ID})
                log.debug({title: 'NONCE', details: OAUTH_NONCE})
                log.debug({title: 'TIME_STAMP', details: TIME_STAMP})
                log.debug({title: 'SCRIPT_ID', details: SCRIPT_ID})
                log.debug({title: 'HTTP_METHOD', details: HTTP_METHOD})
                log.debug({title: 'BASE_URL', details: BASE_URL})
                log.debug({title: 'NETSUITE_ACCOUNT_ID', details: NETSUITE_ACCOUNT_ID})
                generateForm(form);
                var data = '';
                //data = data + 'count=5&';
                data = data + 'deploy=' + SCRIPT_DEPLOYMENT_ID + '&';
                data = data + 'oauth_consumer_key=' + CONSUMER_KEY + '&';
                data = data + 'oauth_nonce=' + OAUTH_NONCE + '&';
                data = data + 'oauth_signature_method=' + 'HMAC-SHA1' + '&';
                data = data + 'oauth_timestamp=' + TIME_STAMP + '&';
                data = data + 'oauth_token=' + TOKEN_ID + '&';
                data = data + 'oauth_version=' + OAUTH_VERSION + '&';
                data = data + 'script=' + SCRIPT_ID;
                
                var encodedData = encodeURIComponent(data);
                var completeData = HTTP_METHOD + '&' + encodeURIComponent(BASE_URL) + '&' + encodedData;
                var hmacsha1Data = enc64.HmacSHA1(completeData, CONSUMER_SECRET + '&' + TOKEN_SECRET);
                var base64EncodedData = enc64.enc.Base64.stringify(hmacsha1Data);
                var oauth_signature = encodeURIComponent(base64EncodedData);
    
                var OAuth = 'OAuth oauth_signature="' + oauth_signature + '",';
                OAuth = OAuth + 'oauth_version="1.0",';
                OAuth = OAuth + 'oauth_nonce="' + OAUTH_NONCE + '",';
                OAuth = OAuth + 'oauth_signature_method="HMAC-SHA1",';
                OAuth = OAuth + 'oauth_consumer_key="' + CONSUMER_KEY + '",';
                OAuth = OAuth + 'oauth_token="' + TOKEN_ID + '",';
                OAuth = OAuth + 'oauth_timestamp="' + TIME_STAMP + '",';
                OAuth = OAuth + 'realm="' + NETSUITE_ACCOUNT_ID + '"';
                form.addField({
                    id: 'custpage_container',
                    label: 'Authorization header',
                    type: serverWidget.FieldType.TEXT
                }).defaultValue = OAuth;
    
    
                req.writePage(form)
            }
          
                function generateForm(form){
                    log.debug({title: 'Function inside form', details:'it was a success'})
                    var consumerkey = form.addField({
                        id: 'custpage_conkey',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Consumer Key'
                    }).isMandatory = true;
        
                    var consumersecret = form.addField({
                        id: 'custpage_consecret',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Consumer secret'
                    }).isMandatory = true;
        
                    var token_id = form.addField({
                        id: 'custpage_tokenid',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Token ID'
                    }).isMandatory = true;
        
                    var token_secret = form.addField({
                        id: 'custpage_tokensecret',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Token  Secret'
                    }).isMandatory = true;
        
                    var script_id = form.addField({
                        id: 'custpage_scriptid',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Script  ID'
                    }).isMandatory = true;
        
                    var deployment_id = form.addField({
                        id: 'custpage_deploymentid',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Deployement ID'
                    }).isMandatory = true;
        
                    var http_method = form.addField({
                        id: 'custpage_httpmethod',
                        type: serverWidget.FieldType.TEXT,
                        label: 'HTTP METHOD'
                    }).isMandatory = true;
                    var restlet_baseUrl = form.addField({
                        id: 'custpage_restleturl',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Restlet Based URL'
                    }).isMandatory = true;
        
                    var account_id = form.addField({
                        id: 'custpage_account_id',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Account Id'
                    }).isMandatory = true;
        
        
                    form.addSubmitButton({
                        label: 'Generate TBA'
                    })
                    
                    scriptContext.response.writePage(form)
                }

        
            }
    
    
        
        
    
        
        

        return {onRequest}

    });
