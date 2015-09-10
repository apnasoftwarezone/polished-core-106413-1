<%@page import="javax.script.ScriptEngine"%>
<%@page import="javax.script.ScriptEngineManager"%>
<%@page import="com.radiotalky.survey.utils.Base64"%>
<%@page import="com.radiotalky.survey.dao.SurveyDao"%>
<%@ include file="includes/includeme.jsp" %>
<%@ include file="includes/function.jsp" %>
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
							 
						 <%=getTextTypeQuestion(q, null,questionIndex, false) %> 
 			
<%							
							
						}
						else if( q.getType() == Constant.QUESTION_TYPE_TEXT_MULTI_LINE ){
%>							
							<table class=MsoNormalTable border=1 cellpadding=0 width="100%"  style='width:100.0%;mso-cellspacing:1.5pt;border-top:outset;border-left:outset;  border-bottom:inset;border-right:inset;border-width:1.0pt;mso-border-top-alt:  outset;mso-border-left-alt:outset;mso-border-bottom-alt:inset;mso-border-right-alt:  inset;mso-border-color-alt:windowtext;mso-border-width-alt:.75pt;mso-yfti-tbllook:  1184'>  <thead>   <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>    <td nowrap style='border:none;background:white;padding:.75pt .75pt .75pt .75pt'>    <p class=MsoNormal><span style='mso-fareast-font-family:"Times New Roman"'>&nbsp;<o:p></o:p></span></p>    <p class=MsoNormal><span style='mso-fareast-font-family:"Times New Roman"'>&nbsp;<o:p></o:p></span></p>    </td>   </tr>  </thead> </table>
<%						
						}
						else if( q.getType() == Constant.QUESTION_TYPE_SINGLE_ANSWER_TEXT  ){
							Choice choices[] = q.getChoices() ;
							if(choices != null && choices.length >0 ){
									for(int k=0; k<choices.length; k++){
%>
									<%=getMultipleChoiceSingleAnswerText(q, null, questionIndex, false) %>
									

<% 										
									}
								
							}
						}
						else if( q.getType() == Constant.QUESTION_TYPE_MULTIPLE_ANSWER_TEXT  ){
							Choice choices[] = q.getChoices() ;
							if(choices != null && choices.length >0 ){
									for(int k=0; k<choices.length; k++){
%>
									<%=getMultipleChoiceMultipleAnswerText(q, null, questionIndex, false) %>
									

<% 										
									}
								
							}
						}
						else if( q.getType() == Constant.QUESTION_TYPE_MULTIPLE_ANSWER_IMAGE ){
							Choice choices[] = q.getChoices() ;
							if(choices != null && choices.length >0 ){
									for(int k=0; k<choices.length; k++){
%>
									 <%=getMultipleChoiceImage(q, null, questionIndex) %>
<% 										
									}
								
							}
						}
						else if( q.getType() == Constant.QUESTION_TYPE_TABULAR ){
							QuestionRow []rows = q.getRows() ;
							QuestionColoumn []cols = rows[0].getCols();
							   String questionTitle = Base64.decode(q.getQuestion());
							   questionTitle = (String) engine.eval("unescape('" + questionTitle + "')"); 
							   System.out.println("questionTitle: " + questionTitle );
							   String html =  "<h3>" + questionIndex + ".&nbsp;" + questionTitle + "</h3>" ;
								  html += getPicture(q.getFile()) ;
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
				 		 
				 								    html += getTextTypeQuestion(null, q1, -1, isRepeatedColumn );	 
				 								  
				 		 			
				 						
				 									
				 							}
				 							else if( q1.getType() == Constant.QUESTION_TYPE_SINGLE_ANSWER_TEXT ){
				 								 
				 								 	System.out.println("Multiple type question");
				 									html += getMultipleChoiceSingleAnswerText(null, q1, -1, isRepeatedColumn ) ;
				 								 
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



<h1>Title level 1</h1>
<h2>Title level 2</h2>
<h3>Title level 3</h3>
<p>Text in level 3</p>
<h2>2nd title level 2</h2>
<h3>Another level 3 title</h3>
<h4>What is your name</h4>
<table border="1" width="100%">
<thead style="background-color:#FFFFFF;border-color:#fff000"><td nowrap>&nbsp;</td></thead>
</table>

<h4>Address</h4>
<table class=MsoNormalTable border=1 cellpadding=0 width="100%"  style='width:100.0%;mso-cellspacing:1.5pt;border-top:outset;border-left:outset;  border-bottom:inset;border-right:inset;border-width:1.0pt;mso-border-top-alt:  outset;mso-border-left-alt:outset;mso-border-bottom-alt:inset;mso-border-right-alt:  inset;mso-border-color-alt:windowtext;mso-border-width-alt:.75pt;mso-yfti-tbllook:  1184'>  <thead>   <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>    <td nowrap style='border:none;background:white;padding:.75pt .75pt .75pt .75pt'>    <p class=MsoNormal><span style='mso-fareast-font-family:"Times New Roman"'>&nbsp;<o:p></o:p></span></p>    <p class=MsoNormal><span style='mso-fareast-font-family:"Times New Roman"'>&nbsp;<o:p></o:p></span></p>    </td>   </tr>  </thead> </table>
<h3>Are you ready to participate in survey ?</h3>
<table border="1" width="100%" class="alter1"><tbody><tr><td></td><td>Response</td></tr><tr><td valign="center">Respondent 1</td><td><table width="100%"><tbody><tr><td colspan="2"><table id="tabularquestion-0-82table" width="100%"><tbody><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-0-82" value="899" onchange="checkSavePoint('300' , '82', '0')"> Yes<label></label></label></td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-0-82" value="900" onchange="checkSavePoint('300' , '82', '0')"> No<label></label></label></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td valign="center">Respondent 2</td><td><table width="100%"><tbody><tr><td colspan="2"><table id="tabularquestion-1-83table" width="100%"><tbody><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-1-83" value="901" onchange="checkSavePoint('300' , '83', '1')"> Yes<label></label></label></td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-1-83" value="902" onchange="checkSavePoint('300' , '83', '1')"> No<label></label></label></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>
<h3>PRIMARY RESPONDENT IDENTIFICATION DETAILS ?</h3>
<table border="1" width="100%" class="alter1"><tbody><tr><td valign="center">1</td><td><table width="100%"><tbody><tr><td colspan="2"><table id="tabularquestion-0-90table" width="100%"><tbody><tr><td class="questions">Education Status of Primary Respondent</td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-0-90" value="933" onchange="checkSavePoint('300' , '90', '0')"> Read Only<label></label></label></td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-0-90" value="934" onchange="checkSavePoint('300' , '90', '0')"> Read and Write both<label></label></label></td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-0-90" value="935" onchange="checkSavePoint('300' , '90', '0')"> Illiterate<label></label></label></td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-0-90" value="936" onchange="checkSavePoint('300' , '90', '0')"> Formal Schooling<label></label></label></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td valign="center">2</td><td><table width="100%"><tbody><tr><td colspan="2"><table id="tabularquestion-1-91table" width="100%"><tbody><tr><td class="questions">Religion of the Respondent</td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-1-91" value="937" onchange="checkSavePoint('300' , '91', '1')"> Hindu<label></label></label></td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-1-91" value="938" onchange="checkSavePoint('300' , '91', '1')"> Muslim<label></label></label></td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-1-91" value="939" onchange="checkSavePoint('300' , '91', '1')"> Christian<label></label></label></td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-1-91" value="940" onchange="checkSavePoint('300' , '91', '1')"> Sikh<label></label></label></td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-1-91" value="941" onchange="checkSavePoint('300' , '91', '1')"> Others<label></label></label></td></tr><tr><td id="tabularquestion-1-91comment"><div class="form-group"><label>Other</label><br><input name="tabularquestion-1-91comment" type="text" value="" title="Enter answer" placeholder="Enter answer" class="form-control"> </div></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td valign="center">3</td><td><table width="100%"><tbody><tr><td colspan="2"><table id="tabularquestion-2-92table" width="100%"><tbody><tr><td class="questions">Caste of the Respondent</td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-2-92" value="942" onchange="checkSavePoint('300' , '92', '2')"> SC<label></label></label></td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-2-92" value="943" onchange="checkSavePoint('300' , '92', '2')"> ST<label></label></label></td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-2-92" value="944" onchange="checkSavePoint('300' , '92', '2')"> OBC<label></label></label></td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-2-92" value="945" onchange="checkSavePoint('300' , '92', '2')"> General<label></label></label></td></tr><tr><td>&nbsp;&nbsp;<label><input type="radio" name="tabularquestion-2-92" value="946" onchange="checkSavePoint('300' , '92', '2')"> Others<label></label></label></td></tr><tr><td id="tabularquestion-2-92comment"><div class="form-group"><label>Other</label><br><input name="tabularquestion-2-92comment" type="text" value="" title="Enter answer" placeholder="Enter answer" class="form-control"> </div></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td valign="center">4</td><td><table width="100%"><tbody><tr><td colspan="2"><table id="tabularquestioncanvas-3-93table" width="100%"><tbody><tr><td><canvas id="tabularquestioncanvas-3-93" style="border: 1px solid red;" width="430" height="150"></canvas></td></tr><tr><td><a href="javascript:void(0);" onclick="$(&quot;#tabularquestioncanvas-3-93&quot;).data(&quot;jqScribble&quot;).clear();">Clear</a></td></tr><tr><td>Signature of</td></tr><tr><td><input name="tabularsignature-3-93" type="text" value="" title="Name of signaturey" placeholder="Name of signaturey" class="form-control" required=""> </td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>


List:
<ul>
<li>element 1</li>
<li>element 2</li>
<li>element 3</li>
  <ul>
  <li>element 4</li>
  <li>element 5</li>
  <li>element 6</li>
      <ul>
      <li>element 7</li>
      <li>element 8</li>
      </ul>
  </ul>
<li>element 9</li>
<li>element 10</li>
</ul>
 
<table width="100%">
<thead style="background-color:#A0A0FF;"><td nowrap>Column A</td><td nowrap>Column B</td><td nowrap>Column C</td></thead>
<tr><td>A1</td><td>B1</td><td>C1</td></tr>
<tr><td>A2</td><td>B2 Test with looooong text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed sapien 
ac tortor porttitor lobortis. Donec velit urna, vulputate eu egestas eu, lacinia non dolor. Cras lacus diam, tempus 
sed ullamcorper a, euismod id nunc. Fusce egestas velit sed est fermentum tempus. Duis sapien dui, consectetur eu 
accumsan id, tristique sit amet ante.</td><td>C2</td></tr>
<tr><td>A3</td><td>B3</td><td>C3</td></tr>
</table>
 
</body>
</html>