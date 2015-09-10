/**
 * Create a new object of currentObject for fresh survey
 * To resume a survey, just replace, this currentObject fields with that one object
 * @returns
 */
CurrentObject = function(){
	this.sectionIndex = 0 ;
	this.saveCount = 0 ;
	this.MaxQuestionCountForSavePoint = 3 ;
	this.MaxRadioButtonCount = 5 ;
	this.signatureArray = null;
	// Response field
	this.timeStamp = new Date().getTime() ;
	this.survey = null ;	 
	
	this.locationId = -1 ;
	this.locationName = "" ;
	this.itemId = -1 ;
	this.itemName = "" ;
	this.ipAddress = "" ;
	this.responderId = -1 ;
	this.responderName = "" ;
	this.source = "" ;	
	this.dateTime = "" ;
	this.longitude = "" ;
	this.latitude = "" ;
	this.isNew = true ; 
	
}	
var currentObject = new CurrentObject(); 

/**
 * 
 */
objectName=function(){
	this.fieldName = '' ;
	this.tableName = '' ;
	this.fromName = '' ;  // date range time range type question	
	this.toName = '' ;
	this.canvasName= '' ;
	this.signatureOf = '' ;
}
/**
 * If prefered type question then fieldname will be name return by method + ''
 */
getObjectNames=function(q, param1 ){
	 
	var o = new objectName();
	if(q.rowId !=undefined && q.rowId*1 != -1 ){ // tabular question
		if( q.type == QUESTION_TYPE_DATE_RANGE_PICKER || q.type == QUESTION_TYPE_TIME_RANGE_PICKER  ){
			o.fieldName = 'tabularquestion' + "-" + param1 + "-" + q.id ;
			o.tableName = o.fieldName + 'table'  ;
			o.fromName = o.fieldName + 'from' ;
			o.toName = o.fieldName + 'to' ;
		}
		else if( q.type == QUESTION_TYPE_SIGNATURE ){
			o.canvasName = 'tabularquestioncanvas' + "-" + param1 + "-" + q.id ;
			o.signatureOf = 'tabularsignature' + "-" + param1 + "-" + q.id ;
			o.tableName = o.canvasName + 'table'  ;
		}
		else{
			o.fieldName = 'tabularquestion'+ "-" + param1 + "-" + q.id ;
			o.tableName = o.fieldName + 'table'  ;
		}
		
	}
	else{
		if( q.type == QUESTION_TYPE_DATE_RANGE_PICKER || q.type == QUESTION_TYPE_TIME_RANGE_PICKER  ){
			o.fieldName = 'question' + q.id ;
			o.tableName = o.fieldName + 'table'  ;
			o.fromName = o.fieldName + 'from' ;
			o.toName = o.fieldName + 'to' ;
		}
		else if( q.type == QUESTION_TYPE_SIGNATURE ){
			o.canvasName = 'canvas' + q.id ;
			o.signatureOf = 'signature' + q.id ;
			o.tableName = o.canvasName + 'table'  ;
		}
		else{
			o.fieldName = 'question' + q.id ;
			o.tableName = o.fieldName + 'table'  ;
		}
	}
	
	return o ;
}
/**
 * Method used to get signature object
 */
signatureObject=function(){
	this.question = null ;
	this.index = undefined;
}

	
/**
 * Method used to preview surveys, sections or a question
 * @param action
 * @param param1
 */
doPreviewAction = function (action, param1 ){
	alert('action : ' + action ) ;
	var html = '<form name="responsemainform" id="responsemainform" method="post" onsubmit="manualValidate(event, ' +  'addedittabularform' + ' )" ><table width="100%" cellpadding="1" cellspacing="5">' ;
	// EMIT BUTTONS, BASED ON SETTING
	if(action == ACTION_PREVIEW_A_QUESTION ){
		var questions = questiondb.get({id:param1}) ;
		html += '<tr><td>' ;
		html += emitQuestionHtml( questions ) ;
		html += '</td></tr>' ;
	}
	else if(action == 'setquestionvalue'){
		// This method will also be resposible to create/update save points
		/*		 
			1. In Radio, CheckBox, Select
				call method onchange
			
			2. In Text area and text field
			    call method on focus lost
			3. For overall comment we can put it for onchange
		 */
		questionId = param1 ;
	}
	else if( action == 'finish' ){
		var isValidated = manageValidation(true) ;
		if(isValidated == true ){
			alert('overall comment :' + document.getElementById('overallcomment').value +' currentResponderLocation: '+currentResponderLocation ) ;
				if(currentSurveyResponse != null ){
					
					currentSurveyResponse.survey = currentObject.survey ; 
					currentSurveyResponse.overallComment = utilObject.encode64(document.getElementById('overallcomment').value);
					currentSurveyResponse.responderLocation = currentResponderLocation ;
				}
				else{
					currentSurveyResponse =  new SurveyResponse() ;
					currentSurveyResponse.survey = currentObject.survey ;
					currentSurveyResponse.locationId = currentObject.locationId ;
					currentSurveyResponse.itemId = currentObject.itemId ;
					currentSurveyResponse.responderId = currentObject.responderId ;					
					currentSurveyResponse.responderLocation = currentResponderLocation ;
					currentSurveyResponse.source = currentObject.source ;
					currentSurveyResponse.dateTime = formatDate(getUTCDateFromDate(new Date()), SURVEY_DATE_TIME_FORMAT );
					currentSurveyResponse.overallComment = utilObject.encode64(document.getElementById('overallcomment').value);
					// Manage datetime for save
				}
				var theform = document.forms[ 'welcomeform' ] ;
				currentSurveyResponse.responderId = responderId ;
				currentSurveyResponse.source = source ;
				currentSurveyResponse.locationId = theform.location.value ;
				currentSurveyResponse.itemId = theform.item.value ;
				
				
				handleRequest( ACTION_ADD_RESPONSE_OK, 'homepage', currentSurveyResponse );
				return ;
		}
	
	}
	else if(action == 'validatequestions' ){
			// param1 = next/previous etc.
		var isValidated = manageValidation(true) ;
		if(isValidated == true ){
			if(param1 == 'next'){
				currentObject.sectionIndex = currentObject.sectionIndex + 1 ;	
				
			}
			else if(param1 == 'previous'){
				currentObject.sectionIndex = currentObject.sectionIndex - 1 ;					 
			}
			 
		}
		else{
			return; 
		}
		
		html += emitSurveyHtml(currentObject ) ;
		html += '</table></form>' ;
		utilObject.hideBusy();
		$('#mypopupdiv').html(html);
		addEventInSignature() ;
		manageVisibility() ;
		
		$("#dtBox").DateTimePicker({			
			dateTimeFormat: "yyyy-MM-dd hh:mm:ss",
			dateFormat: "yyyy-MM-dd",
			timeFormat: "hh:mm",
			animationDuration: 100
		});
		
		$('#responsemainform').verify() ;
			
	}
	else if(action == ACTION_PREVIEW_A_SECTION ){
			var section = sectiondb.get({id:param1})[0] ;
			var survey = surveydb.get({id:section.surveyId})[0];
			var displaySetting = survey.displaySetting ;
			html += emitSectionHtml(section, displaySetting) ;
		
	}	
	else if( action == ACTION_PREVIEW_A_SURVEY  ){
		currentObject.sectionIndex = 0 ;
		currentObject.survey = getCompleteSurvey( param1 ) ;
		 
		//	var survey = surveydb.get({id:param1})[0];
		    
			html += emitSurveyHtml(currentObject ) ;
			
			
	}
	else if( action == 'showwelcomescreen' ){
		currentObject.survey = surveydb.get()[0] ;
		var theform = document.forms[ 'welcomeform' ] ;
		alert('SURVEY LENGTH :' + surveydb.get().length) ;
		var setting  = surveydb.get()[0].displaySetting ;
		theform.welcomebutton.value = utilObject.decode64( setting.next ) ;
		var tmpdb = TAFFY(businessSettingString) ;
		if( currentSurveyResponse != null ){
			responderId = currentSurveyResponse.responderId ;
			responseId = currentSurveyResponse.id ;
			 
		}
		
		
		if( responderId*1 != -1){
			if(tmpdb.get().length > 0 ){			
				$('#locationlabel').html(utilObject.decode64( tmpdb.get({key:LOCATION_LABEL})[0].value ));
				$('#itemlabel').html( utilObject.decode64( tmpdb.get( {key:ITEM_LABEL})[0].value ) );
			}
			
			var tmpdb = TAFFY(authorizedLocationString) ;
			if(tmpdb.get().length > 0){
				utilObject.populateLocationItem(theform.location, tmpdb.get() );
				//$('locationcontainer').show();
				document.getElementById('locationcontainer').style.display = '' ;
			}
			var tmpdb = TAFFY(authorizedItemString) ;
			if(tmpdb.get().length > 0){
				utilObject.populateLocationItem(theform.item, tmpdb.get() );
				document.getElementById('itemcontainer').style.display = '' ;
			}
			
		}
		else{
			theform.location.selectedIndex = 0 ;
			theform.item.selectedIndex = 0 ;
			document.getElementById('locationcontainer').style.display = 'none' ;
			document.getElementById('itemcontainer').style.display = 'none' ;
			 
//			$('locationcontainer').hide();
//			$('itemcontainer').hide();
		}
		
		if(responseId != -1 && currentSurveyResponse.itemId != -1 ) 
			utilObject.selectValueInList(theform.item, currentSurveyResponse.itemId ); 
		if(responseId != -1 && currentSurveyResponse.locationId != -1 ) 
			utilObject.selectValueInList(theform.location, currentSurveyResponse.locationId );
		
		var survey = surveydb.get()[0]
			$('#welcometitle').html(utilObject.decode64(survey.title));
			$('#welcomecontent').html(utilObject.decode64(survey.welcomeMessage));
		document.getElementById('welcomediv').style.display = '' ;
	//	$('#welcomediv').show;
		
	}
	else if( action == 'showsurveyafterwelcome' ){
		var theform = document.forms[ 'welcomeform' ] ;
		 $('#welcomeform').verify();
		 $('#welcomeform').validate(function(success){
			 if(success){
				 doPreviewAction(ACTION_GET_SURVEY_BY_ID, surveydb.get()[0].id ) ;
				 document.getElementById('welcomediv').style.display = 'none' ;
			 }
		 });
		 
		/*
		if(theform.location.length > 0 && theform.location.selectedIndex == 0 ){
			alert('select a location') ;
			return ;
		}
		else if(theform.item.length > 0 && theform.item.selectedIndex == 0 ){
			alert('select an item') ;
			return;
		}
		*/
	
	}
	else if(action == ACTION_GET_SURVEY_BY_ID ){
 
		currentObject.sectionIndex = 0 ;
		currentObject.survey = surveydb.get()[0] ;
		//	var survey = surveydb.get({id:param1})[0];
		 
		html += emitSurveyHtml( currentObject ) ;
		 
		
	}
	else if( action == 'next' ){
		currentObject.sectionIndex = currentObject.sectionIndex + 1 ;		 
		html += emitSurveyHtml(currentObject ) ;
	}
	else if(action == 'previous'){
		currentObject.sectionIndex = currentObject.sectionIndex - 1 ;
		html += emitSurveyHtml(currentObject ) ;
	}
	// EMIT BUTTONS, BASED ON SETTING
	html += '</table></form>' ;
	utilObject.hideBusy();
	if(action != 'next' && action != 'previous' && action != ACTION_GET_SURVEY_BY_ID  )
		return html ;
	else{
		$('#mypopupdiv').html(html);
		 
			$("#dtBox").DateTimePicker({			
				dateTimeFormat: "yyyy-MM-dd hh:mm:ss",
				dateFormat: "yyyy-MM-dd",
				timeFormat: "hh:mm",
				animationDuration: 100
		    });
		 
		
		manageVisibility() ;
		if(currentObject.signatureArray != null && currentObject.signatureArray.length >0 ) 
			addEventInSignature() ;
		
		$('#responsemainform').verify() ;
	}
}

