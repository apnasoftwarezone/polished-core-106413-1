var currentQuestionPicture = null ;
var currentChoicePicture = null ;
var currentChoiceArray = null ;
var selectedQuestionId = -1 ;
var currentChoiceIndex = -1 ;
//$('tr[id$=TestGrid]:nth-child(2n + 3)').addClass("odd").removeClass("even");
//$('tr[id$=TestGrid]:nth-child(2n)').addClass("even").removeClass("odd");

/**
 * Method  used to handle file display
 */
function doFileAction( action ) {
	if( action == 'choicefileuploaded' ){	 
		var html ='<a href="' + currentChoicePicture.imageUrl + '" data-lightbox="image-3" data-title="">' ;
		html += '<img border="2" src="' + currentChoicePicture.thumbnailUrl + '" alt="" /> '+ '</a>' ;
		$('#choiceimagefile').html( html ) ; 
		$('#choicefilelist').html( "<strong></strong>") ;
		$('#choiceFilePicker').hide() ;
		$('#removechoiceFile').show() ;
	}
	else if( action == 'choiceuploadfailed' || action == 'resetchoicecontainer' ){
	    //currentChoiceIndex = -1 ;
	 	currentChoicePicture = null ;
	    $('#choiceimagefile').html( "<strong></strong>");		
	    $('#choiceimagefile').empty() ;	
		$('#choicefilelist').empty() ;
		$('#choiceFilePicker').show() ;
		$('#removechoiceFile').hide() ;
	}
	else if( action == 'questionfileuploaded' ){	 
		var html ='<a href="' + currentQuestionPicture.imageUrl + '" data-lightbox="image-2" data-title="">' ;
		html += '<img border="2" src="' + currentQuestionPicture.thumbnailUrl + '" alt="" /> '+ '</a>' ;
		$('#questionimagefile').html( html ) ; 
		$('#questionfilelist').html( "<strong></strong>") ;
		$('#questionFilePicker').hide() ;
		$('#removequestionFile').show() ;
	}
	else if( action == 'questionuploadfailed' || action == 'resetquestioncontainer' ){
	 	currentQuestionPicture = null ;
	    $('#questionimagefile').html( "<strong></strong>");		
	    $('#questionimagefile').empty() ;	
		$('#questionfilelist').empty() ;
		$('#questionFilePicker').show() ;
		$('#removequestionFile').hide() ;
	}

}

/**
 *
 */
