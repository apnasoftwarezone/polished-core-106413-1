	$(function() {
				$( ".submenu .dropdown" ).click(function( event ) {
					var	shaziP = $( this ).parent( ".submenu" );
					var trix = shaziP.hasClass( "current" );
					 
					$( ".submenu" ).removeClass('current');
					$( ".submenu" ).children( "ul" ).hide(500);
						
					if(!trix){				
						shaziP.addClass('current');
						shaziP.children( "ul"  ).show(500);
					}
		    	});
				$( ".navbar-btn" ).click(function() {
				  	$( ".left-sidebar" ).toggle( 500 );
					$( "#content" ).toggleClass( "wid", "sss" );
					
						
				});	
	});
	
    function replaceAll(find, replace, str) {
			return str.replace(new RegExp(find, 'g'), replace);
	}
	
			  


    /**
 * It will show/hide particular div.
 * @author vmishra
 * @param divid
 * @return
 */
function showhide(divid, linkid){ 
				try{
					var imgsrc='';
					var alttext='';
					var _div = document.getElementById(divid); 
					if(_div.style.display=='none')
					{
						alttext='Hide detail';
						imgsrc='style/default/hidedetail.png';
						document.getElementById(divid).style.display = '';
						// showDiv(divid);
					}
					else
					{
						alttext='Show detail';
						imgsrc='style/default/showdetail.png';
						document.getElementById(divid).style.display = 'none';
						//hideDiv(divid);
					}
					var html='<img border="0" src="'+imgsrc+'" alt="' + alttext +'"/>';
					document.getElementById(linkid).innerHTML = html;
				}catch(e){
					alert('Exception in showhide: ' + e) ;
				}
}
			  
