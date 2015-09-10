
Object =function(){
	
}

SearchReport = function(){
	   this.REPORT_TYPE_RESPONSE = 0 ;
	   this.REPORT_TYPE_SCORE = 1 ;
	   this.REPORT_TYPE_SUMMARY = 2 ;
	   
	   this.businessId = -1 ;
	   this.locationId = -1 ;
	   this.itemId = -1 ;
	   this.userId = -1 ;
	   this.surveyId = -1 ;
	   this.type = -1 ;
	   this.source = "" ;
	   this.locations = null ;
	   this.items = null ;
	   this.users = null ;
	   this.surveys = null ;
	   this.startDate = "" ;
	   this.endDate = "" ;
}

/**
 
* Method used to create a object of SurveyResponse
 * @returns
 */
SurveyResponse = function(){
	this.id = -1 ;
	this.businessId = -1 ;
	this.businessName = "" ;
	this.surveyId = -1 ;
	this.surveyName = "" ;
	this.survey = null ;
	this.locationId = -1 ;
	this.locationName = "" ;
	this.itemId = -1 ;
	this.itemName = "" ;
	this.responderId = -1 ;
	this.responderName = "" ;
	this.dateTime = "" ;
	this.overallComment = "" ;
	
	this.responderLocation = null ;
	this.source = "" ;
  
}
/**
 * Method used to create an object of ResponderLocation
 */
ResponderLocation = function(){
	this.ip = "" ;
	this.country_code = "" ;
	this.country_name = "" ;
	this.region_code = "" ;
	this.region_name = "" ;
	this.city = "" ;
	this.zip_code = "" ;
	this.time_zone = "" ;
	this.latitude = "" ;
	this.longitude = "" ;
	this.metro_code = "" ;
}

/**
 * Method to used to create an object of Survey
 */
Survey = function(){
	this.id = -1 ;
	this.businessId = -1 ;
	this.title = "" ;
	this.description = "" ;
	
	this.instruction = "" ;
	this.status = STATUS_ENABLED ;
	this.status_Text = "" ;
	this.type = SURVEY_TYPE_RESPONSE ;
	this.type_Text = "" ;
	this.displaySetting = new SurveyDisplaySetting() ;
	
	this.welcomeMessage = "" ;
	this.thankyouMessage = "" ;
	this.startDate = "" ;
	this.endDate = "" ;
	this.sections = null ;
	 
}


/**
 * Method to used to create an object of Section
 */
Section = function(){
				this.id = -1;
				this.surveyId = -1;
				this.title = "";
				this.description = "";
				this.instruction = "";
				this.displayOrder = 0 ;				
				this.questions = null ;
}

/**
 * Method to used to create an object of Question
 */
Question = function(){
				this.id = -1;
				this.sectionId = -1 ;
				this.question = "";
				this.type = QUESTION_TYPE_SINGLE_ANSWER_TEXT ;	
				this.pictureRequired = QUESTION_PIC_ATTACHMENT_REQUIRED_NO ;
				this.commentRequired = QUESTION_COMMENT_ATTACHMENT_REQUIRED_NO ;
				this.visible = QUESTION_VISIBILITY_YES;
				this.displayOrder = 0;
				this.conditionalQuestionId = -1;
				this.logicalCondition = "";
				this.conditionalChoiceId = -1;
				this.help = "";
				this.choices = null;
				
				this.rangeFrom = 0;
				this.rangeTo = 0 ;
				this.rangeIncrement = 0 ;
			 	this.parentId = -1 ;
			 	
			 	this.rowTitleVisible =  ROW_TITLE_VISIBLE ;
			 	
				this.rows = null ;
				this.answer = "" ;
				this.comment = "" ;
				this.from = "" ;
				this.to = "" ;
				
				this.signature = "" ;
				this.signatureOf = "" ;
				
				// Fields used only for adding/editing question response 
				this.surveyResponseId = -1 ;
				this.questionResponseId = -1 ;
				this.fileAttachment = "" ;				
				this.signatureFile = null ;				 
				this.file = null ; // for file attachment
}

/**
 * Method to used to create an object of Choice
 */