doQuestionAction=function(action, param1, param2, param3 ){
	 
	if(action == 'questiontypechange'){
			var theform = utilObject.getFormObject('addeditquestionform') ; 
			 
			alert('Value: ' + theform.questiontype.value + ' QUESTION_TYPE_TABULAR: ' + QUESTION_TYPE_TABULAR );
			if( theform.questiontype.value * 1 == QUESTION_TYPE_TABULAR ){
				doTabularAction('addquestion');
				
				return;
			}
			theform.populatechoices.selectedIndex = 0 ;
			currentChoicePicture = null ;
			currentChoiceArray = null ;			 
	        doFileAction('resetchoicecontainer') ;			 
			$('#choicelisting').html('');
		    doQuestionAction('managequestionfieldvisibility', theform); 
		    
			
	}
	else if( action == 'setform' ){
		//param1 contain form and param2 contain questionid
		var q = questiondb.get({id:param2})[0] ;
		// select question type
		utilObject.selectValueInList(param1.questiontype, q.type) ;
		param1.question.value = utilObject.decode64( q.question ) ;
		currentQuestionPicture = null ;
		// Set Question File
			if(q.file != null && utilObject.trim( q.file.imageUrl ) != ''){
			        currentQuestionPicture = q.file ;
					var html ='<a href="' + currentQuestionPicture.imageUrl + '" data-lightbox="image-1" data-title="">' ;
					html += '<img border="2" src="' + currentQuestionPicture.thumbnailUrl + '" alt="" /> '+ '</a>' ;
					$('#questionimagefile').html( html ) ; 
					$('#questionfilelist').html( "<strong></strong>") ;
					$('#questionFilePicker').hide() ;
					$('#removequestionFile').show() ;
		    }
		    // Setting pictureRequired in response or not
		    if(q.pictureRequired*1 == QUESTION_PIC_ATTACHMENT_REQUIRED_YES) 
		    	param1.picturerequired.checked = true ;
		    else
		    	param1.picturerequired.checked = false ;
		  
			 // Setting commentRequired in response or not
/*			 
		    if(q.commentRequired == QUESTION_COMMENT_ATTACHMENT_REQUIRED_YES) 
		    	param1.commentrequired.checked = true ;
		    else
		    	param1.commentrequired.checked = false ;
*/		    	
//
            if( q.visible == QUESTION_VISIBILITY_CONDITIONAL )
                param1.isconditional.checked = true ;
            else
                param1.isconditional.checked = false ;
            
           			 
 			if( param1.isconditional.checked ){
 			
 			     utilObject.selectValueInList(param1.conditionalquestion, q.conditionalQuestionId ) ;
 			     utilObject.selectValueInList(param1.condition, q.logicalCondition ) ;
 			     doQuestionAction('populatechoices');
 			     utilObject.selectValueInList(param1.conditionalchoice, q.conditionalChoiceId ) ; 			     
				
			}
			
			if( q.rangeFrom*1 != 0)	
				param1.fromrange.value = q.rangeFrom ;
				
			if(  q.rangeTo*1 != 0 )	
				param1.torange.value = q.rangeTo ;
				
			if(  q.rangeIncrement*1 != 0 )	
				param1.increment.value = q.rangeIncrement ;
				
			param1.score.value = 0 ;
		
		// set choices
		currentChoiceArray = q.choices ;
		showHtml('showchoices') ;
		doQuestionAction('managequestionfieldvisibility', param1); 
		//doQuestionAction('questiontypechange');
		utilObject.switchDisplayDiv('addeditquestiondiv');
	}
	else if(action == 'addquestionok'){
			var theform = utilObject.getFormObject('addeditquestionform') ; 
		    var q = new Question() ;
			q.id = selectedQuestionId ; 
			q.sectionId = selectedSectionId ;
			q.question = utilObject.encode64( theform.question.value );
			q.type = theform.questiontype.options[theform.questiontype.selectedIndex].value * 1 ;
			
			// Setting pictureRequired in response or not
			if(theform.picturerequired.checked)
				q.pictureRequired = QUESTION_PIC_ATTACHMENT_REQUIRED_YES ;
			else
				q.pictureRequired = QUESTION_PIC_ATTACHMENT_REQUIRED_NO ;
				
			// Setting CommentRequired in response or not	
 				q.commentRequired = COMMENT_FIELD_REQUIRED_NO ;
				
			if( theform.isconditional.checked ){
				q.visible = QUESTION_VISIBILITY_CONDITIONAL ;
				q.conditionalQuestionId = theform.conditionalquestion.options[ theform.conditionalquestion.selectedIndex ].value ;
				q.logicalCondition =  theform.condition.options[ theform.condition.selectedIndex ].value ;
				q.conditionalChoiceId =  theform.conditionalchoice.options[ theform.conditionalchoice.selectedIndex ].value ;
			}
			else{
				q.visible = QUESTION_VISIBILITY_YES ;
				q.conditionalQuestionId = -1 ;
				q.logicalCondition = "" ;
				q.conditionalChoiceId = -1 ;
			}
			q.help = utilObject.encode64( "" );
			q.choices = currentChoiceArray ;
			q.file = currentQuestionPicture ;
			
			// set range values ;
			if( utilObject.trim(theform.fromrange.value) != '')	
				q.rangeFrom = theform.fromrange.value * 1 ;
				
			if( utilObject.trim(theform.torange.value) != '')	
				q.rangeTo = theform.torange.value * 1 ;
				
			if( utilObject.trim(theform.increment.value) != '')	
				q.rangeIncrement = theform.increment.value * 1 ;
		   			
			if(validateQuestion(q)){
			     handleRequest(ACTION_ADD_QUESTION_OK, 'questions', q ) ;
			} 
 
	}
	else if( action == 'editchoice' ){
	    var theform = utilObject.getFormObject('addeditquestionform') ; 
		currentChoiceIndex = param1 * 1 ;
		var c = currentChoiceArray[currentChoiceIndex] ;
		
	    currentChoicePicture = null ;
	    
 		theform.choice.value = utilObject.decode64( c.choice );
 		if(c.isDefault*1 == CHOICE_DEFAULT_SELECTION_YES)
 		  theform.defaultselectedchoice.checked = true ;
 		else
 		  theform.defaultselectedchoice.checked = false ;
 		
 		if(c.showTextForImage*1 == SHOW_TEXT_YES)
 			theform.showchoicewithimage.checked = true ;
 		else
 			theform.showchoicewithimage.checked = false ;
 		
		alert( 'Inside editing commentrequired : ' + c.commentRequired ) ; 
 		if( c.commentRequired*1 == COMMENT_FIELD_REQUIRED_YES )
 			theform.commentrequired.checked = true ;
 		else
 		 	theform.commentrequired.checked = false ;
 		
 		if(c.score*1 != 0)
 			theform.score = c.score;
 			
 		// Now set picture object:
		if(c.file != null && utilObject.trim( c.file.imageUrl ) != ''){
		        currentChoicePicture = c.file ;
				var html ='<a href="' + currentChoicePicture.imageUrl + '" data-lightbox="image-3" data-title="">' ;
				html += '<img border="2" src="' + currentChoicePicture.thumbnailUrl + '" alt="" /> '+ '</a>' ;
				$('#choiceimagefile').html( html ) ; 
				$('#choicefilelist').html( "<strong></strong>") ;
				$('#choiceFilePicker').hide() ;
				$('#removechoiceFile').show() ;
		}
		
	}
	else if(action == 'deletechoice'){
	 	var c = currentChoiceArray[param1] ;
	 	if(c.id*1 != -1 && questionsdb.get({conditionalChoiceId:c.id}).length > 0){
	 		utilObject.showMessage('Alert', 'Selected choice cant be deleted because it has been used as skip condition for some questions' ,'Ok');
	 		return ;
	 	}
	 	else{
			currentChoiceArray.splice(param1, 1);
			showHtml('showchoices') ;
		}
	}
	else if(action == 'resetform'){		    
			var si = param1.questiontype.selectedIndex ;			 
			param1.reset() ;
			param1.id.value = -1 ;
			
			currentQuestionPicture = null ;
			currentChoicePicture = null ;
			currentChoiceArray = null ;
			
			param1.questiontype.selectedIndex = si ;
			if(param1.conditionalquestion.options.length > 0) 
				param1.conditionalquestion.selectedIndex = 0 ;
			param1.condition.selectedIndex = 0 ;
			if(param1.conditionalchoice.options.length > 0) 
				param1.conditionalchoice.selectedIndex = 0 ;
			
	         doFileAction('resetquestioncontainer') ;
	         doFileAction('resetchoicecontainer') ;
			 
			 $('#choicelisting').html('');
		 
	}
	else if(action == 'removequestionfile'){
			 doFileAction('resetquestioncontainer') ;
	}
	else if(action == 'removechoicefile' ){
			doFileAction('resetchoicecontainer') ;
	}
	else if(action == 'showhideconditionalquestions' ){
	    var theform = utilObject.getFormObject('addeditquestionform') ;
	    if( questiondb.get().length > 0){
			    if(theform.isconditional.checked)
				 	 $('#conditiondiv').show();
				else
					 $('#conditiondiv').hide();
		}
		else{
		    utilObject.showMessage('Alert', 'There must atleast one multiple choice question, before you can add a conditional question' ,'Ok');
		}
	
	}
	else if(action == 'populatechoices'){
		populateConditionalChoices() ;		
	}
	else if(action == 'hidepopup' ){
	    $('#imagePopup').css('display','none');
		$('#imagePopup td').html(img);
	}
	else if(action == 'showchoicefile'){
	   // var img = '<img src="' + currentChoicePicture.base64String + '" style="max-width:640px;max-height:480px" alt="choice file">' ;
	    var img = "<img style='max-width:640px;max-height:480px' src='" + currentChoicePicture.base64String + "'/> ";
/*	    
	    $('#imagePopup').css('display','block');
		$('#imagePopup td').html(img);
		$('#imagePopup').bPopup({
			positionStyle: 'fixed',
			position: [10,10],
			scrollBar: true
		});	
*/		
	    $("#modal_dialog").html(img);
	    $("#modal_dialog").dialog({
                title: "Picture",
                buttons: {
                    Close: function () {
                        $(this).dialog('close');
                    }
                },
                modal: true 
          });
          
	}
	else if(action == 'resetchoiceorder'){
			var index = param1 ;
			var nextindex = -1 ;
			if(param2 == 'moveup' ){
				nextindex = index + 1 ;
			}
			else if(param2 == 'movedown' ){
			    nextindex = index - 1 ;
			}
			obj = currentChoiceArray[index] ;
			nextobj = currentChoiceArray[nextindex] ; 
			currentChoiceArray[index] = nextobj ;
			currentChoiceArray[nextindex] = obj ;
	}
	else if(action == 'managequestionfieldvisibility' ){
			var type = parseInt( param1.questiontype.value )
			// show score id if question is multiple choice and survey is score type
			var surveyType = surveydb.get({id:selectedSurveyId})[0].type;
			if( surveyType == SURVEY_TYPE_SCORE )
				$('#scoreid').show();
			else 
				$('#scoreid').hide();	
				
			var theform = utilObject.getFormObject('addeditquestionform') ;
			if(theform.isconditional.checked )
			   $('#conditiondiv').show();			
			else
			   $('#conditiondiv').hide();
			
						
	   		if( type == QUESTION_TYPE_SINGLE_ANSWER_TEXT ||
	   		    type == QUESTION_TYPE_MULTIPLE_ANSWER_TEXT ||
	   		    type == QUESTION_TYPE_SINGLE_ANSWER_IMAGE ||
	   		    type == QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE ){
			   		 	 $('#addeditchoicediv').show();
			   		 	 $('#rangetypequestiondiv').hide();
			   		 	 $('#conditiondiv').hide();
			   		 	 
		   		 	 	if(surveyType == SURVEY_TYPE_RESPONSE)
			 					$('#scoreid').hide();
						else 
									 $('#scoreid').show();
			   		 	 if(type == QUESTION_TYPE_SINGLE_ANSWER_TEXT || type == QUESTION_TYPE_MULTIPLE_ANSWER_TEXT ){
			   		 		 $('#choicefileid').hide();
			   		 		 $('#showchoicewithimage').hide();
			   		 		 $('#choicetemplateid').show();
			   	
			   		 	 }
			   		 	 else{
			   				 $('#choicefileid').show();
			   				 $('#showchoicewithimage').show();
			   				  $('#choicetemplateid').hide();	   				 
			   			 }
			   		 $('#addeditchoicediv').show();
	   		 	 	 $('#choicelisting').show();
	   		 }
	   		 else if(type == QUESTION_TYPE_RANGE ){
	   		 	 	 $('#rangetypequestiondiv').show();
	   		 	 	 $('#addeditchoicediv').hide();
	   		 	 	 $('#choicelisting').hide();
	   		 }
	   		 else if(type == QUESTION_TYPE_TABULAR){
	   		 
	   		 }
	   		 else if( type == QUESTION_TYPE_PREFERED_CHOICE_TYPE ){
	   		 			 $('#addeditchoicediv').show();
			   		 	 $('#rangetypequestiondiv').hide();			   		 	 
			   		 	 $('#choicefileid').hide();
			   		 	 $('#showchoicewithimage').hide();
			   	
			 }
	   		 else{  
	   		 		 $('#rangetypequestiondiv').hide();
	   		 	 	 $('#addeditchoicediv').hide();
	   		 	 	 $('#choicelisting').hide();
	   		 }
		 
	 }
	 else if(action == 'addchoiceok' ){
	        var theform = utilObject.getFormObject('addeditquestionform') ; 
	        
	 		var surveyType = surveydb.get({id:selectedSurveyId})[0].type * 1 ;
	 		var questiontype = theform.questiontype.options[ theform.questiontype.selectedIndex ].value*1 ;
	 		var choice = theform.choice.value ;
	 		var score = theform.score.value ;
	 		var defaultchoice = theform.defaultselectedchoice.checked ;
	 		var showchoicewithimage = theform.showchoicewithimage.checked ;
	 		var commentrequired = theform.commentrequired.checked ;
	 		
	 		// var currentChoicePicture = null ;
           // var currentChoiceArray = null ;
            if(currentChoiceArray == null )
                currentChoiceArray = new Array() ;
	 		var c = new Choice() ;
	 		if(utilObject.trim(choice) == '' ){
	 			utilObject.showMessage('Alert', 'Enter choice' ,'Ok');
	 			return ;
	 		}
	 		else {
	 		     c.choice = utilObject.encode64( choice );
	 		}
	 		if(questiontype == QUESTION_TYPE_SINGLE_ANSWER_IMAGE || questiontype == QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE ){
	 			if( currentChoicePicture == null ){
	 				utilObject.showMessage('Alert', 'Please attach a picture for the choice' ,'Ok');
	 				return ;
	 			}
	 			else{
		 				if(currentChoiceIndex == -1){
		 					c.file = currentChoicePicture ;
		 				}
		 				else{
			 				   var file = c.file ;
			 				   if(file !=null && file.id*1 != -1){
			 				   		currentChoicePicture.id = file.id ;
			 				   		c.file = currentChoicePicture ;
			 				   }
			 				   c.file = currentChoicePicture ;
		 				}
	 			}
	 			
	 			// Check if all choices have the same selection, if not then give error message
	 			if(currentChoiceArray != null && currentChoiceArray.length > 0){
	 				var isSameSelection = true ;
	 				for(var i=0; i<currentChoiceArray.length; i++){
	 					if(currentChoiceArray[i].showTextForImage*1 != showchoicewithimage*1){
	 						utilObject.showMessage('Alert', 'Either choice and image will be shown for all choices or for none' ,'Ok');
	 						isSameSelection = false ;
	 						return ;
	 					}
	 				
	 				}
	 				if(!isSameSelection)
	 					return ;
	 			
	 			}
	 			 
	 			
	 			if (showchoicewithimage )
	 				c.showTextForImage = SHOW_TEXT_YES ;
	 			else
	 				c.showTextForImage = SHOW_TEXT_NO ;
	 			
	 			
	 		}
	 		if(surveyType == SURVEY_TYPE_SCORE){
			 		if( utilObject.trim(score) == '' ){
			 				utilObject.showMessage('Alert', 'Please enter score for the choice selection' ,'Ok');
			 				return;
			 		} 
			 		else if(utilObject.isValidPositiveInteger(score) == false){
			 				utilObject.showMessage('Alert', 'Please enter valid score for the choice selection' ,'Ok');
			 				return;
			 		}
			 		else if(utilObject.isValidPositiveInteger(score) == true){
			 			c.score = score ;
			 		}
			 }
			 
	 		if(defaultchoice)
	 			c.isDefault = CHOICE_DEFAULT_SELECTION_YES;
	 		else
	 		    c.isDefault = CHOICE_DEFAULT_SELECTION_NO;
	 		
	 		alert( ' commentrequired : ' + commentrequired ) ;    
	 		if(commentrequired )
	 		    c.commentRequired = COMMENT_FIELD_REQUIRED_YES; 
	 		else
	 			c.commentRequired = COMMENT_FIELD_REQUIRED_NO;
	 			
	 		// check for duplicate
	 		if(currentChoiceArray != null && currentChoiceArray.length > 0){
	 			var isDuplicate = false ;
	 			for(var i=0; i<currentChoiceArray.length; i++){
	 			    if(c.choice == currentChoiceArray[i].choice && currentChoiceIndex != i ){
	 			       isDuplicate = true ;
	 			       break;
	 			    }
	 			}
	 			
	 			if(isDuplicate == true){
	 				utilObject.showMessage('Alert', 'Duplicate choices are not allowed' ,'Ok');
			 		return;
	 			}
	 		
	 		}	 		
	 		    
	 		if( currentChoiceIndex == -1 ) 
	 			currentChoiceArray[currentChoiceArray.length] = c ;
	 		else{
	 		
	 			c.id = currentChoiceArray[currentChoiceIndex].id ;
	 			 
	 			
	 			currentChoiceArray[currentChoiceIndex] = c ;
	 			
	 		}
	 			
	 			
	 		
	 		currentChoicePicture = null ;
	 		currentChoiceIndex = -1 ;
	 		theform.choice.value = '' ;
	 		theform.defaultselectedchoice.checked = false ;
	 		theform.commentrequired.checked = false ;
	 		theform.score.value = '' ;
	 		// reset choice file now	 	     
			doFileAction('resetchoicecontainer') ;
			
	 		theform.choice.focus();
	 		showHtml('showchoices') ;
	 		 
	 		
	 }
	 else if(action == 'resetchoicecontainer' ){
	        currentChoicePicture = null ;
	 		theform.choice.value = '' ;
	 		theform.defaultselectedchoice.checked = false ;
	 		theform.showchoicewithimage.checked = false ;
	 		theform.score = '' ;
	 }
}
	 var QUESTION_TYPE_SINGLE_ANSWER_TEXT = 1 ;
	 var QUESTION_TYPE_MULTIPLE_ANSWER_TEXT = 2 ;
	 var QUESTION_TYPE_SINGLE_ANSWER_IMAGE = 3 ;
	 var QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE = 4 ;
	 
	 var QUESTION_TYPE_TEXT_SINGLE_LINE = 5 ;
	 var QUESTION_TYPE_TEXT_MULTI_LINE = 6 ;
	 var QUESTION_TYPE_Alphanumeric = 7 ;
	 var QUESTION_TYPE_NUMBER_WITHOUT_DECIMAL = 8 ;
	 var QUESTION_TYPE_NUMBER_WITH_DECIMAL = 9 ;
	 
	 var QUESTION_TYPE_PREFERED_CHOICE_TYPE = 10 ;
	 
	 var QUESTION_TYPE_EMAIL = 11 ;
	 var QUESTION_TYPE_PHONE = 12 ;
	 var QUESTION_TYPE_TABULAR = 13 ;
	 var QUESTION_TYPE_RANGE = 14 ;
	 var QUESTION_TYPE_SIGNATURE = 15 ;
	 
	 var QUESTION_TYPE_DATE_PICKER = 16 ;
	 var QUESTION_TYPE_DATE_RANGE_PICKER = 17 ;
	 var QUESTION_TYPE_TIME_PICKER = 18 ;
	 var QUESTION_TYPE_TIME_RANGE_PICKER = 19 ;
	 var QUESTION_TYPE_STOP_WATCH = 20 ;
	 var QUESTION_TYPE_WEBSITE = 21 ;
	 
	 var QUESTION_TYPE_AUDIO_RECORD = 22 ;
	 var QUESTION_TYPE_APHANUMERIC_WITH_SPACE = 23 ;

