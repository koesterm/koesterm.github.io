var scopes = 'https://spreadsheets.google.com/feeds';
var clientId = '709292561497-l889002bdhb28rsbu1gi4j99r1rvhaa0.apps.googleusercontent.com';
var apiKey = 'AIzaSyDix-PcT_EUN-kVGfLctLzRKtHITqSmvZg';

function handleClientLoad() {
    console.log('inside handleClientLoad function');
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth,1);
}

function checkAuth() {
    console.log('inside checkAuth function');
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
    console.log('finished checkAuth function');
}

function handleAuthResult(authResult) {
    console.log('inside handleAuthResult function');
    console.log(gapi.auth.getToken());

    if (authResult && !authResult.error) {
        //Access token has been successfully retrieved, requests can be sent to the API.
        loadClient();
    } else {
        //No access token could be retrieved, show the button to start the authorization flow
         gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    }
}

function loadClient() {
    console.log('inside loadClient function');
    var token = gapi.auth.getToken().access_token;
    var urlLocation = '1wrTuRSXhuzu50ozWG5RcTeolnGe3GCnCCYtvpLoTGP0'; //Get this from the URL of your Spreadsheet in the normal interface for Google Drive.

    //This gives a spitout of ALL spreadsheets that the user has access to.
    var url = 'http://spreadsheets.google.com/feeds/spreadsheets/private/full?access_token=' + token;
console.log(url);
    //This gives a list of all worksheets inside the Spreadsheet, does not give actual data
    var url = 'http://spreadsheets.google.com/feeds/worksheets/' + urlLocation + '/private/full?access_token=' + token;
console.log(url);
    //This gives the data in a list view - change the word list to cells to work from a cell view and see https://developers.google.com/google-apps/spreadsheets/#working_with_cell-based_feeds for details
    var url = 'http://spreadsheets.google.com/feeds/cells/' + urlLocation + '/1/private/full?access_token=' + token;
console.log(url);
    $.get(url, function(data) {	
		console.log(data);
		
    });
}

// Something to look at maybe.
	// $.ajax({
           // type: 'GET',
           // url: url,
           // processData: true,
           // data: {},
           // dataType: "json",
           // success: function (data) {
               // processData(data);
           // }
	// });
	  // function processData(data){
			// $.getJSON(url,function(data){
			// processData(data);});	
	// }
	






  // var clientId = '709292561497-l889002bdhb28rsbu1gi4j99r1rvhaa0.apps.googleusercontent.com';
  // var developerKey = 'AIzaSyDix-PcT_EUN-kVGfLctLzRKtHITqSmvZg';
  // var accessToken;
  // function onApiLoad() {
  //   gapi.load('auth', authenticateWithGoogle);
  //   gapi.load('picker');
  // }
  // function authenticateWithGoogle() {
  //   window.gapi.auth.authorize({
  //     'client_id': clientId,
  //     'scope': ['https://www.googleapis.com/auth/drive']
  //   }, handleAuthentication);
  // }
  // function handleAuthentication(result) {
  //   if(result && !result.error) {
  //     accessToken = result.access_token;
  //     setupPicker();
  //   }
  // }
  // function setupPicker() {
  //   var picker = new google.picker.PickerBuilder()
  //     .setOAuthToken(accessToken)
  //     .setDeveloperKey(developerKey)
  //     .setOrigin(window.location.protocol + '//' + window.location.host)
  //     .addView(new google.picker.DocsUploadView())
  //     .addView(new google.picker.DocsView())
  //     .setCallback(myCallback)
  //     .build();
  //   picker.setVisible(true);
  // }
  // function myCallback(data) {
  //   if (data.action == google.picker.Action.PICKED) {
  //     alert(data.docs[0].name);
  //   }
  // }