getQuestionHtml=function(q){
	var html = '' ;
	if(q.coloumn == null || q.coloumn == undefined ){
		 		html = '<tr><td class="questions" >' ;		    	
				html +=   utilObject.decode64(q.question)  ;			    
				html += '</td></tr>' ;
				var lightbox_data = 'image-' + (new Date()).getTime() ;
				if(q.file != null && q.file.id != -1){
						html += '<tr><td align="left" >' ;
						html +=  '<a href="' + q.file.imageUrl + '" data-lightbox="' + lightbox_data + '" data-title="' + ''  + '">' ;
						html += '<img style="height:100px;" src="' + q.file.thumbnailUrl + '" alt="" /> ' ;				
						html += '</a>'  ;
						html += '</td></tr>' ;
				}
	}
	else{
	//	alert('q.repeatColoumsHeader : '+ q.repeatColoumsHeader + ' coloumn: ' +  utilObject.decode64(q.coloumn) );
		if(q.repeatColoumsHeader*1 != 1 ){
			html = '<tr><td class="questions" >' ;		    	
			html +=   utilObject.decode64(q.coloumn)  ;			    
			html += '</td></tr>' ;
		}
	}
		   
		
		return html ;
}
/**
 * Method used to emit question html
 * @param questions
 */
emitQuestionHtml = function( questions ){
	var html = '<table width="100%" cellpadding="1" cellspacing="0" >' ;
	if( questions != null && questions.length > 0 ){
		for(var index=0; index<questions.length; index++ ){
				var q = questions[index] ;
			 
				if(q.type*1 == QUESTION_TYPE_SINGLE_ANSWER_TEXT ){
					html += getMutipleChoiceSingleAnswerTextHtml( q, undefined, undefined, q.sectionId ) ;
				}
				else if(q.type*1 == QUESTION_TYPE_MULTIPLE_ANSWER_TEXT){
						html += getMutipleChoiceMultipleAnswerTextHtml( q, undefined, undefined, q.sectionId );
				}
				else if(q.type*1 == QUESTION_TYPE_SINGLE_ANSWER_IMAGE){
						html += getMutipleChoiceSingleAnswerImageHtml( q, undefined, undefined, q.sectionId ) ; 
				}
				else if( q.type*1 == QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE){
					html += getMutipleChoiceMultipleAnswerImageHtml( q, undefined, undefined, q.sectionId );					 
				}
				else if( q.type == QUESTION_TYPE_TEXT_SINGLE_LINE || q.type == QUESTION_TYPE_TEXT_MULTI_LINE ||
						q.type == QUESTION_TYPE_Alphanumeric || q.type == QUESTION_TYPE_NUMBER_WITHOUT_DECIMAL ||
						q.type == QUESTION_TYPE_NUMBER_WITH_DECIMAL || q.type == QUESTION_TYPE_EMAIL ||
						q.type == QUESTION_TYPE_PHONE || q.type == QUESTION_TYPE_WEBSITE || 
						q.type == QUESTION_TYPE_APHANUMERIC_WITH_SPACE )
				{
					 html += textTypeQuestionHtml(  q, undefined, undefined, q.sectionId  ) ;
				}
				else if( q.type == QUESTION_TYPE_RANGE ){
					html += getRangeTypeQuestion( q, undefined, undefined, q.sectionId ) ;
				}
				else if( q.type == QUESTION_TYPE_PREFERED_CHOICE_TYPE ){
					html += getPreferedTypeQuestion( q, undefined, undefined, q.sectionId ) ;
				}
				else if( q.type == QUESTION_TYPE_DATE_PICKER ||  q.type == QUESTION_TYPE_TIME_PICKER ){
					    html += getDateTimePickerTypeQuestion(  q, undefined, undefined, q.sectionId  );
				        
				}
				else if( q.type == QUESTION_TYPE_DATE_RANGE_PICKER || q.type == QUESTION_TYPE_TIME_RANGE_PICKER ){
						 html += getDateTimeRangePickerTypeQuestion( q, undefined, undefined, q.sectionId ) ;
				}	
				else if(q.type == QUESTION_TYPE_SIGNATURE ){
					html += getSignatureHtml( q, undefined, undefined, q.sectionId ) ; 
				}
				else if( q.type == QUESTION_TYPE_TABULAR){
			 
					 var rows = q.rows ;
					 var cols = rows[0].cols ;
					 html += getQuestionHtml(q) ;
					 html += '<tr><td colspan="2"><div class="scrolled"><table width="100%" class="alter1" >' ;
						 // Create title
					if(cols[0].repeatColoumsHeader == REPEAT_COLUMN_HEADER_YES ){
						 html += '<tr>' ;
						 for( var i = -1; i<cols.length  ; i++  ){
							 try{
									 if(i==-1){
										 if(rows[0].visible*1 == 1){
											 html += '<td></td>' ;
										 }
									 }else{										 
										 html += '<td>' + utilObject.decode64( cols[i].coloumn ) + '</td>'  ;
									 }
							 }catch(e){
								 
							 }
							 
						 }
						 html += '</tr>' ;						 
					 }
					 // now add rows and coloumn
					 for( var i=0; i<rows.length; i++ ){
						cols = rows[i].cols ;
					 	html += '<tr>' ;
					 	if(rows[0].visible*1 == 1)
					 		html += '<td valign="center" >' + utilObject.decode64( rows[i].name ) + '</td>' ;
					 	
 					 	for(var j=0; j<cols.length; j++ ){
 					 		var q1 = cols[j] ;
 					 		html += '<td><table width="100%" >' ; 					 		
			 					 		if(q1.type*1 == QUESTION_TYPE_SINGLE_ANSWER_TEXT ){
			 								html += getMutipleChoiceSingleAnswerTextHtml( q1, 'tabular' , i , q.sectionId ) ;
			 							}
			 							else if(q1.type*1 == QUESTION_TYPE_MULTIPLE_ANSWER_TEXT){
			 									html += getMutipleChoiceMultipleAnswerTextHtml(q1, 'tabular' , i,  q.sectionId  );
			 							}
			 							else if(q1.type*1 == QUESTION_TYPE_SINGLE_ANSWER_IMAGE){
			 									html += getMutipleChoiceSingleAnswerImageHtml(q1, 'tabular' , i,  q.sectionId ) ; 
			 							}
			 							else if( q1.type*1 == QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE){
			 								html += getMutipleChoiceMultipleAnswerImageHtml(q1, 'tabular' , i,  q.sectionId );					 
			 							}
			 							else if( q1.type == QUESTION_TYPE_TEXT_SINGLE_LINE || q1.type == QUESTION_TYPE_TEXT_MULTI_LINE ||
			 									q1.type == QUESTION_TYPE_Alphanumeric || q1.type == QUESTION_TYPE_NUMBER_WITHOUT_DECIMAL ||
			 									q1.type == QUESTION_TYPE_NUMBER_WITH_DECIMAL || q1.type == QUESTION_TYPE_EMAIL ||
			 									q1.type == QUESTION_TYPE_PHONE || q1.type == QUESTION_TYPE_WEBSITE )
			 							{
			 								 html += textTypeQuestionHtml( q1, 'tabular' , i,  q.sectionId  ) ;
			 							}
			 							else if( q1.type == QUESTION_TYPE_RANGE ){
			 								html += getRangeTypeQuestion(q1, 'tabular' , i,  q.sectionId ) ;
			 							}
			 							else if( q1.type == QUESTION_TYPE_PREFERED_CHOICE_TYPE ){
			 								html += getPreferedTypeQuestion(q1, 'tabular' , i,  q.sectionId ) ;
			 							}
			 							else if( q1.type == QUESTION_TYPE_DATE_PICKER ||  q1.type == QUESTION_TYPE_TIME_PICKER ){
			 								    html += getDateTimePickerTypeQuestion( q1, 'tabular' , i,  q.sectionId  );
			 							        
			 							}
			 							else if( q1.type == QUESTION_TYPE_DATE_RANGE_PICKER || q1.type == QUESTION_TYPE_TIME_RANGE_PICKER ){
			 									 html += getDateTimeRangePickerTypeQuestion(q1, 'tabular' , i,  q.sectionId ) ;
			 							}	
			 							else if(q1.type == QUESTION_TYPE_SIGNATURE ){
			 								html += getSignatureHtml(q1, 'tabular' , i, q.sectionId ) ; 
			 							}
 					 		 
 					 		html += '</table></td>';
 					 	}
					 	html += '</tr>' ;
					 }
					 
					 html += '</table></div></td></tr>' ;
 
				}
							  
		}
		
	}
	else{
		// No questions found
		html += '<tr><td colspan="2" >' ;
		html += 'No question found' ;
		html += '</td></tr>' ;
	}
	html += '</table>' ;
	return html ;
}
/**
 * Method used to emit section html
 */
function emitSectionHtml(section, setting){
	var html = '' ;
	
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
	if(currentObject.survey  != null && currentObject.survey != undefined )
		html += emitButtonHtml(currentObject.survey.displaySetting, 'start' ) ;
	var questions = section.questions ;
	html += '<tr><td>' ;
	html += emitQuestionHtml( questions ) ;
	html += '</td></tr>' ;
	if(currentObject.survey  != null && currentObject.survey  != undefined )
		html += emitButtonHtml(currentObject.survey.displaySetting, 'end' ) ;
	return html ;
}

/**
 * Method used to emit survey html
 */
function emitSurveyHtml( currentObject ){
	    currentObject.signatureArray = new Array();
		var survey = currentObject.survey ;
		var sections = survey.sections ;		
		var displaySetting = survey.displaySetting ;
		var html = '' ;
		
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
				if(displaySetting.displayStyle == DISPLAY_STYLE_SINGLE_PAGE ){
					for(var i=0; i<sections.length; i++ ){
						html += emitSectionHtml(sections[i], displaySetting ) ;
					}				
				}
				else{
					if(currentObject.sectionIndex == -1 )
					{
						currentObject.sectionIndex = 0
					}
					   
					html += emitSectionHtml(sections[currentObject.sectionIndex], displaySetting ) ;
				}
				
		}
		 
		return html ;
}

/**
 * Method used to get complete survey object
 * @param surveyId
 * @returns {___anonymous17885_17890}
 */
function getCompleteSurvey( surveyId ){
	var survey = surveydb.get({id:surveyId})[0] ;
	survey.sections = (sectiondb.get({surveyId:surveyId})) ;
	return survey  ;
}

 
/**
 * Method used to get button html 
 */
function emitButtonHtml( setting, param1 ){
	if(setting == null || setting == undefined) // preview so don't show button
		return '' ;
	
		var isSubmitButtonEmited = false ;
		var overallCommentHtml = '' ;
		var html = '<tr><td align="left" ><div class="form-group">' ;
		if(setting.displayStyle == DISPLAY_STYLE_SINGLE_PAGE ){
			isSubmitButtonEmited =true ;
			html +=  '<button type="button" class="btn btn-primary" onclick="doPreviewAction(' + "'" + 'finish'  + "' ," + "'" + 'finish' + "'" + ')" >' + utilObject.decode64( setting.finish ) + '</button>' ;	
		}
		else{
			var length = currentObject.survey.sections.length ;
			if( currentObject.sectionIndex < (length-1)  )
			  html += '<a href="javascript:void(0);" onclick="doPreviewAction(' + "'" + 'validatequestions'  + "' ,"  + "'" + 'next' + "'" + ')" ><button type="button" class="btn btn-primary"  >' + utilObject.decode64(  setting.next ) + '</button><a>' ;
			if( currentObject.sectionIndex == (length-1)  ){
				html +=  '<button type="button" class="btn btn-primary" onclick="doPreviewAction(' + "'" + 'finish'  + "' ," + "'" + 'finish' + "'" + ')" >' + utilObject.decode64( setting.finish ) + '</button>' ;	
				isSubmitButtonEmited =true ;
			}
			
			if(currentObject.sectionIndex != 0)
				html += '<a href="javascript:void(0);" onclick="doPreviewAction(' + "'" + 'validatequestions'  + "' ,"  + "'" + 'previous' + "'" + ')" ><button type="button" class="btn btn-primary"  >' + utilObject.decode64(  setting.previous ) + '</button><a>' ;
		}
		html += '</div></td></tr>' ;
		if(isSubmitButtonEmited ==true && param1 == 'end' ){
			overallCommentHtml = '<tr><td align="left" class="questions" ><div class="form-group">' ;
			overallCommentHtml += 'Overall Comment'
			overallCommentHtml += '</div></td></tr>' ;
			
			overallCommentHtml += '<tr><td align="left" ><div class="form-group">' ;
			if(currentSurveyResponse != null )
			   overallCommentHtml += '<textarea name="overallcomment"  id="overallcomment" value="" title="Enter overall comment" placeholder="Enter overall comment" class="form-control-textarea" required >' + utilObject.decode64( currentSurveyResponse.overallComment ) + '</textarea> ' ;
			else
				overallCommentHtml += '<textarea name="overallcomment"  id="overallcomment" value="" title="Enter overall comment" placeholder="Enter overall comment" class="form-control-textarea" required ></textarea> ' ;
			overallCommentHtml += '</div></td></tr>' ;
			
			html = overallCommentHtml + html ;
		}
		return html ;
}
function isChecked( choices ){
	var isChecked = false;
	if(choices != null && choices.length>0){ 
		for(var i=0; i<choices.length; i++){
			if(choices[i].isDefault*1 == CHOICE_DEFAULT_SELECTION_YES){
				isChecked = true;
				break;
			}
		}
	}
	return isChecked ;
}
/**
 * Method used to get multiple choice multiple answer text type question
 */