/*
[  
   {  
      "id":1,
      "name":"Multiple Choice - Single answer"
   },
   {  
      "id":2,
      "name":"Multiple Choice - Many answers"
   },
   {  
      "id":3,
      "name":"Multiple Choice - Image single answer"
   },
   {  
      "id":4,
      "name":"Multiple Choice - Image many Answer"
   },
   {  
      "id":5,
      "name":"Text - Single Line"
   },
   {  
      "id":6,
      "name":"Text - Multi Line"
   },
   {  
      "id":7,
      "name":"Alphanumeric"
   },
   {  
      "id":8,
      "name":"Number - Number without decimal"
   },
   {  
      "id":9,
      "name":"Number with decimal"
   },
    
   {  
      "id":10,
      "name":"Ranking / Prefered choice type"
   },
    
   {  
      "id":11,
      "name":"Email"
   },
   {  
      "id":12,
      "name":"Phone"
   },
   {  
      "id":13,
      "name":"Tabular question"
   },
   {  
      "id":14,
      "name":"Range"
   },
   {  
      "id":15,
      "name":"Signature"
   },    
   {  
      "id":16,
      "name":"Date picker"
   },
   {  
      "id":17,
      "name":"Date range picker"
   },
   {  
      "id":18,
      "name":"Time picker"
   },
   {  
      "id":19,
      "name":"Time range picker"
   },
   {  
      "id":20,
      "name":"Stop watch"
   },
   {  
      "id":21,
      "name":"Website"
   },
   {  
      "id":22,
      "name":"Record audio"
   }
]

*/

