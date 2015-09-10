<%@page import="javax.script.ScriptEngine"%>
<%@page import="javax.script.ScriptEngineManager"%>
<%@page import="com.radiotalky.survey.utils.Base64"%>
<%@page import="com.radiotalky.survey.dao.SurveyDao"%>
<%@ include file="includes/includeme.jsp" %>
<jsp:directive.include file="includes/function.jsp" />
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="ISO-8859-1"%>
<%
  
	int surveyId = Integer.parseInt(request.getParameter("surveyId")) ;
	String device = request.getParameter("device") ;
	SurveyDao ad = new SurveyDao() ;    
	Survey survey = ad.getSurveyById(surveyId) ;
	ScriptEngineManager scriptfactory = new ScriptEngineManager();
	ScriptEngine engine = scriptfactory.getEngineByName("JavaScript");
	String sTitle = (String) engine.eval("unescape('" + Base64.decode(survey.getTitle()) + "')"); 
	String sDescription = (String) engine.eval("unescape('" + Base64.decode(survey.getDescription()) + "')") ;
	
%>

<html  >
<head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><%=sTitle %></title>	 
</head>
<body>
<%
 
String exportToWord = request.getParameter("exportToWord");
String content = request.getParameter("content") ;
// response.setCharacterEncoding("UTF-8");
if (exportToWord != null && exportToWord.toString().equalsIgnoreCase("YES")) {
      
      response.setContentType("application/vnd.ms-word;");
      
            response.setHeader("Content-Disposition", "inline; filename=" + "word.doc");
}
 