getMutipleChoiceMultipleAnswerTextHtml = function( q, param1, param2, sectionId ){
		var o ;
		if(param2 != undefined )
			o = getObjectNames(q, param2) ;
		else
			o = getObjectNames(q) ;
		
		var name = o.fieldName ;		
		var qTable = o.tableName ;
		
		var choices = q.choices ;
		var html = '' ;
		html += ''
			if(q.conditionalQuestionId*1 == -1 )
				html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%"  >'
			else
				html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%" style="display:none;"  >'
			
				html += getQuestionHtml(q) ;
	
		   var isSelected = isChecked( choices );
		   var commentRequired = false ;
		if( choices != null && choices.length > 0 ){
			  for(var i=0; i<choices.length; i++ ){
		 			
				   // selected = CHOICE_SELECTED_YES
				  //  isDefault = CHOICE_DEFAULT_SELECTION_YES
				   
					html += '<tr><td>&nbsp;&nbsp;'
					if(choices[i].isDefault*1 == CHOICE_DEFAULT_SELECTION_YES && isSelected != true  )	
						html += '<label><input type="checkbox" name="' + name + '" id="' + name + '" data-validate="required"  title="Select your choice" value="' + choices[i].id + '" checked onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> ' + utilObject.decode64( choices[i].choice ) + '<label>' ;
					else if(choices[i].selected*1 == CHOICE_SELECTED_YES)
						html += '<label><input type="checkbox" name="' + name + '" id="' + name + '" data-validate="required" title="Select your choice" value="' + choices[i].id + '" checked onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> ' + utilObject.decode64( choices[i].choice ) + '<label>' ;
					else
						html += '<label><input type="checkbox" name="' + name + '" id="' + name + '" data-validate="required" title="Select your choice" value="' + choices[i].id + '" onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> ' + utilObject.decode64( choices[i].choice ) + '<label>' ;
					
				   html += '</td></tr>' ;
				   if(choices[i].commentRequired*1 == COMMENT_FIELD_REQUIRED_YES ){
					   commentRequired = true ;
					   if(choices[i].selected*1 == CHOICE_SELECTED_YES ){
						   isCommentVisible = true ;
					   }
				   }
				   
			  }
			  if(commentRequired == true ){
					var cname = 'question' + q.id + 'comment'
					var cnametr = 'question' + q.id + 'comment'
					html += '<tr><td id="' + cnametr + '" >' ;
				    html += '<div class="form-group">' ;
					html += '<label>Other</label></br>'
					if( utilObject.trim( utilObject.decode64( q.comment ) )  != '')	
						html += '<input name="' + cname + '" type="text" value="' + utilObject.decode64( q.comment ) + '" title="Enter answer" placeholder="Enter answer" class="form-control" /> ' ;
					else
						html += '<input name="' + cname + '" type="text" value="" title="Enter answer" placeholder="Enter answer" class="form-control" /> ' ;
					html += '</div></td></tr>' ;
				}
			  
				
		}
		html += getAttachmentButton( q ) ;
		return html ;
}



/**
 * Method get multiple answer Multiple answer image
 * @param q
 * @param param1
 * @param param2
 */
getMutipleChoiceMultipleAnswerImageHtml = function(q, param1, param2, sectionId ){
	var html = '' ;
	var choices = q.choices ;

	var o ;
	if(param2 != undefined )
		o = getObjectNames(q, param2) ;
	else
		o = getObjectNames(q) ;
	
	var name = o.fieldName ;		
	var qTable = o.tableName ;
	
	var commentRequired = false ;
	var isCommentVisible = false ;
	if(q.question !=undefined ){
		html += '<tr><tdcolspan="2"><table width="100%">' ;
		html += getQuestionHtml(q) ;
		html +='</table></td></tr>' ;
	} 
	if(q.conditionalQuestionId*1 == -1 )
		html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%"  >'
		else
			html += '<tr><td colspan="2"><table id="' + qTable +  '"  width="100%" style="display:none;"  >'
			
	
				var isSelected = isChecked( choices );
				var lightbox_data = 'image-' + (new Date()).getTime() ;
				for(var i=0; i<choices.length; i++){	 			
					// selected = CHOICE_SELECTED_YES
					//  isDefault = CHOICE_DEFAULT_SELECTION_YES
					
					html += '<tr><td valign="top">'
						if(choices[i].isDefault*1 == CHOICE_DEFAULT_SELECTION_YES && isSelected != true  )	
							html += '<label><input type="checkbox" name="' + name + '" id="' + name + '" data-validate="required" value="' + choices[i].id + '" checked onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> ' + '' + '<label>' ;
						else if(choices[i].selected*1 == CHOICE_SELECTED_YES)
							html += '<label><input type="checkbox" name="' + name + '" id="' + name + '" data-validate="required" value="' + choices[i].id + '" checked onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> ' + '' + '<label>' ;
						else
							html += '<label><input type="checkbox" name="' + name + '" id="' + name + '" data-validate="required" value="' + choices[i].id + '" onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> ' + '' + '<label>' ;
					
					html += '</td>' ;
					
					html += '<td valign="top" align="left">' ;
					html +=  '<a href="' + choices[i].file.imageUrl + '" data-lightbox="' + lightbox_data + '" data-title="' + utilObject.decode64( choices[i].choice ) + '">' ;
					html += '<img style="height:100px;" src="' +choices[i].file.thumbnailUrl + '" alt="" /> ' ;
					
					html += '</a>'  ;
					html += '</td></tr>' ;
					if(choices[i].showTextForImage*1 == SHOW_TEXT_YES)
					{	
						html += '<tr><td></td><td valign="top" align="left" >' ;
						html +=  utilObject.decode64( choices[i].choice ) ;
						html += '</td></tr>' ;
					}
					
					
					
					if(choices[i].commentRequired*1 == COMMENT_FIELD_REQUIRED_YES ){
						commentRequired = true ;
						if(choices[i].selected*1 == CHOICE_SELECTED_YES ){
							isCommentVisible = true ;
						}
					}
					// Now check if other/comment field required and if it was answered 
				}
	
	if(commentRequired == true ){
		var cname = name + 'comment'
		var cnametr = name + 'comment'
		html += '<tr><td id="' + cnametr + '" colspan="2" >' ;
		html += '<div class="form-group">' ;
		html += '<label>Other</label></br>'
			if( utilObject.trim( utilObject.decode64( q.comment ))  != '')	
				html += '<input name="' + cname + '" type="text" value="' + utilObject.decode64( q.comment ) + '" title="Enter answer" placeholder="Enter answer" class="form-control" /> ' ;
			else
				html += '<input name="' + cname + '" type="text" value="" title="Enter answer" placeholder="Enter answer" class="form-control" /> ' ;
		html += '</div></td></tr>' ;
	}	
	html += '</table></td></tr>' ;
	html += getAttachmentButton( q ) ;
	return html ;		
}
/**
 * Method get multiple answer single answer image
 * @param q
 * @param param1
 * @param param2
 */
getMutipleChoiceSingleAnswerImageHtml = function(q, param1, param2, sectionId ){
			var html = '' ;
			var choices = q.choices ;
/*			
			var name = '' ;
			var qTable = '' ;
			if(param1 == undefined )
				name = 'question' + q.id  ;
			else
				name = 'question' + param2.id + "-" + q.id  ;
				
			qTable = name + 'table' ;
*/			
			var o ;
			if(param2 != undefined )
				o = getObjectNames(q, param2) ;
			else
				o = getObjectNames(q) ;
			
			var name = o.fieldName ;		
			var qTable = o.tableName ;
			
			var commentRequired = false ;
			var isCommentVisible = false ;
			 
				html += '<tr><tdcolspan="2"><table width="100%">' ;
				html += getQuestionHtml(q) ;
				html +='</table></td></tr>' ;
	 
			if(q.conditionalQuestionId*1 == -1 )
				html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%"  >'
			else
				html += '<tr><td colspan="2"><table id="' + qTable +  '"  width="100%" style="display:none;"  >'
			
			if(choices.length <= currentObject.MaxRadioButtonCount ){ // show radio
				     var isSelected = isChecked( choices );
						var lightbox_data = 'image-' + (new Date()).getTime() ;
				   for(var i=0; i<choices.length; i++){	 			
					   // selected = CHOICE_SELECTED_YES
					  //  isDefault = CHOICE_DEFAULT_SELECTION_YES
					   
						html += '<tr><td valign="top">'
						if(choices[i].isDefault*1 == CHOICE_DEFAULT_SELECTION_YES && isSelected != true  )	
							html += '<label><input type="radio" name="' + name + '" id="' + name + '" data-validate="required" value="' + choices[i].id + '" checked onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> ' + '' + '<label>' ;
						else if(choices[i].selected*1 == CHOICE_SELECTED_YES)
							html += '<label><input type="radio" name="' + name + '" id="' + name + '" data-validate="required" value="' + choices[i].id + '" checked onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> ' + '' + '<label>' ;
						else
							html += '<label><input type="radio" name="' + name + '" id="' + name + '" data-validate="required" value="' + choices[i].id + '" onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> ' + '' + '<label>' ;
						
					   html += '</td>' ;
					   
						html += '<td valign="top" align="left">' ;
						html +=  '<a href="' + choices[i].file.imageUrl + '" data-lightbox="' + lightbox_data + '" data-title="' + utilObject.decode64( choices[i].choice ) + '">' ;
						html += '<img style="height:100px;" src="' +choices[i].file.thumbnailUrl + '" alt="" /> ' ;
						
						html += '</a>'  ;
						html += '</td></tr>' ;
						if(choices[i].showTextForImage*1 == SHOW_TEXT_YES)
						{	
							html += '<tr><td></td><td valign="top" align="left" >' ;
							html +=  utilObject.decode64( choices[i].choice ) ;
							html += '</td></tr>' ;
						}
					   
					   
					   
					   if(choices[i].commentRequired*1 == COMMENT_FIELD_REQUIRED_YES ){
						   commentRequired = true ;
						   if(choices[i].selected*1 == CHOICE_SELECTED_YES ){
							   isCommentVisible = true ;
						   }
					   }
					   // Now check if other/comment field required and if it was answered 
				   }
			}
			 
			if(commentRequired == true ){
				var cname = name + 'comment'
				var cnametr = name + 'comment'
				html += '<tr><td id="' + cnametr + '" colspan="2" >' ;
			    html += '<div class="form-group">' ;
				html += '<label>Other</label></br>'
				if( utilObject.trim( utilObject.decode64( q.comment ) )  != '')	
					html += '<input name="' + cname + '" type="text" value="' + utilObject.decode64( q.comment ) + '" title="Enter answer" placeholder="Enter answer" class="form-control" /> ' ;
				else
					html += '<input name="' + cname + '" type="text" value="" title="Enter answer" placeholder="Enter answer" class="form-control" /> ' ;
				html += '</div></td></tr>' ;
			}	
			html += '</table></td></tr>' ;
			html += getAttachmentButton( q ) ;
			return html ;		
}

