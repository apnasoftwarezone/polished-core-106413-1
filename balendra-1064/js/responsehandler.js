// http://www.trirand.com/blog/?page_id=393/feature-request/integration-with-taffy-db-for-multisort-and-dataset-management
/**
 * Method used to process response object
 *
 * @param response
 * @return
 */
 function handleResponse(responseJSON, type){ 
	 alert( 'responseJSON : ' + responseJSON);
 if(utilObject.trim(responseJSON)== '')//this is case of file delete
 	return;
 		responseJSON = "[" + responseJSON + "]" ;
 	 var responsedb = TAFFY(responseJSON) ;
 	 response = responsedb.get()[0] ;
	 if(response.success == true ){
		 if(response.command == ACTION_LOGIN_OK ){			 
				loggedInUser = response.accounts[0] ;
				// IF not a super admin then show/hide links based on the authorizations
			    utilObject.hideBusy() ;
			    var list = document.getElementById('businesses') ;
			    utilObject.populateBusiness(list, loggedInUser.business );
			    
			    utilObject.getDivObject('welcomeuserspan').innerHTML = '<i class="caret"><img src="style/default/profile.png" style="height: 12px;"/> </i><strong> Welcome ! ' + utilObject.decode64( loggedInUser.firstName ) + " " + utilObject.decode64( loggedInUser.lastName ) + '</strong></span>' ;
		  		if(loggedInUser.business.length > 0)
		  		 	businessdb = TAFFY(JSON.stringify(loggedInUser.business)) ;
		  		else
		  			businessdb = TAFFY([]) ;
		  		
		  		loggedInUser.business = null ;
		  		
		  		
		  		$('#logindiv').hide() ;	
		  		 	
		  		if(loggedInUser.type*1 == 0 || loggedInUser.type*1 == 1  ){
		  			doSurveyAction( ACTION_SHOW_BUSINESS );	
		  			$('#businessesdiv').show() ;
		  			$('#businessmainnavlink').show() ;	
		  			if(response.settings != null && response.settings.length > 0){
				  			settingdb = TAFFY(JSON.stringify( response.settings )) ;
				  			manageSetting() ;
		  			}
		  		}else{		  		
		  		    $('#businessesdiv').hide() ;	
		  		    $('#businessmainnavlink').hide() ;	
		  		    if(response.settings != null && response.settings.length > 0){
				  			settingdb = TAFFY(JSON.stringify( response.settings )) ;
				  			manageSetting() ;
		  			}
		  			doSurveyAction( ACTION_GETSURVEYS ) ;
		  		}	    
		 }
		 else if( response.command == ACTION_GET_SURVEY_BY_ID ){
			  surveydb = TAFFY(JSON.stringify(response.surveys  ))
			// doPreviewAction(ACTION_GET_SURVEY_BY_ID, surveydb.get()[0].id ) ;
			 doPreviewAction('showwelcomescreen') ;
			 setTimeout(function(){ 
				 utilObject.getLocation() ;
			 }, 1000);
			
		 }
		 else if(response.command == ACTION_ADD_RESPONSE_OK ){
			 utilObject.hideBusy();
			 $('#content').hide();
			 $('#thankyoumessage').html(utilObject.decode64( surveydb.get()[0].thankyouMessage ) );
			 utilObject.switchDisplayDiv('thankyoudiv', '', '', 'homepage');	
		 }
		 else if(response.command == ACTION_EDIT_SURVEY_RESPONSE ){
			 currentSurveyResponse = response.surveyResponses[0];
			 surveydb = TAFFY( [] ) ;
			 surveydb.insert( currentSurveyResponse.survey );
			 setTimeout(function(){ 
				 utilObject.getLocation() ;
			 }, 1000);
			 doPreviewAction('showwelcomescreen') ;
			// doPreviewAction(ACTION_GET_SURVEY_BY_ID, surveydb.get()[0].id ) ;
			  
		 }
		 else if( response.command == ACTION_GET_SEARCH_REPORT ){			 
			 utilObject.populateSearchReport( response.searchReport ) ;
			 utilObject.hideBusy();
		 }
		 else if(response.command == ACTION_GET_SURVEY_RESPONSE_BY_ID){
			 var surveyResponse = response.surveyResponses[0] ;
			 handlePopup( response.command, surveyResponse );
			 alert('Show responses in popup') ;
		 }
		 else if( response.command == ACTION_ADD_DISPLAY_SETTING_OK ){
			 surveydb.update({displaySetting:response.displaySetting},{id:response.displaySetting.surveyId});
			 utilObject.hideBusy();
		 	 utilObject.showMessage('Alert', 'Display setting stored successfully' ,'Ok');
		 }	
		 else if( response.command == ACTION_GET_SURVEY_RESPONSES ){
			 surveyresponsedb = TAFFY(JSON.stringify(response.surveyResponses)) ;
			  
			 showHtml( response.command);
		 }
		 else if(response.command == ACTION_GET_SURVEY_AUTHORIZATION_SURVEY || response.command == ACTION_GET_SURVEY_AUTHORIZATION_USER ){
		 		manageSurveyAuthorization(response.command, response.surveyAuthorization) ;
		 }
		 else if( response.command == ACTION_ADD_EDIT_SURVEY_AUTHORIZATION_OK_USER ||  response.command == ACTION_ADD_EDIT_SURVEY_AUTHORIZATION_OK_SURVEY ){
		 		utilObject.hideBusy();
		 		utilObject.showMessage('Alert', 'Operation successful' ,'Ok');
		 }	
		 else if(response.command == 'getsettings' ){
		     if(response.settings != null && response.settings.length > 0){
		     	settingdb = TAFFY(JSON.stringify( response.settings )) ;
		     }
		     else{
		     	settingdb = TAFFY([]);
		     }
		     manageSetting( response.command ) ;
		 }
		 else if(response.command == ACTION_CHANGE_BUSINESS_STATUS ){
		 		businessdb.update({status:response.status},{id:response.businessId}) ;
			 	showHtml( response.command);
		 }
		 else if(response.command == ACTION_ADD_EDIT_GROUP_AUTHORIZATION_OK ){
		 	handleRequest(ACTION_GET_GROUP_AUTHORIZATION, 'homepage' );
		 }
		
		 else if(response.command == ACTION_GET_GROUP_AUTHORIZATION){
		 		 
		 		selectedGroupAuthorization = response.groupAuthorization ;
		 		showHtml( response.command);
		 }
		 else if(response.command == ACTION_ADD_SETTING_OK){		 		
		 	    var val = utilObject.selectedBusiness() ;
				settingdb.remove({businessId:val});
				settingdb.insert(response.settings);
		 		manageSetting( 'getsettings' ) ;
		 }
		 else if(response.command == ACTION_UPLOAD_A_FILE){
		 		if(type == 'questionfile'){
		 		    var tmp = response.picture ;
		 		    if( currentQuestionPicture != null && currentQuestionPicture.id != -1 )
		 		    	tmp.id = currentQuestionPicture.id ;		 		    	
		 		    	currentQuestionPicture = tmp ;
		 		        doFileAction('questionfileuploaded') ;
		 		}
		 		else if( type == 'choicefile' ){
		 		    var tmp = response.picture ;
		 		    if(currentChoicePicture !=null && currentChoicePicture.id != -1 )
		 		    	tmp.id = currentChoicePicture.id ;		 		    	
		 		    	currentChoicePicture = tmp ;		 	
		 		    	doFileAction('choicefileuploaded') ;	    	 
		 		}
		 		
		 		
		 }	 
		 else if(response.command == ACTION_REGISTER_BUSINESS_OK ){		
		        utilObject.hideBusy() ;	 
		  		doSurveyAction('homepage') ;
			   
		 }
		 else if( response.command == ACTION_ADD_BUSINESS_OK){
				 	businessdb.remove({id:response.accounts[0].business[0].id }) ;
				 	businessdb.insert( response.accounts[0].business[0] ) ;
				 	doSurveyAction( ACTION_SHOW_BUSINESS );	
		  			$('#businessesdiv').show() ;
		  			$('#businessmainnavlink').show() ;	
		 }	
		 else if( response.command == ACTION_GETLOCATIONS ){
		 	if(response.locations != null && response.locations.length > 0 )
		 			locationdb = TAFFY(response.locations);
		 	else
		 			locationdb = TAFFY([]) ;
		 	showHtml( response.command);
		 	 
		 }
		 else if( response.command == ACTION_GETITEMS ){
		 	if(response.items != null && response.items.length > 0 )
		 			itemdb = TAFFY(response.items);
		 	else
		 			itemdb = TAFFY([]) ;
		 	showHtml( response.command);
		 	 
		 }
		 else if( response.command == ACTION_GET_USERS_BY_BUSINESS ){
		 	if(response.accounts != null && response.accounts.length > 0 )
		 			userdb = TAFFY(JSON.stringify( response.accounts ));
		 	else
		 			userdb = TAFFY([]) ;
		 	showHtml( response.command);
		 	
		 }
		 else if( response.command == ACTION_ADD_LOCATION_OK){
			    if(response.locations != null && response.locations.length > 0 ){
			    	var l = response.locations[0] ;
			    	if(locationdb.get({id:l.id}).length > 0){
			    		locationdb.update({name:l.name, description:l.description, email:l.email, phone:l.phone, status:l.status},{id:l.id}) ;
			    	}
			    	else{
			 			locationdb.insert(l);			    	
			    	}
			 	 }
			 	showHtml( response.command);
			 	 
		 }
		 else if( response.command == ACTION_ADD_ITEM_OK){
			    if(response.items != null && response.items.length > 0 ){
			    	var l = response.items[0] ;
			    	if(itemdb.get({id:l.id}).length > 0){
			    		itemdb.update({name:l.name, description:l.description, status:l.status},{id:l.id}) ;
			    	}
			    	else{
			 			itemdb.insert(l);			    	
			    	}
			 	 }
			 	showHtml( response.command);
			 	 
		 }
		 else if( response.command == ACTION_ADD_EDIT_USER_ACCOUNT_OK ){
		 			 
		 		 if(response.accounts != null && response.accounts.length > 0 ){
			    	var l = response.accounts[0] ;
			    	if(userdb.get({id:l.id}).length > 0){
			    		userdb.update({firstName:l.firstName, lastName:l.lastName, email:l.email, phone:l.phone, status:l.status, loginName:l.loginName, password:l.password,type:l.type },{id:l.id}) ;
			    	}
			    	else{
			 			userdb.insert(l);			    	
			    	}
			 	 }
			 	showHtml( response.command);
			 	
		 }
		 else if( response.command == ACTION_CHANGE_ACCOUNT_STATUS){
		 		userdb.update({status:response.status },{id:response.userId}) ;
		 		showHtml( response.command);
			 	
		 }
		 else if(response.command == ACTION_CHANGE_LOCATION_STATUS){
		 		locationdb.update({status:response.status },{id:response.locationId}) ;
		 		showHtml( response.command);
		 }
		 else if(response.command == ACTION_CHANGE_ITEM_STATUS){
		 		itemdb.update({status:response.status },{id:response.itemId}) ;
		 		showHtml( response.command);
		 }
		 else if( response.command == ACTION_GETSURVEYS ){
		 	if(response.surveys != null && response.surveys.length > 0 )
		 			surveydb = TAFFY(response.surveys);
		 	else
		 			surveydb = TAFFY([]) ;
		 			
		 	showHtml( response.command);
		 	 
		 }	 
		 else if( response.command == ACTION_ADD_SURVEY_OK){
			    if(response.surveys != null && response.surveys.length > 0 ){
			    	var l = response.surveys[0] ;
			    	if(surveydb.get({id:l.id}).length > 0){
			    		surveydb.update({title:l.title, description:l.description, instruction:l.instruction, status:l.status},{id:l.id}) ;
			    	}
			    	else{
			 			surveydb.insert(l);			    	
			    	}
			 	 }
			 	showHtml( response.command);
			 	 
		 }
		 else if( response.command == ACTION_CHANGE_SURVEY_STATUS){
			    if(response.surveys != null && response.surveys.length > 0 ){
			    	var l = response.surveys[0] ;			    	 
			    	surveydb.update({status:l.status, status_Text:l.status_Text},{id:l.id}) ;
			    	 
			 	 }
			 	showHtml( response.command);
			 	 
		 }
		 else if( response.command == ACTION_MAKE_A_SURVEY_COPY){
			    if(response.surveys != null && response.surveys.length > 0 ){
			    	var l = response.surveys[0] ;
			    	 
			 			surveydb.insert(l);			    	
			    	 
			 	 }
			 	showHtml( response.command);
			  
		 }
		 else if( response.command == ACTION_GETSECTIONS ){
		    
		 	if(response.sections != null && response.sections.length > 0 ){
		 			sectiondb = TAFFY(response.sections);
		 		 
		 	}
		 	else{
		 			sectiondb = TAFFY([]) ;
		 	}
		 	showHtml( response.command);
		  
		 }	
		 else if( response.command == ACTION_ADD_SECTION_OK){
			    if(response.sections != null && response.sections.length > 0 ){
			    	var l = response.sections[0] ;
			    	if(sectiondb.get({id:l.id}).length > 0){
			    		sectiondb.update({title:l.title, description:l.description, instruction:l.instruction, status:l.status},{id:l.id}) ;
			    	}
			    	else{
			    		l.questions = new Array();
			 			sectiondb.insert(l);			    	
			    	}
			 	 }
			 	showHtml( response.command);
			 	 
		 }
		 else if( response.command == ACTION_MAKE_A_SECTION_COPY){
			    if(response.sections != null && response.sections.length > 0 ){
			    	var l = response.sections[0] ;			    	 
			 			sectiondb.insert(l);		    	 
			 	 }
			 	showHtml( response.command);
			 	 
		 }		 
		 else if( response.command == ACTION_DELETE_A_SURVEY){
			 	surveydb.remove({id:selectedSurveyId});		    	 
			 	showHtml( response.command);
			  
		 }		 
		 else if( response.command == ACTION_DELETE_A_SECTION){
			 	sectiondb.remove({id:selectedSectionId});		    	 
			 	showHtml( response.command);
			 	 
		 }
		 else if( response.command == ACTION_DELETE_A_QUESTION){
			 	questiondb.remove({id:selectedQuestionId});		
// Now update the section db				    	
		    	var questions = questiondb.get();
		    	sectiondb.update({questions:questions },{id:selectedSectionId}) ;			 	
			 	    	 
			 	showHtml( response.command);
			 	 
		 }
		 else if( response.command == ACTION_MAKE_A_QUESTION_COPY ){
			    if(response.questions != null && response.questions.length > 0 ){
			    	var l = response.questions[0] ;			    	 
			 		questiondb.insert(l);	
			 			
			 		// Now update the section db				    	
				    var questions = questiondb.get();
				    sectiondb.update({questions:questions }, {id:selectedSectionId}) ;	    	 
			 	 }
			 	showHtml( response.command);
			 	 
		 }
		 else if(response.command == ACTION_MOVE_QUESTION){
		        var questions = questiondb.get() ;
		        
			    var q1 = questions[ question1Index ];
			    var q2 =  questions[ question2Index];
			    
			    var q2String ="[" + JSON.stringify(q2) + "]" ;
			    
			    questions[question2Index] =q1 ;
			    var tmpdb =TAFFY( q2String  )
			    questions[question1Index] = tmpdb.get()[0] ;
			    questiondb = TAFFY(JSON.stringify(questions));
			    
// Now update the section db				    	
		    	// var questions = questiondb.get();
		    	sectiondb.update({questions:questions },{id:selectedSectionId}) ;
 			   
			    showHtml( response.command );
			    
		 }
		 else if( response.command == ACTION_ADD_QUESTION_OK){
		        if(response.questions != null && response.questions.length > 0 ){
				    	var l = response.questions[0] ;
				    	if(questiondb.get({id:l.id}).length > 0){
				    	    // UPDATE QUESTIONS FIELDS
				    	    questiondb.update({ question:l.question, type:l.type,
							   pictureRequired:l.pictureRequired,commentRequired:l.commentRequired, visible:l.visible,
							   displayOrder:l.displayOrder, conditionalQuestionId:l.conditionalQuestionId, logicalCondition:l.logicalCondition,
							   conditionalChoiceId:l.conditionalChoiceId, help:l.help, choices:l.choices, file:l.file,
							   rangeFrom:l.rangeFrom, rangeTo:l.rangeTo, rangeIncrement:l.rangeIncrement, parentId:l.parentId,
							   questions:l.questions },{id:l.id}) ;				    	    
				    	}
				    	else{
				 			questiondb.insert(l);			    	
				    	}
// Now update the section db				    	
				    	var questions = questiondb.get();
				    	sectiondb.update({questions:questions },{id:selectedSectionId}) ;
				    	
			 	 }
			 	showHtml( response.command );
		 }		
		 else if( response.command == ACTION_GETQUESTIONS ){
		 	if(response.questions != null && response.questions.length > 0 )
		 			questiondb = TAFFY(response.questions);
		 	else
		 			questiondb = TAFFY([]) ;
		 	showHtml( response.command);
		  
		 }	 
	 }	  
	 else{
	     utilObject.hideBusy() ;
	     if(response.command == ACTION_UPLOAD_A_FILE) {
				utilObject.showMessage('Alert', utilObject.decode64( response.message ) ,'Ok');
				if(type == 'questionfile'){
		 		      doFileAction('resetquestioncontainer') ;
		 		}
		 		else if( type == 'choicefile' ){
				 	 doFileAction('resetchoicecontainer') ;
				}
		 }
		 else{
		 	    
					 utilObject.showMessage('Alert', utilObject.decode64( response.message )    ,'Ok');
		 }
	 }
	 
 }
 
 function showHtml(action, param1 ){
  		var html = '' ;
 		if(action == ACTION_GETLOCATIONS || action == ACTION_ADD_LOCATION_OK || action == ACTION_CHANGE_LOCATION_STATUS ){
 			var locations = locationdb.get() ;
 			if(locations !=null && locations.length >0){
		 				html += '<table width="100%">' ;
 				    for(var i=0; i<locations.length; i++){
			 				var l = locations[i]
			 			 	if((i % 2 == 0))	
				 				html += '<tr class="even">' ;
				 			else
			 			    html += '<tr class="odd">' ;
			 				html += '<td>' + utilObject.decode64( l.name ) + '</td>' ;
			 				 
			 				html += '<td width="80px" align="left" >' + getStatusText(l.status) + '</td>' ;
			 				html += '<td align="right" valign="middle" width="80px">' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Edit location" onclick="doSurveyAction(' + "'"  + 'editlocation' + "' ," + l.id +');"><img alt="" src="style/default/edit.png" border="0" width="35"></a>&nbsp;' ;  
			 			if(l.status*1 == STATUS_ENABLED )	
			 				html += '<a href="javascript:void(0);" title="Apna survey - Disable location"  onclick="doSurveyAction(' + "'"  + ACTION_CHANGE_LOCATION_STATUS + "' ," + l.id +');"><img alt="" src="style/default/disable.png" border="0" width="35"></a>&nbsp;' ;
			 			else
			 				html += '<a href="javascript:void(0);" title="Apna survey - Enable location" onclick="doSurveyAction(' + "'"  + ACTION_CHANGE_LOCATION_STATUS + "' ," + l.id +');"><img alt="" src="style/default/enable.png" border="0" width="35"></a>&nbsp;' ;
			 			
			 				
			 				html += '</td>' ;
			 				html += '</tr>' ;
	 				}
		 				html += '</table>' ;
 			}
 			else{
 				html += '<label>' + 'No location found'  + '</label>' ;
 			}
 			utilObject.getDivObject('locationlistingdiv').innerHTML = html ;
 			 utilObject.hideBusy() ;
 			utilObject.switchDisplayDiv('locationdiv', '', '', 'homepage');
 			
 		}
 		else if(action == ACTION_PREVIEW_A_QUESTION ){
 			handlePopup(ACTION_PREVIEW_A_QUESTION, param1) ;
 		}
 		else if(action == ACTION_PREVIEW_A_SECTION ){
 			handlePopup(ACTION_PREVIEW_A_SECTION, param1) ;
 		}
 		else if(action == ACTION_PREVIEW_A_SURVEY ){
 			handlePopup(ACTION_PREVIEW_A_SURVEY, param1) ;
 		}
 		else if( action == ACTION_GET_SURVEY_RESPONSES ){
 			var responses = surveyresponsedb.get();
 			html += '<table id="large" border="1" cellspacing="0" class="tablesorter">' ;
 			html += '<thead><tr>' ;
 			html += '<th>SNo</th>' ;
 			html += '<th>Survey</th>' ;
 			html += '<th>Date/Time</th>' ;
 			html += '<th>Responder name</th>' ;
 			html += '<th>Source</th>';
 			html += '<th>Overall comment</th>' ;
 			html += '<th>Location</th>' ;
 			html += '<th>Item</th>' ;
 			// now put responder location detail
 			html += '<th>Ip</th>' ;
 			html += '<th>Longitude</th>' ;
 			html += '<th>Latitude</th>' ;
 			html += '<th>City</th>' ;
 			html += '<th>Country</th>' ; 			
 			html += '<th style="width:140px">Action</th>' ; 			
 			html += '</tr></<thead>' ;
 			html += '<tbody>' ;
 			if(responses != null && responses.length > 0){
 				for( var i=0; i<responses.length; i++ ){
 					var r = responses[i];
 					var rl = r. responderLocation ;
 					html += '<tr>' ;
 					html += '<td>' + (i+1) + '</td>' ;
 					html += '<td>' + utilObject.decode64(r.surveyName) + '</td>' ;
 					html += '<td>' +  r.dateTime + '</td>' ;
 					html += '<td>' + utilObject.decode64(r.responderName) + '</td>' ;
 					html += '<td>' + r.source + '</td>' ;
 					html += '<td>' + utilObject.decode64(r.overallComment) + '</td>' ;
 					html += '<td>' + utilObject.decode64(r.locationName) + '</td>' ;
 					html += '<td>' + utilObject.decode64(r.itemName) + '</td>' ;
 					html += '<td>' + rl.ip + '</td>' ;
 					html += '<td>' + rl.longitude + '</td>' ;
 					html += '<td>' + rl.latitude + '</td>' ;
 					html += '<td>' + rl.city + '</td>' ;
 					html += '<td>' + rl.country_name + '</td>' ;
 					html += '<td style="width:140px" >' ;
 					var editUrl = "submitresponse.jsp?surveyId=" + r.surveyId + "&responseId=" +  r.id + '&userId=' +  r.responderId ;
 					html += '<a href="javascript:void(0);" onclick="doSurveyAction(' +"'" + 'getresponsebyid' + "' , " + r.id + " , " + r.surveyId  + ')"  ><img alt="" src="style/default/preview.png" border="0" width="35" alt="View response"></a>&nbsp;&nbsp;'
 					html += '<a id="editmyresponseframe" href="' + editUrl + '" title="Apna survey - Edit survey response" ><img alt="" src="style/default/edit.png" border="0" width="35" alt="Edit"></a>&nbsp;&nbsp;' ;
 					html += '<a href="javascript:void(0);" onclick="doSurveyAction(' +"'" + 'exportresponsebyid' + "' , " + r.id + " , " + r.surveyId  + ')"  ><img alt="" src="style/default/xls.png" border="0" width="35" alt="Export to excel"></a>&nbsp;&nbsp;'
 				//	html += '<a href="javascript:void(0);" onclick="doSurveyAction(' +"'" + 'editsurveyresponse' + "' , " + r.id + " , " + r.surveyId  + ')"  >Edit</a>&nbsp;&nbsp;'
 					html +=  '</td>' ;
 					html += '</tr>' ;
 				}
 			}
 			else{
 				html += '<tr ><td colspan="13">No response found</td></tr>' ;
 			}
 			html += '</tbody>' ;
 			html += '</table>' ;
 			utilObject.getDivObject('searchresultcontentdiv').innerHTML = html ;
			utilObject.hideBusy() ;
			utilObject.switchDisplayDiv('searchresultdiv', '', '', 'homepage');
 		}
 		else if(action == ACTION_GETITEMS || action == ACTION_ADD_ITEM_OK || action == ACTION_CHANGE_ITEM_STATUS ){
 			var items = itemdb.get() ;
 			if(items !=null && items.length >0){
		 				html += '<table width="100%">' ;
 				    for(var i=0; i<items.length; i++){
			 				var l = items[i]
			 			 	if((i % 2 == 0))	
				 				html += '<tr class="even">' ;
				 			else
			 			    html += '<tr class="odd">' ;
			 				html += '<td>' + utilObject.decode64( l.name ) + '</td>' ;
			 				 
			 				html += '<td width="80px" align="left" >' + getStatusText(l.status) + '</td>' ;
			 				html += '<td align="right" valign="middle" width="80px">' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Edit item" onclick="doSurveyAction(' + "'"  + 'edititem' + "' ," + l.id +');"><img alt="" src="style/default/edit.png" border="0" width="35"></a>&nbsp;' ;  
			 			if(l.status*1 == STATUS_ENABLED )	
			 				html += '<a href="javascript:void(0);" title="Apna survey - Disable item"  onclick="doSurveyAction(' + "'"  + ACTION_CHANGE_ITEM_STATUS + "' ," + l.id +');"><img alt="" src="style/default/disable.png" border="0" width="35"></a>&nbsp;' ;
			 			else
			 				html += '<a href="javascript:void(0);" title="Apna survey - Enable item" onclick="doSurveyAction(' + "'"  + ACTION_CHANGE_ITEM_STATUS + "' ," + l.id +');"><img alt="" src="style/default/enable.png" border="0" width="35"></a>&nbsp;' ;
			 			
			 				
			 				html += '</td>' ;
			 				html += '</tr>' ;
	 				}
		 				html += '</table>' ;
 			}
 			else{
 				html += '<label>' + 'No item found'  + '</label>' ;
 			}
 			utilObject.getDivObject('itemlistingdiv').innerHTML = html ;
 			utilObject.hideBusy() ;
 			utilObject.switchDisplayDiv('itemdiv', '', '', 'homepage');
 			
 		}
 		else if( action == ACTION_GET_GROUP_AUTHORIZATION){
		 			var groups = selectedGroupAuthorization.groups ;
		 			if(groups !=null && groups.length >0){
				 				html += '<table width="100%">' ;
		 				    for(var i=0; i<groups.length; i++){
					 				var l = groups[i]
					 			 	if((i % 2 == 0))	
						 				html += '<tr class="even">' ;
						 			else
					 			    html += '<tr class="odd">' ;
					 				html += '<td>' + utilObject.decode64( l.name ) + '</td>' ;
					 				 
					 				
					 				html += '<td align="right" valign="middle" width="80px">' ;
					 				html += '<a href="javascript:void(0);" title="Apna survey - Group authorities" onclick="showHtml(' + "'"  + 'showgroupauthority' + "' ," + l.id +');"><img alt="" src="style/default/authority.png" border="0" width="35"></a>&nbsp;' ;  
					 				html += '</td>' ;
					 				html += '</tr>' ;
			 				}
				 				html += '</table>' ;
		 			}
		 			else{
		 				html += '<label>' + 'No group found'  + '</label>' ;
		 			}
		 			$('#authorizationdetaildiv').html( "" ) ; 
		 			utilObject.getDivObject('authorizationlistingdiv').innerHTML = html ;
		 			 utilObject.hideBusy() ;
		 			utilObject.switchDisplayDiv('groupauthorizationdiv', '', '', 'homepage');
 		}
 		else if(action == ACTION_GETQUESTIONS || action == ACTION_MOVE_QUESTION || action == ACTION_ADD_QUESTION_OK || action == ACTION_MAKE_A_QUESTION_COPY || action == ACTION_DELETE_A_QUESTION ){
 			var questions = questiondb.get() ;
 			if(questions !=null && questions.length >0){
		 				html += '<table width="100%">' ;
 				    for(var i=0; i<questions.length; i++){
			 				var l = questions[i]
			 				var questiondetailid = 'questiondetail' + l.id ;
			 				var linkid = 'questionlink' + l.id ;
			 			 	if((i % 2 == 0))	
				 				html += '<tr class="even">' ;
				 			else
			 			    	html += '<tr class="odd">' ;
			 			    

			 			    	
							html += '<td width="30px">'
			 				html += '<a  id="'+ linkid +'" href="javascript:void(0);" title="Apna survey - Show/Hide question detail" onclick="showhide(' + "'" +  questiondetailid + "' , "  + "'" +  linkid +  "'" + ' )" ><img src="style/default/showdetail.png" alt="Show detail" /></a> ';
			 				html += '</td>' ;
			 				html += '<td >' + utilObject.decode64( l.question ) + '</td>' ;
			 				
			 				var type = typedb.get({id:l.type})[0].name ;
			 				html += '<td style="width:300px">' + type + '</td>'
			 				/*
			 				if(l.file !=null) {
			 					html += '<td align="center" valign="middle" style="width:110px">' ;
			 				    html +='<a href="' + l.file.imageUrl + '" data-lightbox="image-30' + i + '" data-title="">' ;
		                        html += '<img border="2" src="' + l.file.thumbnailUrl + '" alt="" /> '+ '</a>' ;
			 					html += '</td>' ;
			 				}*/
			 				
			 				html += '<td align="right" valign="top" width="230px">' ;
			 				if( l.type*1 != QUESTION_TYPE_TABULAR )
			 					html += '<a href="javascript:void(0);" title="Apna survey - Edit question" onclick="doSurveyAction(' + "'"  + 'editquestion' + "' ," + l.id +');"><img alt="" src="style/default/edit.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				else
			 				  	html += '<a href="javascript:void(0);" title="Apna survey - Edit tabular question" onclick="doTabularAction(' + "'"  + 'editquestion' + "' ," + l.id +');"><img alt="" src="style/default/edit.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				  
			 				html += '<a href="javascript:void(0);" title="Apna survey - Make a copy of question" onclick="doSurveyAction(' + "'"  + ACTION_MAKE_A_QUESTION_COPY + "' ," + l.id +');"><img alt="" src="style/default/copy.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Preview question" onclick="doSurveyAction(' + "'"  + ACTION_PREVIEW_A_QUESTION + "' ," + l.id +');"><img alt="Preview" src="style/default/preview.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Delete question" onclick="doSurveyAction(' + "'"  + ACTION_DELETE_A_QUESTION + "' ," + l.id +');"><img alt="" src="style/default/delete.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 			    if(questions.length > 1){
			 			    	if(i==0){// show only move down button
					 				html += '<a href="javascript:void(0);" title="Apna survey - Move question down" onclick="doSurveyAction(' + "'"  + ACTION_MOVE_QUESTION_DOWN + "' ," + i +');"><img alt="" src="style/default/down.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 			    	}
			 			    	else if(i == (questions.length - 1 )){// show only move up button
					 				html += '<a href="javascript:void(0);" title="Apna survey - Move question up" onclick="doSurveyAction(' + "'"  + ACTION_MOVE_QUESTION_UP + "' ," + i +');"><img alt="" src="style/default/up.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 			    	}
			 			    	else{// show both button
					 				html += '<a href="javascript:void(0);" title="Apna survey - Move question up" onclick="doSurveyAction(' + "'"  + ACTION_MOVE_QUESTION_UP + "' ," + i +');"><img alt="" src="style/default/up.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
					 				html += '<a href="javascript:void(0);" title="Apna survey - Move question down" onclick="doSurveyAction(' + "'"  + ACTION_MOVE_QUESTION_DOWN + "' ," + i +');"><img alt="" src="style/default/down.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 			    	}
			 				}
			 				html += '</td>' ;
			 				html += '</tr>' ;
			 				
			 				html += '<tr id="' + questiondetailid +  '"  style="display:none;" ><td colspan="4">' ;
			 				html += '<div class="box-body"><table cellpadding="5" cellspacing="5">' ;
			 					if( l.type*1 != QUESTION_TYPE_TABULAR ){
								 				if(l.file !=null) {
								 					html	+= '<tr>' ;
								 				    html += '<td valign="top" width="130px"><strong>Question picture</strong></td>'  ;
								 				    html +='<td><a href="' + l.file.imageUrl + '" data-lightbox="image-30' + i + '" data-title="">' ;
							                        html += '<img style="height:50px;" src="' + l.file.thumbnailUrl + '" alt="" /> '+ '</a></td>' ;
							                        html += '</tr>' ;
								 				}
								 				var choices = l.choices ;
								 					html += '<tr><td width="130px"></td><td><table>' ;
								 					html += '<tr>' ;
								 					html += '<td>' ;
								 					if(l.pictureRequired*1 == QUESTION_PIC_ATTACHMENT_REQUIRED_NO) 
								 						html	+= '<strong>Picture attachment required :&nbsp;</strong>No';
								 					else
								 						html	+= '<strong>Picture attachment required :&nbsp;</strong>Yes';
								 					
								 					html += '</td>' ;
								 					html += '<td>' ;
								 					if(l.visible*1 == QUESTION_VISIBILITY_CONDITIONAL) 
								 						html	+= '<strong>Conditional question :&nbsp;</strong>Yes';
								 					else
								 						html	+= '<strong>Conditional question :&nbsp;</strong>No';
								 					
								 					html += '</td>' ;
								 					
								 					html += '</tr>' ;
								 					html += '</table></td></tr>' ;
								 					
								 					if( l.visible*1 == QUESTION_VISIBILITY_CONDITIONAL){
								 						var qs = questiondb.get({id:l.conditionalQuestionId}) ;
								 						html += '<tr><td colspan="2">Conditional visibility detail</td></tr>' ;
								 						html += '<tr>' ;
								 						html += '<td width="130px">' + 'Question' + '</td>' ;
								 						html += '<td>' + utilObject.decode64( qs[0].question ) + '</td>' ;
								 						html += '</tr>' ;
								 						html += '<tr>' ;
								 						html += '<td width="130px">' + 'Condition' + '</td>' ;
								 						html += '<td>' + l.logicalCondition + '</td>' ;
								 						html += '</tr>' ;
								 						html += '<tr>' ;
								 						html += '<td width="130px">' + 'Choice' + '</td>' ;
								 						html += '<td>' + utilObject.decode64( TAFFY( JSON.stringify(qs[0].choices ) ).get({id:l.conditionalChoiceId})[0].choice ) + '</td>' ;
								 						html += '</tr>' ;
								 					}
								 					
								 					if(l.rangeFrom*1 !=0 && l.rangeTo*1 != 0){
								 						 
								 						html += '<tr><td width="130px"></td><td><table>' ;
								 						html += '<tr>' ;
								 						html += '<td><strong>Range from :&nbsp;</strong>' + l.rangeFrom + '</td>' ;
								 						html += '<td><strong>Range to :&nbsp;</strong>' + l.rangeTo + '</td>' ;
								 						html += '<td><strong>Range increment :&nbsp;</strong>' + l.rangeIncrement + '</td>' ;
								 						html += '</tr>' ;
								 						html += '</table></td></tr>' ;
								 					
								 					}
								 				
								 				if(choices !=null && choices.length >0 ){
								 				    
									 				    html	+= '<tr>' ;
									 				    if(l.type*1 == 3 || l.type == 4 ){
									 				    	html += '<tr>' ;
									 				    	html += '<td valign="top" width="130px"></td>' ;
									 				    	if(l.choices[0].showTextForImage == SHOW_TEXT_YES)
									 				    		html += '<td><strong>Show Image with choice text :&nbsp;Yes</td>' ;
									 				    	else
									 				    		html += '<td><strong>Show Image with choice text :&nbsp;No</td>' ;
									 				    	
									 				    	html += '</tr>' ;
									 				    }
									 				    html += '<td valign="top" width="130px"><strong>Choices</strong></td><td><table><tr>'  ;
													 			   for(var j=0; j< choices.length; j++){
													 			   			var commenrequired = '' ;
													 			   			if(choices[j].commentRequired*1 == COMMENT_FIELD_REQUIRED_YES)
													 			   				commenrequired = 'Comment required' ;
													 			   			choices[j].commentRequired ;
													 			   	    if(choices[j].file != null && choices[j].file.id != -1){
													 			   	    		html += '<td>' ;
															 				    html +=  '<a href="' + choices[j].file.imageUrl + '" data-lightbox="image-301' + i + '" data-title="' + utilObject.decode64( choices[j].choice ) + '">' ;
														                        html += '<img style="height:50px;" src="' +choices[j].file.thumbnailUrl + '" alt="" /> ' ;
														                        
														                        html += '</a>' + '<br />'  + utilObject.decode64( choices[j].choice ) ;
														                        html += '</td>' ;
														                        html += '<td  valign="top" >' + commenrequired + '</td>' ;
													                        }
													                        else{
													                        	html += '<td>' ;
													                        	html += '<strong>' + (j+1) +'.&nbsp;</strong>' + utilObject.decode64( choices[j].choice )  ;
													                        	html += '</td>' ;
													                        	html += '<td valign="top" >' + commenrequired + '</td>' ;
													                        }
												                      }  
								                      
								                        html += '</tr></table></td</tr>' ;
								 				}
								 				html += '</table>' ;
								 	}
								 	else{
								 	 			html += emitTabularQuestionHtml( l ) ;
								 	}			
								 				
								 				html += '</div>' ;
			 				html += '</td></tr>' ;
			 		 
	 				}
		 				html += '</table>' ;
 			}
 			else{
 				html += '<label>' + 'No question found'  + '</label>' ;
 			}
 			utilObject.getDivObject('questionlistingdiv').innerHTML = html ;
 			 utilObject.hideBusy() ;
 			utilObject.switchDisplayDiv('questiondiv', '', '', 'homepage');
 			
 		} 		 
 		else if(action == ACTION_GETSECTIONS || action == ACTION_DELETE_A_SECTION || action == ACTION_ADD_SECTION_OK || action == ACTION_MAKE_A_SECTION_COPY ){
 			var sections = sectiondb.get() ;
 			if(sections !=null && sections.length >0){
		 				html += '<table width="100%">' ;
 				    for(var i=0; i<sections.length; i++){
			 				var l = sections[i]
	 						var title = utilObject.trim( utilObject.decode64( l.title )) ;
				 			var description = utilObject.trim( utilObject.decode64( l.description )) ;
				 			var instruction = utilObject.trim( utilObject.decode64( l.instruction )) ;
			 				var sectiondetailid = 'sectiondetail' + l.id ;
			 				var linkid = 'sectionlink' + l.id ;
			 				
			 			 	if((i % 2 == 0))	
				 				html += '<tr class="even">' ;
				 			else
			 			   		html += '<tr class="odd">' ;
			 				html += '<td>'
			 				html += '<a  id="'+ linkid +'" href="javascript:void(0);" title="Apna survey - Show/Hide section detail" onclick="showhide(' + "'" +  sectiondetailid + "' , "  + "'" +  linkid +  "'" + ' )" ><img src="style/default/showdetail.png" alt="Show detail" /></a> ';
			 				html += '</td>' ;
			 				html += '<td width="60%">' + utilObject.decode64( l.title ) + '</td>' ;
			 				 
			 				
			 				html += '<td align="right" valign="top" width="25%">' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Edit section" onclick="doSurveyAction(' + "'"  + 'editsection' + "' ," + l.id +');"><img alt="" src="style/default/edit.png" border="0" width="35"></a>&nbsp;&nbsp;' ;  
			 				html += '<a href="javascript:void(0);" title="Apna survey - Make copy of section" onclick="doSurveyAction(' + "'"  + ACTION_MAKE_A_SECTION_COPY + "' ," + l.id +');"><img alt="" src="style/default/copy.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Preview section" onclick="showHtml(' + "'"  + ACTION_PREVIEW_A_SECTION + "' ," + l.id +');"><img alt="" src="style/default/preview.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Show questions of section" onclick="doSurveyAction(' + "'"  + ACTION_GETQUESTIONS + "' ," + l.id +');"><img alt="" src="style/default/questions.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Delete section" onclick="doSurveyAction(' + "'"  + ACTION_DELETE_A_SECTION + "' ," + l.id +');"><img alt="" src="style/default/delete.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				html += '</td>' ;
			 				html += '</tr>' ;
			 				html += '<tr id="' + sectiondetailid +  '"  style="display:none;" ><td colspan="3">' ;
			 				html += '<div class="box-body">' ;
			 				
			 				html += '<label><strong>Title:</strong></label>&nbsp;' ;
			 				html +=  title ;
			 			
			 			if(l.description != ''){
			 				html += '<br/><label><strong>Description:</strong></label>&nbsp;' ;
			 				html +=  description ;
			 			}
			 			if( instruction != ''){
			 				html += '<br/><label><strong>Instruction:</strong></label>' ;
			 				html +=  instruction ;
			 			}
			 			
			 				
			 				html += '</div></td></tr>' ;
	 				}
		 				html += '</table>' ;
 			}
 			else{
 				html += '<label>' + 'No section found'  + '</label>' ;
 			}
 			utilObject.getDivObject('sectionlistingdiv').innerHTML = html ;
 			 utilObject.hideBusy() ;
 			utilObject.switchDisplayDiv('sectiondiv', '', '', 'homepage');
 			
 		}
 		else if( action == ACTION_GET_USERS_BY_BUSINESS || action == ACTION_ADD_EDIT_USER_ACCOUNT_OK || action == ACTION_CHANGE_ACCOUNT_STATUS ){
		 			var users = userdb.get() ;
		 			if(users !=null && users.length >0){
				 				html += '<table width="100%">' ;
		 				    for(var i=0; i<users.length; i++){
					 				var l = users[i]

					 				
					 				var id = l.id ;
			 						var firstName = utilObject.trim( utilObject.decode64( l.firstName )) ;
						 			var lastName = utilObject.trim( utilObject.decode64( l.lastName )) ;
						 			var loginName = utilObject.trim( utilObject.decode64( l.loginName )) ;
						 			var password = utilObject.trim( utilObject.decode64( l.password )) ;
						 			var phone = utilObject.trim( utilObject.decode64( l.phone )) ;
						 			var email = utilObject.trim( utilObject.decode64( l.email )) ;
						 			var type = l.type ;
						 			var typeString = getUserTypeText(type) ;
						 			var statusString = getStatusText( l.status );
						 			var status = l.status ;
						 			
					 				var userdetailid = 'userdetail' + l.id ;
					 				var linkid = 'userlink' + l.id ;
					 				
					 			 	if((i % 2 == 0))	
						 				html += '<tr class="even">' ;
						 			else
					 			   		html += '<tr class="odd">' ;
					 				html += '<td>'
					 				html += '<a  id="'+ linkid +'" href="javascript:void(0);" title="Apna survey - Show/Hide user detail" onclick="showhide(' + "'" +  userdetailid + "' , "  + "'" +  linkid +  "'" + ' )" ><img src="style/default/showdetail.png" alt="Show detail" /></a> ';
					 				html += '</td>' ;
					 				html += '<td width="40%">' + ( firstName + " " + lastName ) + '</td>' ;
					 				html += '<td width="15%">' + typeString + '</td>' ;
					 				html += '<td width="15%">' + statusString + '</td>' ;
					 				 
					 				
					 				html += '<td align="right" valign="top" width="25%">' ;
					 				html += '<a href="javascript:void(0);" title="Apna survey - Show user authorization" onclick="doSurveyAction(' + "'"  + ACTION_GET_SURVEY_AUTHORIZATION_USER + "' ," + l.id +');"><img alt="" src="style/default/authority.png" border="0" width="35"></a>&nbsp;&nbsp;' ;  
					 				html += '<a href="javascript:void(0);" title="Apna survey - Edit user account" onclick="doSurveyAction(' + "'"  + ACTION_EDIT_USER_ACCOUNT + "' ," + l.id +');"><img alt="" src="style/default/edit.png" border="0" width="35"></a>&nbsp;&nbsp;' ;  
					 			if(l.status*1 == STATUS_ENABLED)				 				
					 				html += '<a href="javascript:void(0);" title="Apna survey - Disable user" onclick="doSurveyAction(' + "'"  + ACTION_CHANGE_ACCOUNT_STATUS + "' ," + l.id +');"><img alt="" src="style/default/disable.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
					 			else
					 				html += '<a href="javascript:void(0);" title="Apna survey - Enable user" onclick="doSurveyAction(' + "'"  + ACTION_CHANGE_ACCOUNT_STATUS + "' ," + l.id +');"><img alt="" src="style/default/enable.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
					 			
					 				html += '</td>' ;
					 				html += '</tr>' ;
					 				html += '<tr id="' + userdetailid +  '"  style="display:none;" ><td colspan="3">' ;
					 				html += '<div class="box-body">' ;
					 				
					 				html += '<label><strong>First name:</strong></label>&nbsp;' ;
					 				html +=  firstName + '<br/>' ;
					 				
					 				html += '<label><strong>Last name:</strong></label>&nbsp;' ;
					 				html +=  lastName + '<br/>' ;
					 				
					 				html += '<label><strong>Login name:</strong></label>&nbsp;' ;
					 				html +=  loginName + '<br/>' ;
					 				
					 				html += '<label><strong>Password:</strong></label>&nbsp;' ;
					 				html +=  password + '<br/>' ;
					 				
					 				html += '<label><strong>Phone:</strong></label>&nbsp;' ;
					 				html +=  phone + '<br/>' ;
					 				
					 				html += '<label><strong>Email:</strong></label>&nbsp;' ;
					 				html +=  email + '<br/>' ;
					 				
					 				html += '<label><strong>Type:</strong></label>&nbsp;' ;
					 				html +=  typeString + '<br/>' ;
					 				
					 				html += '<label><strong>Status:</strong></label>&nbsp;' ;
					 				html +=  statusString + '<br/>' ;
					 				
					 				html += '</div></td></tr>' ;
			 				}
				 				html += '</table>' ;
		 			}
		 			else{
		 				html += '<label>' + 'No user found'  + '</label>' ;
		 			}
		 			utilObject.getDivObject('userlistingdiv').innerHTML = html ;
		 			utilObject.hideBusy() ;
		 			utilObject.switchDisplayDiv('usersmaindiv', '', '', 'homepage');
 		}
 		else if( action == ACTION_SHOW_BUSINESS || action == ACTION_CHANGE_BUSINESS_STATUS ){
 					var businesses = businessdb.get() ;
 			if(businesses !=null && businesses.length >0){
		 				html += '<table width="100%">' ;
 				    for(var i=0; i<businesses.length; i++){
			 				var l = businesses[i]
			 					   var id = l.id ;
								   var name = utilObject.trim( utilObject.decode64( l.name )) ; 
								   var address = utilObject.trim( utilObject.decode64( l.address )) ;
								   var city = utilObject.trim( utilObject.decode64( l.city )) ;
								   var state = utilObject.trim( utilObject.decode64( l.state )) ;
								   var country = utilObject.trim( utilObject.decode64( l.country )) ;
								   var zipcode = utilObject.trim( utilObject.decode64( l.zipcode ));  
								   var email = utilObject.trim( utilObject.decode64( l.email )) ;
								   var phone = utilObject.trim( utilObject.decode64( l.phone )) ;
								   var status = getStatusText( l.status );
								  // dont need to show language
								 //  private Language language = new Language() ; 
			 				
	 					 
				 			
			 				var businessdetailid = 'businessdetail' + l.id ;
			 				var linkid = 'businesslink' + l.id ;
			 				
			 			 	if((i % 2 == 0))	
				 				html += '<tr class="even">' ;
				 			else
			 			   		html += '<tr class="odd">' ;
			 				html += '<td>'
			 				html += '<a  id="'+ linkid +'" href="javascript:void(0);" title="Apna survey - Show/Hide business detail" onclick="showhide(' + "'" +  businessdetailid + "' , "  + "'" +  linkid +  "'" + ' )" ><img src="style/default/showdetail.png" alt="Show detail" /></a> ';
			 				html += '</td>' ;
			 				html += '<td width="70%">' + name + '</td>' ;
			 				html += '<td width="10%">' + status + '</td>' ;
			 				 
			 				
			 				html += '<td align="right" valign="top" width="15%">' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Edit business" onclick="doSurveyAction(' + "'"  + 'editbusiness' + "' ," + l.id +');"><img alt="" src="style/default/edit.png" border="0" width="35"></a>&nbsp;&nbsp;' ;  
			 				if(l.status == STATUS_ENABLED)
			 					html += '<a href="javascript:void(0);" title="Apna survey - Disable business" onclick="doSurveyAction(' + "'"  + ACTION_CHANGE_BUSINESS_STATUS + "' ," + l.id + " , " + STATUS_DISABLED  + ');"><img alt="" src="style/default/disable.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				else
			 					html += '<a href="javascript:void(0);" title="Apna survey - Enable business" onclick="doSurveyAction(' + "'"  + ACTION_CHANGE_BUSINESS_STATUS + "' ," + l.id + " , " + STATUS_ENABLED + ');"><img alt="" src="style/default/enable.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				
			 				html += '</td>' ;
			 				html += '</tr>' ;
			 				html += '<tr id="' + businessdetailid +  '"  style="display:none;" ><td colspan="3">' ;
			 				html += '<div class="box-body">' ;
			 				
			 				html += '<label><strong>Name:</strong></label>&nbsp;' + name + " " + status  + '<br />' ;
			 				html += '<label><strong>Address:</strong></label>&nbsp;' + address + '<br />' ;
			 				html += '<label><strong>City:</strong></label>&nbsp;' + city + '<br />' ;
			 				html += '<label><strong>State:</strong></label>&nbsp;' + state + '<br />' ;
			 				html += '<label><strong>Country:</strong></label>&nbsp;' + country + '<br />' ;
			 				html += '<label><strong>Zipcode:</strong></label>&nbsp;' + zipcode + '<br />' ;
			 				html += '<label><strong>Email:</strong></label>&nbsp;' + email + '<br />' ;
			 				html += '<label><strong>Phone:</strong></label>&nbsp;' + phone + '<br />' ;
			 				 
			 		 
			 			
			 				
			 				html += '</div></td></tr>' ;
	 				}
		 				html += '</table>' ;
 			}
 			else{
 				html += '<label>' + 'No business found'  + '</label>' ;
 			}
 			utilObject.getDivObject('businesslistingdiv').innerHTML = html ;
 			utilObject.hideBusy() ;
 			utilObject.switchDisplayDiv('businessmaindiv', '', '', 'homepage');
 		}
 		else if( action == ACTION_GETSURVEYS || action == ACTION_CHANGE_SURVEY_STATUS || action == ACTION_DELETE_A_SURVEY || action == ACTION_ADD_SURVEY_OK || action == ACTION_MAKE_A_SURVEY_COPY ){
 		 			var surveys = surveydb.get() ;
 			if(surveys !=null && surveys.length >0){
		 				html += '<table width="100%">' ;
 				    for(var i=0; i<surveys.length; i++){
			 				var l = surveys[i]
	 						var title = utilObject.trim( utilObject.decode64( l.title )) ;
				 			var description = utilObject.trim( utilObject.decode64( l.description )) ;
				 			var instruction = utilObject.trim( utilObject.decode64( l.instruction )) ;
			 				var surveydetailid = 'surveydetail' + l.id ;
			 				var linkid = 'surveylink' + l.id ;
			 			if((i % 2 == 0))	
			 				html += '<tr class="even">' ;
			 			else
			 			    html += '<tr class="odd">' ;
			 				html += '<td>'
			 				html += '<a  id="'+ linkid +'" href="javascript:void(0);" title="Apna survey - Show/Hide survey detail" onclick="showhide(' + "'" +  surveydetailid + "' , "  + "'" +  linkid +  "'" + ' )" ><img src="style/default/showdetail.png" alt="Show detail" /></a> ';
			 				html += '</td>' ;
			 				html += '<td >' + utilObject.decode64( l.title )+ " (" + utilObject.decode64( l.status_Text ) + " )" + '</td>' ;
			 				 
			 				html += '<td >' ;
			 				html +=  utilObject.decode64( l.type_Text ) ;
			 				html += '</td>' ;  
			 				
			 				html += '<td align="right" valign="top" width="480px">' ;
			 				html += '<a href="javascript:void(0);"  title="Apna survey - Survey authorization" onclick="doSurveyAction(' + "'"  + ACTION_GET_SURVEY_AUTHORIZATION_SURVEY + "' ," + l.id +');"><img alt="" src="style/default/authority.png" border="0" width="35"></a>&nbsp;&nbsp;' ;  
			 				html += '<a href="javascript:void(0);" title="Apna survey - Edit survey" onclick="doSurveyAction(' + "'"  + 'editsurvey' + "' ," + l.id +');"><img alt="" src="style/default/edit.png" border="0" width="35"></a>&nbsp;&nbsp;' ;  
			 				html += '<a href="javascript:void(0);" title="Apna survey - Make copy of survey" onclick="doSurveyAction(' + "'"  + 'makeasurveycopy' + "' ," + l.id +');"><img alt="" src="style/default/copy.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Show sections of survey" onclick="doSurveyAction(' + "'"  + 'getsections' + "' ," + l.id +');"><img alt="" src="style/default/sections.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				if(l.status == STATUS_DISABLED )
			 					html += '<a href="javascript:void(0);" title="Apna survey - Disable survey" onclick="doSurveyAction(' + "'"  + ACTION_CHANGE_SURVEY_STATUS + "' ," + l.id +');"><img alt="" src="style/default/publish.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				else
			 					html += '<a href="javascript:void(0);" title="Apna survey - Enable survey" onclick="doSurveyAction(' + "'"  + ACTION_CHANGE_SURVEY_STATUS + "' ," + l.id +');"><img alt="" src="style/default/draft.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				
			 				html += '<a href="javascript:void(0);" title="Apna survey - Delete survey" onclick="doSurveyAction(' + "'"  + ACTION_DELETE_A_SURVEY + "' ," + l.id +');"><img alt="" src="style/default/delete.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Add/Edit survey display setting" onclick="doSurveyAction(' + "'"  + ACTION_ADD_EDIT_DISPLAY_SETTING + "' ," + l.id +');"><img alt="" src="style/default/setting.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Preview survey" onclick="showHtml(' + "'"  + ACTION_PREVIEW_A_SURVEY + "' ," + l.id +');"><img alt="" src="style/default/preview.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Share/Distribute survey" onclick="doSurveyAction(' + "'"  + 'share' + "' ," + l.id +');"><img alt="" src="style/default/share.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				var exportUrl = 'mysurvey.jsp?surveyId=' + l.id + '&source=popup&exportToWord=yes' ;
			 				var submitUrl = "submitresponse.jsp?surveyId=" + l.id + "&source=Web" + "&userId=" + loggedInUser.id ;
			 				html += '<a href="' + exportUrl + '" target="_blank" title="Apna survey - Export survey to word" ><img alt="" src="style/default/word.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				html += '<a id="submitmyresponseframe" href="' + submitUrl + '"   title="Apna survey - Submit response" ><img alt="" src="style/default/submitresponse.png" border="0" width="35"></a>&nbsp;&nbsp;' ;
			 				html += '</td>' ;
			 				html += '</tr>' ;
			 				html += '<tr id="' + surveydetailid +  '"  style="display:none;" ><td colspan="3">' ;
			 				html += '<div class="box-body">' ;
			 				
			 				html += '<label><strong>Title:</strong></label>&nbsp;' ;
			 				html +=  title ;
			 			
			 			if(l.description != ''){
			 				html += '<br/><label><strong>Description:</strong></label>&nbsp;' ;
			 				html +=  description ;
			 			}
			 			if( instruction != ''){
			 				html += '<br/><label><strong>Instruction:</strong></label>' ;
			 				html +=  instruction ;
			 			}
			 			
			 				
			 				html += '</div></td></tr>' ;
	 				}
		 				html += '</table>' ;
 			}
 			else{
 				html += '<label>' + 'No survey found'  + '</label>' ;
 			}
 		 
 			utilObject.getDivObject('surveylistingdiv').innerHTML = html ;
 			utilObject.hideBusy() ;
 			utilObject.switchDisplayDiv('surveydiv', '', '', 'homepage');
 		}
 		else if( action == 'rowlisting' ){
		 			var rows = selectedRowArray ;
		 			if( rows !=null && rows.length >0){
				 				html += '<table width="100%">' ;
		 				    for(var i=0; i<rows.length; i++){
					 				var l = rows[i]
					 			 	if((i % 2 == 0))	
						 				html += '<tr class="even">' ;
						 			else
					 			    html += '<tr class="odd">' ;
					 				html += '<td>' + utilObject.decode64( l.name ) + '</td>' ;
					 				 
					 				
					 				html += '<td align="right" valign="middle" width="180px">' ;
					 				html += '<a href="javascript:void(0);" title="Apna survey - Edit row" onclick="doTabularAction(' + "'"  + 'editrow' + "' ," + i +');" ><img alt="" src="style/default/edit.png" border="0" width="35"></a>&nbsp;' ;  
					 				html += '<a href="javascript:void(0);" title="Apna survey - Delete row" onclick="doTabularAction(' + "'"  + 'deleterow' + "' ," + i +');"><img alt="" src="style/default/delete.png" border="0" width="35"></a>&nbsp;' ;
					 				
					 				
									if( selectedRowArray.length >1 )  
					 				{
							 					if( i != selectedRowArray.length-1 ){ // show both up and down button
							 						if( i != 0)
							 					    {
										 					html += '<a href="javascript:void(0);" class="move-up" title="Apna survey - Move row up" onclick="doTabularAction(' + "'"  + 'moverowup' + "' ," + i +');" ><img alt="" src="style/default/up.png" border="0" width="35" ></a>&nbsp;' ;
										 					html += '<a href="javascript:void(0);" class="move-down" title="Apna survey - Move row down" onclick="doTabularAction(' + "'"  + 'moverowdown' + "' ," + i +');" ><img alt="" src="style/default/down.png" border="0" width="35" ></a>&nbsp;' ;
							 						} 
							 						else{
							 							html += '<a href="javascript:void(0);" class="move-down" title="Apna survey - Move row down" onclick="doTabularAction(' + "'"  + 'moverowdown' + "' ," + i +');" ><img alt="" src="style/default/down.png" border="0" width="35" ></a>&nbsp;' ;
							 						}
							 					}
							 					else{ // show only up button
								 					html += '<a href="javascript:void(0);" class="move-up" title="Apna survey - Move row up" onclick="doTabularAction(' + "'"  + 'moverowup' + "' ," + i +');" ><img alt="" src="style/default/up.png" border="0" width="35"></a>&nbsp;' ;
							 					}
					 				}					 				
					 				
					 				html += '</td>' ;
					 				html += '</tr>' ;
			 				}
				 				html += '</table>' ;
		 			}
		 			else{
		 				html += '<label>' + 'No rows found'  + '</label>' ;
		 			}
		 			utilObject.getDivObject('rowlistingdiv').innerHTML = html ;
		 			// utilObject.hideBusy() ;
		 			// utilObject.switchDisplayDiv('locationdiv', '', '', 'homepage');
		 			
 		}
 		else if( action == 'showchoices' ){
 				if(currentChoiceArray !=null && currentChoiceArray.length >0){
		 				html += '<table id="mytableid" width="100%">' ;
 				    for(var i=0; i<currentChoiceArray.length; i++){
			 				var l = currentChoiceArray[i]
	 						var choice = utilObject.trim( utilObject.decode64( l.choice )) ;
				 			var score =  l.score ;
				 			var isDefault =  l.isDefault ;
			 				var file = l.file ;
			 				
			 				var linkid = 'surveylink' + l.id ;
			 			if((i % 2 == 0))	
			 				html += '<tr class="even">' ;
			 			else
			 			    html += '<tr class="odd">' ;
			 				html += '<td>' + utilObject.decode64( l.choice ) + '</td>' ;
			 				
			 				if(isDefault == CHOICE_DEFAULT_SELECTION_YES )
			 				    html += '<td width="110px">Default choice</td>' ;
			 				else
			 				    html += '<td></td>' ;
			 				if( l.score*1 != 0 )   {
				 				    html += '<td width="110px">Score: ' + l.score + '</td>' ;
				 				 
			 				} 
			
			 				
			 				html += '<td align="right" valign="middle" width="180px">' ;
			 				html += '<a class="edit-choice" href="javascript:void(0);" title="Apna survey - Edit choice" ><img alt="" src="style/default/edit.png" border="0" width="35"></a>&nbsp;' ;
			 				if( currentChoiceArray.length >1 )  
			 				{
			 					if( i != currentChoiceArray.length-1 ){ // show both up and down button
			 						if( i == 0){
			 						        html += '<a style="visibility:hidden;" href="javascript:void(0);" title="Apna survey - Move choice up"  class="move-up" ><img alt="" src="style/default/up.png" border="0" width="35"></a>&nbsp;' ;
						 					html += '<a href="javascript:void(0);" class="move-down" title="Apna survey - Move choice down" ><img alt="" src="style/default/down.png" border="0" width="35"></a>&nbsp;' ;
			 						}
			 						else{
						 					html += '<a href="javascript:void(0);" class="move-up" title="Apna survey - Move choice up" ><img alt="" src="style/default/up.png" border="0" width="35"></a>&nbsp;' ;
						 					html += '<a href="javascript:void(0);" class="move-down" title="Apna survey - Move choice down" ><img alt="" src="style/default/down.png" border="0" width="35"></a>&nbsp;' ;
			 						} 
			 					}
			 					else{ // show only up button
				 					html += '<a href="javascript:void(0);" class="move-up" title="Apna survey - Move choice up" ><img alt="" src="style/default/up.png" border="0" width="35"></a>&nbsp;' ;
				 					html += '<a style="visibility:hidden;" href="javascript:void(0);"  class="move-down" title="Apna survey - Move choice down" ><img alt="" src="style/default/down.png" border="0" width="35"></a>&nbsp;' ;
			 					}
			 				}
			 				html += '<a class="delete-choice" href="javascript:void(0);" title="Apna survey - Delete choice" ><img alt="" src="style/default/delete.png" border="0" width="35"></a>&nbsp;' ;
			 				html += '</td>' ;
			 				html += '</tr>' ; 
			 				 
			 		}
			 			    html += '</table>' ;
			    }
			    else{
			        html += '<label>' + 'No choice found'  + '</label>' ;
			    }
			utilObject.getDivObject('choicelisting').innerHTML = html ;
 			utilObject.hideBusy() ;
 			// utilObject.switchDisplayDiv('choicelisting', '', '', 'homepage');			  		
 		}
 		else if( action == 'showtabularchoices' ){
 		
 				if( tabularChoiceArray !=null && tabularChoiceArray.length >0 ){
		 				html += '<table id="mytableid" width="100%">' ;
 				    for(var i=0; i<tabularChoiceArray.length; i++){
			 				var l = tabularChoiceArray[i]
	 						var choice = utilObject.trim( utilObject.decode64( l.choice )) ;
				 			var score =  l.score ;
				 			var isDefault =  l.isDefault ;
			 				
			 				var linkid = 'surveylink' + l.id ;
			 			if((i % 2 == 0))	
			 				html += '<tr class="even">' ;
			 			else
			 			    html += '<tr class="odd">' ;
			 				html += '<td>' + utilObject.decode64( l.choice ) + '</td>' ;
			 				
			 			
			 			if( l.commentRequired*1 == COMMENT_FIELD_REQUIRED_YES )	
			 				html += '<td>Comment field required</td>' ;
			 			else
			 				html += '<td>Comment field not required</td>' ;
			 			
			
			 				
			 				html += '<td align="right" valign="middle" width="180px">' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Edit choice" onclick="doTabularAction(' + "'" + 'edittabularchoice' + "' , " + i +  ' )" ><img alt="" src="style/default/edit.png" border="0" width="35"></a>&nbsp;' ;
			 				if( tabularChoiceArray.length >1 )  
			 				{
			 					if( i != tabularChoiceArray.length-1 ){ // show both up and down button
			 						if( i == 0){
			 						        html += '<a style="visibility:hidden;" href="javascript:void(0);" title="Apna survey - Move choice up"  onclick="doTabularAction(' + "'" + 'movetabularchoiceup' + "' , " + i +  ' )" ><img alt="" src="style/default/up.png" border="0" width="35"></a>&nbsp;' ;
						 					html += '<a href="javascript:void(0);" title="Apna survey - Move choice down" onclick="doTabularAction(' + "'" + 'movetabularchoicedown' + "' , " + i +  ' )" ><img alt="" src="style/default/down.png" border="0" width="35"></a>&nbsp;' ;
			 						}
			 						else{
						 					html += '<a href="javascript:void(0);" title="Apna survey - Move choice up" onclick="doTabularAction(' + "'" + 'movetabularchoiceup' + "' , " + i +  ' )" ><img alt="" src="style/default/up.png" border="0" width="35"></a>&nbsp;' ;
						 					html += '<a href="javascript:void(0);" title="Apna survey - Move choice down" onclick="doTabularAction(' + "'" + 'movetabularchoicedown' + "' , " + i +  ' )" ><img alt="" src="style/default/down.png" border="0" width="35"></a>&nbsp;' ;
			 						} 
			 					}
			 					else{ // show only up button
				 					html += '<a href="javascript:void(0);" title="Apna survey - Move choice up" onclick="doTabularAction(' + "'" + 'movetabularchoiceup' + "' , " + i +  ' )" ><img alt="" src="style/default/up.png" border="0" width="35"></a>&nbsp;' ;
				 					html += '<a style="visibility:hidden;" title="Apna survey - Move choice down" href="javascript:void(0);"  onclick="doTabularAction(' + "'" + 'movetabularchoicedown' + "' , " + i +  ' )" ><img alt="" src="style/default/down.png" border="0" width="35"></a>&nbsp;' ;
			 					}
			 				}
			 				html += '<a href="javascript:void(0);" title="Apna survey - Delete choice" onclick="doTabularAction(' + "'" + 'deletetabularchoice' + "' , " + i +  ' )" ><img alt="" src="style/default/delete.png" border="0" width="35"></a>&nbsp;' ;
			 				html += '</td>' ;
			 				html += '</tr>' ; 
			 				 
			 		}
			 			    html += '</table>' ;
			    }
			    else{
			        html += '<label>' + 'No choice found'  + '</label>' ;
			    }
				utilObject.getDivObject('choicelistingdiv1').innerHTML = html ;
 				utilObject.hideBusy() ;
 				// utilObject.switchDisplayDiv('choicelisting', '', '', 'homepage'); 		
 		 }
 		 else if( action == 'showcoloumnlisting' ){
				// var type = typedb.get({id:l.type})[0].name ;
 				if( selectedColoumnArray !=null && selectedColoumnArray.length >0 ){
		 				html += '<table  width="100%">' ;
 				    for(var i=0; i<selectedColoumnArray.length; i++){
			 				var l = selectedColoumnArray[i]
	 						var coloumn = utilObject.trim( utilObject.decode64( l.coloumn )) ;
				 			var type = typedb.get({id:l.type})[0].name ;
			 			if((i % 2 == 0))	
			 				html += '<tr class="even">' ;
			 			else
			 			    html += '<tr class="odd">' ;
			 				html += '<td>' + coloumn + '</td>' ;
			 				html += '<td>' + type  + '</td>' ;
			 				html += '<td align="right" valign="middle" width="180px">' ;
			 				html += '<a href="javascript:void(0);" title="Apna survey - Edit column" onclick="doTabularAction(' + "'" + 'edittabularcoloumn' + "' , " + i +  ' )" ><img alt="" src="style/default/edit.png" border="0" width="35"></a>&nbsp;' ;
			 				if( selectedColoumnArray.length >1 )  
			 				{
			 					if( i != selectedColoumnArray.length-1 ){ // show both up and down button
			 						if( i == 0){
			 						        html += '<a style="visibility:hidden;" href="javascript:void(0);" title="Apna survey - Move column up"  onclick="doTabularAction(' + "'" + 'movetabularcoloumnup' + "' , " + i +  ' )" ><img alt="" src="style/default/up.png" border="0" width="35"></a>&nbsp;' ;
						 					html += '<a href="javascript:void(0);" title="Apna survey - Move column down" onclick="doTabularAction(' + "'" + 'movetabularcoloumndown' + "' , " + i +  ' )" ><img alt="" src="style/default/down.png" border="0" width="35"></a>&nbsp;' ;
			 						}
			 						else{
						 					html += '<a href="javascript:void(0);" title="Apna survey - Move column up" onclick="doTabularAction(' + "'" + 'movetabularcoloumnup' + "' , " + i +  ' )" ><img alt="" src="style/default/up.png" border="0" width="35"></a>&nbsp;' ;
						 					html += '<a href="javascript:void(0);" title="Apna survey - Move column down" onclick="doTabularAction(' + "'" + 'movetabularcoloumndown' + "' , " + i +  ' )" ><img alt="" src="style/default/down.png" border="0" width="35"></a>&nbsp;' ;
			 						} 
			 					}
			 					else{ // show only up button
				 					html += '<a href="javascript:void(0);" title="Apna survey - Move column up" onclick="doTabularAction(' + "'" + 'movetabularcoloumnup' + "' , " + i +  ' )" ><img alt="" src="style/default/up.png" border="0" width="35"></a>&nbsp;' ;
				 					html += '<a style="visibility:hidden;" title="Apna survey - Move column down" href="javascript:void(0);"  onclick="doTabularAction(' + "'" + 'movetabularcoloumndown' + "' , " + i +  ' )" ><img alt="" src="style/default/down.png" border="0" width="35"></a>&nbsp;' ;
			 					}
			 				}
			 				html += '<a href="javascript:void(0);" title="Apna survey - Delete column" onclick="doTabularAction(' + "'" + 'deletetabularcoloumn' + "' , " + i +  ' )" ><img alt="" src="style/default/delete.png" border="0" width="35"></a>&nbsp;' ;
			 				html += '</td>' ;
			 				html += '</tr>' ; 
			 				 
			 		}
			 			    html += '</table>' ;
			    }
			    else{
			        html += '<label>' + 'No coloumn found'  + '</label>' ;
			    }
				utilObject.getDivObject('coloumnlistingdiv').innerHTML = html ;
 				utilObject.hideBusy() ;
 				// utilObject.switchDisplayDiv('choicelisting', '', '', 'homepage'); 	 		 
 		 }
 		 else if( action == 'showgroupauthority'){
 		 	  var modules = selectedGroupAuthorization.modules ;
			  var tmpGroup = TAFFY(JSON.stringify( selectedGroupAuthorization.groups )) ;
			  
			  var html = '' ;
			  html += '<div class="box-header">' ;			  
			  html += '<h3 class="box-title">&nbsp;&nbsp;' +   utilObject.decode64( tmpGroup.get({id:param1})[0].name )   + ' authority' + '</h3>' ;
			  html += '</div>' ;
			  
			  html += '<form name="addeditgroupauthorizationform" method="post" onsubmit="manualValidate(event, ' + "'" +  'addeditgroupauthorizationform' + "'" + ' )" >'
			  html += '<input type="hidden" name="groupid" value="' + param1 + '" ' ;
			  html += '<div class="form-group">' ;
			  
			  html += '<button type="submit"  class="btn btn-primary">Submit</button>' ;
			  html += '</div>' ;
			  		
			  if( modules != null && modules.length > 0 ){
			  		for( var i = 0; i<modules.length; i++ ){
				  		var auth = tmpGroup.get({id:param1})[0].authorizations ;
				  		 
				  		var tmpAuth = TAFFY([]);
				  		if(auth != null && auth.length > 0)
				  			tmpAuth = TAFFY(JSON.stringify(auth));
				  		 	
			  			html += '<div class="form-group">' ;
			  			 
			  			html += '<table style="width:100%" >' ;
			  			html += '<tr>' ;
			  			html += '<td style="width:20%;" >' ;
			  					html += '<strong>&nbsp;&nbsp;' + utilObject.decode64( modules[i].name ) + '</strong>' ;
			  			html += '</td>' ;
			  			html += '<td>' ;
			  			//html += '</div>' ;
			  			//html += '<div class="form-group">' ;
			  			var mAuth = tmpAuth.get({groupId:param1,moduleId:modules[i].id})[0] ;
			  			 
			  			if( mAuth != null   ){
			  			 
			  				if(mAuth.authorityId*1 == 1 ){
			  					html += '&nbsp;&nbsp;<label><input type="radio"  name="module' + modules[i].id + '" value="1" checked>&nbsp;No access&nbsp;</label>'  ;
					  			html += '&nbsp;&nbsp;<label><input type="radio"  name="module' + modules[i].id + '" value="2" >&nbsp;Read&nbsp;</label>'  ;
					  			html += '&nbsp;&nbsp;<label><input type="radio"  name="module' + modules[i].id + '" value="3" >&nbsp;Read/Write&nbsp;</label>'  ;
			  				}
			  				else if(mAuth.authorityId*1 == 2 ){
			  					html += '&nbsp;&nbsp;<label><input type="radio"  name="module' + modules[i].id + '" value="1" >&nbsp;No access&nbsp;</label>'  ;
					  			html += '&nbsp;&nbsp;<label><input type="radio"  name="module' + modules[i].id + '" value="2" checked>&nbsp;Read&nbsp;</label>'  ;
					  			html += '&nbsp;&nbsp;<label><input type="radio"  name="module' + modules[i].id + '" value="3" >&nbsp;Read/Write&nbsp;</label>'  ;
			  				}
			  				else if(mAuth.authorityId*1 == 3 ){
			  					html += '&nbsp;&nbsp;<label><input type="radio"  name="module' + modules[i].id + '" value="1" >&nbsp;No access&nbsp;</label>'  ;
					  			html += '&nbsp;&nbsp;<label><input type="radio"  name="module' + modules[i].id + '" value="2" >&nbsp;Read&nbsp;</label>'  ;
					  			html += '&nbsp;&nbsp;<label><input type="radio"  name="module' + modules[i].id + '" value="3" checked>&nbsp;Read/Write&nbsp;</label>'  ;
			  				}
 
			  			
			  			}
			  			else{
					  			html += '&nbsp;&nbsp;<label><input type="radio"  name="module' + modules[i].id + '" value="1" >&nbsp;No access&nbsp;</label>'  ;
					  			html += '&nbsp;&nbsp;<label><input type="radio"  name="module' + modules[i].id + '" value="2" >&nbsp;Read&nbsp;</label>'  ;
					  			html += '&nbsp;&nbsp;<label><input type="radio"  name="module' + modules[i].id + '" value="3" checked>&nbsp;Read/Write&nbsp;</label>'  ;
			  			}
				  		 html += '</td></tr></table>'	
			  			 html += '<div>' ;
			  		}
			  		
			  		
			  }
			  html += '</form>' ;
			  $('#authorizationdetaildiv').html( html ) ; 
 		 }
 }
 
 function emitTabularQuestionHtml( question ){
 		var rows = question.rows ;
 		var cols = question.cols ;
 		html = '<table>' ;
 		// emit rows related html 
 		if( rows != null && rows.length > 0 ){
 			for(var i=0; i<rows.length; i++ ){
	 				var row = rows[i] ;
	 				if(i==0){
		 				html += '<tr><td colspan="2">' ;
		 				html += '<b>Rows</b>' ;
		 				html += '</td></tr>' ;
		 			}
		 			html += '<tr><td colspan="2">' ;
	 				html += (i +1) + '.&nbsp;&nbsp;' + utilObject.decode64( row.name ) ;
	 				html += '</td></tr>' ;
		 			
 			}
 		
 		}
 		
 		// emit coloumn html
 		if(cols != null && cols.length > 0 ){
 			for(var j=0; j< cols.length; j++ ){
	 				var col = cols[j] ;
	 				var choices = col.choices ;
	 				if(j==0){
			 				html += '<tr><td colspan="2">' ;
			 				html += '<b>Coloumns</b>' ;
			 				html += '</td></tr>' ;
			 		}
			 				var type = typedb.get({id:col.type})[0].name ;
			 				html += '<tr><td>' ;
			 				html += (j +1) + '.&nbsp;&nbsp;' + utilObject.decode64( col.coloumn ) ;
			 				html += '</td>' ;
			 				
			 				html += '<td>'
			 				html += type ;
			 				html += '</td></tr>' ;
			 				
			 		if(choices != null && choices.length > 0 ) {
			 				html += '<tr><td colspan="2">' ;
			 				html += '<b>Choices</b>' ;
			 				html += '</td></tr>' ;
			 				html += '<tr><td colspan="2" >' ;
			 				html += '<ul>' ; 
				 			for( var k=0; k<choices.length; k++ ){
				 				var commentRequired = "" ;
				 				if(choices[k].commentRequired*1 == COMMENT_FIELD_REQUIRED_YES){
				 					commentRequired = 'Comment required' ;
				 				}
				 				
				 				
				 				html += '<li>' + utilObject.decode64( choices[k].choice ) ;
				 			 
				 				html += '&nbsp;&nbsp;' + commentRequired + '</li>' ;
				 				
				 				
				 			}
				 			html += '</ul>' ;
				 			html += '</td></tr>' ;
			 		}	
			 		
			 		if(col.type*1 == QUESTION_TYPE_RANGE){
			 				html += '<tr><td>' ;
			 				html += '<ul>' ;
			 				html +=	'<li>Range from:&nbsp;' + col.rangeFrom + '</li>' ;
			 				html +=	'<li>Range to:&nbsp;' + col.rangeTo + '</li>' ;
			 				html +=	'<li>Range increment:&nbsp;' + col.rangeIncrement + '</li>' ;
			 				
			 				html += '</ul>' ;
			 				html += '</td></tr>' ;
					 			 
			 			
			 		}	
			 				
 			}
 		
 		}
 		html += '</table>' ;
 		
 		return html ;
 }
 
 function handlePopup(action, param1){
	    if( action == ACTION_PREVIEW_A_SECTION ||  action == ACTION_PREVIEW_A_SURVEY ){
			        var html =	doPreviewAction(action, param1) ;
				     
			     
				    $('#mypopupdiv').html(html);
					 $("#dtBox").DateTimePicker({				
							dateTimeFormat: "yyyy-MM-dd hh:mm:ss",
							dateFormat: "yyyy-MM-dd",
							timeFormat: "hh:mm",
							animationDuration: 100
					});	
		   	     $('#mypopuplink').click();
	    } 
	    else if( action == ACTION_PREVIEW_A_QUESTION ){
 		     var html =	doPreviewAction(action, param1) ;
 	     
 		     $('#mypopupdiv').html(html);
			 $("#dtBox").DateTimePicker({				
					dateTimeFormat: "yyyy-MM-dd hh:mm:ss",
					dateFormat: "yyyy-MM-dd",
					timeFormat: "hh:mm",
					animationDuration: 100
			});	
    	     $('#mypopuplink').click();
 		}
	    else if( action == ACTION_GET_SURVEY_RESPONSE_BY_ID ){
	    	alert('Inside action ACTION_GET_SURVEY_RESPONSE_BY_ID') ;
	    	var sResponse = param1 ;
	    	var html ='Survey response preview' ;
			var survey = sResponse.survey ;
			var sections = survey.sections ;		
			var displaySetting = survey.displaySetting ;
			var html = '<table width="100%" cellpadding="1" cellspacing="5">' ;
			
				if(displaySetting.surveyTitle == SURVEY_TITLE_ON_SUBMISSION_PAGE ){
					html += '<tr><td class="title" >' ;
					html +=  utilObject.decode64( survey.title )   ;
					html += '</td></tr>' ;
					html += '<tr><td><hr /></td></tr>' ;
				}
				else if( displaySetting.surveyTitle  == SURVEY_TITLE_DESCRIPTION_ON_SUBMISSION_PAGE) {
					html += '<tr><td class="title">' ;
					html +=  utilObject.decode64( survey.title ) ;
					html += '</td></tr>' ;
					
					html += '<tr><td class="ss-rightlabel" >' ;
					html +=  utilObject.decode64( survey.description )  ;
					html += '</td></tr>' ;
					html += '<tr><td><hr /></td></tr>' ;
				}
				
				
			if( sections != null && sections.length > 0 ){
					if( sections != null && sections ){
						 
						for(var i=0; i<sections.length; i++ ){
							html += emitSectionWiseResponse(sections[i], displaySetting ) ;
						}				
					}
					 
			}
	    	
	    	html += '</table>' ;
	        $('#mypopupdiv').html(html);
	        $('#mypopuplink').click();
	    }
 }
 
 function emitSectionWiseResponse( section, setting ){
	 alert('Inside action emitSectionWiseResponse') ;
	    var html = ''
		if(setting.sectionTitle == SECTION_TITLE_ON_SUBMISSION_PAGE ){
			html += '<tr><td class="sectiontitle" >' ;
			html +=  utilObject.decode64( section.title )  ;
			html += '</td></tr>' ;
			html += '<tr><td><hr /><td></tr>' ;
		}
		else if( setting.sectionTitle  == SECTION_TITLE_DESCRIPTION_ON_SUBMISSION_PAGE) {
			html += '<tr><td class="sectiontitle">' ;
			html +=  utilObject.decode64( section.title )  ;
			html += '</td></tr>' ;
			
			html += '<tr><td >' ;
			html += utilObject.decode64( section.description )  ;
			html += '</td></tr>' ;
			html += '<tr><td><hr /><td></tr>' ;
		}
		
		html += emitQuestionResponse( section.questions ) ;
		return html;
 }
 
 function sortChoicesByRank(a,b){
	 	 
	 	return a.rank - b.rank ;
 }
  

 
 function emitQuestionResponse(questions){
	 alert('Inside action emitQuestionResponse') ;
	 var html = '' ;
	 for(var i=0; i<questions.length; i++ ){
		 alert('Index i : ' + i );
		  var q = questions[i];
		    html += '<tr><td class="questions" >' ;		
		    if(q.type != QUESTION_TYPE_TABULAR )
		    	html +=   utilObject.decode64(q.question)  ;
		    else
		    	html +=   utilObject.decode64(q.question) +' TABULAR' ;
			html += '</td></tr>' ;
			var lightbox_data = 'image-' + (new Date()).getTime() ;
			if(q.file != null && q.file.id != -1){
					html += '<tr><td align="left" >' ;
					html +=  '<a href="' + q.file.imageUrl + '" data-lightbox="' + lightbox_data + '" data-title="' + ''  + '">' ;
					html += '<img style="height:100px;" src="' + q.file.thumbnailUrl + '" alt="" /> ' ;				
					html += '</a>'  ;
					html += '</td></tr>' ;
			} 
			if(q.type != QUESTION_TYPE_TABULAR ){
				if(  q.type == QUESTION_TYPE_TEXT_SINGLE_LINE || q.type == QUESTION_TYPE_TEXT_MULTI_LINE ||
						q.type == QUESTION_TYPE_Alphanumeric || q.type == QUESTION_TYPE_NUMBER_WITHOUT_DECIMAL ||
						q.type == QUESTION_TYPE_NUMBER_WITH_DECIMAL || q.type == QUESTION_TYPE_EMAIL ||
						q.type == QUESTION_TYPE_PHONE || q.type == QUESTION_TYPE_WEBSITE || q.type == QUESTION_TYPE_RANGE ||
						 q.type == QUESTION_TYPE_DATE_PICKER ||  q.type == QUESTION_TYPE_TIME_PICKER ){
					html += '<tr><td align="left" >' ;
					html += utilObject.decode64( q.answer );
					html += '</td></tr>' ;
					
				}
				else if(q.type*1 == QUESTION_TYPE_SINGLE_ANSWER_TEXT || q.type*1 == QUESTION_TYPE_MULTIPLE_ANSWER_TEXT ){
					choices =  q.choices ;
					html += '<tr><td align="left" >' ;
					var selectedValues = '' ;
					for(l=0; l<choices.length; l++ ){
						if(choices[l].selected == CHOICE_SELECTED_YES){
							if(selectedValues == '' )
								selectedValues = utilObject.decode64(choices[l].choice) ;
							else
								selectedValues = '<br/>' + utilObject.decode64(choices[l].choice); 
						}
					}
					html +=  selectedValues ;
					html += '</td></tr>' ;
				}
				else if( q.type*1 == QUESTION_TYPE_SINGLE_ANSWER_IMAGE || q.type*1 == QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE ){
					choices =  q.choices ;
					html += '<tr><td align="left" >' ;
					var selectedValues = '' ;
					for(l=0; l<choices.length; l++ ){
						if(choices[l].selected == CHOICE_SELECTED_YES){
							if(selectedValues == '' ){
								selectedValues += '<img src="' + choices[l].file.thumbnailUrl + '" alt="" /><br/>'
								selectedValues += utilObject.decode64(choices[l].choice) ;
							}
							else{
								selectedValues += '<br/><br/>' +  '<img src="' + choices[l].file.thumbnailUrl + '" alt="" /><br/>'
								selectedValues += utilObject.decode64(choices[l].choice) ;
							}
						}
					}
					html +=  selectedValues ;
					html += '</td></tr>' ;
				}
				else if( q.type*1 == QUESTION_TYPE_PREFERED_CHOICE_TYPE ){
					var choices =  q.choices ;
					choices.sort( sortChoicesByRank );
					html += '<tr><td>' ;
					for(var l=0; l<choices.length; l++ ){
						html += utilObject.decode64(choices[l].choice) + ' : ' + choices[l].rank + '<br />' ;
					}
					html += '</td></tr>' ;
				}
				else if( q.type == QUESTION_TYPE_DATE_RANGE_PICKER || q.type == QUESTION_TYPE_TIME_RANGE_PICKER ){
					 
					 html +='<tr><td><table cellpadding="2" cellspacing= "2" >' ;
					 
					 html += '<tr><td>From</td>';
					 html += '<td>' + utilObject.decode64( q.from ) + '</td></tr>' ;
					 html += '<tr><td>To</td>';
					 html += '<td>' + utilObject.decode64( q.to ) + '</td></tr>' ;
					 
					 html +='</table></td></tr>';
			    }	
				else if( q.type == QUESTION_TYPE_SIGNATURE){
					 html += '<tr><td>' ;
					 html += '<img src="' + q.signatureFile.imageUrl + '" alt="" />' ;
					 html += '</td></tr>'
					 html += '<tr><td><table cellpadding="2" cellspacing= "2" >' ;
					 html += '<tr><td>Signature of</td>' ;
					 html += '<td>' + utilObject.decode64( q.signatureOf )+ '</td></tr>' ;
					 html += '</table></td></tr>' ;
				}
				
				if(utilObject.trim(utilObject.decode64( q.comment )) != ''){
					html += '<tr><td align="left" ><i>' ;
					html += utilObject.decode64( q.comment );
					html += '</i></td></tr>' ;
				}
				
			}
			else{
				 var rows = q.rows ;
				 for(var j=0; j<rows.length; j++ ){
						var cols = rows[j].cols ;
					 
						 
					 for(var k =0; k<cols.length; k++ ){
						 var col= cols[k];
						 html += '<tr><td class="questions" >' ;
						 if(rows[j].visible*1 == 1)
						    html +=   utilObject.decode64(col.coloumn) + utilObject.decode64( rows[i].name ) +' [ '+ j +', '+ i + ']' ;
						 else
							 html +=   utilObject.decode64(col.coloumn) + '[ '+ j +', '+ i + ']' ;
							 
						 html += '</td></td>';
						    
						 if(  col.type == QUESTION_TYPE_TEXT_SINGLE_LINE || col.type == QUESTION_TYPE_TEXT_MULTI_LINE ||
								 col.type == QUESTION_TYPE_Alphanumeric || col.type == QUESTION_TYPE_NUMBER_WITHOUT_DECIMAL ||
								 col.type == QUESTION_TYPE_NUMBER_WITH_DECIMAL || col.type == QUESTION_TYPE_EMAIL ||
								 col.type == QUESTION_TYPE_PHONE || col.type == QUESTION_TYPE_WEBSITE || col.type == QUESTION_TYPE_RANGE ||
								 col.type == QUESTION_TYPE_DATE_PICKER ||  col.type == QUESTION_TYPE_TIME_PICKER ){
								html += '<tr><td align="left" >' ;
								html += utilObject.decode64( col.answer );
								html += '</td></tr>' ;
								if(utilObject.trim(utilObject.decode64( col.comment )) != ''){
									html += '<tr><td align="left" ><i>' ;
									html += utilObject.decode64( col.comment );
									html += '</i></td></tr>' ;
								}
						  }
						  else if(col.type*1 == QUESTION_TYPE_SINGLE_ANSWER_TEXT || col.type*1 == QUESTION_TYPE_MULTIPLE_ANSWER_TEXT ){
								choices =  col.choices ;
								html += '<tr><td align="left" >' ;
								var selectedValues = '' ;
								for(l=0; l<choices.length; l++ ){
									if(choices[l].selected == CHOICE_SELECTED_YES){
										if(selectedValues == '' )
											selectedValues = utilObject.decode64(choices[l].choice) ;
										else
											selectedValues = '<br/>' + utilObject.decode64(choices[l].choice); 
									}
								}
								html += selectedValues ;
								html += '</td></tr>' ;
						 }
						 else if( col.type*1 == QUESTION_TYPE_SINGLE_ANSWER_IMAGE || col.type*1 == QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE ){
								choices =  col.choices ;
								html += '<tr><td align="left" >' ;
								var selectedValues = '' ;
								for(l=0; l<choices.length; l++ ){
									if(choices[l].selected == CHOICE_SELECTED_YES){
										if(selectedValues == '' ){
											selectedValues += '<img src="' + choices[l].file.thumbnailUrl + '" alt="" /><br/>' ;
											selectedValues += utilObject.decode64(choices[l].choice) ;
										}
										else{
											selectedValues += '<br/><br/>' +  '<img src="' + choices[l].file.thumbnailUrl + '" alt="" /><br/>' ;
											selectedValues += utilObject.decode64(choices[l].choice) ;
										}
									}
								}
								html +=  selectedValues ;
								html += '</td></tr>' ;
						 }
						 else if( col.type*1 == QUESTION_TYPE_PREFERED_CHOICE_TYPE ){
								var choices =  col.choices ;
								choices.sort( sortChoicesByRank );
								html += '<tr><td>' ;
								for(var l=0; l<choices.length; l++ ){
									html += utilObject.decode64(choices[l].choice) + ' : ' + choices[l].rank + '<br />' ;
								}
								html += '</td></tr>' ;
						 }
						 else if( col.type == QUESTION_TYPE_DATE_RANGE_PICKER || col.type == QUESTION_TYPE_TIME_RANGE_PICKER ){
								 
								 html +='<tr><td><table cellpadding="2" cellspacing= "2" >' ;
								 
								 html += '<tr><td>From</td>';
								 html += '<td>' + utilObject.decode64( col.from ) + '</td></tr>' ;
								 html += '<tr><td>To</td>';
								 html += '<td>' + utilObject.decode64( col.to ) + '</td></tr>' ;
								 
								 html +='</table></td></tr>';
						 }	
						 else if( col.type == QUESTION_TYPE_SIGNATURE){
								 html += '<tr><td>' ;
								 html += '<img src="' + col.signatureFile.imageUrl + '" alt="" />' ;
								 html += '</td></tr>'
								 html += '<tr><td><table cellpadding="2" cellspacing= "2" >' ;
								 html += '<tr><td>Signature of</td>' ;
								 html += '<td>' + utilObject.decode64( col.signatureOf )+ '</td></tr>' ;
								 html += '</table></td></tr>' ;
						 }
						 
						 if(utilObject.trim(utilObject.decode64( col.comment )) != ''){
								html += '<tr><td align="left" ><i>' ;
								html += utilObject.decode64( col.comment );
								html += '</i></td></tr>' ;
						 }
					 }
				 }
			}
	 }
	 return html ;
	 utilObject.hideBusy();
 }
 
 function manageSurveyAuthorization(command, auth ){
	    var locations = auth.locations ;
		var items = auth.items;
		var surveys = auth.surveys ;
		var users = auth.users ;
		var authLocations = auth.authLocations ;
		var authItems = auth.authItems ;
		var authSurveys = auth.authSurveys ;
		var authorizedUserIds = auth.authorizedUserIds ;
 		if( command == ACTION_GET_SURVEY_AUTHORIZATION_SURVEY ){
 				var html = '' ;
	 			if(users != null && users.length > 0 ) {	
		 				for(var i=0; i<users.length; i++ ){
			 						var isChecked = false ;
			 						if(authorizedUserIds != null && authorizedUserIds.length > 0 ){
				 						for(var j=0; j<authorizedUserIds.length ; j++ ){
				 							if(authorizedUserIds[j]*1 == users[i].id){
				 								isChecked = true;
				 								break;
				 							}
				 						}
				 					}
						 			html += '<div class="form-group">' ;
						 			html += '<label title="Check to authorize user to collect responses for survey" >' ;
						 		if(isChecked == false){	
						 			html += '<input type="checkbox" name="users" value="' + users[i].id + '" title="Check to authorize user to collect responses for survey"  />' ;
						 		}
						 		else{
						 			html += '<input type="checkbox" name="users" value="' + users[i].id + '" title="Check to authorize user to collect responses for survey" checked  />' ;
						 		}
						 			
						 			html += utilObject.decode64( users[i].firstName )+ " " + utilObject.decode64( users[i].lastName )  + '</label>' ;
						 			html += '</div>' ;
				 		}
		 		}													 
			$('#surveyauthorizationbody').html( html ) ; 
		 			 utilObject.hideBusy() ;
		 			 utilObject.switchDisplayDiv('addeditsurveyauthorizationdiv', '', '', 'homepage');				 
							 
					
 		}
 		else if( command == ACTION_GET_SURVEY_AUTHORIZATION_USER ){
 				var html = '<div class="form-group">' ;
 				
				html += '<p><b>Select items  wants to authorize for selected user</b></p>'							
				html += '</div>' ;						
					
	 			if(items != null && items.length > 0 ) {	
		 				for(var i=0; i<items.length; i++ ){
			 						var isChecked = false ;
			 						if(authItems != null && authItems.length > 0 ){
				 						for(var j=0; j<authItems.length ; j++ ){
				 							if(authItems[j].itemId*1 == items[i].id){
				 								isChecked = true;
				 								break;
				 							}
				 						}
				 					}
						 			html += '<div class="form-group">' ;
						 			html += '<label title="Check to authorize items" >' ;
						 		if(isChecked == false){	
						 			html += '<input type="checkbox" name="items" value="' + items[i].id + '" title="Check to authorize items"  />' ;
						 		}
						 		else{
						 			html += '<input type="checkbox" name="items" value="' + items[i].id + '" title="Check to authorize items" checked  />' ;
						 		}
						 			
						 			html += utilObject.decode64( items[i].name ) + '</label>' ;
						 			html += '</div>' ;
				 		}
		 		}
		 		else {
			 		html += '<div class="form-group">' ; 				
					html += '<p>No item found. Please create few items and then authorize it to one or more user'							
					html += '</div>' ;			
		 		}			
		 		html += '<div class="form-group">' ; 				
				html += '<p><b>Select locations  wants to authorize for selected user</b></p>'							
				html += '</div>' ;					
				if(locations != null && locations.length > 0 ) {	
		 				for(var i=0; i<locations.length; i++ ){
			 						var isChecked = false ;
			 						if(authLocations != null && authLocations.length > 0 ){
				 						for(var j=0; j<authLocations.length ; j++ ){
				 							if(authLocations[j].locationId*1 == locations[i].id){
				 								isChecked = true;
				 								break;
				 							}
				 						}
				 					}
						 			html += '<div class="form-group">' ;
						 			html += '<label title="Check to authorize items" >' ;
						 		if(isChecked == false){	
						 			html += '<input type="checkbox" name="locations" value="' + locations[i].id + '" title="Check to authorize locations"  />' ;
						 		}
						 		else{
						 			html += '<input type="checkbox" name="locations" value="' + locations[i].id + '" title="Check to authorize locations" checked  />' ;
						 		}						 			
						 			html += utilObject.decode64( locations[i].name ) + '</label>' ;
						 			html += '</div>' ;
						 			
						 			
				 		}
		 		}	
		 		else {
			 		html += '<div class="form-group">' ; 				
					html += '<p>No location found. Please create few locations and then authorize it to one or more user'							
					html += '</div>' ;			
		 		}	
		 		html += '<div class="form-group">' ; 				
				html += '<p><b>Select surveys which you wants to authorize to selected user</b></p>'							
				html += '</div>' ;					
				if(surveys != null && surveys.length > 0 ) {	
		 				for(var i=0; i<surveys.length; i++ ){
			 						var isChecked = false ;
			 						if(authSurveys != null && authSurveys.length > 0 ){
				 						for(var j=0; j<authSurveys.length ; j++ ){
				 							if(authSurveys[j].surveyId*1 == surveys[i].id){
				 								isChecked = true;
				 								break;
				 							}
				 						}
				 					}
						 			html += '<div class="form-group">' ;
						 			html += '<label title="Check to authorize surveys" >' ;
						 		if(isChecked == false){	
						 			html += '<input type="checkbox" name="surveys" value="' + surveys[i].id + '" title="Check to authorize surveys to selected user"  />' ;
						 		}
						 		else{
						 			html += '<input type="checkbox" name="surveys" value="' + surveys[i].id + '"  title="Check to authorize surveys to selected user" checked  />' ;
						 		}						 			
						 			html += utilObject.decode64( surveys[i].title ) + '</label>' ;
						 			html += '</div>' ;
						 			
						 			
				 		}
		 		}	
		 		else {
			 		html += '<div class="form-group">' ; 				
					html += '<p>No location found. Please create few locations and then authorize it to one or more user'							
					html += '</div>' ;			
		 		}	
					 $('#userauthorizationbody').html( html ) ; 
		 			 utilObject.hideBusy() ;
		 			 utilObject.switchDisplayDiv('addedituserauthorizationdiv', '', '', 'homepage');	
 		}
 }
 