Choice = function(){
				this.id = -1;
				this.questionId = -1;
				this.choice = "";
				this.selected = CHOICE_SELECTED_NO;
				this.isDefault = CHOICE_DEFAULT_SELECTION_NO;
				this.score = 0;
				this.file = null ;
				this.showTextForImage = SHOW_TEXT_YES; 
				this.commentRequired = COMMENT_FIELD_REQUIRED_NO;
				
				this.rank = -1 ;				
				// used only in coloumn response
				this.columnResponseId = -1 ;
				this.questionResponseId = -1;
				this.choiceResponseId = -1 ;
}

/**
 * Method used to create an object of QuestionRow
 */
QuestionRow = function(){
	this.id = -1 ;
	this.parentQuestionId = -1 ;
	this.name = "" ;
	this.visible = QUESTION_VISIBILITY_NO  ;
	this.cols = null ;
}
/**
 *  Method used to create an object of QuestionColoumn 
 */
QuestionColoumn = function(){
	this.questionResponseId = -1 ;
	this.columnResponseId = -1 ;
	this.id = -1 ;
	this.rowId = -1 ;
	this.parentQuestionId = -1 ;
	this.type = QUESTION_TYPE_MULTIPLE_ANSWER_TEXT ;
	this.coloumn = "" ;
	this.answer = "" ;
	this.comment = "" ;
	this.signature = "" ;
	this.signatureOf = "" ;
	this.choices = null ;
	
	this.rangeFrom = 0;
	this.rangeTo = 0 ;
	this.rangeIncrement = 0 ;
	this.repeatColoumsHeader = REPEAT_COLUMN_HEADER_YES ;
	//These fields will not be used 
	this.conditionalQuestionId = -1;
	this.logicalCondition = "";
	this.conditionalChoiceId = -1;
	// This will hold date as well as time range values
	this.from = "" ;
	this.to = "" ;
	
}
 
/**
 * Method to used to create an object of RequestObject
 */
ResponseObject = function(){
				this.command = "" ;
			    this.previousCommand = "" ;
			    this.success = true ;
			    this.errorCode = -1 ;
			    this.message = "" ;
			    this.startIndex = 0 ;
			    this.recordCount = -1 ;
			    
			    this.status = -1 ;
			    this.userId = -1 ;
			    this.locationId = -1 ;
			    this.itemId = -1 ;
			    this.surveyId = -1 ;
			    this.businessId = -1 ;
			    
			    this.authorization = null ;
			    this.surveyAuthorization = null ;			    
			    // on login, add/edit User a array of UserAccount will be return and length of array will be 1
			    // on getUsers for a business, array of UserAccount will be return
			    
			    this.accounts = null ;
			    this.businesses = null ;
			    this.locations = null ;
			    this.items = null ;
			    this.surveys = null ;
			    // used when making copy of a section
			    this.sections = null ;
			    // Used when making copy of a question
			    this.questions = null ;
			    this.picture = null ;
			    this.groupAuthorization = null ;
			    this.settings = null ;
			    this.displaySetting = null ;	
			    this.searchReport = null ;
}

/**
 * Method to used to create an object of RequestObject
 */
RequestObject = function(){
				this.command = "" ;
				this.previousCommand = "" ;
				this.startIndex = 0 ;
				this.recordCount = -1 ;
				this.businessId = -1 ;
				
				this.userId = -1 ;
				this.nameLike = "" ;
				this.status = STATUS_ENABLED ;
				
				// On login, and add edit user command UserAccount must be set
				this.userAccount = null ;
				// Used in add/edit business
				this.business = null ;
				// used in add/edit business location
				this.location = null ;
				this.item = null ;
				this.locationId = -1 ;
				this.itemId = -1 ;
				this.surveyId = -1 ;
				this.survey = null ;
				 
				// used when making copy of a section
				this.sectionId = -1 ;
				this.section = null ;
			    // used when making copy of a question
				this.questionId = -1 ;
				this.questionId1 = -1 ;
				this.question = null ;
				// used for add/edit authorization of a group
				this.settings = null ;
				this.authorizations = null ;				 
				this.surveyAuthorization = new SurveyLocationItemAuthorization();
				this.displaySetting = null ;		 
				this.searchReport = null ;
}
/**
 * Method to used to create an object of UserAccount
 */
