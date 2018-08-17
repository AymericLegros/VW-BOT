import got from 'got'

var headers = {
    'Client-ID': '84uhxmpq4njivwxnp76iiq8jthosxz',
    'Content-Type': 'application/json'
};

var dataString = {
    "hub.callback":"https://yourwebsite.com/path/to/callback/handler", 
    "hub.mode":"subscribe",
    "hub.topic":"https://api.twitch.tv/helix/streams?user_id=5678",
};

var options = {
    method: 'POST',
    headers: headers,
    body: dataString,
    json: true
};

(async () => {
	try {
		const response = await got('https://api.twitch.tv/helix/webhooks/hub', options);
		console.log( response );
        console.log('Success')
		//=> '<!doctype html> ...'
	} catch (error) {
		console.log(error);
        console.log('Error')
		//=> 'Internal server error ...'
	}
})();