<%@page import="com.google.gson.Gson"%>
<%@page import="com.radiotalky.survey.dao.AdminDao"%>
<%@page import="javax.script.ScriptEngine"%>
<%@page import="javax.script.ScriptEngineManager"%>
<%@page import="com.radiotalky.survey.utils.Base64"%>
<%@page import="com.radiotalky.survey.dao.SurveyDao"%>
<%@ include file="includes/includeme.jsp" %>
<%
   
	int surveyId = Integer.parseInt(request.getParameter("surveyId")) ;
	int responseId = -1 ;
	String source = "" ;
	int userId = -1  ;
	int userType = -1; 
	
	if(request.getParameter("responseId") != null )
    	responseId = Integer.parseInt( request.getParameter("responseId") ) ;
	
	if(request.getParameter("userType") != null )
		userType = Integer.parseInt( request.getParameter("userType") ) ;
	
	if( request.getParameter("userId") != null )
		userId = Integer.parseInt( request.getParameter("userId") ) ;
	if( request.getParameter("source") != null )
		source =  request.getParameter("source")  ;
	
	String device = request.getParameter("device") ;
	
	
	SurveyDao ad = new SurveyDao() ;    
    Survey survey = ad.getSurveyById(surveyId) ;
    ScriptEngineManager scriptfactory = new ScriptEngineManager();
	ScriptEngine engine = scriptfactory.getEngineByName("JavaScript");
	String sTitle = (String) engine.eval("unescape('" + Base64.decode(survey.getTitle()) + "')"); 
	String sDescription = (String) engine.eval("unescape('" + Base64.decode(survey.getDescription()) + "')") ;
	String authorizedLocationString = "[]";
	String authorizedItemString = "[]";
	String businessSettingString = "[]" ;
	
		AdminDao adao = new AdminDao();
	Setting []businessSettingObject = adao.getSettings(survey.getBusinessId()) ;
	Gson gson = new Gson();
	if(businessSettingObject != null && businessSettingObject.length > 0){
		businessSettingString = gson.toJson(businessSettingObject) ;
	}
	if(userId != -1 ){
		RequestObject requestObject = new RequestObject() ;
		requestObject.setUserId(userId) ;
		requestObject.setBusinessId(survey.getBusinessId()) ;
		requestObject.setStatus(Constant.STATUS_ENABLED) ;
		
		Location []locations = adao.getLocations(requestObject, new ResponseObject()).getLocations() ; ;
		authorizedLocationString = gson.toJson(locations);
		Item items[] = adao.getItems(requestObject, new ResponseObject()).getItems();
		authorizedItemString = gson.toJson(items);
	}
	
	
	 
    
%>
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <title><%=sTitle %></title>
  <meta name="Description" content="<%=sDescription %>">
  <link href="style/default/lightbox.css" rel="stylesheet" type="text/css" />
  <link href="style/default/style.css" rel="stylesheet" type="text/css" />
  <link href="style/default/css.css" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="style/default/jquery.fancybox.css" type="text/css" media="screen" />   
  <link rel="stylesheet" href="style/default/DateTimePicker.min.css" type="text/css"/>   

  <script>
  			  var device = '<%=device%>' ;
  		      var serverUrl = '<%=serverUrl%>';
	          var serviceUrl = '<%=serviceUrl%>';
	          var radiotalkydelimiter = "radiotalkydelimiter" ; 
			  var fileDeleteUrl = serverUrl + "/stream?type=deletefile&name=" ;
			  var source = '<%=source%>' ;
			  var responderId = <%=userId%> ;
			  var responseId = <%=responseId%> ;
			  var authorizedLocationString = '<%=authorizedLocationString%>';
			  var authorizedItemString = '<%=authorizedItemString%>';
			  var businessSettingString = '<%=businessSettingString%>' ;
			
  </script>
	  <script src="js/jquery.min.js"></script>
 
	  <script src="js/lightbox.min.js"></script>
      <script src="js/util.js" type="text/javascript"></script>
      
	  <script src="js/taffy.js" type="text/javascript"></script>
	  <script src="js/taffy-min.js" type="text/javascript"></script>
	  <script src="js/object.js" type="text/javascript"></script>
      <script src="js/variable.js" type="text/javascript"></script>  	  
      <script src="js/validation.js" type="text/javascript"></script>  	  
	  <script src="js/requesthandler.js" type="text/javascript"></script>
	  <script src="js/responsehandler.js" type="text/javascript"></script>
	  <script src="js/main.js" type="text/javascript"></script>
	  <script src="js/question.js" type="text/javascript"></script>
	  <script src="js/tabular.js" type="text/javascript"></script>
	  <script src="js/populatechoices.js" type="text/javascript"></script>
	  <script src="js/plupload.full.min.js"></script>
	  <script type="text/javascript" src="js/jquery.fancybox.pack.js"></script>
	  <script type="text/javascript" src="js/DateTimePicker.min.js"></script>
	  <script type="application/x-javascript" src="js/jqueryuidraggable.js" ></script>
	  <script src="js/jquery.jqscribble.js" type="text/javascript"></script>
	  <script type="application/x-javascript" src="js/preview.js" ></script>
	  <script src="js/date.js" type="text/javascript"></script>
	  <script src="js/verify.notify.js" type="text/javascript"></script>
	  
	 
	  
