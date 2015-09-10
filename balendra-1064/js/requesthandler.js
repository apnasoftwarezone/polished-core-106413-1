/**
 * 
 */
handleRequest = function(action, previousCommand,param1,param2){
 utilObject.showBusy() ;
		var request = new RequestObject() ; 
		request.command = action ;
		request.previousCommand = previousCommand ;

		if(action == ACTION_LOGIN_OK ){
			var theform = utilObject.getFormObject('loginform') ;
			var u = new UserAccount() ;
			u.loginName = utilObject.encode64( theform.loginname.value ) ;
			u.password = utilObject.encode64( theform.password.value ) ;
			request.userAccount = u ;
		}
		else if( action == 'exportresponsetoxls' ){
			  var url ="excelstream?data=" + utilObject.encode64( JSON.stringify( param1 ) )
			  var win = window.open(url, '_blank');
			  win.focus();
			  return;
		}
		else if( action == ACTION_ADD_RESPONSE_OK ){
			alert('ACTION_ADD_RESPONSE_OK : ' + param1)
			request.surveyResponse = utilObject.getSurveyResponseObjectToSync( param1 ) ;
			alert('request.surveyResponse : ' + request.surveyResponse ) ;
		}
		else if(action == ACTION_GET_SURVEY_RESPONSE_BY_ID ){
			request.responseId = param1 ;
			request.surveyId = param2 ;
		}
		else if(action == ACTION_EDIT_SURVEY_RESPONSE ){
			request.responseId = param1 ;
			request.surveyId = param2 ;
		}
		else if(action == ACTION_GET_SURVEY_BY_ID){
			request.surveyId = param1 ;
		}
		else if(action == ACTION_ADD_DISPLAY_SETTING_OK ){
			request.displaySetting = param1 ;
		}
		else if( action == ACTION_ADD_EDIT_SURVEY_AUTHORIZATION_OK_USER ){
			request.surveyAuthorization = param1 ;
		}
		else if( action == ACTION_ADD_EDIT_SURVEY_AUTHORIZATION_OK_SURVEY ){
			request.surveyAuthorization = param1 ;
		}
		else if(action == ACTION_ADD_SETTING_OK){
			request.settings = param1 ;
		}
		else if( action == ACTION_ADD_EDIT_USER_ACCOUNT_OK ){
			request.userAccount = param1 ;
		}
		else if(action == ACTION_GET_SEARCH_REPORT ){
			var u = new SearchReport();
			u.businessId = utilObject.selectedBusiness() ;
			u.userId =  loggedInUser.id;
			u.status = STATUS_ENABLED ;
			request.searchReport = u ;
		}
		else if(action == ACTION_GET_SURVEY_RESPONSES ){
			 
			request.searchReport = param1 ;
		}
		
		else if(action == ACTION_GET_SURVEY_AUTHORIZATION_SURVEY){
			var theform = utilObject.getFormObject('addeditsurveyauthorizationform') ;
			theform.surveyid.value = param1 ;
			request.surveyId = param1 ;
			request.businessId = utilObject.selectedBusiness() ;
		}
		else if(action == ACTION_GET_SURVEY_AUTHORIZATION_USER){
			request.userId = param1 ;
			request.businessId = utilObject.selectedBusiness() ;
		}
		else if(action == ACTION_CHANGE_ACCOUNT_STATUS ){
			u = userdb.get({id:param1})[0]
			request.userId = param1 ;
			request.businessId = utilObject.selectedBusiness() ;
			if(u.status*1 == STATUS_ENABLED )
				request.status = STATUS_DISABLED ;
			else
				request.status = STATUS_ENABLED ;
		}
		else if(action == ACTION_CHANGE_LOCATION_STATUS){
			u = locationdb.get({id:param1})[0]
			request.locationId = param1 ;
			request.businessId = utilObject.selectedBusiness() ;
			if(u.status*1 == STATUS_ENABLED )
				request.status = STATUS_DISABLED ;
			else
				request.status = STATUS_ENABLED ;
		}
		else if(action == ACTION_CHANGE_ITEM_STATUS){
			u = itemdb.get({id:param1})[0]
			request.itemId = param1 ;
			request.businessId = utilObject.selectedBusiness() ;
			if(u.status*1 == STATUS_ENABLED )
				request.status = STATUS_DISABLED ;
			else
				request.status = STATUS_ENABLED ;
		}
		else if( action == ACTION_GET_USERS_BY_BUSINESS ){
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
					 request.businessId= val ;
				}
		}
		else if(action == 'getsettings' ){
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
					 request.businessId= val ;
				}
		}
		else if(action == ACTION_REGISTER_BUSINESS_OK){
			var theform = utilObject.getFormObject('regitserbusinessform') ;
			var u = new UserAccount() ;
			
				u.firstName = utilObject.encode64(theform.firstname.value) ;
				u.lastName = utilObject.encode64(theform.lastname.value) ;
				u.loginName = utilObject.encode64(theform.loginname.value) ; 
				u.password = utilObject.encode64(theform.password.value) ;;
				u.phone = utilObject.encode64(theform.phone.value) ; ;
				u.email = utilObject.encode64(theform.email.value) ;;
				u.type = UserAccount_TYPE_ADMIN ;
				u.status = STATUS_ENABLED ;
				
			    var b = new Business();								   
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
				request.userAccount = u ;
		}
		else if( action == ACTION_ADD_BUSINESS_OK){
			 request.userAccount = param1 ;
		}
		else if( action == ACTION_ADD_EDIT_GROUP_AUTHORIZATION_OK ){
			request.authorizations = param1 ;
		}
		else if( action == ACTION_GETLOCATIONS ){
				if(loggedInUser.type*1 != UserAccount_TYPE_SUPER_ADMIN && loggedInUser.type*1 != UserAccount_TYPE_ADMIN)
					request.userId = loggedInUser.id ;
				var val = utilObject.selectedBusiness() ;
				if(val == false ){
					if(businessdb.get().length > 0){
						utilObject.showMessage('Alert', 'Select a business' ,'Ok');
					}else{
						utilObject.showMessage('Alert', 'No business found for this user' ,'Ok');						
					}
					utilObject.hideBusy() ; 
					return
				}
				else{
					request.businessId = val ;
				}				
				// request.businessId = loggedInUser.business[0].id  ;
		}
		else if( action == ACTION_GETITEMS ){
			   if(loggedInUser.type*1 != UserAccount_TYPE_SUPER_ADMIN && loggedInUser.type*1 != UserAccount_TYPE_ADMIN)
					request.userId = loggedInUser.id ;
				
				var val = utilObject.selectedBusiness() ;
				if(val == false ){
					if(businessdb.get().length > 0){
						utilObject.showMessage('Alert', 'Select a business' ,'Ok');
					}else{
						utilObject.showMessage('Alert', 'No business found for this user' ,'Ok');						
					}
					utilObject.hideBusy() ; 
					return
				}
				else{
					request.businessId = val ;
				}				
				// request.businessId = loggedInUser.business[0].id  ;
		}
		else if( action == ACTION_GET_GROUP_AUTHORIZATION ){
			var val = utilObject.selectedBusiness() ;
				if(val == false ){
					if(businessdb.get().length > 0){
						utilObject.showMessage('Alert', 'Select a business' ,'Ok');
					}else{
						utilObject.showMessage('Alert', 'No business found for this user' ,'Ok');						
					}
					utilObject.hideBusy() ; 
					return
				}
				else{
					request.businessId = val ;
				}				
		}
		else if(action == ACTION_ADD_LOCATION_OK ){
		    var theform = utilObject.getFormObject('addeditlocationform') ;
			var l = new Location() ;
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
					l.businessId = val ;
				}
				l.id =  theform.id.value;
				// l.businessId = loggedInUser.business[0].id ;
				l.name =  utilObject.encode64(theform.name.value) ;
				l.description =  utilObject.encode64(theform.description.value) ;
				l.phone =  utilObject.encode64(theform.phone.value) ;
				l.email =  utilObject.encode64(theform.email.value) ;
				l.status = STATUS_ENABLED ;
				request.location = l ;
		}
		else if(action == ACTION_ADD_ITEM_OK ){
		    var theform = utilObject.getFormObject('addedititemform') ;
			var l = new Item() ;
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
					l.businessId = val ;
				}
				l.id =  theform.id.value;
				// l.businessId = loggedInUser.business[0].id ;
				l.name =  utilObject.encode64(theform.name.value) ;
				l.description =  utilObject.encode64(theform.description.value) ;				 
				l.status = STATUS_ENABLED ;
				request.item = l ;
		}
	    else if( action == ACTION_GETSURVEYS ){
	    	   if(loggedInUser.type*1 != UserAccount_TYPE_SUPER_ADMIN && loggedInUser.type*1 != UserAccount_TYPE_ADMIN)
					request.userId = loggedInUser.id ;
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
					 request.businessId= val ;
				}
				// request.businessId = loggedInUser.business[0].id  ;
		}
		else if(action == ACTION_ADD_SURVEY_OK ){
		    var theform = utilObject.getFormObject('addeditsurveyform') ;
			var l = new Survey() ;
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
					 l.businessId= val ;
				}
				
				l.id =  theform.id.value;
			//	l.businessId = loggedInUser.business[0].id ;
				l.title =  utilObject.encode64(theform.title.value) ;
				l.description =  utilObject.encode64(theform.description.value) ;
				l.instruction =  utilObject.encode64(theform.instruction.value) ;	 
				l.status = STATUS_DISABLED ;
				l.type = theform.type.options[theform.type.selectedIndex].value * 1 ;
				l.welcomeMessage =  utilObject.encode64(theform.welcomemessage.value) ;
				l.thankyouMessage =  utilObject.encode64(theform.thankyoumessage.value) ;
				
				l.startDate = formatDate(getUTCDateFromDate(getDateFromFormat( theform.startdate.value , SURVEY_SHORT_DATE_TIME_FORMAT)), SURVEY_DATE_TIME_FORMAT) ; 
				l.endDate =   formatDate(getUTCDateFromDate(getDateFromFormat( theform.enddate.value , SURVEY_SHORT_DATE_TIME_FORMAT)), SURVEY_DATE_TIME_FORMAT) ;
				
				request.survey = l ;
		}
		else if(action == ACTION_MAKE_A_SURVEY_COPY ){
		    request.surveyId = param1 ;
		}
		else if(action == ACTION_GETSECTIONS){
		    request.surveyId = selectedSurveyId ;
		}
		else if(action == ACTION_ADD_SECTION_OK ){
		    var theform = utilObject.getFormObject('addeditsectionform') ;
			var l = new Section() ;
				l.id =  theform.id.value;
				l.surveyId = selectedSurveyId ;
				l.title =  utilObject.encode64(theform.title.value) ;
				l.description =  utilObject.encode64(theform.description.value) ;
				l.instruction =  utilObject.encode64(theform.instruction.value) ;	 
				l.status = STATUS_ENABLED ;
				request.section = l ;
		}
		else if(action == ACTION_MAKE_A_SECTION_COPY ){
		    request.sectionId = param1 ;
		}	
		else if( action == ACTION_MAKE_A_QUESTION_COPY ){
			// ACTION_MAKE_A_QUESTION_COPY
			request.questionId = param1 ;
		}	
		else if(action == ACTION_DELETE_A_SURVEY ){
		    request.surveyId = selectedSurveyId ;
		}		
		else if(action == ACTION_CHANGE_SURVEY_STATUS ){
		    var survey = surveydb.get({id:selectedSurveyId})[0] ;
		    request.survey = survey ;
		}		
		else if(action == ACTION_DELETE_A_SECTION ){
		    request.sectionId = selectedSectionId ;
		}
		else if(action == ACTION_DELETE_A_QUESTION ){
		    request.questionId = selectedQuestionId ;
		}
		else if(action == ACTION_GETQUESTIONS){
		    request.sectionId = selectedSectionId ;
		}
		else if(action == ACTION_ADD_QUESTION_OK ){
			request.question = param1 ;
		}
		else if(action == ACTION_MOVE_QUESTION){
			request.questionId = param1 ;
			request.questionId1 = param2 ;
		}
		else if(action == ACTION_CHANGE_BUSINESS_STATUS ){
		    request.businessId = param1  ;
		    request.status = param2 ;		 
		}				

		var json = JSON.stringify(request);
		alert('request json : ' + json) ;
		  
		utilObject.sync(serviceUrl, json );

}