UserAccount = function(){
				this.id = -1 ;	
				this.firstName = "" ;
				this.lastName = "" ;
				this.loginName = "" ;  
				this.password = "" ;
				this.phone = "" ;
				this.email = "" ;
				this.type = UserAccount_TYPE_USER ;
				this.status = STATUS_ENABLED ;
				this.business = null ;
				this.authorizations = null ;
}
/**
 * Method to used to create an object of Business
 */
Business = function(){
			   this.id = -1 ;
			   this.name = "" ; 
			   this.address = "" ; 
			   this.city = "" ;  
			   this.state = "" ; 
			   this.country = "" ;  
			   this.zipcode = "" ;  
			   this.email = "" ;  
			   this.phone = "" ; 	   
			   this.status = STATUS_ENABLED ;
			   this.language = null ; 
			   this.admin = null ;
}


/**
 * Method to used to create an object of Language
 */
Language = function(){
			  this.id = -1 ;
			  this.name = "" ;
}

/**
 * Method to used to create an object of Location
 */
Location = function(){
				this.id = -1;
				this.businessId = -1;
				this.name = "";
				this.description = "";
				this.phone = "";
				this.email = "";
				this.status = STATUS_ENABLED;
}
/**
 * Method to used to create an object of Item
 */
Item = function(){
				this.id = -1;
				this.businessId = -1;
				this.name = "";
				this.description = "";				 
				this.status = STATUS_ENABLED;
}




/**
 * Method to used to create an object of Picture
 */
Picture = function(){
				this.id = -1 ;
				this.filename = "";
				this.length = -1;
				this.content = null;
				this.mimeType = "";
				this.base64String = "" ;
				this.imageUrl = "" ;
				this.thumbnailUrl = "" ;
				this.type = PICTURE_TYPE_QUESTION ;
}

//
QuestionChoices = function(){
	this.type = -1 ;
	this.choices = null;
}

 

Authorization = function(){
	this.id = -1 ;
	this.businessId = -1 ;
	this.groupId = -1 ;
	this.moduleId = -1 ;
	this.authorityId = -1 ;
}
  
Setting = function(){
	this.id = -1;
	this.businessId = -1;
	this.key = "" ;
	this.value = "" ;
}
/**
 * Method used to create an object of SurveyLocationItemAuthorization
 */
SurveyLocationItemAuthorization = function(){
	this.businessId =-1;	
	this.userId = -1 ;
	// If surveyId is not -1 then show authorized user only
	// otherwise get all other fields
	this.surveyId = -1 ;
	
	// These are available locations, items and surveys
	this.locations = null ;
	this.items = null;
	this.surveys = null ;
	this.users = null ;
	
	// These variables will contains only authorized things
	this.authLocations = null ;
	this.authItems = null ;
	this.authSurveys = null ;
	this.authorizedUserIds = null ;
}
/**
 * Method used to create an object of AuthorizedItem
 */
 AuthorizedItem = function(){
 	this.id = -1; 
	this.businessId = -1 ;
	this.userId = -1 ;
	this.itemId = -1 ;
 }
 
/**
 * Method used to create an object of AuthorizedLocation
 */
 AuthorizedLocation = function(){
 	this.id = -1; 
	this.businessId = -1 ;
	this.userId = -1 ;
	this.locationId = -1 ;
 }
 
/**
 * Method used to create an object of AuthorizedLocation
 */
 AuthorizedSurvey = function(){
 	this.id = -1; 
	this.businessId = -1 ;
	this.userId = -1 ;
	this.surveyId = -1 ;
 }
 /**
  * Method used to create an object of SurveyDisplaySetting
  */
 SurveyDisplaySetting = function(){
		this.id = -1 ;
		this.surveyId = -1;
		this.surveyTitle = SURVEY_TITLE_ON_SUBMISSION_PAGE;
		this.sectionTitle = SECTION_TITLE_ON_SUBMISSION_PAGE;
		this.displayStyle = DISPLAY_STYLE_SINGLE_PAGE;
		this.next = NEXT_BUTTON_TITLE;
		this.previous = PREVIOUS_BUTTON_TITLE;
		this.finish = FINISH_BUTTON_TITLE;
		this.responseCount = ONE_RESPONSE_PER_COMPUTER;
 }