/**
 * Method used to get Html of multiple choice, single answer type question
 */
getMutipleChoiceSingleAnswerTextHtml = function(q, param1, param2, sectionId ){
	
		var html = '' ;
		var choices = q.choices ;
		 
		var o = getObjectNames(q, param2 ) ;
		var name = o.fieldName ;		
		var qTable = o.tableName ;
/*		
		if(param1 == undefined )
			name = 'question' + q.id  ;
		else
			name = 'question' + param2.id + "-" + q.id  ;
			
		qTable = name + 'table' ;
*/		
		var commentRequired = false ;
		var isCommentVisible = false ;
		if(q.conditionalQuestionId*1 == -1 )
			html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%"  >'
		else
			html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%" style="display:none;"  >'
	 
			html += getQuestionHtml(q) ;
		if(choices.length <= currentObject.MaxRadioButtonCount ){ // show radio
			     var isSelected = isChecked( choices );
			   for(var i=0; i<choices.length; i++){	 			
				   // selected = CHOICE_SELECTED_YES
				  //  isDefault = CHOICE_DEFAULT_SELECTION_YES
				   
				   
					html += '<tr><td>&nbsp;&nbsp;'
					if(choices[i].isDefault*1 == CHOICE_DEFAULT_SELECTION_YES && isSelected != true  )	
						html += '<label><input type="radio" name="' + name + '" id="' + name + '" data-validate="required"  value="' + choices[i].id + '" checked onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> ' + utilObject.decode64( choices[i].choice ) + '<label>' ;
					else if(choices[i].selected*1 == CHOICE_SELECTED_YES)
						html += '<label><input type="radio" name="' + name + '" id="' + name + '" data-validate="required" value="' + choices[i].id + '" checked onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> ' + utilObject.decode64( choices[i].choice ) + '<label>' ;
					else
						html += '<label><input type="radio" name="' + name + '" id="' + name + '" data-validate="required" value="' + choices[i].id + '" onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> ' + utilObject.decode64( choices[i].choice ) + '<label>' ;
					
				   html += '</td></tr>' ;
				   if(choices[i].commentRequired*1 == COMMENT_FIELD_REQUIRED_YES ){
					   commentRequired = true ;
					   if(choices[i].selected*1 == CHOICE_SELECTED_YES ){
						   isCommentVisible = true ;
					   }
				   }
				   // Now check if other/comment field required and if it was answered 
			   }
		}
		else{
			// show in dropdown
				html += '<tr><td>'
			    html += '<select name="' + name + '" id="' + name + '" data-validate="required" title="Select an option" class="form-control" required onchange="checkSavePoint(' + "'" + q.sectionId + "' , '" + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  >'
			    html += '<option value="" selected >Select an option</option>' ;
				for(var i=0; i<choices.length; i++){
					if(choices[i].isDefault*1 == CHOICE_DEFAULT_SELECTION_YES && choices[i].selected*1 != CHOICE_SELECTED_YES )	
						html += '<option value="' + choices[i].id + '" selected > ' + utilObject.decode64( choices[i].choice ) + '</option>' ;
					else if(choices[i].selected*1 == CHOICE_SELECTED_YES)
						html += '<option value="' + choices[i].id + '" selected > ' + utilObject.decode64( choices[i].choice ) + '</option>' ;
					else
						html += '<option value="' + choices[i].id + '" > ' + utilObject.decode64( choices[i].choice ) + '</option>' ;
					
					
					
					if(choices[i].commentRequired*1 == COMMENT_FIELD_REQUIRED_YES ){
						   commentRequired = true ;
						   if(choices[i].selected*1 == CHOICE_SELECTED_YES ){
							   isCommentVisible = true ;
						   }
						   
					   }
					
			   }
			   html += '</select>' ;
			   html += '</td></tr>' ;
		}
		if(commentRequired == true ){
			var cname = o.fieldName + 'comment'
			var cnametr = o.fieldName + 'comment'
			html += '<tr><td id="' + cnametr + '" >' ;
		    html += '<div class="form-group">' ;
			html += '<label>Other</label></br>'
			if( utilObject.trim( utilObject.decode64( q.comment ) )  != '')	
				html += '<input name="' + cname + '" type="text" value="' + utilObject.decode64( q.comment ) + '" title="Enter answer" placeholder="Enter answer" class="form-control" /> ' ;
			else
				html += '<input name="' + cname + '" type="text" value="" title="Enter answer" placeholder="Enter answer" class="form-control" /> ' ;
			html += '</div></td></tr>' ;
		}	
		html += '</table></td></tr>' ;
		html += getAttachmentButton( q ) ;
		return html ;
		
}
/**
 * Method used to emit signature html
 * @param q
 * @returns {String}
 */
function getSignatureHtml(q ,param1, param2 ){
		var html = '' ;
		var o = getObjectNames(q) ;
		var canvasName = o.canvasName ;	
		var signatureOf = o.signatureOf ;
		var ssArray = currentObject.signatureArray ;
		var sObject = new SignatureObject();
		sObject.question = q ;
		sObject.index = param2 ;
		ssArray[ssArray.length] = sObject ;
		currentObject.signatureArray = ssArray ;
		
		var qTable = o.tableName ;
		
		if(q.conditionalQuestionId*1 == -1 )
			html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%"  >'
		else
			html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%" style="display:none;"  >' ;
		html += getQuestionHtml(q) ;
		
	 
			html += '<tr><td>' ;
			html += '<canvas id="' + canvasName + '" style="border: 1px solid red;" width="430" height="150" ></canvas>' ;
			html += '</td></tr>' ;
			html += '<tr><td>' ;
			var nn = "#" + canvasName ;
			html += '<a href="javascript:void(0);" onclick=' + "'" + '$("' + nn + '").data("jqScribble").clear();' + "'" + '>Clear</a>' ;
			html += '</td></tr>' ;
			html += '<tr><td>' ;
			html += 'Signature of' ;
			html += '</td></tr>' ;
			
			html += '<tr><td>' ;
			if(utilObject.decode64(q.signatureOf) != '' )
				html += '<input name="' + signatureOf + '" type="text"  value="' + utilObject.decode64(q.signatureOf) +  '" title="Name of signaturey" placeholder="Name of signaturey" class="form-control" required /> ' ;
			else
				html += '<input name="' + signatureOf + '" type="text"  value="" title="Name of signaturey" placeholder="Name of signaturey" class="form-control" required /> ' ;
			
			html += '</td></tr>' ;
		 
		
		
		html += '</table></td></tr>' ;
		return html ;
}
/**
 * This method will emit html for
 * QUESTION_TYPE_EMAIL
 * QUESTION_TYPE_Alphanumeric
 * QUESTION_TYPE_NUMBER_WITHOUT_DECIMAL
 * QUESTION_TYPE_NUMBER_WITH_DECIMAL
 * QUESTION_TYPE_PHONE 
 * QUESTION_TYPE_TEXT_MULTI_LINE
 */
function textTypeQuestionHtml( q, param1, param2, sectionId ){
	 
		var html = '' ;
		var o ;
		if(param2 != undefined )
			o = getObjectNames(q, param2) ;
		else
			o = getObjectNames(q) ;
		
		var name = o.fieldName ;		
		var qTable = o.tableName ;
		
		if(q.conditionalQuestionId*1 == -1 )
			html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%"  >'
		else
			html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%" style="display:none;"  >'
			
			html += getQuestionHtml(q) ;
			html += '<tr><td>' ;
			
			if(utilObject.trim( utilObject.decode64( q.answer ) ) != '' ){
 
				if(q.type*1 == QUESTION_TYPE_EMAIL ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" id="' + name + '" data-validate="required,email" type="email"  pattern="' + PATTERN_EMAIL + '" value="' + utilObject.decode64(q.answer) +  '" title="Enter email" placeholder="Enter email" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
					else
						html += '<input name="' + name + '" id="' + name + '" data-validate="email" type="email" pattern="' + PATTERN_EMAIL + '" value="' + utilObject.decode64(q.answer) +  '" title="Enter email" placeholder="Enter email" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
				}
				else if(q.type*1 == QUESTION_TYPE_Alphanumeric ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" type="text" id="' + name + '" data-validate="required,alphanumeric"  pattern="' + PATTERN_ALPHABET_WITHOUT_SPACE + '" value="' + utilObject.decode64(q.answer) +  '" title="Enter alphanumeric text" placeholder="Only letters and digits allowed" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
					else
						html += '<input name="' + name + '" type="text" id="' + name + '" data-validate="alphanumeric" pattern="' + PATTERN_ALPHABET_WITHOUT_SPACE + '" value="' + utilObject.decode64(q.answer) +  '" title="Enter alphanumeric text" placeholder="Only letters and digits allowed" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
				}
				else if(q.type*1 == QUESTION_TYPE_APHANUMERIC_WITH_SPACE ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" type="text" id="' + name + '" data-validate="required,alphanumericwithspace"  pattern="' + PATTERN_ALPHANUMERICWITHSPACE + '" value="' + utilObject.decode64(q.answer) +  '" title="Enter alphanumeric text" placeholder="Only letters and digits with spaces are allowed" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
					else
						html += '<input name="' + name + '" id="' + name + '" data-validate="alphanumericwithspace" type="text" pattern="' + PATTERN_ALPHANUMERICWITHSPACE + '" value="' + utilObject.decode64(q.answer) +  '" title="Enter alphanumeric text" placeholder="Only letters and digits with spaces are allowed" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
				}
				else if(q.type*1 == QUESTION_TYPE_PHONE ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" type="text" id="' + name + '" data-validate="required,universalphone"  pattern="' + PATTERN_PHONE + '" value="' + utilObject.decode64(q.answer) +  '" title="Enter alphanumeric text" placeholder="Only digit, +, ()  and - allowed" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
					else
						html += '<input name="' + name + '" type="text" id="' + name + '" data-validate="universalphone" pattern="' + PATTERN_PHONE + '" value="' + utilObject.decode64(q.answer) +  '" title="Enter alphanumeric text" placeholder="Only digit, +, ()  and - allowed" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
				}
				else if(q.type*1 == QUESTION_TYPE_NUMBER_WITHOUT_DECIMAL ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" id="' + name + '" data-validate="required,number" type="number" pattern="' + PATTERN_NUMBER + '" min="0" step="1" value="' + utilObject.decode64(q.answer) +  '" title="Only digits allowed" placeholder="Enter number" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
					else
						html += '<input name="' + name + '" id="' + name + '" data-validate="number" type="number" pattern="' + PATTERN_NUMBER + '" min="0" step="1" value="' + utilObject.decode64(q.answer) +  '" title="Only digits allowed" placeholder="Enter number" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> ' ;
				}
				else if(q.type*1 == QUESTION_TYPE_NUMBER_WITH_DECIMAL ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '"  id="' + name + '" data-validate="required,decimal" type="number" step="any"  value="' + utilObject.decode64(q.answer) +  '" title="Enter number" placeholder="Enter number" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
					else
						html += '<input name="' + name + '"  id="' + name + '" data-validate="decimal" type="number" step="any" value="' + utilObject.decode64(q.answer) +  '" title="Enter number" placeholder="Enter number" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> '
				}
				else if(q.type*1 == QUESTION_TYPE_TEXT_SINGLE_LINE ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" id="' + name + '" data-validate="required" type="text" value="' + utilObject.decode64(q.answer) +  '" title="Enter number" placeholder="Enter answer" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
					else
						html += '<input name="' + name + '" id="' + name + '" data-validate="" type="text" value="' + utilObject.decode64(q.answer) +  '" title="Enter number" placeholder="Enter answer" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
				}
				else if(q.type == QUESTION_TYPE_WEBSITE ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" id="' + name + '" data-validate="required,url" type="url" pattern="' + PATTERN_URL + '"  value="' + utilObject.decode64(q.answer) +  '" title="Enter url" placeholder="Enter answer" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
					else
						html += '<input name="' + name + '" id="' + name + '" data-validate="url" type="url" pattern="' + PATTERN_URL + '"  value="' + utilObject.decode64(q.answer) +  '" title="Enter url" placeholder="Enter answer" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
				}
				else if(q.type*1 == QUESTION_TYPE_TEXT_MULTI_LINE ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<textarea name="' + name + '" id="' + name + '" data-validate="required" value="" title="Enter answer" placeholder="Enter answer" class="form-control-textarea" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" >' + utilObject.decode64(q.answer) +  '</textarea> ' ;
					else
						html += '<textarea name="' + name + '" id="' + name + '" data-validate="" value="" title="Enter answer" placeholder="Enter answer" class="form-control-textarea" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  >' + utilObject.decode64(q.answer) +  '</textarea> ' ;
				}
			}
			else{
		 
				if(q.type*1 == QUESTION_TYPE_EMAIL ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" id="' + name + '" data-validate="required,email" type="email"  pattern="' + PATTERN_EMAIL + '" value="" title="Enter email" placeholder="Enter email" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
					else
						html += '<input name="' + name + '" id="' + name + '" data-validate="email" type="email" pattern="' + PATTERN_EMAIL + '" value="" title="Enter email" placeholder="Enter email" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '						
							
				}
				else if(q.type*1 == QUESTION_TYPE_Alphanumeric ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" type="text" id="' + name + '" data-validate="required,alphanumeric"  pattern="' + PATTERN_ALPHABET_WITHOUT_SPACE + '" value="" title="Enter alphanumeric text" placeholder="Only letters and digits allowed" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
					else
						html += '<input name="' + name + '" type="text" id="' + name + '" data-validate="alphanumeric" pattern="' + PATTERN_ALPHABET_WITHOUT_SPACE + '" value="" title="Enter alphanumeric text" placeholder="Only letters and digits allowed" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
				}
				else if(q.type*1 == QUESTION_TYPE_APHANUMERIC_WITH_SPACE ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" type="text" id="' + name + '" data-validate="required,alphanumericwithspace"  pattern="' + PATTERN_ALPHANUMERICWITHSPACE + '" value="" title="Enter alphanumeric text" placeholder="Only letters and digits with spaces are allowed" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
					else
						html += '<input name="' + name + '" id="' + name + '" data-validate="alphanumericwithspace" type="text" pattern="' + PATTERN_ALPHANUMERICWITHSPACE + '" value="" title="Enter alphanumeric text" placeholder="Only letters and digits with spaces are allowed" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
				}
				else if(q.type*1 == QUESTION_TYPE_PHONE ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" type="tel" id="' + name + '" data-validate="required,universalphone"  pattern="' + PATTERN_PHONE + '" value="" title="Enter alphanumeric text" placeholder="Only digit, +, ()  and - allowed" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
					else
						html += '<input name="' + name + '" type="tel" id="' + name + '" data-validate="universalphone" pattern="' + PATTERN_PHONE + '" value="" title="Enter alphanumeric text" placeholder="Only digit, +, ()  and - allowed" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
				}
				else if(q.type*1 == QUESTION_TYPE_NUMBER_WITHOUT_DECIMAL ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" id="' + name + '" data-validate="required,number" type="number" pattern="' + PATTERN_NUMBER + '" min="0" step="1" value="" title="Only digits allowed" placeholder="Enter number" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
					else
						html += '<input name="' + name + '" id="' + name + '" data-validate="number" type="number" pattern="' + PATTERN_NUMBER + '" min="0" step="1" value="" title="Only digits allowed" placeholder="Enter number" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> ' ;
				}
				else if(q.type*1 == QUESTION_TYPE_NUMBER_WITH_DECIMAL ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '"  id="' + name + '" data-validate="required,decimal" type="number" step="any"  value="" title="Enter number" placeholder="Enter number" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
					else
						html += '<input name="' + name + '"  id="' + name + '" data-validate="decimal" type="number" step="any"  value="" title="Enter number" placeholder="Enter number" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  /> '
				}
				else if(q.type*1 == QUESTION_TYPE_TEXT_SINGLE_LINE ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" id="' + name + '" data-validate="required" type="text" value="" title="Enter number" placeholder="Enter answer" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
					else
						html += '<input name="' + name + '" id="' + name + '" data-validate="" type="text" value="" title="Enter number" placeholder="Enter answer" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
				}
				else if(q.type == QUESTION_TYPE_WEBSITE ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" id="' + name + '" data-validate="required,url" type="url" pattern="' + PATTERN_URL + '"  value="" title="Enter url" placeholder="Enter answer" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
					else
						html += '<input name="' + name + '" id="' + name + '" data-validate="url" type="url" pattern="' + PATTERN_URL + '"  value="" title="Enter url" placeholder="Enter answer" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> '
				}
				else if(q.type*1 == QUESTION_TYPE_TEXT_MULTI_LINE ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<textarea name="' + name + '" id="' + name + '" data-validate="required" value="" title="Enter answer" placeholder="Enter answer" class="form-control-textarea" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" ></textarea> ' ;
					else
						html += '<textarea name="' + name + '" id="' + name + '" data-validate="" value="" title="Enter answer" placeholder="Enter answer" class="form-control-textarea" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')"  ></textarea> ' ;
				}
			}
		
		html += '</td></tr>' ;
		html += '</table></td></tr>' ;
		html += getAttachmentButton( q ) ;
		return html ;
} 
/**
 * Method  used to get range type question
 * @param q
 * @returns
 */