<script>
	  var locationdb = TAFFY([]) ;  
	  var surveydb = TAFFY([]) ; 
	  var sectiondb = TAFFY([]) ; 
	  var questiondb = TAFFY([]) ; 
	  var tempquestiondb = TAFFY([]) ; 
	  var typedb = TAFFY(typeJson) ;
	  var businessdb = TAFFY([]);
	  var userdb = TAFFY([]) ;
	  var itemdb = TAFFY([]) ;
	  var settingdb = TAFFY([]);
	  
	  var selectedGroupAuthorization = null ;
	  
	  		$(document).ready(function() {
	  		// ADD fancy box******************************
	  		$(".fancybox").fancybox({
				openEffect  : 'none',
				closeEffect : 'none',
				iframe : {
					preload: false
				}
			});
	  		 
			
			$("#dtBox").DateTimePicker({
				
					dateTimeFormat: "yyyy-MM-dd hh:mm:ss",
					dateFormat: "yyyy-MM-dd",
					timeFormat: "hh:mm",
					animationDuration: 100
			});
			
			$(".various").fancybox({
				maxWidth	: 800,
				maxHeight	: 600,
				fitToView	: false,
				width		: '70%',
				height		: '70%',
				autoSize	: false,
				closeClick	: false,
				openEffect	: 'none',
				closeEffect	: 'none'
			});
			
			$(".alertdialog").fancybox({
				maxWidth	: 800,
				maxHeight	: 600,
				fitToView	: false,
				width		: '30%',
				height		: '26%',
				autoSize	: false,
				closeClick	: true,
				openEffect	: 'none',
				closeEffect	: 'none'
			});
			
			
			
			$('.fancybox-media').fancybox({
				openEffect  : 'none',
				closeEffect : 'none',
				helpers : {
					media : {}
				}
			});
	  		
	  		//******************End of fancy boxes
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID
   

});
	  
</script>

 </head>
 <body>
<%
	if(responseId != -1){
		// dont show anything
	}
	else if(!source.equals("Web")){
%>
		<header>
					<a href="#" class="logo">
						Survey and Research
					</a>
					 
					 
		</header>
<%
	}
	 