//
	
  
%>
<h1><%=sTitle %></h1>
<h3><%=sDescription %></h3>
<hr/>
<%
int questionIndex = 0 ;
   Section []sections = survey.getSections();
   if( sections!=null && sections.length > 0 ){
		   for(int i=0; i<sections.length; i++){
			   Section section =sections[i] ;
			   Question ques[] = section.getQuestions();
			   if(ques !=null && ques.length> 0 ){
				   for(int j=0; j<ques.length; j++ ){
					   questionIndex++;
					   Question q = ques[j] ;
					   //String question = (String) engine.eval("unescape('" + Base64.decode(q.getQuestion()) + "')") ;
					   
 		   
						if(q.getType() == Constant.QUESTION_TYPE_DATE_PICKER || q.getType()== Constant.QUESTION_TYPE_TIME_PICKER ||
						
				           q.getType() == Constant.QUESTION_TYPE_TEXT_SINGLE_LINE || q.getType() == Constant.QUESTION_TYPE_TEXT_MULTI_LINE ||
				           q.getType() == Constant.QUESTION_TYPE_Alphanumeric || q.getType() == Constant.QUESTION_TYPE_NUMBER_WITHOUT_DECIMAL ||
						   q.getType() == Constant.QUESTION_TYPE_NUMBER_WITH_DECIMAL || q.getType() == Constant.QUESTION_TYPE_EMAIL ||
						   q.getType() == Constant.QUESTION_TYPE_PHONE || q.getType() == Constant.QUESTION_TYPE_WEBSITE ){
%>
							 
						 <%=getTextTypeQuestion(q, null,questionIndex, false, exportToWord, serverUrl) %> 
 			
<%							
							
						}
						else if( q.getType() == Constant.QUESTION_TYPE_TEXT_MULTI_LINE ){
%>							
							<table class=MsoNormalTable border=1 cellpadding=0 width="100%"  style='width:100.0%;mso-cellspacing:1.5pt;border-top:outset;border-left:outset;  border-bottom:inset;border-right:inset;border-width:1.0pt;mso-border-top-alt:  outset;mso-border-left-alt:outset;mso-border-bottom-alt:inset;mso-border-right-alt:  inset;mso-border-color-alt:windowtext;mso-border-width-alt:.75pt;mso-yfti-tbllook:  1184'>  <thead>   <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>    <td nowrap style='border:none;background:white;padding:.75pt .75pt .75pt .75pt'>    <p class=MsoNormal><span style='mso-fareast-font-family:"Times New Roman"'>&nbsp;<o:p></o:p></span></p>    <p class=MsoNormal><span style='mso-fareast-font-family:"Times New Roman"'>&nbsp;<o:p></o:p></span></p>    </td>   </tr>  </thead> </table>
<%						
						}
						else if( q.getType() == Constant.QUESTION_TYPE_SINGLE_ANSWER_TEXT  ){
							Choice choices[] = q.getChoices() ;
							 
%>
									<%=getMultipleChoiceSingleAnswerText(q, null, questionIndex, false, exportToWord, serverUrl) %>
									

<% 										
									 
						}
						else if( q.getType() == Constant.QUESTION_TYPE_SINGLE_ANSWER_IMAGE  ){
							Choice choices[] = q.getChoices() ;
							 
%>
									<%=getMultipleChoiceSingleAnswerImage(q, null, questionIndex, false, exportToWord, serverUrl) %>
									

<% 										
									 
						}
						else if( q.getType() == Constant.QUESTION_TYPE_MULTIPLE_ANSWER_TEXT  ){
							System.out.println("Question index J : " + j);
							 
%>
									<%=getMultipleChoiceMultipleAnswerText(q, null, questionIndex, false, exportToWord, serverUrl) %>
									

<% 										
									 
						}
						else if( q.getType() == Constant.QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE ){
							 
						 
%>
									 <%=getMultipleChoiceImage(q, null, questionIndex, false, exportToWord, serverUrl) %>
<% 										
									 
						}
						else if( q.getType() == Constant.QUESTION_TYPE_RANGE ){							 
						 
%>
									 <%=getRangeTypeQuestion(q, null, questionIndex, false, exportToWord, serverUrl) %>
<% 																		 
						}
						else if( q.getType() == Constant.QUESTION_TYPE_RANGE ){							 
						 
%>
									 <%=getRangeTypeQuestion(q, null, questionIndex, false, exportToWord, serverUrl) %>
<% 																		 
						}
						else if( q.getType() == Constant.QUESTION_TYPE_TIME_RANGE_PICKER || q.getType() == Constant.QUESTION_TYPE_DATE_RANGE_PICKER  ){							 
						 
%>
									 <%=getDateTimeRangeTypeQuestion(q, null, questionIndex, false, exportToWord, serverUrl) %>
<% 																		 
						}
						else if( q.getType() == Constant.QUESTION_TYPE_SIGNATURE ){
							 
%>
									 <%=getSignatureTypeQuestion(q, null, questionIndex, false, exportToWord, serverUrl) %>
<% 										
									 
						}
						else if( q.getType() == Constant.QUESTION_TYPE_TABULAR ){
							QuestionRow []rows = q.getRows() ;
							QuestionColoumn []cols = rows[0].getCols();
							   String questionTitle = Base64.decode(q.getQuestion());
							   questionTitle = (String) engine.eval("unescape('" + questionTitle + "')"); 
							   System.out.println("questionTitle: " + questionTitle );
							   String html =  "<h3>" + questionIndex + ".&nbsp;" + questionTitle + "</h3>" ;
								  html += getPicture(q.getFile(),exportToWord, serverUrl) ;
							      html += "<table class=MsoNormalTable border=0 cellpadding=5 width=\"100%\"  style='width:100.0%;mso-cellspacing:1.5pt;border-top:outset;border-left:outset;  border-bottom:inset;border-right:inset;border-width:1.0pt;mso-border-top-alt:  outset;mso-border-left-alt:outset;mso-border-bottom-alt:inset;mso-border-right-alt:  inset;mso-border-color-alt:windowtext;mso-border-width-alt:.75pt;mso-yfti-tbllook:  1184' >" ;
								 
							if(cols[0].getRepeatColoumsHeader() == Constant.REPEAT_COLUMN_HEADER_YES ){
								 html += "<tr>" ;
								 for( int k = -1; k<cols.length  ; k++  ){
									 try{
											 if( k == -1 ){
												 if(rows[0].getVisible()*1 == 1){
													 html += "<td></td>" ;
												 }
											 }else{					
												 String coloumn = Base64.decode( cols[k].getColoumn() ) ; 
												 
														 coloumn = (String) engine.eval("unescape('" + coloumn + "')"); 
												 
												 html += "<td>" + coloumn + "</td>"  ;
											 }
									 }catch(Exception e){}
									 
								 }
								 html += "</tr>" ;						 
							 }
														
							 // now add rows and coloumn
							 for( int k=0; k<rows.length; k++ ){
								cols = rows[k].getCols() ;
							 	html += "<tr>" ;
							 	System.out.println("rows[k].getVisible(): " +  + rows[k].getVisible());
							 	if(rows[k].getVisible()*1 == 1){
							 			String rowName = Base64.decode( rows[k].getName()) ;
							 			rowName = (String) engine.eval("unescape('" + rowName + "')");
								 		html += "<td valign=\"top\" >" + rowName + "</td>" ;
							 	}	
				 					 	for(int l=0; l<cols.length; l++ ){
				 					 		QuestionColoumn q1 = cols[l] ;
				 					 		boolean isRepeatedColumn =(cols[0].getRepeatColoumsHeader() == Constant.REPEAT_COLUMN_HEADER_YES);
				 					 		System.out.println("isRepeatedColumn: " + questionIndex + " repeated column : " + isRepeatedColumn + " question Type : " + q1.getType() );
				 					 		html += "<td>" ; 
				 							if(q1.getType() == Constant.QUESTION_TYPE_DATE_PICKER || q1.getType()== Constant.QUESTION_TYPE_TIME_PICKER ||
				 									
				 						           q1.getType() == Constant.QUESTION_TYPE_TEXT_SINGLE_LINE || q1.getType() == Constant.QUESTION_TYPE_TEXT_MULTI_LINE ||
				 						           q1.getType() == Constant.QUESTION_TYPE_Alphanumeric || q1.getType() == Constant.QUESTION_TYPE_NUMBER_WITHOUT_DECIMAL ||
				 								   q1.getType() == Constant.QUESTION_TYPE_NUMBER_WITH_DECIMAL || q1.getType() == Constant.QUESTION_TYPE_EMAIL ||
				 								   q1.getType() == Constant.QUESTION_TYPE_PHONE || q1.getType() == Constant.QUESTION_TYPE_WEBSITE ){
				 		 
				 								    html += getTextTypeQuestion(null, q1, -1, isRepeatedColumn,exportToWord, serverUrl );	 
				 								  
				 		 			
				 						
				 									
				 							}
				 							else if( q1.getType() == Constant.QUESTION_TYPE_SINGLE_ANSWER_TEXT ){
				 								 
				 								 	System.out.println("Multiple type question");
				 									html += getMultipleChoiceSingleAnswerText(null, q1, -1, isRepeatedColumn,exportToWord, serverUrl ) ;
				 								 
				 							}
				 							else if( q1.getType() == Constant.QUESTION_TYPE_SIGNATURE ){
				 								 
				 									html += getSignatureTypeQuestion(null, q1, -1, false, exportToWord, serverUrl) ;
				 																	 
				 							}
				 							else if( q1.getType() == Constant.QUESTION_TYPE_MULTIPLE_ANSWER_TEXT  ){
				 								System.out.println("Question index J : " + j);
				 								 
%>
				 										<%=getMultipleChoiceMultipleAnswerText(null, q1, -1, false, exportToWord, serverUrl) %>
				 										

<% 										
				 										 
				 							}
				 							else if( q1.getType() == Constant.QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE ){
				 								 
				 							 
%>
				 										 <%=getMultipleChoiceImage(null, q1, -1, false, exportToWord, serverUrl) %>
<% 										
				 										 
				 							}
				 							else if( q1.getType() == Constant.QUESTION_TYPE_TIME_RANGE_PICKER || q1.getType() == Constant.QUESTION_TYPE_DATE_RANGE_PICKER  ){							 
				 								 
%>
				 										  <%=getDateTimeRangeTypeQuestion(null, q1, -1, false, exportToWord, serverUrl) %>
<% 																		 
				 							}
				 							else if( q1.getType() == Constant.QUESTION_TYPE_RANGE ){							 
				 								 
%>
				 										<%=getRangeTypeQuestion(null, q1, -1, false, exportToWord, serverUrl) %>
<% 																		 
				 							}
				 					 		html += "</td>" ;
				 					 	}
							 	
							}
							
							
							
							html += "</table>" ;
							
%>
								<%=html %>

<%							
							
						}

				   }
			   }
			   
			   
		   }
   }
%>
 
 
</body>
</html>