getRangeTypeQuestion=function(q, param1, param2, sectionId ){
			var from =  q.rangeFrom  ;
			var to =  q.rangeTo ;
			var increment = q.rangeIncrement ;
			var loopCount = parseInt( (to*1 - from*1 )/increment ) ;
			var html = '' ;
			var o ;
			if(param2 != undefined )
				o = getObjectNames(q, param2) ;
			else
				o = getObjectNames(q) ;
			
			var name = o.fieldName ;		
			var qTable = o.tableName ;
			
			
			if(q.conditionalQuestionId*1 == -1 )
				html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%"  >'
			else
				html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%" style="display:none;"  >'
				
				html += getQuestionHtml(q) ;
			
		 
			var name = 'question' + q.id ;
 			if(loopCount <= (currentObject.MaxRadioButtonCount-1)){
				 // emit header first
				html += '<tr><td ><table width="100%" class="alter1" >' 
					html += '<tr>' ;
					for(var i=from; i<=to; i=i+increment){
						
						html += '<td>'
						html += i ;
						html += '</td>' ;
					}
					html += '</tr>' ;
					html += '<tr>' ;
			      for(var i=from; i<=to; i=i+increment){
						html += '<td>'
						if(utilObject.decode64(q.answer)*1 == i )	
							html += '<label><input type="radio" name="' + name + '" id="' + name + '" data-validate="required"  value="' + i + '" checked onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /><label>' ;
						else
							html += '<label><input type="radio" name="' + name + '" id="' + name + '" data-validate="required" value="' + i + '" onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /><label>' ;
						
						html += '</td>' ;
			      }
			      html += '</tr>' ;
			      html += '</table></td></tr>' ;
			      
				}
				else{
					// show in dropdown
						html += '<tr><td colspan="2">&nbsp;&nbsp;'
					    html += '<select name="' + name + '" id="' + name + '" data-validate="required" title="Select an option" class="form-control" required onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" >' ;
						html += '<option value="" selected id="' + name + '" data-validate="required" >Select an option</option>' ;
						for(var i=from; i<=to; i=i+increment){	
							if(utilObject.decode64(q.answer)*1 == i )
								html += '<option value="' + i + '" selected > ' + i + '</option>' ;	
							else
								html += '<option value="' + i + '" > ' + i + '</option>' ;	
					    }
					   html += '</select>' ;
					   html += '</td></tr>' ;
				}		
			return html ;
}

/**
 * Method used to get prefered/rank type question 
 * @param q
 * @returns {String}
 */
getPreferedTypeQuestion = function(q, param1, param2, sectionId ){
	 
	var html = '' ;
	
	var o ;
	if(param2 != undefined )
		o = getObjectNames(q, param2) ;
	else
		o = getObjectNames(q) ;
	
	var name = o.fieldName ;		
	var qTable = o.tableName ;
	
	if(q.conditionalQuestionId*1 == -1 )
		html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%"  >'
	else
		html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%" style="display:none;"  >'
		
		html += getQuestionHtml(q) ;
		 
		
			      var choices = q.choices ;
			      if(choices != null && choices.length > 0){
			      		html += '<tr><td colspan="2" align="left" ><div class="scrolled"><table cellpadding="1" cellspacing="0" width="100%" class="alter1"   >' ;
			      		html += '<tr>' ;
			      		for( var j=0; j<( choices.length + 1) ; j++ ){
			      			if( j != 0 ){
			      				html += '<td align="center" >' + j + '</td>' ;			      			
			      			}
			      			else{
			      				html += '<td></td>'
			      			}
			      		}
			      		html += '</tr>' ;
			      		for(var i=0; i<choices.length; i++ ){
			      			html += '<tr>' ;
			      			 for( var j=0; j<( choices.length + 1) ; j++ ){
			      			 	
			      			if( j == 0 ){
			      				html += '<td>' + utilObject.decode64(choices[i].choice) + '</td>' ;
			      			
			      			}
			      			else{
			      				var name1 = name + '-' + i ;
				      				html += '<td align="center" >'
				      			   if(choices[i].rank == j ) 
				      				 html += '<label><input type="radio" name="' + name1 + '"  id="' + name1 + '" data-validate="required" value="' + j + '" checked onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /><label>' ;
				      			   else
				      				   html += '<label><input type="radio" name="' + name1 + '" id="' + name1 + '" data-validate="required" value="' + j + '" onchange="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /><label>' ;
				      				html += '</td>'
			      					
			      			}
			      		}
			      		html += '</tr>' ;
			      		}
			      		html += '</table></div></td></tr>' ;
			      }
			      html += getAttachmentButton( q ) ;
			      return html ;
}

