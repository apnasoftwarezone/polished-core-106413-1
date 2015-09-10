var selectedRowArray = null ;
var rowIndex = -1 ;
var selectedColoumnArray = null ;
var tabularChoiceArray = null ;
var currentColoumnIndex = -1 ;
function doTabularAction( action, param1, param2, param3){
		if( action == 'addquestion' ){
					var theform = utilObject.getFormObject('addedittabularform') ; 
					alert('typeJson : ' + typeJson ) ;
					alert('subTypeJson : ' + subTypeJson ) ;
					var tmpdb = TAFFY(subTypeJson);
					utilObject.populateDropDown(theform.questiontype, false, tmpdb.get() );
					doTabularAction( 'cleartabularform' )
					utilObject.switchDisplayDiv('addedittabulardiv', backimage, '', 'homepage');
					
		}
		else if( action == 'addrowok' ) {
			if(selectedColoumnArray == null || selectedColoumnArray.length == 0){
				utilObject.showMessage('Alert', 'Please add few coloumn for this row' ,'Ok');
				return ;
			}
			
			var theform = utilObject.getFormObject('addedittabularform') ; 
			var rowTitle = theform.rowtitle.value   ;
			if( utilObject.trim(rowTitle) != '' ){
				if(selectedRowArray == null ) 
					selectedRowArray = new Array() ;
					var row = new QuestionRow() ;
					row.name = utilObject.encode64( rowTitle) ;	
					row.cols = selectedColoumnArray ;
					selectedColoumnArray = null ;
					$('#coloumnlistingdiv').html('');
					alert('Coloumn length: ' + row.cols.length ) ;
					if( checkDuplicateRows( rowIndex , rowTitle  ) != true ){
							if( rowIndex != -1 ){
								selectedRowArray[ rowIndex ]  = row ; 
							}
							else{
								selectedRowArray[ selectedRowArray.length ]  = row ;							
								
							}
							showHtml( 'rowlisting' ) ;
							rowIndex = -1 ;
							theform.rowtitle.value = '' ;
							theform.rowtitle.focus() ;
					}
					else{
						utilObject.showMessage('Alert', 'Duplicate rows not allowed' ,'Ok');
					}
			}
			else{
					utilObject.showMessage('Alert', 'Please enter row title' ,'Ok');
			}
		}
		else if( action == 'editrow' ){
			    var theform = utilObject.getFormObject('addedittabularform') ; 
				rowIndex = param1 ;
				theform.rowtitle.value = utilObject.decode64( selectedRowArray[ rowIndex ].name )  ;
				selectedColoumnArray = selectedRowArray[ rowIndex ].cols ;
				doTabularAction('managequestionfieldvisibility', theform); 
			   	showHtml( 'showcoloumnlisting' );
		}
		else if( action == 'deleterow' ){
				selectedRowArray.splice( param1, 1 ) ;
				showHtml( 'rowlisting' ) ;
		}
		else if( action == 'moverowup' ){		 
			var a   = selectedRowArray[ param1 -1 ] ;
			selectedRowArray[ param1 -1 ] = selectedRowArray[ param1 ]
			selectedRowArray[ param1 ] = a ;
			showHtml( 'rowlisting' ) ;
		}
		else if( action == 'moverowdown' ){		 
			var a   = selectedRowArray[ param1 + 1 ] ;
			selectedRowArray[ param1 + 1 ] = selectedRowArray[ param1 ]
			selectedRowArray[ param1 ] = a ;
			showHtml( 'rowlisting' ) ;
		}
		else if( action == 'questiontypechange' ){
				var theform = utilObject.getFormObject('addedittabularform') ; 
				theform.populatechoices.selectedIndex = 0 ;
				$('#choicelisting').html('');				
			    doTabularAction('managequestionfieldvisibility', theform);  
	   }
	   else if( action == 'managequestionfieldvisibility' ){
	   		var theform = param1 ;
	   		var questionType = theform.questiontype.value ;
	   		theform.fromrange.value = "" ;
	   		theform.torange.value = "" ;
	   		theform.increment.value = "" ;
	   		theform.choice.value = "" ;
	   		theform.populatechoices.selectedIndex = 0 ;
	   		$('#rangecontainerdiv').hide() ;
	   		$('#choicecontainer').hide() ;
	   		
	   		if( questionType == QUESTION_TYPE_RANGE ){
	   			$('#rangecontainerdiv').show() ;
	   		}
	   		else if( questionType == QUESTION_TYPE_SINGLE_ANSWER_TEXT ||
	   		    questionType == QUESTION_TYPE_MULTIPLE_ANSWER_TEXT ||
	   		    questionType == QUESTION_TYPE_PREFERED_CHOICE_TYPE ){
	   		    $('#choicecontainer').show() ;
	   		
	   		}
	   		else {
	   			alert('Neither range nor multiple type question') ;
	   		}
	   }
	   else if(action == 'cleartabularform' ){
	   		var theform = utilObject.getFormObject('addedittabularform') ; 
	   		theform.question.value = '' ;
	   		
	   		document.getElementById('rowlistingdiv').innerHTML = '' ;
	   		theform.coloumntitle.value = '' ;
	   		theform.questiontype.selectedIndex = 0 ;
	   		document.getElementById('rangecontainerdiv').style.display = 'none' ;
	   		theform.fromrange.value = '' ;
	   		theform.torange.value = '' ;
	   		theform.increment.value = '' ;
	   		
	   		// choice container
	   		theform.choice.value = '' ;
	   		theform.populatechoices.selectedIndex = 0 ;
	   		document.getElementById('choicelistingdiv1').innerHTML = '' ;
	   		document.getElementById('coloumnlistingdiv').innerHTML = '' ;
	   }
	   else if(action == 'addchoiceok' ){
	   			if( tabularChoiceArray == null )
	   				tabularChoiceArray = new Array() ;
	   				
	   			if( selectedColoumnArray == null )
	   				selectedColoumnArray = new Array() ;
	   			 
	   	        var theform = utilObject.getFormObject('addedittabularform') ; 
	   			
	   				var c = new Choice() ;
	   			
	   			var commentrequired	= COMMENT_FIELD_REQUIRED_NO ;
	   			var choice = '' ;	   	 
	   			choice = utilObject.encode64( theform.choice.value );
	   			
	        	if( theform.commentrequired.checked == true )
	        		commentrequired	= COMMENT_FIELD_REQUIRED_YES ;
	        	
	        	 
	        	c.choice = choice ;
	        	c.commentRequired = commentrequired;
	        	
	        	 
	
		 		    
		 		// check for duplicate
		 		if(tabularChoiceArray != null && tabularChoiceArray.length > 0){
		 			var isDuplicate = false ;
		 			for(var i=0; i<tabularChoiceArray.length; i++){
		 			    if( c.choice == tabularChoiceArray[i].choice && currentChoiceIndex != i ){
		 			       isDuplicate = true ;
		 			       break;
		 			    }
		 			}
		 			
		 			if(isDuplicate == true){
		 				utilObject.showMessage('Alert', 'Duplicate choices are not allowed' ,'Ok');
				 		return;
		 			}
		 		
		 		}	 		
		 		    
		 		if( currentChoiceIndex == -1 ){ 
		 				tabularChoiceArray[tabularChoiceArray.length] = c ;
		 		}else{		 		
		 				c.id = tabularChoiceArray[currentChoiceIndex].id ;	 			 
		 				tabularChoiceArray[currentChoiceIndex] = c ;
		 		}
		 			
		 			
		 		
		 		currentChoiceIndex = -1 ;
		 		theform.choice.value = '' ;
		 		theform.commentrequired.checked = false ;
		 		 
				
		 		theform.choice.focus();
		 		showHtml('showtabularchoices') ;
	   }
	   else if( action == 'edittabularchoice' ){
	   		currentChoiceIndex = param1 ;
	   		var choice = tabularChoiceArray[ param1 ] ;
	   		var theform = utilObject.getFormObject('addedittabularform') ; 
	   		theform.choice.value = utilObject.decode64( choice.choice ) ;
	   		if( choice.commentRequired == COMMENT_FIELD_REQUIRED_YES )
	   			theform.commentrequired.checked = true ;
	   		else
	   			theform.commentrequired.checked = false ;
	   		
	   		
	   }
	   else if( action == 'movetabularchoiceup' ){
	   		var a   = tabularChoiceArray[ param1 -1 ] ;
			tabularChoiceArray[ param1 -1 ] = tabularChoiceArray[ param1 ]
			tabularChoiceArray[ param1 ] = a ;
	    
	   		showHtml('showtabularchoices') ;	   		
	   }
	   else if( action == 'movetabularchoicedown' ){
	   		var a   = tabularChoiceArray[ param1 + 1 ] ;
			tabularChoiceArray[ param1 + 1 ] = tabularChoiceArray[ param1 ]
			tabularChoiceArray[ param1 ] = a ;
	   
 
	   		showHtml('showtabularchoices') ;	   
	   }
	   else if( action == 'deletetabularchoice' ){
	   		alert('deletetabularchoice : ' + param1 ) ;
	   		tabularChoiceArray.splice( param1, 1 ) ;
	   		showHtml('showtabularchoices') ;	
	   }
	   else if(action == 'addcoloumnofpreviousrow' ){		  
		   if( selectedRowArray == null || selectedRowArray.length == 0 ){
			   alert('No row found') ;
		   }
		   else if( selectedColoumnArray != null && selectedColoumnArray.length > 0 ){
			   var message = 'This row contains coloumns that will be replaced. Do you want to proceed ?' ;
	 			utilObject.launchConfirmBox(message, function(val){
	 				if(val == 'true'){ 					 
	 					addColoumnOfLastRow() ;
	 				}
	 			} );		
		   }
		   else{
			   addColoumnOfLastRow() ;
		   }
	   }
	   else if( action == 'addcoloumnok' ){
	   		alert( ' Inside add coloumn ok ' ) ;
	   		var coloumn = new QuestionColoumn() ;
	   		var theform = utilObject.getFormObject('addedittabularform') ;
	   		if( selectedColoumnArray == null || selectedColoumnArray.length == 0  ) 
	   			selectedColoumnArray = new Array(); 
	   		if( utilObject.trim(theform.coloumntitle.value) == ''  ){
	   			utilObject.showMessage('Alert', 'Enter coloumn title' ,'Ok');
	   			return;
	   		}
	   		
	        if( ( theform.questiontype.value * 1 == QUESTION_TYPE_SINGLE_ANSWER_TEXT ) ||
	         ( theform.questiontype.value * 1 == QUESTION_TYPE_MULTIPLE_ANSWER_TEXT ||
	           theform.questiontype.value * 1 == QUESTION_TYPE_PREFERED_CHOICE_TYPE  )  ){
	   			if( tabularChoiceArray == null || tabularChoiceArray.length == 0 ){
	   				utilObject.showMessage('Alert', 'Enter choices' ,'Ok');
	   				return;
	   			}
	   		}
			if( theform.questiontype.value * 1 == QUESTION_TYPE_RANGE  ){
				var fromrange =  theform.fromrange.value * 1 ;
				var torange = theform.torange.value * 1 ;
				var increment = theform.increment.value * 1 ;
				coloumn.rangeFrom = fromrange ;
				coloumn.rangeTo = torange ;
				coloumn.rangeIncrement = increment ;
			}
	   		
	   	
	   		coloumn.coloumn = utilObject.encode64( theform.coloumntitle.value ) ;
	   		coloumn.type = theform.questiontype.value ;
	   		coloumn.choices = tabularChoiceArray ;
	   		if( currentColoumnIndex*1 == -1 ){
	   	 		selectedColoumnArray[ selectedColoumnArray.length ] = coloumn ;
	   	 	}else{
	   	 	    coloumn.id = selectedColoumnArray[ currentColoumnIndex ].id ;
	   	 	    coloumn.parentQuestionId = selectedColoumnArray[ currentColoumnIndex ].parentQuestionId ;
	   	 		selectedColoumnArray[ currentColoumnIndex ] = coloumn ;
	   	 	}
	   	 		
	   		// call method to show coloumn listing
// ***************************************************************************************************	   	 	
	   	 	tabularChoiceArray = null ;
	   	 	document.getElementById('choicelistingdiv1').innerHTML = '' ;
	   	 	theform.coloumntitle.value = '' ;
	   	 	theform.choice.value = '' ;
	   	 	theform.questiontype.selectedIndex = 0 ;
	   	 	theform.populatechoices.selectedIndex = 0 ;
	   	 	currentColoumnIndex = -1 ;
	   	 	$('#rangecontainerdiv').hide() ;
// ***************************************************************************************************	   	 	
	   	 	//	var theform = utilObject.getFormObject('addedittabularform') ; 
	        doTabularAction('managequestionfieldvisibility', theform); 
	   	 	showHtml( 'showcoloumnlisting' );
	   	 	theform.coloumntitle.focus();
	   }
	   else if( action == 'edittabularcoloumn' ){
	   		currentColoumnIndex = param1 ;
	   		var coloumn = selectedColoumnArray[ param1 ] ;
	   		
	   		var theform = utilObject.getFormObject('addedittabularform') ; 
	   		theform.coloumntitle.value = utilObject.decode64( coloumn.coloumn ); 
	   		utilObject.selectValueInList(theform.questiontype, coloumn.type) ;
	   		if( ( coloumn.type * 1 == QUESTION_TYPE_SINGLE_ANSWER_TEXT ) ||
	   		 ( coloumn.type * 1 == QUESTION_TYPE_MULTIPLE_ANSWER_TEXT  ) ||
	   		 ( coloumn.type * 1 == QUESTION_TYPE_PREFERED_CHOICE_TYPE  )  ){
			   	tabularChoiceArray = coloumn.choices ;
			   	// choicecontainer
			   	theform.choice.value = '' ;
			   	theform.populatechoices.selectedIndex = 0 ;
			   	$('#choicecontainer').hide() ;
			   	$('#choicecontainer').show() ;
	   		}
	   		else if( coloumn.type * 1 == QUESTION_TYPE_RANGE ){
	   			theform.fromrange.value = coloumn.rangeFrom ;
	   			theform.torange.value = coloumn.rangeTo ;
	   			theform.increment.value = coloumn.rangeIncrement ;
	   			$('#rangecontainerdiv').show() ;
	   		}	   		 
	   		else{
	   			theform.choice.value = '' ;
			   	theform.populatechoices.selectedIndex = 0 ;
			   	$('#choicecontainer').hide() ;
			   	$('#rangecontainerdiv').hide() ;
	   		}
	   		showHtml('showtabularchoices') ;	
	   }
	   else if( action == 'movetabularcoloumnup' ){
	   		var a   = selectedColoumnArray[ param1 -1 ] ;
			selectedColoumnArray[ param1 -1 ] = selectedColoumnArray[ param1 ]
			selectedColoumnArray[ param1 ] = a ;
	   		showHtml( 'showcoloumnlisting' ) ;
	   }
	   else if( action == 'movetabularcoloumndown' ){
	   		var a   = selectedColoumnArray[ param1 + 1 ] ;
			selectedColoumnArray[ param1 + 1 ] = selectedColoumnArray[ param1 ]
			selectedColoumnArray[ param1 ] = a ;	    
	   		showHtml( 'showcoloumnlisting' ) ;
	   }
	   else if( action == 'deletetabularcoloumn' ){
	  		alert('deletetabularchoice : ' + param1 ) ;
	   		selectedColoumnArray.splice( param1, 1 ) ;
	   		showHtml('showcoloumnlisting') ;	
	   }
	   else if( action == 'addquestionok' ){
	   		var theform = utilObject.getFormObject('addedittabularform') ; 
	   		
	   		var visible = utilObject.getCheckedValue( theform.rowtitlevisibility ) ;
	   		var repeatColoumsHeader = utilObject.getCheckedValue( theform.coloumnvisibility ) ;
	   		alert('visible : ' + visible + ' repeatColoumsHeader: ' + repeatColoumsHeader ) ;
	   
	   		var q ;
	   		if( selectedQuestionId == -1 ){
		   		q = new Question() ;
		   		q.type = theform.tabularquestiontype.value ;
				q.id = selectedQuestionId ; 
				q.sectionId = selectedSectionId ;
			}
			else{
				 var tempdb = TAFFY( JSON.stringify( questiondb.get({id:selectedQuestionId})) );
				 q = tempdb.get()[0] ;	 
			}	
				q.question = utilObject.encode64( theform.question.value );
				q.help = utilObject.encode64( "" );
			
				
			// q.cols = selectedColoumnArray ;
			// if repeatheader is equals to 1 then 
			// 1. coloumn length in all rows must be same
			// 2. coloumn title and type of all rows must be same
			if(selectedRowArray != null && selectedRowArray.length >0){
				
				var questionValidation = true ;
				for(var i=1; i<selectedRowArray.length; i++ ){
						selectedRowArray[0].visible = visible*1 ;
						var r = selectedRowArray[i] ;
						r.visible = visible*1 ;
						//r.repeatColoumsHeader = repeatColoumsHeader*1 ;
						if(repeatColoumsHeader*1 == REPEAT_COLUMN_HEADER_YES ){
								if( r.cols.length != selectedRowArray[0].cols.length ){
									utilObject.showMessage('Alert', 'To make common coloumn header, all rows must have same number of rows with same question type and title header ' ,'Ok');
									questionValidation = false ;
									break;
									 
								}
								else{
									var cols = r.cols ;
									var isValidated = true ;
									for(var j=0; j< cols.length; j++ ){
										cols[j].repeatColoumsHeader = repeatColoumsHeader ;
										selectedRowArray[0].cols[j].repeatColoumsHeader = repeatColoumsHeader ;
										if(cols[j].type != selectedRowArray[0].cols[j].type
										|| cols[j].coloumn != selectedRowArray[i].cols[j].coloumn  ){
											isValidated = false ;
											break ;
										}
											
									}
									if( isValidated == false ){
										utilObject.showMessage('Alert', 'To make common coloumn header, all rows must have same number of rows with same question type and title header ' ,'Ok');
										questionValidation = false ;
										break;
										 
									}
									
								}
						}
				}
				alert( 'questionValidation : ' + questionValidation) ;
				if(questionValidation == true ){
					q.rows = selectedRowArray ;		
					if(validateQuestion(q)){
						 selectedRowArray = null ;
						 selectedColoumnArray = null ;
						 alert('Going to add : ' + JSON.stringify( q )) ;
					     handleRequest( ACTION_ADD_QUESTION_OK, 'questions', q ) ;
					} 
				}
				
			}
			
			
	   }
	   else if( action == 'editquestion' ){
	 		alert(' editquestion : questionId ' + param1  ) ;
	 			selectedQuestionId = param1*1 ;
	 			var q = questiondb.get({id:param1})[0] ;	 			
	 			var theform = utilObject.getFormObject('addedittabularform') ; 
	 		
				var tmpdb = TAFFY(subTypeJson);
				utilObject.populateDropDown(theform.questiontype, false, tmpdb.get() );
				doTabularAction( 'cleartabularform' ) ;
			    selectedRowArray  = q.rows ; 
				
				// 	set 
					theform.question.value = utilObject.decode64( q.question ) ;
					utilObject.setCheckedValue(theform.rowtitlevisibility, selectedRowArray[0].visible ) ;
					utilObject.setCheckedValue(theform.coloumnvisibility, selectedRowArray[0].cols[0].repeatColoumsHeader ) ;
				//	selectedColoumnArray = q.cols ;
	   			//	showHtml('showcoloumnlisting') ;
	   				
	   						
					showHtml( 'rowlisting' ) ;
	   					
				utilObject.switchDisplayDiv('addedittabulardiv', backimage, '', 'homepage');
	   }
}

/**
 *
 */
function checkDuplicateRows( index, title ){
		var isDuplicate = false ;
		for( var i = 0; i < selectedRowArray.length; i++ ){		
			 if(  i != index && selectedRowArray[i].name == utilObject.encode64( title ) ){
			 	isDuplicate = true ; 
			 	break; 
			 }			  
		}
		return isDuplicate ;
}
/**
 * Method used to add coloumn of last row to new row
 */
function addColoumnOfLastRow(){
	 // selectedRowArray = null ;	 
	 selectedColoumnArray = TAFFY( JSON.stringify( selectedRowArray[selectedRowArray.length-1].cols )).get();
	 alert('selectedColoumnArray.length : ' + selectedColoumnArray.length ) ;
	 showHtml( 'showcoloumnlisting' ) ;
}