/**
 * Method used to populate conditional questions
 */
 function populateConditionalQuestion(){
     var theform = utilObject.getFormObject('addeditquestionform') ;
     if( selectedQuestionId == -1 ){
 	        tempquestiondb = TAFFY([]);
			var sections = sectiondb.get({id:selectedSectionId}) ;
			for( var j=0; j<sections.length; j++ ){
			   if( selectedSectionId * 1 >= sections[j].id*1 )
				  tempquestiondb.insert( sections[j].questions );
			}
			utilObject.populateQuestions(theform.conditionalquestion, false, tempquestiondb.get({type:[QUESTION_TYPE_SINGLE_ANSWER_TEXT,QUESTION_TYPE_MULTIPLE_ANSWER_TEXT, QUESTION_TYPE_SINGLE_ANSWER_IMAGE, QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE]}) );
	 }
	 else{
	        tempquestiondb = TAFFY([]);
			var sections = sectiondb.get({id:selectedSectionId}) ;
			for( var j=0; j<sections.length; j++ ){
			   if(selectedSectionId * 1 >= sections[j].id*1 )
				  tempquestiondb.insert( sections[j].questions );
			}
			tempquestiondb.remove({id:selectedQuestionId});
			utilObject.populateQuestions(theform.conditionalquestion, false, tempquestiondb.get({type:[QUESTION_TYPE_SINGLE_ANSWER_TEXT,QUESTION_TYPE_MULTIPLE_ANSWER_TEXT, QUESTION_TYPE_SINGLE_ANSWER_IMAGE, QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE]}) );
	 }
 }
 
 /**
  * Method used to populate conditional choices
  */
  function populateConditionalChoices(){
  	    var theform = utilObject.getFormObject('addeditquestionform') ;
		var val = theform.conditionalquestion.options[theform.conditionalquestion.selectedIndex].value ;
		var q = tempquestiondb.get({id:val})[0];
		utilObject.populateChoices(theform.conditionalchoice, false, q.choices );
  }
 
   
  
  
  
  
  