/**
 * Method used to emit datetime picker type questions
 * @param q
 */
 getDateTimePickerTypeQuestion = function( q, param1, param2, sectionId ){
		var html = '' ;
		
		var o ;
		if(param2 != undefined )
			o = getObjectNames(q, param2) ;
		else
			o = getObjectNames(q) ;
		
		var name = o.fieldName ;		
		var qTable = o.tableName ;
		
		if(q.conditionalQuestionId*1 == -1 )
			html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%"  >'
		else
			html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%" style="display:none;"  >'
			
			html += getQuestionHtml(q) ;
		if( q.type == QUESTION_TYPE_DATE_PICKER )
			html += '<tr><td>Date</td></tr>' ;
		else
			html += '<tr><td>Time</td ><tr>' ;
		
		html += '<tr><td>' ;
		if( q.type == QUESTION_TYPE_DATE_PICKER ){ 
				
				
				
				if( utilObject.trim( utilObject.decode64( q.answer ) ) != '' ){
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" id="' + name + '" data-validate="required"  type="text" value="' + utilObject.decode64( q.answer ) + '" data-field="date" title="Select date" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
					else
						html += '<input name="' + name + '" id="' + name + '" type="text" value="' + utilObject.decode64( q.answer ) + '" data-field="date" title="Select date" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
				}
				else
				{
					if(q.conditionalQuestionId*1 == -1 )
						html += '<input name="' + name + '" id="' + name + '" data-validate="required"  type="text" data-field="date" title="Select date" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
					else
						html += '<input name="' + name + '" id="' + name + '"  type="text" data-field="date" title="Select date" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
				}
				
		}		
		else if( q.type == QUESTION_TYPE_TIME_PICKER ){
			if( utilObject.trim( utilObject.decode64( q.answer ) ) != '' ){
				if(q.conditionalQuestionId*1 == -1 )
					html += '<input name="' + name + '" id="' + name + '" data-validate="required" type="text" value="' + utilObject.decode64( q.answer ) + '" data-field="time" title="Select date" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
				else
					html += '<input name="' + name + '" id="' + name + '"  type="text" value="' + utilObject.decode64( q.answer ) + '" data-field="time" title="Select date" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
			}
			else
			{
				if(q.conditionalQuestionId*1 == -1 )
					html += '<input name="' + name + '" id="' + name + '" data-validate="required" type="text" data-field="time" title="Select date" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
				else
					html += '<input name="' + name + '" id="' + name + '"  type="text" data-field="time" title="Select date" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
			}		
		}		
		html += '</td></tr>' ;
		html += getAttachmentButton( q ) ;
		html += '</table></td></tr>' ;
		return html ;
}
 
 /**
  * Method used to emit datetime picker type questions
  * @param q
  */
  getDateTimeRangePickerTypeQuestion = function(q, param1, param2, sectionId ){
	    var html = '' ;
	    
		var name = 'question' + q.id ;
		var qTable = name + 'table' ;
		
		if(q.conditionalQuestionId*1 == -1 )
			html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%"  >'
		else
			html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%" style="display:none;"  >'
			
			html += getQuestionHtml(q) ;
		
		var o ;
		if(param2 != undefined )
			o = getObjectNames(q, param2) ;
		else
			o = getObjectNames(q) ;
		
		var name1 = o.fromName ;
        var name2 = o.toName ;
        // From start here
    	
  	   if( q.type == QUESTION_TYPE_DATE_RANGE_PICKER ){
		  		 html += '<tr><td>Fram</td><tr >' ;
		     	 html += '<tr><td>' ; 
	  		 if( utilObject.trim( utilObject.decode64(q.from) != '' )){
		  			if(q.conditionalQuestionId*1 == -1 )
		  			 	html += '<input name="' + name1 + '" id="' + name1 + '" data-validate="required,date,dateRange#start" value="' + utilObject.decode64( q.from ) + '" type="text" data-field="date" title="Select date" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
		  			else
		  				html += '<input name="' + name1 + '" id="' + name1 + '" data-validate="date,dateRange#start" value="' + utilObject.decode64( q.from ) + '" type="text" data-field="date" title="Select date" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
	  		 }
	  		 else{
		  			if(q.conditionalQuestionId*1 == -1 )
		  			 	html += '<input name="' + name1 + '" id="' + name1 + '" data-validate="required,date,dateRange#start" type="text" data-field="date" title="Select date" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
		  			else
		  				html += '<input name="' + name1 + '" id="' + name1 + '" data-validate="date,dateRange#start" type="text" data-field="date" title="Select date" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
	  		 }
	  		html += '</td></tr>' ;
	  	 	html += '<tr><td>To</td><td >' ;
	  	 	html += '<tr><td>' ; 
	  		if( utilObject.trim( utilObject.decode64(q.to) != '' )){
		  			if(q.conditionalQuestionId*1 == -1 )
		  			 	html += '<input name="' + name2 + '" id="' + name2 + '" data-validate="required,date,dateRange#end" value="' + utilObject.decode64( q.to ) + '" type="text" data-field="date" title="Select date" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
		  			else
		  				html += '<input name="' + name2 + '" id="' + name2 + '" data-validate="date,dateRange#end" value="' + utilObject.decode64( q.to ) + '" type="text" data-field="date" title="Select date" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
	  		}
	  		else{
		  			if(q.conditionalQuestionId*1 == -1 )
		  			 	html += '<input name="' + name2 + '" id="' + name2 + '" data-validate="required,date,dateRange#end" type="text" data-field="date" title="Select date" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
		  			else
		  				html += '<input name="' + name2 + '" id="' + name2 + '" data-validate="date,dateRange#end" type="text" data-field="date" title="Select date" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
	  		}
	  		html += '</td></tr>' ;
  	   }
	   else if( q.type == QUESTION_TYPE_TIME_RANGE_PICKER ){
		  		 html += '<tr><td>Fram</td><tr >' ;
		     	 html += '<tr><td>' ; 
			 if( utilObject.trim( utilObject.decode64(q.from) != '' )){
		  			if(q.conditionalQuestionId*1 == -1 )
		  			 	html += '<input name="' + name1 + '" value="' + utilObject.decode64( q.from ) + '" type="text" data-field="time" title="Select time" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
		  			else
		  				html += '<input name="' + name1 + '" value="' + utilObject.decode64( q.from ) + '" type="text" data-field="time" title="Select time" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
			 }
			 else{
		  			if(q.conditionalQuestionId*1 == -1 )
		  			 	html += '<input name="' + name1 + '" type="text" data-field="time" title="Select time" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
		  			else
		  				html += '<input name="' + name1 + '" type="text" data-field="time" title="Select date" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
			 }
			html += '</td></tr>' ;
		 	html += '<tr><td>To</td><td >' ;
		 	html += '<tr><td>' ; 
			if( utilObject.trim( utilObject.decode64(q.to) != '' )){
		  			if(q.conditionalQuestionId*1 == -1 )
		  			 	html += '<input name="' + name2 + '" value="' + utilObject.decode64( q.to ) + '" type="text" data-field="time" title="Select time" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
		  			else
		  				html += '<input name="' + name2 + '" value="' + utilObject.decode64( q.to ) + '" type="text" data-field="time" title="Select time" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
			}
			else{
		  			if(q.conditionalQuestionId*1 == -1 )
		  			 	html += '<input name="' + name2 + '" type="text" data-field="time" title="Select time" class="form-control" required onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
		  			else
		  				html += '<input name="' + name2 + '" type="text" data-field="time" title="Select time" class="form-control" onblur="checkSavePoint(' + "'" + sectionId + "' , " + "'" + q.id  + "', " + "'" + param2 + "'"   + ')" /> ' ;
			}
			html += '</td></tr>' ;
			
			html += getAttachmentButton( q ) ;
	   				
	   }
  	   
  	 
    	
	   return html ;
  }

  
function checkVisibility( sectionId,  questionId){
	
	if(sectionId == undefined || sectionId == 'undefined')
		return ;
		var _questions = TAFFY( JSON.stringify(currentObject.survey.sections) ).get({id:sectionId})[0].questions ;
		
		var dependentQuestions = TAFFY(JSON.stringify(_questions)).get({conditionalQuestionId:questionId}) ;
		if(dependentQuestions != null && dependentQuestions.length >0){
				var question = TAFFY(JSON.stringify(_questions)).get({id:questionId})[0] ;		
				
				for(var i =0 ; i<dependentQuestions.length; i++ ){
					var name = 'question' + question.id ;
					var dname = 'question' + dependentQuestions[i].id ;
					var dTable = dname + 'table' ;
					document.getElementById(dTable).style.display = 'none' ; 
					var theform = document.forms[ 'responsemainform' ] ;
					var elements = theform.elements[name] ;
					if(question.type*1 == QUESTION_TYPE_SINGLE_ANSWER_TEXT ){
					
						var val = '' ;
							if(question.choices.length <= currentObject.MaxRadioButtonCount ){ // getSelectedValue by radiobutton
								if(elements.length == undefined){
									if(elements.checked)
										val = elements.value ;
									var condition = eval( dependentQuestions[i].conditionalChoiceId*1 + utilObject.decode64(dependentQuestions[i].logicalCondition) + val*1 ) ;
									if(condition == true){
										document.getElementById(dTable).style.display = '' ; 
										break ;
									}
								}
								else{
									for(var k=0; k<elements.length; k++ ){
								 
										if(elements[k].checked == true){
											val = elements[k].value ;
											 
											var condition = eval( dependentQuestions[i].conditionalChoiceId*1 + utilObject.decode64(dependentQuestions[i].logicalCondition) + val*1 ) ;
											 
											if(condition ){
												document.getElementById(dTable).style.display = '' ; 
												 
											}
										}
									}
								}
							}
							else{ // get selected value from dropdown
								if( eval( dependentQuestions[i].conditionalChoiceId*1 + utilObject.decode64(dependentQuestions[i].logicalCondition) + elements.value*1 ) ){
									document.getElementById(dTable).style.display = '' ; 
									break ;
								}
							}
					}
					else{ // else get checked 
							if(elements.length == undefined){
								if(elements.checked)
									val = elements.value ;
								if(  eval( dependentQuestions[i].conditionalChoiceId*1 + utilObject.decode64(dependentQuestions[i].logicalCondition) + val*1 ) ){
									document.getElementById(dTable).style.display = '' ; 
									break ;
								}
							}
							else{
								for(var k=0; k<elements.length; k++ ){
									if(elements[k].checked == true){
										val = elements[k].value ;
										if( eval( dependentQuestions[i].conditionalChoiceId*1 + utilObject.decode64(dependentQuestions[i].logicalCondition) + val*1 ) ){
											document.getElementById(dTable).style.display = '' ; 
											break ;
										}
									}
								}
							}
					}
				}
					
		}
	
	 
}
/**
 * Method used to validate questions of a sections 
 */
function manageValidation( haveToValidate ){			 
			var survey = currentObject.survey ;
			var sections = survey.sections ;		
			var displaySetting = survey.displaySetting ;
			var isValidated = true ;
			 
				
			if( sections != null && sections.length > 0 ){
					if(displaySetting.displayStyle == DISPLAY_STYLE_SINGLE_PAGE ){
						for(var i=0; i<sections.length; i++ ){
								// Validate questions of all sections
								var questions = sections[i].questions ; 
								if(isValidated == false)
									break;
								for( var j=0; j<questions.length; j++ ){
									var success = doValidateQuestion(questions[j], questions, haveToValidate ) ;
									if(success == false ){
										isValidated = false ;
										break ;
										 
									}
								}
						}				
					}
					else{
						if(currentObject.sectionIndex == -1 )
						{
							currentObject.sectionIndex = 0
						}
						
						var questions = sections[currentObject.sectionIndex].questions ; 
						if(questions != null && questions.length > 0){
							for( var j=0; j<questions.length; j++ ){
								var success = doValidateQuestion(questions[j], questions, haveToValidate ) ;
								if(success == false ){
									isValidated = false ;
									break ;
									 
								}
							}							
						}
						// Validate questions of selected sections ;  
						//html += emitSectionHtml(sections[currentObject.sectionIndex], displaySetting ) ;
					}
					
			}		
			 return isValidated ;	
}
/**
 * 
 * @param q
 * haveToValidate will be true if called for validation and false if called only for setting selection in questions object
 */