function manualValidate(ev, formName ) {
				ev.preventDefault();			
				alert('searchreportform: ' + formName ) ;
				if( formName == 'regitserbusinessform' ){
					 var theform = utilObject.getFormObject(formName) ;
					 var password = theform.password.value ;
					 var confirmPassword = theform.confirmpassword.value ;
					 if( password != confirmPassword ){
						 theform.confirmpassword.value = '' ;						 
						 theform.confirmpassword.focus() ;
						 theform.confirmpassword.setCustomValidity('Password and confirm password must match');

					 }
					 else{
						    doSurveyAction(ACTION_REGISTER_BUSINESS_OK);							 
					 }

				}
				else if( formName == 'searchreportform' ){
					 var theform = utilObject.getFormObject(formName) ;
					 
					 
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
					 alert( sss.startDate + '\n' + sss.endDate ) ;
					 if( utilObject.trim( startDate ) == '' ){
						 		 
						 utilObject.showMessage('Alert', 'Please select start date' ,'Ok');
						 theform.startdate.focus() ;
						 //theform.startdate.setCustomValidity('Please select start date');

					 }
					 else if( utilObject.trim( endDate ) == '' ){						
						 utilObject.showMessage('Alert', 'Please select end date' ,'Ok');
						 theform.enddate.focus() ;
						 // theform.enddate.setCustomValidity('Please select end date');						 
					 }
					 else{
						// theform.enddate.setCustomValidity('Submit form as soon as possible');
						 // utilObject.showMessage('Alert', 'Submit form as soon as possible' ,'Ok');
						  doSurveyAction( ACTION_GET_SURVEY_RESPONSES, sss );							 
					 }
					 
				}
				else if( formName == 'addeditdisplaysettingform' ){
					var d = new SurveyDisplaySetting() ;
					var theform = utilObject.getFormObject(formName) ;
					d.id = -1 ;
					d.surveyId = theform.surveyid.value;
					d.surveyTitle = theform.surveytitle.value ;
					d.sectionTitle = theform.sectiontitle.value;
					d.displayStyle = theform.displaystyle.value;
					d.next = utilObject.encode64( theform.next.value ) ;
					d.previous = utilObject.encode64( theform.previous.value ) ;
					d.finish = utilObject.encode64( theform.finish.value ) ;
					d.responseCount = theform.responsecount.value;
					doSurveyAction( ACTION_ADD_DISPLAY_SETTING_OK , d );
					
				}
				else if( formName == 'addedituserauthorizationform'  ){
					 var theform = utilObject.getFormObject(formName) ;
					 var authorizedItemsArray = null ;
					 var authorizedLocationsArray = null ;
					 var authorizedSurveysArray = null ;
					 var itemslist = theform.items ;
					 var locationslist = theform.locations ;
					 var surveyslist = theform.surveys ;
					 var userId = theform.userid.value ;
					 var businessId = utilObject.selectedBusiness() ;
					 
					 alert('userId : ' + userId + ' businessId : ' + businessId ) ;
					 
					 var silAuthorization = new SurveyLocationItemAuthorization() ;
					 silAuthorization.businessId = businessId ;
					 silAuthorization.userId = userId ;
					 
					 
					 if(itemslist != undefined && itemslist.length > 0 ){
						 	for (var i=0; i < itemslist.length; i++) {
								  if (itemslist[i].checked) 
								  {
								      var itemId = itemslist[i].value;
								      var a = new AuthorizedItem() ;
								      a.itemId = itemId ;
								      a.userId = userId ;
								      a.businessId = businessId ;
								      if(authorizedItemsArray == null )
								      	authorizedItemsArray = new Array() ;
								      	
								      authorizedItemsArray[ authorizedItemsArray.length ] = a ;
								  }
							}
							if(authorizedItemsArray != null ){
								alert( 'authorizedItemsArray : ' + authorizedItemsArray.length ) ;
							}
							
					 }
					 else if( itemslist != undefined ){
					 			if( itemslist.checked ){
										  var itemId = itemslist.value;
									      alert( 'selected itemId 222 : ' + itemId ) ;
									      var a = new AuthorizedItem() ;
									      a.itemId = itemId ;
									      a.userId = userId ;
									      a.businessId = businessId ;
									      if( authorizedItemsArray == null )
									      	authorizedItemsArray = new Array() ;
									      	
									      authorizedItemsArray[ authorizedItemsArray.length ] = a ;
								}					 
					 }
					 
					 if(locationslist != undefined && locationslist.length > 0 ){
						 	for (var i=0; i < locationslist.length; i++) {
								  if (locationslist[i].checked) 
								  {
								      var locationId = locationslist[i].value;
								      var a = new AuthorizedLocation() ;
								      a.locationId = locationId ;
								      a.userId = userId ;
								      a.businessId = businessId ;
								      if(authorizedLocationsArray == null )
								      	authorizedLocationsArray = new Array() ;
								      	
								      authorizedLocationsArray[ authorizedLocationsArray.length ] = a ;
								  }
							}
							if(authorizedLocationsArray != null ){
								alert( 'authorizedLocationsArray : ' + authorizedLocationsArray.length ) ;
							}
							
					 }
					 else if( locationslist != undefined ){
					 			if(locationslist.checked){
										  var locationId = locationslist.value;
									      alert( 'selected locationId 222 : ' + locationId ) ;
									      var a = new AuthorizedLocation() ;
									      a.locationId = locationId ;
									      a.userId = userId ;
									      a.businessId = businessId ;
									      if( authorizedLocationsArray == null )
									      	authorizedLocationsArray = new Array() ;
									      	
									      authorizedLocationsArray[ authorizedLocationsArray.length ] = a ;
								}
					 }
					 
					 if(surveyslist != undefined && surveyslist.length > 0 ){
					 		 
							 	for (var i=0; i < surveyslist.length; i++) {
									  if (surveyslist[i].checked) 
									  {
									      var surveyId = surveyslist[i].value;
									      alert( 'selected survey Id 222 : ' + surveyId ) ;
									      var a = new AuthorizedSurvey() ;
									      a.surveyId = surveyId ;
									      a.userId = userId ;
									      a.businessId = businessId ;
									      if( authorizedSurveysArray == null )
									      	authorizedSurveysArray = new Array() ;
									      	
									      authorizedSurveysArray[ authorizedSurveysArray.length ] = a ;
									  }
								}
								
								
							if(authorizedSurveysArray != null ){
								alert( 'authorizedSurveysArray : ' + authorizedSurveysArray.length ) ;
							}
							
					 }
					 else if( surveyslist != undefined ){
					 			if(surveyslist.checked){
										  var surveyId = surveyslist.value;
									      alert( 'selected survey Id 222 : ' + surveyId ) ;
									      var a = new AuthorizedSurvey() ;
									      a.surveyId = surveyId ;
									      a.userId = userId ;
									      a.businessId = businessId ;
									      if( authorizedSurveysArray == null )
									      	authorizedSurveysArray = new Array() ;
									      	
									      authorizedSurveysArray[ authorizedSurveysArray.length ] = a ;
								}
					 }
					 
					 silAuthorization.authLocations =  authorizedLocationsArray ;
					 silAuthorization.authItems =  authorizedItemsArray ;
					 silAuthorization.authSurveys =  authorizedSurveysArray ;
					 
					 doSurveyAction( ACTION_ADD_EDIT_SURVEY_AUTHORIZATION_OK_USER , silAuthorization );
				
				}
				else if( formName == 'addeditsurveyauthorizationform'  ){
					 var theform = utilObject.getFormObject(formName) ;
					 var authorizedSurveysArray = null ;
					  
					 var surveyId = theform.surveyid.value ;
					 var businessId = utilObject.selectedBusiness() ;
					 
					 alert('surveyId : ' + surveyId + ' businessId : ' + businessId ) ;
					 
					 var silAuthorization = new SurveyLocationItemAuthorization() ;
					 silAuthorization.businessId = businessId ;
					 silAuthorization.surveyId = surveyId ;
					 var userslist = theform.users  ;
					 if(userslist != undefined && userslist.length > 0 ){
					 		for( var i =0 ; i< userslist.length; i++ ){
					 			if( userslist[i].checked ){
					 					  var userId = userslist[i].value;
									      alert( 'selected survey Id 222 : ' + surveyId ) ;
									      var a = new AuthorizedSurvey() ;
									      a.surveyId = surveyId ;
									      a.userId = userId ;
									      a.businessId = businessId ;
									      if( authorizedSurveysArray == null )
									      	authorizedSurveysArray = new Array() ;
									      	
									      authorizedSurveysArray[ authorizedSurveysArray.length ] = a ;
					 			}
					 		}
					 }
					 else{
					 	// only 1 user present
					 	
					 			if( userslist.checked ){
					 					  var userId = userslist.value;
									      alert( 'selected userId Id 222 : ' + userId + ' userId: ' + userId + ' businessId: ' + businessId  ) ;
									      var a = new AuthorizedSurvey() ;
									      a.surveyId = surveyId ;
									      a.userId = userId ;
									      a.businessId = businessId ;
									      if( authorizedSurveysArray == null )
									      	authorizedSurveysArray = new Array() ;
									      	
									      authorizedSurveysArray[ authorizedSurveysArray.length ] = a ;
								}
					 }
					 silAuthorization.authSurveys = authorizedSurveysArray ;
					 doSurveyAction( ACTION_ADD_EDIT_SURVEY_AUTHORIZATION_OK_SURVEY , silAuthorization );
				}
				else if(formName == 'addeditsettingform' ){
					var theform = document.forms['addeditsettingform']
				    var settings = new Array(); // length 6				    
					var val = utilObject.selectedBusiness() ;
					var s1 = new Setting();
					s1.businessId = val
					s1.key = 'locationlabel' ;
					s1.value = utilObject.encode64(theform.locationlabel.value);
					settings[settings.length] = s1 ;
					
					var s2 = new Setting();
					s2.businessId = val
					s2.key = 'itemlabel' ;
					s2.value = utilObject.encode64(theform.itemlabel.value);
					settings[settings.length] = s2 ;
					
					var s3 = new Setting();
					s3.businessId = val
					s3.key = 'responsesubmissionfromweb' ;
					if(theform.responsesubmissionfromweb.checked ==true)
						s3.value = utilObject.encode64(STATUS_ENABLED);
					else
						s3.value = utilObject.encode64(STATUS_DISABLED);
					
					settings[settings.length] = s3 ;
					
					var s4 = new Setting();
					s4.businessId = val
					s4.key = 'responsesubmissionfrommobile' ;
					if(theform.responsesubmissionfrommobile.checked ==true)
						s4.value = utilObject.encode64(STATUS_ENABLED);
					else
						s4.value = utilObject.encode64(STATUS_DISABLED);
					
					settings[settings.length] = s4 ;
					
					var s5 = new Setting();
					s5.businessId = val
					s5.key = 'enableresponseeditable' ;
					if(theform.enableresponseeditable.checked ==true)
						s5.value = utilObject.encode64(STATUS_ENABLED);
					else
						s5.value = utilObject.encode64(STATUS_DISABLED);
					
					settings[settings.length] = s5 ;
					
					var s6 = new Setting();
					s6.businessId = val
					s6.key = 'sendfullresponseonnotification' ;
					if(theform.sendfullresponseonnotification.checked ==true)
						s6.value = utilObject.encode64(STATUS_ENABLED);
					else
						s6.value = utilObject.encode64(STATUS_DISABLED);
					
					settings[settings.length] = s6 ;
					

					doSurveyAction(ACTION_ADD_SETTING_OK, settings );
					
				}
				else if( formName == 'loginform' ){
							doSurveyAction( ACTION_LOGIN_OK );
				}
				else if(formName == 'addeditlocationform'){
						doSurveyAction( ACTION_ADD_LOCATION_OK );
				}
				else if(formName == 'addedititemform'){
				      alert('Inside validation : '  ) ;
						handleRequest( ACTION_ADD_ITEM_OK );
				}
				else if(formName == 'addeditsurveyform'){
						doSurveyAction( ACTION_ADD_SURVEY_OK );
				}
				else if(formName == 'addeditsectionform'){
						doSurveyAction( ACTION_ADD_SECTION_OK );
				}
				else if(formName == 'addedituserform' ){
					var theform = utilObject.getFormObject('addedituserform') ;
					var id = theform.userid.value ;
					
					var groupId = theform.groups.value ;
					var firstName = theform.firstname.value ;
					var lastName = theform.lastname.value ;
					var loginName = theform.loginname.value ;
					var password = theform.password.value ;
					var email = theform.email.value ;
					var phone = theform.phone.value ;
					
					var u = new UserAccount() ;
					u.id = id ;
					u.firstName = utilObject.encode64(firstName) ;
					u.lastName = utilObject.encode64(lastName) ;
					u.loginName = utilObject.encode64(loginName) ;
					u.password = utilObject.encode64(password);
					u.email =  utilObject.encode64(email);
					u.phone =  utilObject.encode64(phone);
					
					var list = document.getElementById('businesses') ;
					var b = new Business();
					b.id =  list.options[list.selectedIndex].value ;
					var bArray = new Array();
					bArray[0]= b ;
					alert(id + " : Id: businessId: " + b.id ) ;
					u.business = bArray ;
					u.type = groupId ;
					doSurveyAction( ACTION_ADD_EDIT_USER_ACCOUNT_OK  , u   );
					 
				}
				else if( formName == 'addeditgroupauthorizationform'){
					var theform = utilObject.getFormObject('addeditgroupauthorizationform') ;
					var groupId = theform.groupid.value ;
					var modules = selectedGroupAuthorization.modules ;
					var list = document.getElementById('businesses') ;
					var authorizationArray = new Array() ;
					for( var i =0; i<modules.length; i++ ){
						var ga = new Authorization() ;
						ga.businessId = list.options[list.selectedIndex].value ;
						ga.groupId = groupId ;
						ga.moduleId = modules[i].id ;
						var mname = 'module' + modules[i].id  ;
						var authority = theform[mname].value ;
						ga.authorityId = authority ;
						authorizationArray[authorizationArray.length] = ga ;
					}
					doSurveyAction( ACTION_ADD_EDIT_GROUP_AUTHORIZATION_OK  , authorizationArray  );
				}
				else if(formName == 'addeditbusinessform' ){
					    var theform = utilObject.getFormObject('addeditbusinessform') ;
						var businessId = theform.businessid.value ;
						alert(businessId);
						var businessAdminId = theform.businessadmin.value ;
						var firstName = theform.firstname.value ;
						var lastName = theform.lastname.value ;
						var loginName = theform.loginname.value ;
						var password = theform.password.value ;
						var confirmPassword =  theform.confirmpassword.value ;
						// business related fields
						var name = theform.name.value ;
						var address = theform.address.value ;
						var country = theform.country.value ;
						var state = theform.state.value ;
						var city = theform.city.value ;
						var zipcode = theform.zipcode.value ;
						var email = theform.email.value ;
						var phone = theform.phone.value ;
						// set business object
						var business = new Business();
						business.businessId = businessId ;
						business.name = name ;
						business.address = address ;
						business.country = country ;
						business.state = state ;
						business.city = city ;
						business.zipcode = zipcode ;
						business.email = email ;
						business.phone = phone ;
						// set admin object
					 
						var u = new UserAccount() ;
					if( businessAdminId * 1 != -1 ){
							alert('businessAdminId : ' + businessAdminId) ;
							var b = businessdb.get({id:businessAdminId})[0] ;
							u.id = b.admin.id ;
							alert('admin: ' + u.id ) ;
							u.firstName = b.admin.firstName ;
							
							u.lastName = b.admin.lastName ;
							u.loginName = b.admin.loginName ; 
							u.password = b.admin.password;
							u.phone = b.admin.phone ;
							u.email = b.admin.email;
							alert('Email : ' + u.email + " : " + utilObject.decode64(u.email)  ); 
							u.type = b.admin.type ;
							u.status = b.admin.status ;		
							alert('u.id  : ' + u.id  ) ;
							
					}
					else{
							u.id = -1 ;
							u.firstName = utilObject.encode64(theform.firstname.value) ;
							u.lastName = utilObject.encode64(theform.lastname.value) ;
							u.loginName = utilObject.encode64(theform.loginname.value) ; 
							u.password = utilObject.encode64(theform.password.value) ;;
							u.phone = utilObject.encode64(theform.phone.value) ; 
							u.email = utilObject.encode64(theform.email.value) ;
							u.type = UserAccount_TYPE_ADMIN ;
							u.status = STATUS_ENABLED ;							 
					}
					
					        var b = new Business();		
					        b.id = businessId ;						   
							b.name = utilObject.encode64(theform.name.value)
							b.address = utilObject.encode64(theform.address.value)
							b.city = utilObject.encode64(theform.city.value)
							b.state = utilObject.encode64(theform.state.value)
							b.country = utilObject.encode64(theform.country.value)
							b.zipcode = utilObject.encode64(theform.zipcode.value)
							b.email = utilObject.encode64(theform.email.value)
							b.phone = utilObject.encode64(theform.phone.value) 
							b.status = STATUS_ENABLED ;
							
							var l = new Language();
							l.id = 1 ; // ENGLISH
						   	b.language = l ; 
							var business = new Array();
							business[business.length] = b ;
							u.business = business ;
					
			
							if(businessAdminId*1 == -1 ){
											if(utilObject.trim( firstName ) == '' ){
												theform.firstname.focus();
						 						theform.firstname.setCustomValidity('Enter first name');
												return ;
											}
											else if(utilObject.trim( lastName ) == '' ){
											    theform.lastname.focus();
											    theform.lastname.setCustomValidity('Enter first name');
												return ;
											}
											else if(utilObject.trim( loginName ) == '' ){
											    theform.loginname.focus();
											    theform.loginname.setCustomValidity('Enter login name');												 
												return ;
											}
											else if(utilObject.trim( password ) == '' ){
											    theform.password.focus();
											    theform.password.setCustomValidity('Enter password');												 
												return ;
											}
											else if(utilObject.trim( confirmPassword ) == '' ){
											    theform.confirmpassword.focus();
											    theform.password.setCustomValidity('Enter confirm password');												 
												return ;
											}
											else if( confirmPassword != password ){
											    theform.confirmpassword.focus();
											    theform.confirmpassword.setCustomValidity( "Password confirm password doesn't match"  );	
												return ;
											}
								}
			
								if( utilObject.trim( name ) == '' ){
											theform.name.focus();
											theform.name.setCustomValidity( "Enter business name"  );
											return ;
								}
								else if( utilObject.trim( address ) == '' ){
											theform.address.focus();
											theform.address.setCustomValidity( "Enter business address"  );
											return ;
								}
								else if( utilObject.trim( country ) == '' ){
											theform.country.focus();
											theform.country.setCustomValidity( "Select country"  );
											return ;
								}
								else if( utilObject.trim( state ) == '' ){
											theform.state.focus();
											theform.state.setCustomValidity( "Enter state"  );
											return ;
								}
								else if( utilObject.trim( city ) == '' ){
											theform.city.focus();
											theform.city.setCustomValidity( "Enter city"  );
											return ;
								}
								else if( utilObject.trim( zipcode ) == '' ){
											theform.zipcode.focus();
											theform.zipcode.setCustomValidity( "Enter zipcode"  );
											return ;
								}
								else if( utilObject.trim( email ) == '' ){
											theform.email.focus();
											theform.email.setCustomValidity( "Enter email"  );
											return ;
								}
								else if( utilObject.trim( phone ) == '' ){
											theform.phone.focus();
											theform.email.setCustomValidity( "Enter phone"  );											 
											return ;
								}
								else{
									doSurveyAction(ACTION_ADD_BUSINESS_OK, u );
									 
								}
					//handleRequest(ACTION_ADD_BUSINESS_OK, 'homepage', u );
						
				}
				
 }
 
function validate(f){	
	 
		f.setCustomValidity('Hello ! Please enter 6 digit password');
}

function validateQuestion(question){
	return true ;
}