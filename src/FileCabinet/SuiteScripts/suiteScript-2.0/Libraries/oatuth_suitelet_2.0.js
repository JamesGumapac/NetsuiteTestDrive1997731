/**
 *@NApiVersion 2.0
 *@NScriptType Suitelet
 */
define(['./crypto-js', 'N/https', './oauth-1.0a'], function (crypto, https, oauth) {
	function onRequest(context) {
		var remoteAccountID = 'TSTDRV1997731';
		var restletUrl ='https://TSTDRV1997731.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=168&deploy=2';

		var token = {
			key: '66aa082d1b61b4bd07da49b5581c96c1b370648cd0a33397581eb7ae07b671b5',
			secret: '698e05fe236ed491eae7da58a29371d2050018737f89322d20729b4814d3a0cf'
		};

		var oauth = OAuth({
			consumer: {
				key: '447caa0b19db00898c653889bbfeaaada2de26721528572ecb3272265c8ebdb9', //Manage Integrations
				secret: 'bb97956d88fb9dd162acd365d206695f0490083be48c6ddad99cad5159a3e6bd' //Manage Integrations
			},
			signature_method: 'HMAC-SHA1',
			hash_function: function (base_string, key) {
				return crypto.HmacSHA1(base_string, key).toString(crypto.enc.Base64);
			}
		});

		var HTTP_METHOD = 'GET';

		var request_data = {
			url: restletUrl,
			method: HTTP_METHOD,
			data: {}
		};

		var oauth_data = {
			oauth_consumer_key: oauth.consumer.key,
			oauth_nonce: oauth.getNonce(),
			oauth_signature_method: oauth.signature_method,
			oauth_timestamp: oauth.getTimeStamp(),
			oauth_version: '1.0',
			oauth_token: token.key
		};

		//Generating the Header
		var headerWithRealm = oauth.toHeader(oauth.authorize(request_data, token));
		headerWithRealm.Authorization += ', realm="' + remoteAccountID + '"';

		//Setting up Headers
		var headers = {
			'User-Agent': 'Suitelet_using_TBA',
			Authorization: headerWithRealm.Authorization,
			'Content-Type': 'application/json'
		};

		var JSONTextHeaders = JSON.stringify(headers);
		var restResponse = https.get({ url: restletUrl, headers: headers });
		var html =
			'<html><body>' +
			'Calling: ' +
			restletUrl +
			'<br><br>' +
			'Generated OAuth header:<br>' +
			headerWithRealm.Authorization +
			'<br><br>' +
			'Full header stack:<br>' +
			JSONTextHeaders +
			'<br><br>' +
			'Response:<br>' +
			restResponse.body +
			'</body></html>';
		context.response.write(html);
	}
  
 return {
            onRequest: onRequest
        };
});