doValidateQuestion=function( q, questions, haveToValidate  ){
	 var success = true ;
	// var haveToValidate = true ;
	       // conditionalQuestionId
	 if( q.conditionalQuestionId*1 == -1 ){
			 // Validate question which are not dependent
			 if( q.type == QUESTION_TYPE_TEXT_SINGLE_LINE || q.type == QUESTION_TYPE_TEXT_MULTI_LINE ||
						q.type == QUESTION_TYPE_Alphanumeric || q.type == QUESTION_TYPE_NUMBER_WITHOUT_DECIMAL ||
						q.type == QUESTION_TYPE_NUMBER_WITH_DECIMAL || q.type == QUESTION_TYPE_EMAIL ||
						q.type == QUESTION_TYPE_PHONE || q.type == QUESTION_TYPE_WEBSITE || q.type == QUESTION_TYPE_APHANUMERIC_WITH_SPACE )
			 {
				 success = validateTextTypeQuestion(q, haveToValidate ) ;
				  
			 }
			 else if( q.type == QUESTION_TYPE_RANGE){
				 success = validateRangeTypeQuestion(q, haveToValidate );				  
			 }
			 else if( q.type == QUESTION_TYPE_SINGLE_ANSWER_TEXT ||  q.type == QUESTION_TYPE_MULTIPLE_ANSWER_TEXT ||
					 q.type == QUESTION_TYPE_SINGLE_ANSWER_IMAGE || q.type == QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE ){ 
				 success = validateRadioCheckboxes( q, haveToValidate ) ;
			 }
			 else if(q.type == QUESTION_TYPE_PREFERED_CHOICE_TYPE ){
				 success = validateRankingTypeQuestion( q, haveToValidate );
			 }
			 else if(q.type == QUESTION_TYPE_DATE_PICKER ||  q.type == QUESTION_TYPE_TIME_PICKER){
				 success = validateDateTimeTypeQuestion(q, haveToValidate) ;
			 }
			 else if(q.type == QUESTION_TYPE_DATE_RANGE_PICKER || q.type == QUESTION_TYPE_TIME_RANGE_PICKER ){
				 success = validateDateTimeRangeTypeQuestion(q, haveToValidate) ;
			 }
			 else if(q.type == QUESTION_TYPE_SIGNATURE){
				 success = validateSignatureTypeQuestion(q, haveToValidate) ;
			 }
			 else if(q.type == QUESTION_TYPE_TABULAR){
				 success = validateTabularQuestion(q, questions, haveToValidate ) ;
			 }
	 }
	 else {
		 // if parent question has a selected value that match with dependent question' condition
		 // only then validate that dependent question otherwise do nothing
		 var parentQuestion = TAFFY(JSON.stringify(questions)).get({id:q.conditionalQuestionId})[0];
		 if( parentQuestion.type == QUESTION_TYPE_SINGLE_ANSWER_TEXT ||
			 parentQuestion.type == QUESTION_TYPE_MULTIPLE_ANSWER_TEXT ||
			 parentQuestion.type == QUESTION_TYPE_SINGLE_ANSWER_IMAGE ||
			 parentQuestion.type == QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE ){			 
			 var choices = parentQuestion.choices ;
			 if( choices != null && choices.length >0 ){
				 for( var i=0; i<choices.length; i++ ){
					 if( choices[i].id == q.conditionalChoiceId && choices[i].selected == CHOICE_SELECTED_YES ){
							 if( q.type == QUESTION_TYPE_TEXT_SINGLE_LINE || q.type == QUESTION_TYPE_TEXT_MULTI_LINE ||
										q.type == QUESTION_TYPE_Alphanumeric || q.type == QUESTION_TYPE_NUMBER_WITHOUT_DECIMAL ||
										q.type == QUESTION_TYPE_NUMBER_WITH_DECIMAL || q.type == QUESTION_TYPE_EMAIL ||
										q.type == QUESTION_TYPE_PHONE || q.type == QUESTION_TYPE_WEBSITE || q.type == QUESTION_TYPE_APHANUMERIC_WITH_SPACE )
							 {
								 success = validateTextTypeQuestion(q, haveToValidate ) ;								  
							 }
							 else if( q.type == QUESTION_TYPE_RANGE){
								 success = validateRangeTypeQuestion(q, haveToValidate);   
							 }
							 else if( q.type == QUESTION_TYPE_SINGLE_ANSWER_TEXT ||  q.type == QUESTION_TYPE_MULTIPLE_ANSWER_TEXT ||
									 q.type == QUESTION_TYPE_SINGLE_ANSWER_IMAGE || q.type == QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE ){ 
								 success = validateRadioCheckboxes( q, haveToValidate )
							 }
							 else if(q.type == QUESTION_TYPE_PREFERED_CHOICE_TYPE ){
								 success = validateRankingTypeQuestion( q, haveToValidate );
							 }
							 else if(q.type == QUESTION_TYPE_DATE_PICKER ||  q.type == QUESTION_TYPE_TIME_PICKER){
								 success = validateDateTimeTypeQuestion(q, haveToValidate) ;
							 }
							 else if(q.type == QUESTION_TYPE_DATE_RANGE_PICKER || q.type == QUESTION_TYPE_TIME_RANGE_PICKER ){
								 success = validateDateTimeRangeTypeQuestion(q, haveToValidate) ;
							 }
							 else if(q.type == QUESTION_TYPE_SIGNATURE){
								 success = validateSignatureTypeQuestion(q, haveToValidate) ;
							 }
							 else if(q.type == QUESTION_TYPE_TABULAR){
								 success = validateTabularQuestion(q, questions, haveToValidate ) ;
							 }
					 }
				 }
			 }
		 }
		
		 
	 }
	 return success;
}
/**
 * Method used to validate tabular type questions
 * @param q
 * @param questions
 */
validateTabularQuestion=function( q, questions, haveToValidate ){
		 var rows = q.rows ;
		
		 var isValidated = false ;
		 for( var i=0; i<rows.length; i++ ){
			    var cols = rows[i].cols ;
				for(var j=0; j<cols.length; j++ ){
					 var q = cols[j] ;
					 if( q.type == QUESTION_TYPE_TEXT_SINGLE_LINE || q.type == QUESTION_TYPE_TEXT_MULTI_LINE ||
								q.type == QUESTION_TYPE_Alphanumeric || q.type == QUESTION_TYPE_NUMBER_WITHOUT_DECIMAL ||
								q.type == QUESTION_TYPE_NUMBER_WITH_DECIMAL || q.type == QUESTION_TYPE_EMAIL ||
								q.type == QUESTION_TYPE_PHONE || q.type == QUESTION_TYPE_WEBSITE )
					 {
						 isValidated = validateTextTypeQuestion(q, haveToValidate, i ) ;
						  
					 }
					 else if( q.type == QUESTION_TYPE_RANGE){
						 isValidated = validateRangeTypeQuestion(q, haveToValidate, i );				  
					 }
					 else if( q.type == QUESTION_TYPE_SINGLE_ANSWER_TEXT ||  q.type == QUESTION_TYPE_MULTIPLE_ANSWER_TEXT ||
							 q.type == QUESTION_TYPE_SINGLE_ANSWER_IMAGE || q.type == QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE ){ 
						 isValidated = validateRadioCheckboxes( q, haveToValidate, i ) ;
					 }
					 else if(q.type == QUESTION_TYPE_PREFERED_CHOICE_TYPE ){
						 isValidated = validateRankingTypeQuestion( q, haveToValidate, i );
					 }
					 else if(q.type == QUESTION_TYPE_DATE_PICKER ||  q.type == QUESTION_TYPE_TIME_PICKER){
						 isValidated = validateDateTimeTypeQuestion(q, haveToValidate, i ) ;
					 }
					 else if(q.type == QUESTION_TYPE_DATE_RANGE_PICKER || q.type == QUESTION_TYPE_TIME_RANGE_PICKER ){
						 isValidated = validateDateTimeRangeTypeQuestion(q, haveToValidate, i) ;
					 }
					 else if(q.type == QUESTION_TYPE_SIGNATURE){
						 isValidated = validateSignatureTypeQuestion(q, haveToValidate, i) ;
					 }
					
					if(haveToValidate == true && isValidated == false){
						break;
					}
				}
				 
				if(haveToValidate == true && isValidated == false){
					break;
				}
		  }
		 
		  return isValidated;
}

/**
 * 
 * @param q
 */
validateTextTypeQuestion = function(q, haveToValidate, param1){
	    var name = '' ;
	    if(param1 != undefined )
	    	name = getObjectNames(q, param1 ).fieldName;
	    else
	    	name = getObjectNames(q).fieldName;
	    
		var success = false ;
		var theform = document.forms[ 'responsemainform' ] ;
		var element = theform.elements[ name ] ;
	 
		if( utilObject.trim (element.value) != '' ){
			q.answer = utilObject.encode64( utilObject.trim( element.value) ) ;
			success = true ;
		}
		else{
	 
				if(haveToValidate == true ){
					var _name = '#' + name ;
					$(_name).validate();
					element.focus() ;
					// utilObject.showMessage('Alert', 'Please answer the question' ,'Ok');					
				}
		}
	return success ;
}
/**
 * Method used to validate range type questions
 */
validateRangeTypeQuestion=function(q, haveToValidate, param1  ){
	 	var name = '' ;
	    if(param1 != undefined )
	    	name = getObjectNames(q, param1 ).fieldName;
	    else
	    	name = getObjectNames(q).fieldName;
	    
		var success = false ;
		var from =  q.rangeFrom  ;
		var to =  q.rangeTo ;
		var increment = q.rangeIncrement ;
		var loopCount = parseInt( (to*1 - from*1 )/increment ) ;
		
		var theform = document.forms[ 'responsemainform' ] ;
		var element = theform.elements[ name ] ;
	 
		if(loopCount <= currentObject.MaxRadioButtonCount){ // radio
		 
			if(element.length == undefined){
				
				if(element.checked ){
					q.answer = element.value ;
					success = true ;
				}
			}
			else{
				for( var i=0; i<element.length; i++ ){
				 
					if( element[i].checked == true ){
						q.answer = utilObject.encode64(element.value) ;
						success = true ;
					}
				}
			}
		}
		else{
			if( element.value != '' ){
				q.answer = utilObject.encode64(element.value) ;
				success = true ;
			}
		}
		 
		
		if(success == false ){
				if(haveToValidate == true ){
					_name = name ;
					$(_name).validate();
					if( element.length == undefined )
					   element.focus() ;
					else
					   element[0].focus();
//					utilObject.showMessage('Alert', 'Please select a range value' ,'Ok' );					
				}
		}
		return success ;
}
/**
 * 
 * @param choices
 */
uncheckChoices=function(choices){
	if(choices != null && choices.length >0){
		for(var i=0; i<choices.length; i++ ){
			choices[i].selected = CHOICE_SELECTED_NO ;
			choices[i].rank = -1 ;
		}		
	}
	return choices ;
}

/**
 * Method used to set choices value
 */
setChoiceValues=function(choices, value){
	var isCommentRequired = false ;
	for( var j=0; j<choices.length; j++ ){
		if(choices[j].id == value*1 ){
			choices[j].selected = CHOICE_SELECTED_YES ;
			if(choices[j].commentRequired*1 == COMMENT_FIELD_REQUIRED_YES ){
				isCommentRequired = true ;
			}
		}
	}
	return isCommentRequired ;
}

/**
 * 
 * @param q
 */
validateRadioCheckboxes = function( q, haveToValidate, param1 ){	
		var name = '' ;
	    if(param1 != undefined )
	    	name = getObjectNames(q, param1 ).fieldName;
	    else
	    	name = getObjectNames(q).fieldName;
	    
	 
	var theform = document.forms[ 'responsemainform' ] ;
	var element = theform.elements[ name ] ;
	var choices = uncheckChoices( q.choices ) ;
	var success = false ;
	var isCommentRequired = false ;
	  
	 if( q.type == QUESTION_TYPE_SINGLE_ANSWER_TEXT &&  choices.length > currentObject.MaxRadioButtonCount ) {
		 	// dropdown
		 value = element.value ;
		 if(value != ''){
			    success = true ;
				var t = setChoiceValues(choices, value) ;
				if(t == true)	
					isCommentRequired = true ;
		 }
	 }
	 else{
					if( element.length != undefined ){
						
						for(var i=0; i<element.length; i++ ){
							if(element[i].checked){
								success = true ;
								var t = setChoiceValues(choices, element[i].value) ;
								 
								if(t == true)	
									isCommentRequired = true ;
							}
						}
					}
					else{
							if(element.checked){
								success = true ;
								var t = setChoiceValues(choices, element.value) ;
								if(t == true)	
									isCommentRequired = true ;
							}
					}
	 }				
	 				
	q.choices= choices ;
	if(success == false ){
		if(haveToValidate == true ){
			var _name = '#' + name ;
			$(_name).validate() ;
			if( element.length == undefined )
			   element.focus() ;
			else
			   element[0].focus();
			// utilObject.showMessage('Alert', 'Please select an option for ' + utilObject.decode64(q.question) ,'Ok' );					
		}
	}
	
	if(isCommentRequired == true ){
		var cname = name + 'comment' ;
		var field = theform.elements[ cname ] ;
		if(utilObject.trim(field.value) != '' ){
			q.comment = utilObject.encode64( field.value ) ;
		}
		else{
			if(success == false){
				// dont do anything
			}
			else{
				if(haveToValidate == true ){
					field.focus() ;
					success = false ;
					utilObject.showMessage('Alert', 'Please specify other' ,'Ok' );		
				}
			}
		}
	}
	
	return success ;
}
/**
 * Method used to validate ranking type questions
 */
validateRankingTypeQuestion=function(q, haveToValidate,param1 ){
	    if(param1 != undefined )
	    	name = getObjectNames(q, param1 ).fieldName;
	    else
	    	name = getObjectNames(q).fieldName;
		
		var theform = document.forms[ 'responsemainform' ] ;
	
		var choices = uncheckChoices( q.choices ) ;
		var success = true ;
		var obj ;
		var index = 0 ;
		
		for(var i=0; i<choices.length; i++ ){
				var isChecked = false ;
				 
				index = i ;
				var n = name + '-' + i ;
				var element = theform.elements[ n ] ;
				obj =element ;
				if( element.length ==undefined ){
					if(element.checked){
						isChecked = true ;
						success = true ;
						choices[i].rank = element.value  ;
						choices[i].selected = CHOICE_SELECTED_YES ;
					}
				}
				else{
					for(var j=0; j<element.length; j++){
						if(element[j].checked){
							isChecked = true ;
							success = true ;
							choices[i].rank = element[j].value ;
							choices[i].selected = CHOICE_SELECTED_YES ;
							 
						}
					}
				}
				
				if(isChecked == false){
					success = false ;
					break ;
				}
				
		}
		
		if(success == false && haveToValidate== true ){
			if(obj.length != undefined){
				var _name = "#" + obj[index].name ;
				$(_name).validate() ;
				obj[index].focus();
			}else{
				var _name = "#" + obj.name ;
				$(_name).validate() ;
				obj.focus();
			}
			
			//utilObject.showMessage('Alert', 'Please specify other' ,'Ok' );		
		}
	
	return success ;
}