%>		
    <div class="maindiv">
			 
			<div id="content" >
					<div id="mypopupdiv" ></div>
					<canvas id="blankcanvas" style="border: 1px solid red;display:none;" width="430" height="150" ></canvas>
					
			</div>
			<div id="welcomediv" style="display:none;"> 
				<form name="welcomeform" id="welcomeform" >
					<div class="box-body">
						<div class="form-group">
							<h3 class="questions" id="welcometitle" >Welcome</h3>
							<p style="text-align:justify;" id="welcomecontent" >Thank please take test</p>
							<br/> 
						</div>
						<div id="locationcontainer" class="form-group">
				 
							<label id="locationlabel">Location</label>
							<select name="location" title="Select a location" data-validate="location" class="form-control" required  >	
								<option value="" >Any</option> 					
							</select> 
						</div>
						<div id="itemcontainer" class="form-group">
							<label id="itemlabel">Item</label>
							<select name="item" title="Select a item" data-validate="item" class="form-control" required  >	
								<option value="" >Any</option> 					
							</select> 
						</div>
						<div class="form-group">
							<button name ="welcomebutton"  type="button" class="btn btn-primary" onclick="doPreviewAction( 'showsurveyafterwelcome'  )" title="Apna survey - Next" >Next</button>										
						</div>
					</div>
				</form>
			</div>
			<div id="thankyoudiv" style="display:none;">
				<div class="box-body">
					<div class="form-group">
						<h3 class="questions" >Thank you</h3>
						<p style="text-align:justify;" id="thankyoumessage" >We sincerely thank you and appreciate your time, dedication, and continued participation in our online surveys. Your answers have been received and are much appreciated.  Your responses are vital in helping us to provide a better experience that meets the highest standards of excellence.</p>
						<br/><br/>
					</div>
				</div>
			</div> 	
			<a style="display:none;" id="myalertdialoglink" href="#alertdialogdiv" class="alertdialog">Alert</a><br/>
	 		<a style="display:" id="myconfirmdialoglink" href="#confirmdialogdiv" class="alertdialog">Confirm</a><br/>
	 	 
		<div id="alertmaincontianer" style="display:none" >
			<div id="alertdialogdiv" >
				<table cellpadding="5" cellspacing="5" style="width:95%; height:95%;" >
				       <tr>
							<td id="alerttitle" style="background-color: #F4F4F4;font-weight:bold;font-size:15px;" valign="top" align="left" colspan="2">
								Alert
							</td>
														
						</tr>
						<tr>
							<td valign="top" id="alertimage" >
								<img src="style/default/info.gif" alt="info" />
							</td>
							<td id="alertcontent" style="font-weight:bold;">
								Hello ! this is alert.								
							</td>							
						</tr>
						<tr>
							<td></td>
							<td align="left">						 
							       <button id="globalalertok" type="button" onclick="utilObject.AlertOkClicked();" class="btn btn-primary">Ok</button>								 	
							</td>	
						</tr>						
				</table>
			</div>				
		</div>

		<div id="confirmmaincontianer" style="display:none" >
			<div id="confirmdialogdiv" >
				<table cellpadding="5" cellspacing="5" style="width:95%; height:95%;" >
				       <tr>
							<td id="confirmtitle" style="background-color: #F4F4F4;font-weight:bold;font-size:15px;" valign="top" align="left" colspan="2">
								Confirm
							</td>
														
						</tr>
						<tr>
							<td valign="top" id="alertimage" >
								<img src="style/default/important.gif" alt="info" />
							</td>
							<td id="confirmcontent" style="font-weight:bold;">
								You are about to delete survey. Do you want to proceed ?							
							</td>							
						</tr>
						<tr>
							<td></td>
							<td align="left">						 
							       <button id="globalconfirmyes" type="button" onclick="utilObject.confirmedClicked('true');" class="btn btn-primary">Yes</button>&nbsp;&nbsp;								 	
							       <button id="globalconfirmno" type="button" onclick="utilObject.confirmedClicked('false');" class="btn btn-primary">No</button> 								 	
							</td>	
						</tr>						
				</table>
			</div>				
		</div>
		
		 

  </div>

<script type="text/javascript">

				  // ref: http://diveintohtml5.org/detect.html
				  function supports_input_placeholder()
				  {
					var i = document.createElement('input');
					return 'placeholder' in i;
				  }

				  if(!supports_input_placeholder()) {
					var fields = document.getElementsByTagName('INPUT');
					for(var i=0; i < fields.length; i++) {
					  if(fields[i].hasAttribute('placeholder')) {
							fields[i].defaultValue = fields[i].getAttribute('placeholder');
							fields[i].onfocus = function() { if(this.value == this.defaultValue) this.value = ''; }
							fields[i].onblur = function() { if(this.value == '') this.value = this.defaultValue; }
					  }
					}
				  }

</script>
<%
if(responseId != -1){
	// dont show anything
}
else if(!source.equals("Web")){
	 
%>
<footer>
			<div>
					<table width="100%" cellpadding="3" cellspacing="3">
						<tbody><tr>
							<td align="right">
								<label title="Apna software zone">Powered by: <a href="http://www.apnasoftwarezone.com" title="Apna software zone" style="color: #FFFFFF;text-decoration: blink;">Apna software zone</a></label>&nbsp;&nbsp;
							</td>
						</tr>
					</tbody></table>
			</div>
</footer>
<%
	}
%>
<div id="busyDiv" style="display:none;"><img src="style/default/busy.gif" /></div>
<div id="dtBox" >HELLO</div>

 </body>
</html>

<script>


	$("#blankcanvas").jqScribble();
	 var currentActionCommand = '' ;  
	   if( <%=responseId %> == -1 ){
		  currentActionCommand = ACTION_GET_SURVEY_BY_ID ;
		  handleRequest( ACTION_GET_SURVEY_BY_ID, 'homepage', <%=surveyId %> );
		   
	   }
	   else{
		  currentActionCommand = ACTION_EDIT_SURVEY_RESPONSE ;
		  handleRequest( ACTION_EDIT_SURVEY_RESPONSE, 'homepage', <%=responseId %>, <%=surveyId %> );
		   
	   }
		  
		  
</script>
