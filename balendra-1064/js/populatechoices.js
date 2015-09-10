			function populateChoice( value , param1 ){
				var choices = null ;
					if( value == 'yesno'){		 
							var c1 = new Choice() ;
							var c2 = new Choice() ;
							choices = new Array();
								c1.choice = utilObject.encode64( 'Yes' );
								c2.choice = utilObject.encode64( 'No' ) ;
								choices[ choices.length ] = c1 ;
								choices[ choices.length ] = c2 ;

					}
					else if(value == '1to10' ){
							choices = new Array();
							for(var i=1; i<11; i++){
								var c = new Choice() ;
								c.choice = utilObject.encode64( i ) ;
								choices[choices.length] = c ;
							}

					}
					else if(value == '1to100' ){
							choices = new Array();
							for(var i=1; i<101; i++){
								var c = new Choice() ;
								c.choice = utilObject.encode64( i ) ;
								choices[choices.length] = c ;
							}

					}
					else if(value == 'days' ){
							choices = new Array();
								var c1 = new Choice() ;
								c1.choice = utilObject.encode64( 'Monday' ) ;
								choices[choices.length] = c1 ;

								var c2 = new Choice() ;
								c2.choice = utilObject.encode64( 'Tuesday' ) ;
								choices[choices.length] = c2 ;

								var c3 = new Choice() ;
								c3.choice = utilObject.encode64( 'Wednesday' ) ;
								choices[choices.length] = c3 ;

								var c4 = new Choice() ;
								c4.choice = utilObject.encode64( 'Thursday' ) ;
								choices[choices.length] = c4 ;

								var c5 = new Choice() ;
								c5.choice = utilObject.encode64( 'Friday' ) ;
								choices[choices.length] = c5 ;

								var c6 = new Choice() ;
								c6.choice = utilObject.encode64( 'Saturday' ) ;
								choices[choices.length] = c6 ;

								var c7 = new Choice() ;
								c7.choice = utilObject.encode64( 'Sunday' ) ;
								choices[choices.length] = c7 ;
						 

					}
					else if(value == 'months' ){
							choices = new Array();
								var c1 = new Choice() ;
								c1.choice = utilObject.encode64( 'January' ) ;
								choices[choices.length] = c1 ;

								var c2 = new Choice() ;
								c2.choice = utilObject.encode64( 'February' ) ;
								choices[choices.length] = c2 ;

								var c3 = new Choice() ;
								c3.choice = utilObject.encode64( 'March' ) ;
								choices[choices.length] = c3 ;

								var c4 = new Choice() ;
								c4.choice = utilObject.encode64( 'April' ) ;
								choices[choices.length] = c4 ;

								var c5 = new Choice() ;
								c5.choice = utilObject.encode64( 'May' ) ;
								choices[choices.length] = c5 ;

								var c6 = new Choice() ;
								c6.choice = utilObject.encode64( 'June' ) ;
								choices[choices.length] = c6 ;

								var c7 = new Choice() ;
								c7.choice = utilObject.encode64( 'July' ) ;
								choices[choices.length] = c7 ;

								var c8 = new Choice() ;
								c8.choice = utilObject.encode64( 'August' ) ;
								choices[choices.length] = c8 ;

								var c9 = new Choice() ;
								c9.choice = utilObject.encode64( 'September' ) ;
								choices[choices.length] = c9 ;

								var c10 = new Choice() ;
								c10.choice = utilObject.encode64( 'October' ) ;
								choices[choices.length] = c10 ;

								var c11 = new Choice() ;
								c11.choice = utilObject.encode64( 'November' ) ;
								choices[choices.length] = c11 ;

								var c12 = new Choice() ;
								c12.choice = utilObject.encode64( 'December' ) ;
								choices[choices.length] = c12 ;
					}
					else if( value == 'years' ){
								choices = new Array();
								for( var i=1940; i<2015; i++ ){
									var c = new Choice() ;
									c.choice = utilObject.encode64( i );
									choices[choices.length] = c ;
								}
					}
					else if( value == 'age' ){
								choices = new Array();
						        var c1 = new Choice() ;
								c1.choice = utilObject.encode64( 'Under 18' ) ;
								choices[choices.length] = c1 ;

								var c2 = new Choice() ;
								c2.choice = utilObject.encode64( '18-24' ) ;
								choices[choices.length] = c2 ;

								var c3 = new Choice() ;
								c3.choice = utilObject.encode64( '25-34' ) ;
								choices[choices.length] = c3 ;

								var c4 = new Choice() ;
								c4.choice = utilObject.encode64( '35-54' ) ;
								choices[choices.length] = c4 ;

								var c5 = new Choice() ;
								c5.choice = utilObject.encode64( '55+' ) ;
								choices[choices.length] = c5 ;
					}
					else if( value == 'gender' ){
								choices = new Array();
						        var c1 = new Choice() ;
								c1.choice = utilObject.encode64( 'Male' ) ;
								choices[choices.length] = c1 ;

								var c2 = new Choice() ;
								c2.choice = utilObject.encode64( 'Female' ) ;
								choices[choices.length] = c2 ;
					}		 
					else if( value == 'race'){
								choices = new Array();
						        var c1 = new Choice() ;
								c1.choice = utilObject.encode64( 'White: British' ) ;
								choices[choices.length] = c1 ;

								var c2 = new Choice() ;
								c2.choice = utilObject.encode64( 'White: Irish' ) ;
								choices[choices.length] = c2 ;

								var c3 = new Choice() ;
								c3.choice = utilObject.encode64( 'White: Other' ) ;
								choices[choices.length] = c3 ;

								var c4 = new Choice() ;
								c4.choice = utilObject.encode64( 'Asian or Asian British: Indian' ) ;
								choices[choices.length] = c4 ;

								var c5 = new Choice() ;
								c5.choice = utilObject.encode64( 'Asian or Asian British: Pakistani' ) ;
								choices[choices.length] = c5 ;

								var c6 = new Choice() ;
								c6.choice = utilObject.encode64( 'Asian or Asian British: Bangladeshi' ) ;
								choices[choices.length] = c6 ;

								var c7 = new Choice() ;
								c7.choice = utilObject.encode64( 'Asian or Asian British: Other Asian background' ) ;
								choices[choices.length] = c7 ;

								var c8 = new Choice() ;
								c8.choice = utilObject.encode64( 'Mixed: White and Black Caribbean' ) ;
								choices[choices.length] = c8 ;

								var c9 = new Choice() ;
								c9.choice = utilObject.encode64( 'Mixed: White and black African' ) ;
								choices[choices.length] = c9 ;

								var c10 = new Choice() ;
								c10.choice = utilObject.encode64( 'Mixed: White and Asian' ) ;
								choices[choices.length] = c10 ;

								var c11 = new Choice() ;
								c11.choice = utilObject.encode64( 'Mixed: Other mixed background' ) ;
								choices[choices.length] = c11 ;

								var c12 = new Choice() ;
								c12.choice = utilObject.encode64( 'Black or Black British: Caribbean' ) ;
								choices[choices.length] = c12 ;

								var c13 = new Choice() ;
								c13.choice = utilObject.encode64( 'Black or Black British: African' );
								choices[choices.length] = c13 ;

								var c14 = new Choice() ;
								c14.choice = utilObject.encode64( 'Black or Black British: Any other black background' ) ;
								choices[choices.length] = c14 ;

								var c15 = new Choice() ;
								c15.choice = utilObject.encode64( 'Other Ethnic Group: Chinese' );
								choices[choices.length] = c15 ;

								var c16 = new Choice() ;
								c16.choice = utilObject.encode64( 'Other Ethnic Group: Any other Ethnic Group' ) ;
								choices[choices.length] = c16 ;

								var c17 = new Choice() ;
								c17.choice = utilObject.encode64( 'Other Ethnic Group: I do not wish to disclose my ethnic origin' ) ;
								choices[choices.length] = c17 ;

					}
					else if( value == 'marital' ){
								choices = new Array();
						        var c1 = new Choice() ;
								c1.choice = utilObject.encode64( 'Single, Never Married' );
								choices[choices.length] = c1 ;

								choices = new Array();
						        var c2 = new Choice() ;
								c2.choice = utilObject.encode64( 'Married' ) ;
								choices[choices.length] = c2 ;

								choices = new Array();
						        var c3 = new Choice() ;
								c3.choice = utilObject.encode64( 'Separated' ) ;
								choices[choices.length] = c3 ;

								choices = new Array();
						        var c4 = new Choice() ;
								c4.choice = utilObject.encode64( 'Divorced' ) ;
								choices[choices.length] = c4 ;

								choices = new Array();
						        var c5 = new Choice() ;
								c5.choice = utilObject.encode64( 'Widowed' ) ;
								choices[choices.length] = c5 ;

					}
					else if(  value == 'income'  ){
								choices = new Array();
						        var c1 = new Choice() ;
								c1.choice = utilObject.encode64( 'Less than $10,000' ) ;
								choices[choices.length] = c1 ;

								var c2 = new Choice() ;
								c2.choice = utilObject.encode64( '$10,000 to $19,999' ) ;
								choices[choices.length] = c2 ;

								var c3 = new Choice() ;
								c3.choice = utilObject.encode64( '$20,000 to $29,999' ) ;
								choices[choices.length] = c3 ;

								var c4 = new Choice() ;
								c4.choice = utilObject.encode64( '$30,000 to $39,999' ) ;
								choices[choices.length] = c4 ;

								var c5 = new Choice() ;
								c5.choice = utilObject.encode64( '$40,000 to $49,999' ) ;
								choices[choices.length] = c5 ;

								var c6 = new Choice() ;
								c6.choice = utilObject.encode64( '$50,000 to $59,999' ) ;
								choices[choices.length] = c6 ;

								var c7 = new Choice() ;
								c7.choice = utilObject.encode64( '$60,000 to $69,999' ) ;
								choices[choices.length] = c7 ;

								var c8 = new Choice() ;
								c8.choice = utilObject.encode64( '$70,000 to $79,999' ) ;
								choices[choices.length] = c8 ;

								var c9 = new Choice() ;
								c9.choice = utilObject.encode64( '$80,000 to $89,999' ) ;
								choices[choices.length] = c9 ;

								var c10 = new Choice() ;
								c10.choice = utilObject.encode64( '$90,000 to $99,999' ) ;
								choices[choices.length] = c10 ;

								var c11 = new Choice() ;
								c11.choice = utilObject.encode64( '$100,000 to $149,999' ) ;
								choices[choices.length] = c11 ;

								var c12 = new Choice() ;
								c12.choice = utilObject.encode64( '$150,000 or more' ) ;
								choices[choices.length] = c12 ;
					}
					else if( value == 'ratingsatisfied' ){
								choices = new Array();
						        var c1 = new Choice() ;
								c1.choice = utilObject.encode64( 'Very Dissatisfied' ) ;
								choices[choices.length] = c1 ;

								var c2 = new Choice() ;
								c2.choice = utilObject.encode64( 'Dissatisfied' );
								choices[choices.length] = c2 ;

								var c3 = new Choice() ;
								c3.choice = utilObject.encode64( 'Neutral' ) ;
								choices[choices.length] = c3 ;

								var c4 = new Choice() ;
								c4.choice = utilObject.encode64( 'Satisfied' ) ;
								choices[choices.length] = c4 ;

								var c5 = new Choice() ;
								c5.choice = utilObject.encode64( 'Very Satisfied' );
								choices[choices.length] = c5 ;
					}
					else if( value == 'ratingagree' ){
								choices = new Array();
						        var c1 = new Choice() ;
								c1.choice = utilObject.encode64( 'Strongly Disagree' ) ;
								choices[choices.length] = c1 ;

								var c2 = new Choice() ;
								c2.choice = utilObject.encode64( 'Disagree' ) ;
								choices[choices.length] = c2 ;

								var c3 = new Choice() ;
								c3.choice = utilObject.encode64( 'Neutral' ) ;
								choices[choices.length] = c3 ;

								var c4 = new Choice() ;
								c4.choice = utilObject.encode64( 'Agree' ) ;
								choices[choices.length] = c4 ;

								var c5 = new Choice() ;
								c5.choice = utilObject.encode64( 'Strongly Agree' ) ;
								choices[choices.length] = c5 ;
					}
					else if( value == 'starrating' ){
								choices = new Array();
						        var c1 = new Choice() ;
								c1.choice = utilObject.encode64( '*****' ) ;
								choices[choices.length] = c1 ;

						        var c2 = new Choice() ;
								c2.choice = utilObject.encode64( '****' ) ;
								choices[choices.length] = c2 ;

						        var c3 = new Choice() ;
								c3.choice = utilObject.encode64( '***' ) ;
								choices[choices.length] = c3 ;

						        var c4 = new Choice() ;
								c4.choice = utilObject.encode64( '**' ) ;
								choices[choices.length] = c4 ;

								 
						        var c5 = new Choice() ;
								c5.choice = utilObject.encode64( '*' ) ;
								choices[choices.length] = c5 ;
					}
					else if(value == 'truefalse' ){
								choices = new Array();
					            var c1 = new Choice() ;
								c1.choice = utilObject.encode64( 'True' ) ;
								choices[choices.length] = c1 ;
								
					            var c2 = new Choice() ;
								c2.choice = utilObject.encode64( 'False' ) ;
								choices[choices.length] = c2 ;
					}
					
					if(currentChoiceArray != null && currentChoiceArray.length >0 ){
							var r = confirm("You are about to replace existing choices. Do you want to proceed ?");
							if (r == true) {
							    currentChoiceArray = choices ;
							    showHtml('showchoices') ;
							} else {
							   // do nothing
							}
					}
					else{
								if( param1 == 'addedittabularform' ){
									tabularChoiceArray = choices ;  
	   								showHtml('showtabularchoices') ;	 
								}
								else{
						 			 currentChoiceArray = choices ;
								     showHtml('showchoices') ;
							    }
					}
						// alert('Choices Length: ' + choices.length + ' : ' + choices ) ;
			}