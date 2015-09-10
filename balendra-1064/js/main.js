function doSurveyAction(action, param1, param2, param3 ){
 alert( 'Balendra: ' + action ) ;
		if( action == ACTION_REGISTER_BUSINESS_OK ){
			handleRequest(ACTION_REGISTER_BUSINESS_OK, 'homepage', param1 );
		}
		else if( action == 'getresponsebyid' ){
			alert(' getresponsebyid ');
			alert('getresponsebyid param1 : ' + param1 + ' param2: ' + param2) ;
			handleRequest(ACTION_GET_SURVEY_RESPONSE_BY_ID, 'homepage', param1, param2 );
		}
		else if(action == 'exportresponsetoxls' ){
			 var theform = utilObject.getFormObject('searchreportform') ; 
			 var surveyId = theform.survey.value;
			 var locationId = theform.location.value;
			 var itemId = theform.item.value;
			 var userId = theform.user.value;
			 var source = theform.source.value;
			 var type = theform.type.value ;
			 var startDate = theform.startdate.value ;
			 var endDate = theform.enddate.value ;
			 var sss = new SearchReport();
			 sss.surveyId = surveyId ;
			 sss.businessId = utilObject.selectedBusiness() ; 
			 sss.itemId = itemId ;
			 sss.locationId = locationId ;
			 sss.userId = userId ;
			 sss.source = source ;
			 sss.type = type ;
			 sss.startDate =  formatDate(getUTCDateFromDate(getDateFromFormat(startDate, SURVEY_SHORT_DATE_TIME_FORMAT )), SURVEY_DATE_TIME_FORMAT ); 
			 sss.endDate =   formatDate(getUTCDateFromDate(getDateFromFormat(endDate, SURVEY_SHORT_DATE_TIME_FORMAT )), SURVEY_DATE_TIME_FORMAT );
			 handleRequest( 'exportresponsetoxls', 'homepage', sss );
			 
		}
		else if(action == 'exportresponsebyid'){
			 var sss = new SearchReport();
			 sss.surveyId = param2 ;
			 sss.responseId = param1 ;
			 handleRequest( 'exportresponsetoxls', 'homepage', sss );
		}
		else if( action == 'editsurveyresponse' ){
			alert(' edit survey response param1 : ' + param1 + ' param2: ' + param2) ;
		}
		else if(action == 'showresponsesearchpage' ){
			utilObject.switchDisplayDiv( 'searchreportdiv' );
		}
		else if(action == 'share'){
			utilObject.getDivObject('sharesurveytitlelink').innerHTML ='<strong>'+ utilObject.decode64(surveydb.get({id:param1})[0].title)+ '</strong>';
			var theform = utilObject.getFormObject('addsharemainform') ;
			theform.surveyid.value = param1 ;
			utilObject.switchDisplayDiv( 'sharemaindiv' );
			
		}
		else if( action == 'reports' ){
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
				$("#dtBox").DateTimePicker({			
					dateTimeFormat: "yyyy-MM-dd hh:mm:ss",
					dateFormat: "yyyy-MM-dd",
					timeFormat: "hh:mm",
					animationDuration: 100
				});
				handleRequest(ACTION_GET_SEARCH_REPORT, 'homepage' );
				utilObject.switchDisplayDiv( 'searchreportdiv' );
			}
			
		}
		else if(action == ACTION_GET_SURVEY_RESPONSES){
			handleRequest(ACTION_GET_SURVEY_RESPONSES, 'homepage', param1 );
		}
		else if(action == 'handleshare' ){
			//alert('action : ' + action + ' value: ' + param1  ) ;
			 $('#twittercontainer').hide() ;
			 $('#facebookcontainer').hide() ;
			 $('#sharetextareacontainer').hide() ;
			var theform = utilObject.getFormObject('addsharemainform') ;
			var url = serverUrl + '/submitresponse.jsp?surveyId=' + theform.surveyid.value + '&source=' +param1 ;
			if(param1 == 'iframe' ){
				var strVar="";				
				$('#sharetextareacontainer').show() ;
				// theform.surveyid.value = param1 ;
				alert('serverUrl : ' + serverUrl )
				// var url = serverUrl + '/submitresponse.jsp?surveyId=' + theform.surveyid.value + '&source=' +param1 ;
				strVar = '<iframe src="' + url + '" frameborder="0" width="700" height="500" style="overflow:hidden"></iframe>' ;
				alert('strVar : ' + strVar ) ;
				document.getElementById('sharetextarea').value = strVar ;
				
			}
			else if(param1 == 'popup' ){
				 $('#sharetextareacontainer').show() ; 
				// var theform = utilObject.getFormObject('addsharemainform') ;
				// var url = serverUrl + '/submitresponse.jsp?surveyId=' + theform.surveyid.value + '&source=' +param1 ;
				 
				var html = '<script type="text/javascript">' ;
				html += 'var sg_div = document.createElement("div");' ;
				html += 'sg_div.innerHTML = ' + "'" + '<h1>You have been selected for a survey</h1><p>We appreciate your feedback!</p><p><a href="' + url +'">Please click here start it now.</a> </p>' ;

				html += '<a href="#" onclick="document.getElementById("sg-popup").style.display = "none";return false;">No, thank you.</a>'+ "'" + ';' ;
				html += 'sg_div.id = "sg-popup";sg_div.style.position = "absolute";sg_div.style.width = "500px";sg_div.style.top = "100px";sg_div.style.left = "400px";sg_div.style.backgroundColor = "#ffffff";sg_div.style.borderColor = "#000000";sg_div.style.borderStyle = "solid";sg_div.style.padding = "20px";sg_div.style.fontSize = "16px";' ;
				html += 'document.body.appendChild(sg_div);' + '</\script>' ;
				document.getElementById('sharetextarea').value = html ;
			}
			else if(param1 == 'twitter'){
				 alert( 'inside twitter' ) ;
				// $('#choiceFilePicker').hide() ;
				 $('#twittercontainer').show() ;
				 try{
					 $('#twittersharelink').empty(); 
					 
				 }catch(e){}
				 var link = document.createElement('a');
				 link.setAttribute('id', 'tweetuniqueid');
				 link.setAttribute('href', 'https://twitter.com/share');
				 link.setAttribute('class', 'twitter-share-button'); 
				 link.setAttribute('style', 'margin-top:5px;');
				// link.setAttribute("data-text" , "I just achieved a score of " + 20 + " on #2048Lagos a game where you find transport methods in lagos and score high." );
				 var str = "" ;
				 str += url ;
				 link.setAttribute("data-text" , str );

				 link.setAttribute("data-via" ,"balendra4u") ; 
				 link.setAttribute("data-size" ,"large") ; 
				 link.setAttribute("data-related" ,"apnasurvey") ; 
				 link.setAttribute("data-hashtags" ,"apnasurvey") ; 
				  
				 document.getElementById('twittersharelink').appendChild(link);
				 try{
					twttr.widgets.load();
				 }catch(e){}
				 
			}
			else if( param1 == 'facebook'){
				  var href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url)  ;
				// var href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent('http://sevamob.com/gaon/mobile/index.jsp?device=tandroid')  ;
				
				var html ='<a href="' + href + '" data-title="">Share</a>' ;
				$('#facebookcontainer').html( html ) ; 
				$('#facebookcontainer').show() ;
				
			}
			
		}
		else if( action == ACTION_ADD_DISPLAY_SETTING_OK ){
			
		}
		else if(action == ACTION_ADD_DISPLAY_SETTING_OK){
			handleRequest(ACTION_ADD_DISPLAY_SETTING_OK, 'homepage', param1 );
		}
		else if( action == ACTION_GET_SURVEY_AUTHORIZATION_SURVEY ){
			alert('Inside doSurveyAction : ' + action ) ;
			handleRequest(ACTION_GET_SURVEY_AUTHORIZATION_SURVEY, 'homepage', param1 );
		}
		else if(action == ACTION_GET_SURVEY_AUTHORIZATION_USER ){
			var theform = utilObject.getFormObject('addedituserauthorizationform') ;
			theform.userid.value = param1 ;
			handleRequest(ACTION_GET_SURVEY_AUTHORIZATION_USER, 'homepage', param1 );
		}
		else if(action == ACTION_ADD_EDIT_SURVEY_AUTHORIZATION_OK_USER ){
			handleRequest(ACTION_ADD_EDIT_SURVEY_AUTHORIZATION_OK_USER, 'homepage', param1 );
		}
		else if(action == ACTION_ADD_EDIT_SURVEY_AUTHORIZATION_OK_SURVEY ){
			handleRequest(ACTION_ADD_EDIT_SURVEY_AUTHORIZATION_OK_SURVEY, 'homepage', param1 );
		}
		else if(action == ACTION_PREVIEW_A_QUESTION ){
		 		showHtml(ACTION_PREVIEW_A_QUESTION, param1 ) ;
		}
		else if(action == 'adduser' ){
			var theform = utilObject.getFormObject('addedituserform') ;
			theform.reset() ;
			var list = theform.groups ;			 
			utilObject.populateUserGroup( list) 	
			utilObject.switchDisplayDiv( 'addedituserdiv' );
		}
		else if( action == ACTION_CHANGE_LOCATION_STATUS ){
			var message = 'You are about to change status of this filter criteria. Do you want to proceed ?' ;
 			utilObject.launchConfirmBox(message, function(val){
 				if(val == 'true'){ 					 
 					handleRequest(ACTION_CHANGE_LOCATION_STATUS, 'homepage', param1 );
 				}
 			} );		
			
		}
		else if( action == ACTION_CHANGE_ITEM_STATUS ){
			var message = 'You are about to change status of this filter criteria. Do you want to proceed ?' ;
 			utilObject.launchConfirmBox(message, function(val){
 				if(val == 'true'){ 					 
 					handleRequest(ACTION_CHANGE_ITEM_STATUS, 'homepage', param1 );
 				}
 			} );		
		}
		else if(action == ACTION_ADD_EDIT_DISPLAY_SETTING){
			var theform = utilObject.getFormObject('addeditdisplaysettingform') ;	
			utilObject.getDivObject('displaysettingsurveytitlelink').innerHTML ='<strong>'+ utilObject.decode64(surveydb.get({id:param1})[0].title)+ '</strong>';
			theform.surveyid.value = param1 ;
			var setting = surveydb.get({id:param1})[0].displaySetting;
			utilObject.setCheckedValue( theform.surveytitle, setting.surveyTitle ) ;
			utilObject.setCheckedValue( theform.sectiontitle, setting.sectionTitle ) ;
			utilObject.setCheckedValue( theform.displaystyle, setting.displayStyle ) ;
			utilObject.setCheckedValue( theform.responsecount, setting.responseCount ) ;
			
			theform.next.value = utilObject.decode64(setting.next)
			theform.previous.value = utilObject.decode64(setting.previous)
			theform.finish.value = utilObject.decode64(setting.finish)
			utilObject.switchDisplayDiv( 'addeditdisplaysettingdiv' );
		}
		else if( action == 'addusercancel' ){
			utilObject.switchDisplayDiv( 'usersmaindiv' );
		}
		else if( action == 'addbusinesscancel' ){
			utilObject.switchDisplayDiv( 'businessmaindiv' );
		}
		else if(action == ACTION_CHANGE_ACCOUNT_STATUS ){
			handleRequest(ACTION_CHANGE_ACCOUNT_STATUS, 'homepage', param1 );
		}
		else if(action == ACTION_EDIT_USER_ACCOUNT ){
			var u = userdb.get({id:param1})[0] ;
			
			var theform = utilObject.getFormObject('addedituserform') ;			
			theform.reset() ;
			theform.userid.value = u.id ;
			alert( theform.userid.value + " : id : " + u.id ) ;
			theform.firstname.value = utilObject.decode64(u.firstName) ;
			theform.lastname.value = utilObject.decode64(u.lastName) ;
			theform.loginname.value = utilObject.decode64(u.loginName) ;
			theform.password.value = utilObject.decode64(u.password) ;
			theform.email.value = utilObject.decode64(u.email)
			theform.phone.value = utilObject.decode64(u.phone)
			
			var list = theform.groups ;			 
			utilObject.populateUserGroup( list) 	
			utilObject.selectValueInList(list, u.type);
			utilObject.switchDisplayDiv( 'addedituserdiv' );
		}
		else if( action == ACTION_ADD_EDIT_USER_ACCOUNT_OK ){		
			handleRequest( ACTION_ADD_EDIT_USER_ACCOUNT_OK, 'homepage', param1 );
		}
		else if( action == 'showbusiness' ){
			showHtml( 'showbusiness' ) ;
		}		
		else if(action == 'getsettings' ){
			handleRequest( action , 'homepage' );	
		}
		else if( action == ACTION_GET_USERS_BY_BUSINESS ){		
			alert( 'Inside getusersbybusiness' ) ;
			handleRequest( ACTION_GET_USERS_BY_BUSINESS , 'homepage' );	
			
		} 
		else if( action == 'groups' ){
			handleRequest(ACTION_GET_GROUP_AUTHORIZATION, 'homepage' );
		}
		else if( action == ACTION_ADD_BUSINESS_OK ){
			 
			handleRequest(action, 'homepage', param1);
		}
		else if( action == ACTION_ADD_EDIT_GROUP_AUTHORIZATION_OK ) {
			handleRequest(action, 'homepage', param1) ;
		}
		else if( action == ACTION_LOGIN_OK){
			handleRequest(ACTION_LOGIN_OK, 'homepage');
		}
		else if( action == ACTION_CHANGE_BUSINESS_STATUS ){
 	 
			handleRequest( ACTION_CHANGE_BUSINESS_STATUS, 'homepage', param1, param2 );
		}
		else if(action == 'addbusiness' ){
			var theform = utilObject.getFormObject('addeditbusinessform') ;
			theform.reset() ;
			var list = theform.businessadmin ;
			var businesses = businessdb.get() ;
			utilObject.populateBusinessAdmin( list, businesses ) 
	
			utilObject.switchDisplayDiv( 'addeditbusinessdiv' );
		}		
		else if( action == 'editbusiness' ){
			businessId = param1 ;
			alert( ' businessId : ' + businessId ) ;
			
			var theform = utilObject.getFormObject('addeditbusinessform') ;
			theform.reset() ;
			var business = businessdb.get({id:businessId})[0] ;
			theform.businessid.value = businessId ;
			theform.name.value =  utilObject.decode64( business.name ) ;
			theform.address.value =  utilObject.decode64( business.address ) ; 
			
			utilObject.selectValueInList( theform.country, utilObject.decode64( business.country ) ) ;
			theform.state.value = utilObject.decode64(business.state) ;
			theform.city.value = utilObject.decode64(business.city) ;
			theform.city.value = utilObject.decode64(business.city) ;
			theform.zipcode.value = utilObject.decode64(business.zipcode) ;
			theform.email.value = utilObject.decode64(business.email) ;
			theform.phone.value = utilObject.decode64(business.phone) ;
			// populate & set business admin
			var list = theform.businessadmin ;
			
			utilObject.populateBusinessAdmin( list, businessdb.get() ) ;
			utilObject.selectValueInList( list, business.admin.id  ) ;
			doSurveyAction('businessadminchange') ;
			// hide admin container
			$('#admincontainer').hide() ;
			utilObject.switchDisplayDiv( 'addeditbusinessdiv' );
			
		}
		else if(action == 'businessadminchange' ){
			var theform = utilObject.getFormObject('addeditbusinessform') ;
			
			if(theform.businessadmin.value == '-1'){
				 theform.firstname.required = true ;
				 theform.lastname.required = true ;				 
				 theform.loginname.required = true ;				 
				 theform.password.required = true ;
				 theform.confirmpassword.required = true ;
				 // theform.phone.required = true ;				 
				// theform.email.required = true ;
				 
				$('#admincontainer').show() ;			
				 
			}else{
			 	 theform.firstname.required = false ;
				 theform.lastname.required = false ;				 
				 theform.loginname.required = false ;				 
				 theform.password.required = false ;
				 theform.confirmpassword.required = false ;
				// theform.phone.required = false ;				 
				// theform.email.required = false ;
				$('#admincontainer').hide() ;
				
			}
		}		 
		else if(action == 'registerbusiness' ){
			var theform = utilObject.getFormObject('regitserbusinessform') ;
			theform.reset() ;
			utilObject.switchDisplayDiv('registerbusinessdiv', backimage, '', 'homepage');
		}
		else if( action == 'showbusiness' ){
		    showHtml(action )
			alert('show businesses :' + businessdb.get().length ) ;
		}
		else if( action == 'handlebusinesschange' ){
			// alert( 'See what things need to change on business change' ) ;
			  locationdb = TAFFY([]) ;  
			  surveydb = TAFFY([]) ; 
			  sectiondb = TAFFY([]) ; 
			  questiondb = TAFFY([]) ; 
			  tempquestiondb = TAFFY([]) ; 
			  
			  // var userdb = TAFFY([]) ;
			  itemdb = TAFFY([]) ;
			  settingdb = TAFFY([]);
			// delete all db 
			// call method to get businesses
			doSurveyAction( ACTION_GETSURVEYS ) ;
			
		}
		else if(action == 'showsurvey'){
			utilObject.switchDisplayDiv('surveydiv');
		}
		else if(action == 'login'){
			utilObject.switchDisplayDiv('logindiv');
		}
		else if(action == 'showsection'){
			utilObject.switchDisplayDiv('sectiondiv');
		}
		else if(action == 'registerbusinesscancel' ){
			utilObject.switchDisplayDiv('logindiv', backimage, '', 'homepage');
		}
		else if(action == 'homepage' ){
			 
			utilObject.switchDisplayDiv('homediv');
		}
		else if(action == ACTION_GETLOCATIONS ){
		    handleRequest(ACTION_GETLOCATIONS, 'homepage');
		}
		else if(action == ACTION_GETITEMS ){
		    handleRequest(action, 'homepage');
		}
		else if( action == 'addlocation' ){
			var theform = utilObject.getFormObject('addeditlocationform') ;
			theform.reset() ;
			theform.id.value = -1 ;
			utilObject.switchDisplayDiv('addeditlocationdiv', backimage, '', 'homepage');
		}
		else if( action == 'additem' ){
			var theform = utilObject.getFormObject('addedititemform') ;
			theform.reset() ;
			theform.id.value = -1 ;
			utilObject.switchDisplayDiv('addedititemdiv', backimage, '', 'homepage');
		}
		else if( action == 'editlocation' ){
		    var theform = utilObject.getFormObject('addeditlocationform') ;
			theform.reset() ;
			theform.id.value = param1 ;
			// now set the form fields
			l = locationdb.get({id:param1})[0];
			theform.name.value = utilObject.decode64( l.name ) ;
			theform.description.value = utilObject.decode64( l.description );
			theform.email.value = utilObject.decode64( l.email );
			theform.phone.value =utilObject.decode64( l.phone ) ;
			utilObject.switchDisplayDiv('addeditlocationdiv', backimage, '', 'homepage');
		}
		else if( action == 'edititem' ){
		    var theform = utilObject.getFormObject('addedititemform') ;
			theform.reset() ;
			theform.id.value = param1 ;
			// now set the form fields
			l = itemdb.get({id:param1})[0];
			theform.name.value = utilObject.decode64( l.name ) ;
			theform.description.value = utilObject.decode64( l.description );
			 
			utilObject.switchDisplayDiv('addedititemdiv', backimage, '', 'homepage');
		}
		else if( action == ACTION_ADD_LOCATION_OK ){
			handleRequest(ACTION_ADD_LOCATION_OK, 'homepage');
		}
		else if( action == 'addlocationcancel' ){
			utilObject.switchDisplayDiv('locationdiv', '', '', 'homepage');
		}
		else if( action == 'additemcancel' ){
			utilObject.switchDisplayDiv('itemdiv', '', '', 'homepage');
		}
		else if( action == 'addsettingcancel' ){
			utilObject.switchDisplayDiv('itemdiv', '', '', 'homepage');
		}
		else if( action == 'editsetting' ){
			utilObject.switchDisplayDiv('addeditsettingdiv', '', '', 'homepage');
		}
		else if(action == ACTION_GETSURVEYS ){
		    handleRequest(ACTION_GETSURVEYS, 'homepage');
		}
		else if(action == ACTION_ADD_SETTING_OK ){
		    handleRequest(ACTION_ADD_SETTING_OK, 'homepage', param1);
		}
		else if( action == 'addsurvey' ){
			var theform = utilObject.getFormObject('addeditsurveyform') ;
			theform.id.value = -1 ;
			theform.reset() ;
			utilObject.switchDisplayDiv('addeditsurveydiv', backimage, '', 'homepage');
		}
		else if( action == 'editsurvey' ){
		    var theform = utilObject.getFormObject('addeditsurveyform') ;
			theform.reset() ;
			// now set the form fields
			 
			var l = surveydb.get({id:param1})[0];
			theform.id.value = param1 ;
			theform.title.value = utilObject.decode64( l.title ) ;
			theform.description.value = utilObject.decode64( l.description );
			theform.instruction.value = utilObject.decode64( l.instruction );
			theform.welcomemessage.value = utilObject.decode64( l.welcomeMessage );
			theform.thankyoumessage.value = utilObject.decode64( l.thankyouMessage );
			 
			if(l.startDate != '' )
				theform.startdate.value = formatDate( getDateFromUTCDate(getDateFromFormat( l.startDate , SURVEY_DATE_TIME_FORMAT )), SURVEY_SHORT_DATE_TIME_FORMAT ) ;
			else
				theform.startdate.value = '' ;
			if(l.endDate != '' )
				theform.enddate.value = formatDate( getDateFromUTCDate(getDateFromFormat( l.endDate , SURVEY_DATE_TIME_FORMAT )), SURVEY_SHORT_DATE_TIME_FORMAT ) ;
			else
				theform.enddate.value = '' ;
			 
			utilObject.switchDisplayDiv('addeditsurveydiv', backimage, '', 'homepage');
		}
		else if( action == ACTION_ADD_SURVEY_OK ){
			handleRequest(action, 'homepage');
		}
		else if( action == 'addsurveycancel' ){
			utilObject.switchDisplayDiv('surveydiv', '', '', 'homepage');
		}	
		else if(action == ACTION_MAKE_A_SURVEY_COPY){
			var message = 'You are about to make a copy of this survey, its sections & questions if any. Do you want to proceed ?' ;
 			utilObject.launchConfirmBox(message, function(val){
 				if(val == 'true'){ 					 
 					handleRequest(action, 'homepage', param1 );
 				}
 			} );
			
		}	
		else if(action == ACTION_GETSECTIONS ){
			selectedSurveyId = param1;
			utilObject.getDivObject('surveytitlelabel').innerHTML ='<strong>'+ utilObject.decode64(surveydb.get({id:selectedSurveyId})[0].title)+ '</strong>';
		    handleRequest(action, 'homepage');
		}
		else if( action == 'addsection' ){
			var theform = utilObject.getFormObject('addeditsectionform') ;
			theform.id.value = -1 ;
			theform.reset() ;
			utilObject.switchDisplayDiv('addeditsectiondiv', backimage, '', 'homepage');
		}
		else if( action == 'editsection' ){
		    var theform = utilObject.getFormObject('addeditsectionform') ;
			theform.reset() ;
			// now set the form fields
			 
			var l = sectiondb.get({id:param1})[0];
			theform.id.value = param1 ;
			theform.title.value = utilObject.decode64( l.title ) ;
			theform.description.value = utilObject.decode64( l.description );
			theform.instruction.value = utilObject.decode64( l.instruction );
			 
			utilObject.switchDisplayDiv('addeditsectiondiv', backimage, '', 'homepage');
		}
		else if( action == ACTION_ADD_SECTION_OK ){
			handleRequest(action, 'homepage');
		}
		else if( action == 'addsectioncancel' ){
			utilObject.switchDisplayDiv('sectiondiv', '', '', 'homepage');
		}	
 		else if(action == ACTION_MAKE_A_SECTION_COPY){
 			var message = 'You are about to make a copy of this section & its questions if any. Do you want to proceed ?' ;
 			utilObject.launchConfirmBox(message, function(val){
 				if(val == 'true'){ 					 
 					handleRequest(action, 'homepage', param1 );
 				}
 			} );		
			
		}	
 		else if(action == ACTION_DELETE_A_SURVEY){
 			var message = 'You are about to delete survey. Do you want to proceed ?' ;
 			utilObject.launchConfirmBox(message, function(val){
 				if(val == 'true'){ 					 
 					 selectedSurveyId = param1 ;
 					 handleRequest(action, 'homepage' );
 				}
 			} );
	 		
		}	
 		else if(action == ACTION_DELETE_A_SECTION){
 			var message = 'You are about to delete this section, & its questions if any. Do you want to proceed ?' ;
 			utilObject.launchConfirmBox(message, function(val){
 				if(val == 'true'){ 					 
 					selectedSectionId = param1 ;
 					handleRequest(action, 'homepage' );
 				}
 			} );			
 			
		}
 		else if(action == ACTION_DELETE_A_QUESTION){
 			var message = 'You are about to delete this question. Do you want to proceed ?' ;
 			utilObject.launchConfirmBox(message, function(val){
 				if(val == 'true'){ 					 
 					selectedQuestionId = param1 ;
 					handleRequest(action, 'homepage' );
 				}
 			} );			
 			
		}
		else if(action == ACTION_CHANGE_SURVEY_STATUS){
			var message = 'You are about to change survey status. Once published, you will not be able to update it. Do you want to proceed ?' ;
 			utilObject.launchConfirmBox(message, function(val){
 				if(val == 'true'){ 					 
 					selectedSurveyId = param1 ;
 					handleRequest(action, 'homepage' );
 				}
 			} );
			
		}	
		else if(action == ACTION_GETQUESTIONS ){
		    selectedSectionId = param1;
		    questiondb.remove() ;
		   
		    questiondb.insert(  sectiondb.get({id:selectedSectionId})[0].questions ) ;
			utilObject.getDivObject('questionsurveytitlelink').innerHTML ='<strong>'+ utilObject.decode64(surveydb.get({id:selectedSurveyId})[0].title)+ '</strong>';
			utilObject.getDivObject('questionsectiontitlelink').innerHTML ='<strong>'+ utilObject.decode64(sectiondb.get({id:selectedSectionId})[0].title)+ '</strong>';
		   
		    /*
			    handleRequest(action, 'homepage');
			*/		     
		    showHtml( action );
		    
		}
		else if(action == 'addquestioncancel'){
		    currentChoiceIndex = -1 ;
			utilObject.switchDisplayDiv('questiondiv', backimage, '', 'homepage');
		}
		else if(action == 'addquestion'){
			selectedQuestionId = -1 ;
		    var theform = utilObject.getFormObject('addeditquestionform') ;
		 
			doQuestionAction('resetform', theform ) ;
			
			utilObject.populateDropDown(theform.questiontype, false, typedb.get() );
			populateConditionalQuestion();		
			
			theform.questiontype.selectedIndex = 0 ;
			doQuestionAction('questiontypechange');
			utilObject.switchDisplayDiv('addeditquestiondiv');
			
		}
		else if( action == ACTION_MAKE_A_QUESTION_COPY ){
			// ACTION_MAKE_A_QUESTION_COPY
			var message = 'You are about to make a copy of this question. Do you want to proceed ?' ;
 			utilObject.launchConfirmBox(message, function(val){
 				if(val == 'true'){ 					 
 					handleRequest( action, 'homepage', param1 );
 				}
 			} );		
			
			 
		}
		else if(action == ACTION_MOVE_QUESTION_UP){
		    var questions = questiondb.get() ;
			var question1 = questions[ param1 ] ;
			var question2 = questions[ param1 -1 ] ;
						
			if( question1.conditionalQuestionId *1 == question2.id*1 ){// if question2 have to shown based on question then cant move
				alert('Cant move this question up because this questioin have to shown based on question 1 answer');
			}
			else{
			    handleRequest( ACTION_MOVE_QUESTION, 'homepage', question1.id, question2.id );
			}
				question1Index =param1 ;
	 			question2Index =param1-1 ;
	 			
				questions = null ;
			    question1 = null ;
			    question2 = null;
		}
		else if(action == ACTION_MOVE_QUESTION_DOWN){
		    var questions = questiondb.get() ;
			var question1 = questions[ param1 ] ;
			var question2 = questions[ param1 + 1 ] ;
			if( question2.conditionalQuestionId * 1 == question1.id*1  )
			{
				// if question2 have to shown based on question then cant move
				alert('Cant move this question up because this questioin have to shown based on question 1 answer');
			}
			else
			{
	 			question1Index = param1 + 1 ;
				question2Index = param1 ;
			    handleRequest( ACTION_MOVE_QUESTION, 'homepage', question2.id, question1.id );
			  
			}
			  questions = null ;
			  question1 = null ;
			  question2 = null;
		}
		else if( action == 'editquestion' ){
			//var questionId = param1*1 ;
			
			var theform = utilObject.getFormObject('addeditquestionform') ;
		 
			doQuestionAction('resetform', theform ) ;
			
			utilObject.populateDropDown(theform.questiontype, false, typedb.get() );
			// utilObject.populateQuestions(theform.conditionalquestion, false, questiondb.get({type:[QUESTION_TYPE_SINGLE_ANSWER_TEXT,QUESTION_TYPE_MULTIPLE_ANSWER_TEXT, QUESTION_TYPE_SINGLE_ANSWER_IMAGE, QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE]}) );
			selectedQuestionId = param1 * 1 ;
			populateConditionalQuestion() ;
			doQuestionAction('setform', theform , param1 ) ;
			
			/*
				theform.questiontype.selectedIndex = 0 ;
				doQuestionAction('questiontypechange');
				utilObject.switchDisplayDiv('addeditquestiondiv');
			*/
			
		}
		 
}

/**
 *
 */ 
function createQuestionHtml(){
      var html = '' ;
      var theform = utilObject.getFormObject('addeditquestionform') ;
      var selectType = theform.questiontype ;
      var value = selectType.options[selectType.selectedIndex].value;
      if(value == '1' ){ // Multiple choice: Single answer
            html += '<div class="form-group">' ;
            html += '<input type="text" name="choice1" title="Enter choice 1 " placeholder="Enter choice 1"  />' ;
            html += '</div>' ;
            
            html += '<div class="form-group">' ;
            html += '<input type="text" name="choice2" title="Enter choice 2 " placeholder="Enter choice 2"  />' ;
            html += '</div>' ;
      	        
      }

}


