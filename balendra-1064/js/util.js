// https://htmlcompressor.com/compressor/

function UTIL() {
	/**
	 * Used to handle confirm callback once yes or no button clicked
	 */
	this.confirmCallBack = null ;
	/**
	 * Used to launch a confirm box
	 */
	this.launchConfirmBox = function( message, callback ){
		 
		utilObject.confirmCallBack = callback ;
		
		$('#confirmcontent').html(message);
		$('#myconfirmdialoglink').click();
		document.getElementById("globalconfirmno").focus(); 
 
	}
	/**
	 * Used to hide alert box
	 */
	this.AlertOkClicked = function(){
		$.fancybox.close();
	}
	/**
	 * Method used to pass bool value to the function initiate the confirm box
	 */
	this.confirmedClicked = function(bool){
		$.fancybox.close();
		utilObject.confirmCallBack( bool ) ;
	}
	/**
	 * Method used to populate alert
	 */
	this.showMessage = function(param1, message, param2) {		
		 
		$('#alertcontent').html(message);
	    $('#myalertdialoglink').click();
	    document.getElementById("globalalertok").focus(); 
	}
	
	// return the value of the radio button that is checked
	// return an empty string if none are checked, or
	// there are no radio buttons
	this.getCheckedValue=function(radioObj) {
		if(!radioObj)
			return "";
		var radioLength = radioObj.length;
		if(radioLength == undefined)
			if(radioObj.checked)
				return radioObj.value;
			else
				return "";
		for(var i = 0; i < radioLength; i++) {
			if(radioObj[i].checked) {
				return radioObj[i].value;
				break;
			}
		}
		return "";
	}

	// set the radio button with the given value as being checked
	// do nothing if there are no radio buttons
	// if the given value does not exist, all the radio buttons
	// are reset to unchecked
	this.setCheckedValue = function(radioObj, newValue) {
		 
		if(!radioObj)
			return;
		var radioLength = radioObj.length;
		if(radioLength == undefined) {
			if(radioObj.value == newValue )
				radioObj.checked = true ;
			return;
		}
		for(var i = 0; i < radioLength; i++) {
			radioObj[i].checked = false;
			if(radioObj[i].value == newValue) {
				radioObj[i].checked = true;
			}
		}
	}
	
	var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";
	this.encode64 = function(input) {
		input = escape(input);
		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;

		do {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";
		} while (i < input.length);

		return output;
	}

	this.decode64 = function(input) {
		if (input == '' || input == 'AA==') return '';
		if(input == null || input == undefined)
			return '' ;

		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;

		// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
		var base64test = /[^A-Za-z0-9\+\/\=]/g;
		/*     
					  if (base64test.exec(input)) {
						  alert("There were invalid base64 characters in the input text.\n" +
							  "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
							  "Expect errors in decoding.");
					  }
				  */
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		do {
			enc1 = keyStr.indexOf(input.charAt(i++));
			enc2 = keyStr.indexOf(input.charAt(i++));
			enc3 = keyStr.indexOf(input.charAt(i++));
			enc4 = keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";

		} while (i < input.length);

		return unescape(output);
	}
	this.showBusy = function() {
		this.getDivObject('busyDiv').style.display = '';
	}
	this.hideBusy = function() {
		this.getDivObject('busyDiv').style.display = 'none';
	}
	
	this.getLocation=function(){
		
		var param1 = 'http://freegeoip.net/json/' ;
		$.ajax({
		    crossOrigin: true,
		    url: param1,
		    success: function(data) {
		    	currentResponderLocation = data ;		    	 
		    }
		});
	/*
		var param2 = '' ;
		var param3 = '' ;
		var paramName = param3;
		if (paramName == null) paramName = '';

		//this.showBusy();
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open('GET', param1, true);
		xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
		xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		xmlhttp.setRequestHeader("Content-type", "jsonp");
		
		
		var parameters = '';

		parameters = param2;
		//header('Access-Control-Allow-Origin: *');
		//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
		



		// xmlhttp.setRequestHeader("Content-length", parameters.length);
		// xmlhttp.setRequestHeader("Connection", "close");
		xmlhttp.send(parameters);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					alert('xmlhttp.responseText : ' + xmlhttp.responseText ) ;
					 
				}
			}
			//this.hideBusy();
		}
		*/
	}
	this.sync = function(param1, param2, param3) {
		//param1 is url, param2 is data, param3 is parameter name example syncXml. If null or '', then data is just dumped at the url for example in REST API
		//param4 is callback function to which response data is returned
		var paramName = param3;
		if (paramName == null) paramName = '';

		//this.showBusy();
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open('POST', param1, true);
		var parameters = '';

		parameters = param2;
		xmlhttp.setRequestHeader("Content-type", "text/xml");


		// xmlhttp.setRequestHeader("Content-length", parameters.length);
		// xmlhttp.setRequestHeader("Connection", "close");
		xmlhttp.send(parameters);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					handleResponse(xmlhttp.responseText);
				}
			}
			//this.hideBusy();
		}
	}

	this.switchDisplayDiv = function(newdiv, backimage, homeimage, backaction, param1, param2) {
		$(('#' + currentDiv)).hide();
		currentDiv = newdiv;
		$(('#' + currentDiv)).show();
	}

	this.fillDobDate = function(list, days) {
		utilObject.deleteAllInList(list);
		list.options[list.length] = new Option('Date', '0');
		for (var i = 1; i <= days; i++)
		list.options[list.length] = new Option(i, i);
	}

	this.isValidDob = function(dateofbirth, mesg) {
		if (mesg == null || mesg == '') mesg = ' birth';
		if (utilObject.trim(dateofbirth) == '') {
			window.alert('Enter date of' + mesg);
			return false;
		} else if (dateofbirth.split('-').length < 3) {
			window.alert('Enter valid date of' + mesg);
			return false;
		} else if (isNaN(parseInt(dateofbirth.split('-')[0]))) {
			window.alert('Enter valid year of' + mesg);
			return false;
		} else if (parseInt(dateofbirth.split('-')[0]) < 1900) {
			window.alert('Enter valid year of' + mesg);
			return false;
		} else if (isNaN(parseInt(dateofbirth.split('-')[1]))) {
			window.alert('Enter valid month of' + mesg);
			return false;
		} else if (parseInt(dateofbirth.split('-')[1]) > 12) {
			window.alert('Enter valid month of' + mesg);
			return false;
		} else if (isNaN(parseInt(dateofbirth.split('-')[2]))) {
			window.alert('Enter valid date of' + mesg);
			return false;
		} else if (parseInt(dateofbirth.split('-')[2]) > 31) {
			window.alert('Enter valid date of' + mesg);
			return false;
		} else return true;
	}
	this.resetDobDate = function(formname) {
		var theform = document.forms[formname];
		utilObject.resetDobDateInForm(theform);
	}
	this.resetDobDateInForm = function(theform) {
		var dd = theform.dob_dd;
		var mm = theform.dob_mm;
		var value = mm.options[mm.selectedIndex].value * 1;

		switch (value) {
			// Means jan
			case 1:
				utilObject.fillDobDate(dd, 31);
				break;
			case 2:
				utilObject.fillDobDate(dd, 29);
				break;
			case 3:
				utilObject.fillDobDate(dd, 31);
				break;
			case 4:
				utilObject.fillDobDate(dd, 30);
				break;
			case 5:
				utilObject.fillDobDate(dd, 31);
				break;
			case 6:
				utilObject.fillDobDate(dd, 30);
				break;
			case 7:
				utilObject.fillDobDate(dd, 31);
				break;
			case 8:
				utilObject.fillDobDate(dd, 31);
				break;
			case 9:
				utilObject.fillDobDate(dd, 30);
				break;
			case 10:
				utilObject.fillDobDate(dd, 31);
				break;
			case 11:
				utilObject.fillDobDate(dd, 30);
				break;
			case 12:
				utilObject.fillDobDate(dd, 31);
				break;
		}
	}
	this.resetDOB = function(theform) {
		var dd = theform.dob_dd;
		var yy = theform.dob_yy;
		var mm = theform.dob_mm;

		utilObject.deleteAllInList(dd);
		utilObject.deleteAllInList(yy);

		dd.options[dd.length] = new Option('Date', '0');
		yy.options[yy.length] = new Option('Year', '0');
		//selectValueInList(mm, 'Month');
		mm.selectedIndex = 0;

		var d = new Date();
		var year = d.getFullYear(),
			month = d.getMonth() * 1 + 1,
			date = d.getDate(); //our month starts from 1, JS from 0 

		for (var i = (year + 1); i > (year - 90); i--)
		yy.options[yy.length] = new Option(i, i);

		utilObject.selectValueInList(theform.dob_yy, year);
		utilObject.selectValueInList(theform.dob_mm, month);
		utilObject.resetDobDateInForm(theform);
		utilObject.selectValueInList(theform.dob_dd, date);
	}

	/**
	 * method used to replace special character from a string
	 * @param str
	 * @return
	 */
	this.replaceAll = function(str) {
		var r = removeNL(str);
		r = r.replace(/"/g, "``");
		return r;
	}

	/**
	 * Remove NewLine, CarriageReturn and Tab characters from a String
	 * s  string to be processed
	 * returns new string
	 */
	this.removeNL = function(s) {

		var r = s.replace(/\n/g, "");
		r = r.replace(/\r/g, "");
		r = r.replace(/\t/g, "");
		r = r.replace(/\r\n/g, "");
		r = r.replace(/'/g, "`");
		r = r.replace(/&/g, "&amp;");
		r = r.replace(/</g, "&lt;");
		return r;
	}

	/**
	 * method used to populate questiontype
	 * @param list
	 * @param addany
	 * @param arrays
	 * @return
	 */
	this.populateDropDown = function(list, addany, arrays, type) {
		utilObject.deleteAllInList(list);

		if (arrays != null && arrays.length > 0) {
			var count = arrays.length;
			for (var i = 0; i < count; i++) {

				if (utilObject.trim(arrays[i].name) != '') list.options[list.length] = new Option(arrays[i].name, arrays[i].id);

			}

		}
	}
	/**
	 * method used to populate questiontype
	 * @param list
	 * @param addany
	 * @param arrays
	 * @return
	 */
	this.populateLocationItem = function(list,  arrays ) {
		utilObject.deleteAllInList(list);
		list.options[list.length] = new Option( 'Any' , '-1' );
		if (arrays != null && arrays.length > 0) {
			var count = arrays.length;
			for (var i = 0; i < count; i++) {
				
				if (utilObject.trim(arrays[i].name) != '')
				  list.options[list.length] = new Option( utilObject.decode64( arrays[i].name ), arrays[i].id);
				
			}
			
		}
	}
	
	
	/**
	 * method used to populate questions
	 * @param list
	 * @param addany
	 * @param arrays
	 * @return
	 */
	this.populateQuestions = function(list, addany, arrays, type) {
		utilObject.deleteAllInList(list);
		if (arrays != null && arrays.length > 0) {
			var count = arrays.length;
			list.options[list.length] = new Option('Select a question', '-1');
			for (var i = 0; i < count; i++) {
				list.options[list.length] = new Option(utilObject.decode64(arrays[i].question), arrays[i].id);
			}

		}

	}
	/**
	 * method used to populate businessAdmin
	 * @param list
	 * @param addany
	 * @param arrays
	 * @return
	 */
	this.populateBusinessAdmin = function(list, arrays) {
		utilObject.deleteAllInList(list);
			list.options[list.length] = new Option( 'New admin' , '-1' );
		
		if (arrays != null && arrays.length > 0) {
			var count = arrays.length;
			for (var i = 0; i < count; i++) {
				var b = arrays[i] ;
				var admin = b.admin ;
				var bName = utilObject.decode64( b.name ) + "( " + utilObject.decode64( admin.firstName ) + " " + utilObject.decode64( admin.lastName )  + " )" ;
				list.options[list.length] = new Option( bName , b.id);
			}

		}

	}
	
	/**
	 * method used to populate questions
	 * @param list
	 * @param addany
	 * @param arrays
	 * @return
	 */
	this.populateBusiness = function(list, arrays ) {
		utilObject.deleteAllInList(list);
		if (arrays != null && arrays.length > 0) {
			var count = arrays.length;
			if( count >1 ){
			    list.options[list.length] = new Option('Select business', -1);
			}
			for (var i = 0; i < count; i++) {
				list.options[list.length] = new Option(utilObject.decode64(arrays[i].name), arrays[i].id);
			}

		}

	}
	
	/**
	 * method used to populate user groups
	 * @return
	 */
	this.populateUserGroup = function(list ) {
			utilObject.deleteAllInList(list);
			list.options[list.length] = new Option('User', 3);
			list.options[list.length] = new Option('Manager', 2);
			list.options[list.length] = new Option('Administrator', 1);
		 

	}
	
	this.populateSearchReport = function( object ){
		 var theform = utilObject.getFormObject( 'searchreportform' ) ;
		 var locationList = theform.location ;
		 var itemList = theform.item ;
		 var userList = theform.user ;
		 var surveyList = theform.survey ;
		 utilObject.deleteAllInList(locationList);
		 utilObject.deleteAllInList(itemList);
		 utilObject.deleteAllInList(userList);
		 utilObject.deleteAllInList(surveyList);
		 // Populate location 
		 locationList.options[locationList.length] = new Option('Any', '-1' );
		 itemList.options[itemList.length] = new Option('Any', '-1' );
		 userList.options[userList.length] = new Option('Any', '-1' );
		 surveyList.options[surveyList.length] = new Option('Any', '-1' );
		 if(object.locations != null && object.locations.length > 0){
			 var locations = object.locations ;
			 for(var i=0; i<locations.length; i++ ){
				 locationList.options[locationList.length] = new Option(utilObject.decode64(locations[i].name), locations[i].id);
			 }
		 }
		 // Populate items
		 alert() ;
		 if(object.items != null && object.items.length > 0){
			 var items = object.items ;
			 for(var i=0; i<items.length; i++ ){
				 itemList.options[itemList.length] = new Option(utilObject.decode64(items[i].name), items[i].id);
			 }
		 }
		 // Populate surveys
		 if(object.surveys != null && object.surveys.length > 0){
			 var surveys = object.surveys ;
			 for(var i=0; i<surveys.length; i++ ){
				 surveyList.options[surveyList.length] = new Option(utilObject.decode64(surveys[i].title), surveys[i].id);
			 }
		 }
		 // Populate users
		 if(object.users != null && object.users.length > 0){
			 var users = object.users ;
			 for(var i=0; i<users.length; i++ ){
				 userList.options[userList.length] = new Option( (utilObject.decode64( users[i].firstName )+ ' ' + utilObject.decode64( users[i].lastName ) ), users[i].id);
			 }
		 }
	}
	
	/**
	 * method used to populate choices
	 * @param list
	 * @param addany
	 * @param arrays
	 * @return
	 */
	this.populateChoices = function(list, addany, arrays, type) {
		alert('ARRAY : ' + JSON.stringify( arrays ) ) ;
		utilObject.deleteAllInList(list);
		if (arrays != null && arrays.length > 0) {
			var count = arrays.length;
			for (var i = 0; i < count; i++) {
				list.options[list.length] = new Option(utilObject.decode64(arrays[i].choice), arrays[i].id);
			}

		}

	}

	/**
	 * method used to select values in a list
	 * @param list
	 * @param value
	 * @return
	 */
	this.selectValueInList = function(list, value) {
		for (var i = 0; i < list.options.length; i++) {
			if (list.options[i].value == value) {
				list.selectedIndex = i;
				return;
			}
		}
	}

	/**
	 * Method used to remove blank spaces from either sides of a string
	 * @param sString
	 * @return
	 */
	this.trim = function(sString) {
		try{
			while (sString.substring(0, 1) == ' ') {
				sString = sString.substring(1, sString.length);
			}
			while (sString.substring(sString.length - 1, sString.length) == ' ') {
				sString = sString.substring(0, sString.length - 1);
			}
			return sString;			
		}catch(e){
			return sString ;
		}
	}

	/**
	 * Method used to get node from xml
	 * @param xml
	 * @param nodename
	 * @param parentName
	 * @return
	 */
	this.getNodeValue = function(xml, nodename, parentName) {
		try {
			var value = xml.getElementsByTagName(nodename)[0].firstChild.nodeValue;
			return itaObject.URLDecode(value);
		} catch (e) {
			return "";
		}

	}
	/**
	 * Method used to delete all item present in the list
	 * @param list
	 * @return
	 */
	this.deleteAllInList = function(list) {
		var count = list.options.length;
		for (i = 0; i < count; i++) {
			list.options[0] = null;
		}
		return false;
	}


	this.isValidPositiveInteger = function(input) {
		var RE = /^(0|[1-9][0-9]*)$/
		return (RE.test(input));
	}

	this.isValidDecimal = function(str) {
		var RE = /^(0|[1-9][0-9]*)$/
		return (RE.test(input));
	}

	/**
	 * method used to check isvalid email
	 * @param str
	 * @return
	 */
	this.isValidEmail = function(str) {
		if (utilObject.trim(str) == '') {
			return false;
		}
		var at = "@";
		var dot = ".";
		var lat = str.indexOf(at);
		var lstr = str.length;
		var ldot = str.indexOf(dot);
		if (str.indexOf(at) == -1) {
			return false;
		}

		if (str.indexOf(at) == -1 || str.indexOf(at) == 0 || str.indexOf(at) == lstr) {
			return false;
		}

		if (str.indexOf(dot) == -1 || str.indexOf(dot) == 0 || str.indexOf(dot) == lstr) {
			return false;
		}

		if (str.indexOf(at, (lat + 1)) != -1) {
			return false;
		}

		if (str.substring(lat - 1, lat) == dot || str.substring(lat + 1, lat + 2) == dot) {
			return false;
		}

		if (str.indexOf(dot, (lat + 2)) == -1) {
			return false;
		}

		if (str.indexOf(" ") != -1) {
			return false;
		}
		return true;
	}

	/**
	 * check whether passed string is a valid phone
	 * @param phone
	 * @return
	 */
	this.isValidPhone = function(phone) {
		if (phone != '') {
			if (isNaN(parseFloat(phone))) {
				itaObject.showMessage('Alert', 'Phone number should have digits only', 'Ok');
				return false;
			} else if (phone.charAt(0) == '0') {
				itaObject.showMessage('Alert', 'Phone number should not have leading zeros', 'Ok');
				return false;
			} else return true;
		}
		return true;
	}
	
	/**
	 * Method used to get surveyResponseObject which need to sync
	 */
	this.getSurveyResponseObjectToSync= function( surveyResponse ){
		var object = new Object() ;
		object.id = surveyResponse.id ;
		object.survey = utilObject.getSurveyObject(surveyResponse.survey) // get survey Object
		object.locationId = surveyResponse.locationId ;
		
		object.itemId = surveyResponse.itemId ;
		object.responderId = surveyResponse.responderId ;
		
		// change datetime here
		object.dateTime = surveyResponse.dateTime ;
		
		object.responderLocation = surveyResponse.responderLocation ;
		object.source = surveyResponse.source ;
		object.overallComment = surveyResponse.overallComment ;
		return object ;
	}
	/**
	 * Method used to get survey object
	 */
	this.getSurveyObject = function( survey ){
		var object = new Object();
		object.id = survey.id ;
		object.businessId = survey.businessId ;
		object.sections = utilObject.getSectionObject( survey.sections ) ;
		
		return object ;
	}
	/**
	 * Method used to get sectionObjects
	 */
	this.getSectionObject = function( sections ){
		var objects = new Array();
		if( sections != null && sections.length >0 ){
			for( var i=0; i<sections.length; i++ ){
				var sec = sections[i];
				var o = new Object();
				o.id = sec.id ;
				o.surveyId = sec.surveyId ;
				o.questions = utilObject.getQuestionObject( sec.questions );
				objects[ objects.length ] = o ;
			}
		}
		return objects ;
	}
	/**
	 * Method used to get question objects
	 */
	this.getQuestionObject = function( questions ){
		 
		var objects = new Array();
		if( questions != null && questions.length >0 ){
			for( var i=0; i<questions.length; i++ ){
				var ques = questions[i] ;
				var o = new Object();
				o.id = ques.id ;
				o.sectionId = ques.sectionId ;
				o.type = ques.type ;
				
				if(utilObject.trim(ques.answer) == '' )
					o.answer = utilObject.encode64( ques.answer ) ;
				else
					o.answer = ques.answer  ;
				
				if(utilObject.trim(ques.comment) == '' )
					o.comment = utilObject.encode64( ques.comment ) ;
				else
					o.comment = ques.comment ;
				
				if(utilObject.trim( ques.from ) == '' )
					o.from = utilObject.encode64( ques.from ) ;
				else
					o.from = ques.from ;
				
				if(utilObject.trim( ques.to ) == '' )
					o.to = utilObject.encode64( ques.to ) ;
				else
					o.to = ques.to ;
				 
				o.signature = ques.signature ;
				
				if( utilObject.trim( ques.signatureOf ) == '' )
					o.signatureOf = utilObject.encode64( ques.signatureOf ) ;
				else
					o.signatureOf = ques.signatureOf ;
				
				
				o.surveyResponseId = ques.surveyResponseId ;
				o.questionResponseId = ques.questionResponseId ;
				o.fileAttachment = ques.fileAttachment ;
				o.signatureFile = ques.signatureFile ;
				o.file = ques.file ;
				
				if( ques.choices != null && ques.choices.length > 0 )
					o.choices = utilObject.getChoiceObjects(ques.choices) ;
				
				if( ques.rows != null && ques.rows.length > 0 )
					o.rows = utilObject.getRowObjects( ques.rows ) ;
				
				objects[i] = o ;
			}
		}
		return objects;
	}
	
	/**
	 * Method used to get choice objects
	 */
	this.getChoiceObjects = function( choices ){
		var objects = new Array();
		if( choices != null && choices.length >0 ){
			for( var i=0; i<choices.length; i++ ){
				var c = choices[i] ;
				var o = new Object() ;
				if( c.selected == CHOICE_SELECTED_YES ){
					o.id = c.id ;
					o.questionId = c.questionId ;
					o.columnResponseId = c.columnResponseId ;
					o.questionResponseId = c.questionResponseId ;
					o.choiceResponseId = c.choiceResponseId ;
					o.score = c.score;
					o.rank = c.rank ;		
		 
					objects[ objects.length ] = o ;
				}
			}
		}
		
		return objects ;
	}
	
	/**
	 *  Method to get row objects
	 */
	this.getRowObjects = function( _rows ){
		var rows = new Array() ;
		if( _rows != null && _rows.length > 0 ){
			for( var i=0; i<_rows.length; i++ ){
				var r = new Object() ;
				r.id = _rows[i].id ;
				r.cols = utilObject.getColumnObjects( _rows[i].cols ) ; 
				rows[ rows.length ] = r ;
			}
		}
		return rows ; 	
	}
	/**
	 * Method used to get columnObjects
	 */
	this.getColumnObjects = function( cols ){
		var objects = new Array() ;
		if( cols != null && cols.length > 0 ){
			for(var i=0; i<cols.length; i++ ){
				var o = new Object() ;
				var col = cols[i] ;				
				o.questionResponseId = col.questionResponseId ;
				o.columnResponseId = col.columnResponseId ;
				o.id = col.id ;
				o.rowId = col.rowId ;
				o.parentQuestionId = col.parentQuestionId ;
				o.type = col.type ;
				
				if(utilObject.trim(col.answer) == '' )
					o.answer = utilObject.encode64( col.answer ) ;
				else
					o.answer = col.answer  ;
				
				if(utilObject.trim(col.comment) == '' )
					o.comment = utilObject.encode64( col.comment ) ;
				else
					o.comment = col.comment ;
				
				if(utilObject.trim( col.from ) == '' )
					o.from = utilObject.encode64( col.from ) ;
				else
					o.from = col.from ;
				
				if(utilObject.trim( col.to ) == '' )
					o.to = utilObject.encode64( col.to ) ;
				else
					o.to = col.to ;
				
				o.signature = col.signature ;
				o.signatureOf = col.signatureOf ;
				o.signatureFile = col.signatureFile ;
				if( col.choices != null && col.choices.length >0 )	 
					o.choices = utilObject.getChoiceObjects( col.choices ) ;
				
				objects[ objects.length ] =  o ;
			}				
		}
		return objects ;
	}
	
	
	/**
	 * Method used to reset form
	 * @param theForm
	 * @return
	 */
	this.resetForm = function(formName) {
		document.forms[formName].reset();

	}
	/**
	 * Method used to getDivObject
	 */
	this.getDivObject = function(divName) {
		return document.getElementById(divName);
	}
	/**
	 * Method used to getFormObject
	 */
	this.getFormObject = function(formName) {
		return document.forms[formName];
	}
	
	this.selectedBusiness = function(){
	  var list = document.getElementById('businesses') ;
		  if(list.options.length > 0)
		  {
			  if( list.options[list.selectedIndex].value != '-1' && list.options[list.selectedIndex].value != '' )
			  		return list.options[list.selectedIndex].value ;
			  else
			  		return false ;
		   }
		   else{
		   		return false ;
		   }
	}

}
/**
 *
 */
function getStatusText( status ){
	var statusText = "" ;
		if(status*1 == STATUS_ENABLED )
			statusText = "Enabled" ;
		else
			statusText = "Disabled" ;
	return statusText ;		
}
function getUserTypeText( type ){
	var typeText = "" ;
		if(type*1 == UserAccount_TYPE_SUPER_ADMIN )
			typeText = "Super admin" ;
		else if( type*1 == UserAccount_TYPE_ADMIN )
			typeText = "Administrator" ;
		else if( type*1 == UserAccount_TYPE_MANAGER )
			typeText ="Manager" ;	
		else if( type*1 == UserAccount_TYPE_USER )	
			typeText ="User" ;	
			
	 return typeText ;
}
 
function manageSetting( action ){
             var val = utilObject.selectedBusiness() ;
				if(val == false ){
					if(businessdb.get().length > 0){
						utilObject.showMessage('Alert', 'Select a business' ,'Ok');
					}else{
						utilObject.showMessage('Alert', 'No business found for this user' ,'Ok');
						
					}
					utilObject.hideBusy() ; 
					return;
				}
				else{					  
					 var	settings = settingdb.get({businessId:val}) ;
					 var theform = document.forms['addeditsettingform'];
					 if(settings !=null && settings.length > 0){
					        var lvalue = settingdb.get({businessId:val, key:'locationlabel'}) ;
					        var ivalue = settingdb.get({businessId:val, key:'itemlabel'}) ;
					        var responsesubmissionfromweb = settingdb.get({businessId:val, key:'responsesubmissionfromweb'}) ;
					        var responsesubmissionfrommobile = settingdb.get({businessId:val, key:'responsesubmissionfrommobile'}) ;
					        var enableresponseeditable = settingdb.get({businessId:val, key:'enableresponseeditable'}) ;
					        var sendfullresponseonnotification = settingdb.get({businessId:val, key:'sendfullresponseonnotification'}) ;
					         
	
	
					         
					       if(businessdb.get().length == 1){
							        if(lvalue != null && lvalue.length >0 ){
						        		// change the label and link of location at all places 				
						        		 	        		
						       			$('#locationlabelmainlink1').html( utilObject.decode64(lvalue[0].value) ) ; 
						       			theform.locationlabel.value =  utilObject.decode64(lvalue[0].value)  ;
						        	}
						        	else
						        	{
						        		$('#locationlabelmainlink1').html('Location') ; 
						       			theform.locationlabel.value =  'Location'  ;
						        	}
						        	if(ivalue != null && ivalue.length >0 ){
							           	 
						        		// change the label and link of location at all places 					        		
						       			$('#itemlabelmainlink1').html( utilObject.decode64(ivalue[0].value) ) ; 
						       			theform.itemlabel.value =  utilObject.decode64(ivalue[0].value)  ;					        		
						        	}
						        	else{
						        		$('#itemlabelmainlink1').html( 'Item' ) ; 
						       			theform.itemlabel.value =  'Item'  ;
						        	}
					        		if(responsesubmissionfromweb != null && responsesubmissionfromweb.length >0 ){
					        			if(utilObject.decode64(responsesubmissionfromweb[0].value) * 1 == STATUS_ENABLED )
					        				theform.responsesubmissionfromweb.checked = true ;
					        			else
					        				theform.responsesubmissionfromweb.checked = false ;
					        			
					        		}
					        		else{
					        			theform.responsesubmissionfromweb.checked = false ;
					        		}
					        		if(responsesubmissionfrommobile != null && responsesubmissionfrommobile.length >0 ){
					        			if(utilObject.decode64(responsesubmissionfrommobile[0].value) * 1 == STATUS_ENABLED )
					        				theform.responsesubmissionfrommobile.checked = true ;
					        			else
					        				theform.responsesubmissionfrommobile.checked = false ;
					        			
					        		}
					        		else{
					        			theform.responsesubmissionfrommobile.checked = false ;
					        		}
					        		
					        		if(enableresponseeditable != null && enableresponseeditable.length >0 ){
					        	 
					        			if(utilObject.decode64(enableresponseeditable[0].value) * 1 == STATUS_ENABLED )
					        				theform.enableresponseeditable.checked = true ;
					        			else
					        				theform.enableresponseeditable.checked = false ;
					        			
					        		}
					        		else{
					        			theform.enableresponseeditable.checked = false ;
					        		}
					        		
					        		if(sendfullresponseonnotification != null && sendfullresponseonnotification.length >0 ){
					        		 
					        			if(utilObject.decode64(sendfullresponseonnotification[0].value) * 1 == STATUS_ENABLED )
					        				theform.sendfullresponseonnotification.checked = true ;
					        			else
					        				theform.sendfullresponseonnotification.checked = false ;
					        			
					        		}
					        		else{
					        			theform.sendfullresponseonnotification.checked = false ;
					        		}
					        	
					        }
					        else{ // means there more than 1 business
					        	//*************MOre THAN 1 business
					        	   if(lvalue != null && lvalue.length >0 ){
						        		// change the label and link of location at all places 				
						        		 
						       			theform.locationlabel.value =  utilObject.decode64(lvalue[0].value)  ;
						        	}
						        	else
						        	{
						       			theform.locationlabel.value =  'Location'  ;
						        	}
						        	if(ivalue != null && ivalue.length >0 ){
						       			theform.itemlabel.value =  utilObject.decode64(ivalue[0].value)  ;					        		
						        	}
						        	else{
						       			theform.itemlabel.value =  'Item'  ;
						        	}
					        		if(responsesubmissionfromweb != null && responsesubmissionfromweb.length >0 ){
					        			if(utilObject.decode64(responsesubmissionfromweb[0].value) * 1 == STATUS_ENABLED )
					        				theform.responsesubmissionfromweb.checked = true ;
					        			else
					        				theform.responsesubmissionfromweb.checked = false ;
					        			
					        		}
					        		else{
					        			theform.responsesubmissionfromweb.checked = false ;
					        		}
					        		if(responsesubmissionfrommobile != null && responsesubmissionfrommobile.length >0 ){
					        			if(utilObject.decode64(responsesubmissionfrommobile[0].value) * 1 == STATUS_ENABLED )
					        				theform.responsesubmissionfrommobile.checked = true ;
					        			else
					        				theform.responsesubmissionfrommobile.checked = false ;
					        			
					        		}
					        		else{
					        			theform.responsesubmissionfrommobile.checked = false ;
					        		}
					        		
					        		if(enableresponseeditable != null && enableresponseeditable.length >0 ){
					        			if(utilObject.decode64(enableresponseeditable[0].value) * 1 == STATUS_ENABLED )
					        				theform.enableresponseeditable.checked = true ;
					        			else
					        				theform.enableresponseeditable.checked = false ;
					        			
					        		}
					        		else{
					        			theform.enableresponseeditable.checked = false ;
					        		}
					        		
					        		if(sendfullresponseonnotification != null && sendfullresponseonnotification.length >0 ){
					        			if(utilObject.decode64(sendfullresponseonnotification[0].value) * 1 == STATUS_ENABLED )
					        				theform.sendfullresponseonnotification.checked = true ;
					        			else
					        				theform.sendfullresponseonnotification.checked = false ;
					        			
					        		}
					        		else{
					        			theform.sendfullresponseonnotification.checked = false ;
					        		}
					        }
					 }
					 else{ // No setting found
						 	theform.locationlabel.value = 'Location' ;
						 	theform.itemlabel.value = 'Item' ;
						 	theform.responsesubmissionfromweb.checked = false ;
						 	theform.responsesubmissionfrommobile.checked = true ;
						 	// theform.responsetoauthenticatedusersonly.checked = true ;
						 	theform.enableresponseeditable.checked = false ;
						 	theform.sendfullresponseonnotification.checked = false ;
					 }
				}
				
		utilObject.hideBusy();		
		if(action == 'getsettings'){
		   doSurveyAction('editsetting');
		}


}