/**
 * Method used to validate datetime type questions
 */
validateDateTimeTypeQuestion=function(q, haveToValidate, param1 ){
	    var name = '' ;
	    if(param1 != undefined )
	    	name = getObjectNames(q, param1 ).fieldName;
	    else
	    	name = getObjectNames(q).fieldName;
		
		var theform = document.forms[ 'responsemainform' ] ; 
		var element = theform.elements[ name ] ; 
		var success = true ;
		
		if( utilObject.trim( element.value ) != '' ){
			q.answer = utilObject.encode64( utilObject.trim( element.value )) ;
		}
		else{
			success = false ;
		}
		if(success == false && haveToValidate== true ){		
			var _name = '#' + element.name ;
			$(_name).validate
			//element.focus();			
			//utilObject.showMessage('Alert', 'Please specify other' ,'Ok' );		
		}
	
	return success ;
}

/**
 * Method used to validate datetime range type questions
 */
validateDateTimeRangeTypeQuestion=function(q, haveToValidate, param1 ){
	    var object  ;
	    if(param1 != undefined )
	    	object = getObjectNames(q, param1 );
	    else
	    	object = getObjectNames(q);
	    
		var toName = object.toName ;
		var fromName = object.fromName ;
		var theform = document.forms[ 'responsemainform' ] ; 
		var toElement = theform.elements[ toName ] ; 
		var fromElement = theform.elements[ fromName ] ; 
		var success = true ;
		var isToValidated = true ;
		var isFromValidated = true ;
		if( utilObject.trim( toElement.value ) != '' ){
			q.to = utilObject.encode64( utilObject.trim( toElement.value )) ;
		}
		else{
			isToValidated = false ;
			success = false ;
		}
		
		if( utilObject.trim( fromElement.value ) != '' ){
			q.from = utilObject.encode64( utilObject.trim( fromElement.value )) ;
		}
		else{
			isFromValidated = false ;
			success = false ;
		}
		
		if(success == false && haveToValidate== true ){		
			if(isToValidated == false ){
				toElement.focus() ;
			}
			else{
				fromElement.focus() ;
			}
		}
	return success ;
}

/**
 * Method used to validate signature type question
 */
validateSignatureTypeQuestion=function( q, haveToValidate, param1 ){
	 var o ;
	    if(param1 != undefined )
	    	o = getObjectNames(q, param1 );
	    else
	    	o = getObjectNames(q);
	
	var success = true ;
	var canvasName = o.canvasName ;	
	var signatureOf = o.signatureOf ;
	var nn = "#" + canvasName ;
	var theform = document.forms[ 'responsemainform' ] ; 
	var toElement = theform.elements[ signatureOf ] ; 
	var canvasElement = document.getElementById(canvasName) ;
	if(isBlankCanvas(canvasName) == true ){
		success = false ;
		if(haveToValidate == true){
			canvasElement.focus() ;
		} 
	}
	else if( utilObject.trim( toElement.value) == ''){
		success = false ;
		if(haveToValidate == true){
			toElement.focus() ;
		}
	}
	else {
		q.signature = canvasElement.toDataURL() ;
		q.signatureOf = utilObject.encode64( toElement.value ) ;
	}
	alert('validateSignatureTypeQuestion : ' + q.signature); 
	return success ;
}
/**
 * Check if canvas is blank
 */
function isBlankCanvas( canvasName ){
		var isBlank = true ;
		var canvas = document.getElementById( canvasName );	
		if(canvas.toDataURL() == document.getElementById('blankcanvas').toDataURL())
			isBlank = true ;
		else
			isBlank = false;
	return isBlank ;	 
}
/**
 *  Method used to load canvas
 */
addEventInSignature=function(){
	alert('Inside add event signature');
	if(currentObject.signatureArray !=null && currentObject.signatureArray.length > 0){
			for( var i=0; i< currentObject.signatureArray.length; i++ ){
		 
				var n1 = getObjectNames(currentObject.signatureArray[i].question, currentObject.signatureArray[i].index ).canvasName ;
	 
				var n =   '#' + n1  ;
				
				// jqScribble(document.getElementById(n));
				//document.getElementById(n).jqScribble();
				$(n).jqScribble();
				if(currentObject.signatureArray[i].question.signature != '' )
					loadCanvas(n1, currentObject.signatureArray[i].question.signature ) ;
				
			}
		
	}
}
/**
 * Method used to load canvas
 */
function loadCanvas( canvasName, data ) {
			var canvas = document.getElementById( canvasName );
			var context = canvas.getContext('2d');

			// load image from data url
			var imageObj = new Image();
			imageObj.onload = function() {
			  context.drawImage(this, 0, 0);
			};
            //var dataURL = document.getElementById('test').toDataURL();
			imageObj.src = data;
}

/**
 * Method used to emit signature html
 * @param q
 * @returns {String}
 */
function getSignatureHtml(q, param1, param2 ){
		alert('getSignatureHtml : ' + q.signature) ;
		var html = '' ;
		var o ;
		if(param2 != undefined )
			o = getObjectNames(q, param2) ;
		else
			o = getObjectNames(q) ;
		
		var canvasName = o.canvasName ;	
		var signatureOf = o.signatureOf ;
		var ssArray = currentObject.signatureArray ;
		var sObject = new signatureObject() ;
		sObject.question = q ;
		sObject.index = param2;
		ssArray[ssArray.length] = sObject ;
		currentObject.signatureArray = ssArray ;
		
		var qTable = o.tableName ;
		
		if(q.conditionalQuestionId*1 == -1 )
			html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%"  >'
		else
			html += '<tr><td colspan="2"><table id="' + qTable +  '" width="100%" style="display:none;"  >' ;
		html += getQuestionHtml(q) ;
		
	 
			html += '<tr><td>' ;
			html += '<canvas id="' + canvasName + '" style="border: 1px solid red;" width="430" height="150" ></canvas>' ;
			html += '</td></tr>' ;
			html += '<tr><td>' ;
			var nn = "#" + canvasName ;
			html += '<a href="javascript:void(0);" onclick=' + "'" + '$("' + nn + '").data("jqScribble").clear();' + "'" + '>Clear</a>' ;
			html += '</td></tr>' ;
			html += '<tr><td>' ;
			html += 'Signature of' ;
			html += '</td></tr>' ;
			
			html += '<tr><td>' ;
			if(utilObject.decode64(q.signatureOf) != '' )
				html += '<input name="' + signatureOf + '" type="text"  value="' + utilObject.decode64(q.signatureOf) +  '" title="Name of signaturey" placeholder="Name of signaturey" class="form-control" required /> ' ;
			else
				html += '<input name="' + signatureOf + '" type="text"  value="" title="Name of signaturey" placeholder="Name of signaturey" class="form-control" required /> ' ;
			
			html += '</td></tr>' ;
		 
		
		
		html += '</table></td></tr>' ;
		return html ;
}
/**
 * 
 */
function checkSectionWiseVisibility(sectionIndex){	
		var tmpQuestiondb = TAFFY(JSON.stringify( currentObject.survey.sections[sectionIndex].questions )) ;
		var questions = tmpQuestiondb.get({visible:QUESTION_VISIBILITY_CONDITIONAL}) ;
		if( questions != null && questions.length > 0 ){
			for( var i=0; i<questions.length; i++ ){
				checkVisibility( questions[i].sectionId,  questions[i].conditionalQuestionId )
			} 
		}
}
/**
 *  Method used to showHide element based on their selection
 */
function manageVisibility(){
	 //currentObject.signatureArray = new Array();
		var survey = currentObject.survey ;
		var sections = survey.sections ;		
		var displaySetting = survey.displaySetting ;
		 
			
		if( sections != null && sections.length > 0 ){
				if(displaySetting.displayStyle == DISPLAY_STYLE_SINGLE_PAGE ){
					for(var i=0; i<sections.length; i++ ){
						checkSectionWiseVisibility(i) ;
					}				
				}
				else{
					if(currentObject.sectionIndex == -1 )
					{
						currentObject.sectionIndex = 0
					}
					
					checkSectionWiseVisibility(currentObject.sectionIndex) ;
				}
				
		}	
}

/**
 * Method used to check savePoint and manage visibility, once any selection made in questions
 */
function checkSavePoint( sectionId, questionId, rowIndex ){
	// get all questions of that section
	// call validation code
	// call checkvisibility code
	// increment savepoint count
	currentObject.saveCount = currentObject.saveCount + 1 ;
		
		checkVisibility( sectionId,  questionId) ;
	if(currentObject.saveCount == currentObject.MaxQuestionCountForSavePoint ){
		manageValidation(false) ;
		currentObject.saveCount = 0 ;		 
		// manageSavePoint();
	}
}

getAttachmentButton=function(ques){
 
	html = '' ;
	var previewDivId = 'questionDiv' + ques.id ;
	if(ques.pictureRequired !=undefined && ques.pictureRequired !=null ){
		if(ques.pictureRequired == QUESTION_PIC_ATTACHMENT_REQUIRED_YES ){
			html += '<tr><td><table>' ;
			html += '<tr><td>' ;
			html += '<div id="' + previewDivId + '" > ' ;
			if( ques.fileAttachment != '' ){
				html += '<img src="' + ques.fileAttachment + '" alt="" />' ;				
			}
			
			html += '</div>' ;
			html += '</td>' ;
			
			html += '<td>' ;
			if(device == 'null' || device == 'undefined' ){
				html += '<input id="inputFileToLoad" type="file" onchange="loadImageFileAsURL(' + "'" + ques.id + "'" + ');" />'
			}
			else{
				html += '<button type="button" class="btn btn-primary" onclick="doPreviewAction(' + "'" + 'attachapic'  + "' ,"  + "'" + ques.id + "'" + ')" >' + 'Attach a pic' + '</button>' ;
				
			}
			html += '</td></tr>' ;
			html += '</table></td></tr>' ;
		}
	}
	return html ;
}

/**
 * ManageSavePoint
 */
function manageSavePoint(){
	/*
		responsedb.remove({timeStamp:currentObject.timeStamp}) ;
		responsedb.insert(currentObject) ;
		doDBAction('saveResponseDb') ;
	*/
}

loadImageFileAsURL=function(id){
	    var previewDivId = 'questionDiv' +  id ;
	    var filesSelected = document.getElementById("inputFileToLoad").files;
	    if (filesSelected.length > 0){
	        var fileToLoad = filesSelected[0];

	        var fileReader = new FileReader();

	        fileReader.onload = function(fileLoadedEvent) {
	            var srcData = fileLoadedEvent.target.result; // <--- data: base64
	            var html = '<img src="' + srcData + '" alt="" />' ;
	            /*
	            var divTest = document.getElementById("imgTest");
	            var newImage = document.createElement('img');
	            newImage.src = srcData;

	            divTest.innerHTML = newImage.outerHTML;
	            */
	             
	    		var survey = currentObject.survey ;
	    		var sections = survey.sections ;		
	    		for(var i =0; i< sections.length; i++ ){
	    			questions = sections[i].questions ;
	    			var haveToBreak = false ;
	    			if(questions != null && questions.length > 0){
	    				for(var j=0; j<questions.length; j++ ){
	    					if( questions[j].id == id*1 ){
	    						questions[j].fileAttachment = srcData ;
	    						haveToBreak = true ;
	    						break ;
	    					}
	    				}
		    		 
	    				
	    			}
	    			if(haveToBreak == true){
	    				break ;
	    			}
	    		} 
	    		
	            
				document.getElementById( previewDivId ).innerHTML= html;

	        }

	        fileReader.readAsDataURL(fileToLoad);
	    }
}




