 
<%@page import="com.radiotalky.survey.Constant"%>
<%@page import="com.radiotalky.survey.utils.Base64Balendra"%>
<%@page import="com.radiotalky.survey.Picture"%>
<%@page import="com.radiotalky.survey.Choice"%>
<%@page import="com.radiotalky.survey.utils.Base64"%>
<%@page import="javax.script.ScriptEngine"%>
<%@page import="javax.script.ScriptEngineManager"%>
<%@page import="com.radiotalky.survey.QuestionColoumn"%>
<%@page import="com.radiotalky.survey.Question"%>

<%!

 	// String serverUrl = "" ;
	ScriptEngineManager scriptfactory = new ScriptEngineManager();
	ScriptEngine engine = scriptfactory.getEngineByName( "JavaScript" );
    
    public String getPicture(Picture pic, String exportToWord, String serverUrl ){
    	String html = "" ;
    	if(pic != null ){
    		if(exportToWord != null ){
    			// html += "<p><img src=\"" + Base64Balendra.EncodeUrlToBase64( serverUrl + "/" +  pic.getThumbnailUrl() )  + "\" alt=\"test\" /></p>"  ;
    			html += "<p><img src=\"" + serverUrl + "/" + pic.getThumbnailUrl() + "\" alt=\"test\" /></p>"  ;
    		}
    		else{
	    		 html += "<p><img src=\"" + serverUrl + "/" + pic.getThumbnailUrl() + "\" alt=\"test\" /></p>"  ;
    			//html += "<p><img src=\"" + Base64Balendra.EncodeUrlToBase64( serverUrl + "/" +  pic.getThumbnailUrl() )  + "\" alt=\"test\" /></p>"  ;
    			
    		}
    	}
    	return html ;
    }
    
    public String getTextTypeQuestion( Question question, QuestionColoumn col, int index, boolean isRepeatedColumnHeader, String exportToWord,String  serverUrl ){
			String html = "" ;
			String ques = "" ;
			if(isRepeatedColumnHeader == false){
					if(question != null )
						ques = question.getQuestion() ;
					else
						ques = col.getColoumn() ;
					
					try{
					  ques = (String) engine.eval("unescape('" + Base64.decode(ques) + "')") ;
					}catch(Exception ex){
						
					}
					
					if(index != -1 )
						  html +="<h3>" + index + ".&nbsp;" + ques + "</h3>" ;
					else
						  html +="<h3>" + ques + "</h3>" ;
 					  
					if(question != null )
						  html += getPicture(question.getFile(),exportToWord, serverUrl) ;
 
			}
			
			 html +="<table class=MsoNormalTable border=1 cellpadding=0 width=\"100%\"  style='width:100.0%;mso-cellspacing:1.5pt;border-top:outset;border-left:outset;  border-bottom:inset;border-right:inset;border-width:1.0pt;mso-border-top-alt:  outset;mso-border-left-alt:outset;mso-border-bottom-alt:inset;mso-border-right-alt:  inset;mso-border-color-alt:windowtext;mso-border-width-alt:.75pt;mso-yfti-tbllook:  1184'>  <thead>   <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>    <td nowrap style='border:none;background:white;padding:.75pt .75pt .75pt .75pt'>    <p class=MsoNormal><span style='mso-fareast-font-family:\"Times New Roman\"'>&nbsp;<o:p></o:p></span></p>    </td>   </tr>  </thead> </table>" ;
			return html ;
    }
    
    public String getSignatureTypeQuestion( Question question, QuestionColoumn col, int index, boolean isRepeatedColumnHeader, String exportToWord, String  serverUrl ){
			String html = "" ;
			String ques = "" ;
			if(isRepeatedColumnHeader == false){
					
					if(index != -1 )
						  html +="<h3>" + index + ".&nbsp;" + "Signature" + "</h3>" ;
					else
						  html +="<h3>" + "Signature" + "</h3>" ;
						  
				    html += "<p> .....................................................................</p>" ;
 					  
					if(question != null )
						  html += getPicture(question.getFile(),exportToWord, serverUrl) ;
 
			}			
			html += "<p>Signature of<p>" ;
			html +="<table class=MsoNormalTable border=1 cellpadding=0 width=\"100%\"  style='width:100.0%;mso-cellspacing:1.5pt;border-top:outset;border-left:outset;  border-bottom:inset;border-right:inset;border-width:1.0pt;mso-border-top-alt:  outset;mso-border-left-alt:outset;mso-border-bottom-alt:inset;mso-border-right-alt:  inset;mso-border-color-alt:windowtext;mso-border-width-alt:.75pt;mso-yfti-tbllook:  1184'>  <thead>   <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>    <td nowrap style='border:none;background:white;padding:.75pt .75pt .75pt .75pt'>    <p class=MsoNormal><span style='mso-fareast-font-family:\"Times New Roman\"'>&nbsp;<o:p></o:p></span></p>    </td>   </tr>  </thead> </table>" ;
			return html ;
    }

    
    public String getMultipleChoiceMultipleAnswerText( Question question, QuestionColoumn col, int index, boolean isRepeatedColumnHeader, String exportToWord, String serverUrl ){
			String html = "" ;
			String ques = "" ;
			Choice []choices = null ;
			if(question != null ){
				ques = question.getQuestion() ;
				choices = question.getChoices();
			}else{
				ques = col.getColoumn() ;
				choices = col.getChoices();
			}
			if(isRepeatedColumnHeader == false){
						
						
						try{
						      ques = (String) engine.eval("unescape('" + Base64.decode(ques) + "')") ;
						}catch(Exception ex){
							
						}
						if(index != -1 )
						  html +="<h3>" + index + ".&nbsp;" + ques + "</h3>" ;
						else
						  html +="<h3>" + ques + "</h3>" ;
						  
						if( question != null ) 
						 	 html += getPicture(question.getFile(),exportToWord, serverUrl) ;
			}			
			if(choices != null && choices.length > 0){  
				for( int i=0; i< choices.length; i++ ){
						String ch = "" ;
					try{
							ch = (String) engine.eval("unescape('" + Base64.decode(choices[i].getChoice()) + "')") ;
						}catch(Exception ex){
							
						}					
					html += "<p><input type=\"checkbox\" value=\"male\" />" + ch + "</p>" ;
				}	
			}
			return html ;
    }
    public String getRangeTypeQuestion( Question question, QuestionColoumn col, int index, boolean isRepeatedColumnHeader, String exportToWord, String serverUrl ){
			String html = "" ;
			String ques = "" ;
			Choice []choices = null ;
			if(question != null ){
				ques = question.getQuestion() ;
				choices = question.getChoices();
			}else{
				ques = col.getColoumn() ;
				choices = col.getChoices();
			}
			if(isRepeatedColumnHeader == false){
						
						
						try{
						      ques = (String) engine.eval("unescape('" + Base64.decode(ques) + "')") ;
						}catch(Exception ex){
							
						}
						if(index != -1 )
						  html +="<h3>" + index + ".&nbsp;" + ques + "</h3>" ;
						else
						  html +="<h3>" + ques + "</h3>" ;
						  
						if( question != null ) 
						 	 html += getPicture(question.getFile(),exportToWord, serverUrl) ;
			}			
			 
				for( float i=question.getRangeFrom(); i< question.getRangeTo(); i++ ){					 
					 			
					html += "<p><input type=\"radio\" value=\"male\" />" + i + "</p>" ;
				}	
			 
			return html ;
    }
    public String getDateTimeRangeTypeQuestion( Question question, QuestionColoumn col, int index, boolean isRepeatedColumnHeader, String exportToWord, String serverUrl ){
			String html = "" ;
			String ques = "" ;
			Choice []choices = null ;
			if(question != null ){
				ques = question.getQuestion() ;
				choices = question.getChoices();
			}else{
				ques = col.getColoumn() ;
				choices = col.getChoices();
			}
			if(isRepeatedColumnHeader == false){
						
						
						try{
						      ques = (String) engine.eval("unescape('" + Base64.decode(ques) + "')") ;
						}catch(Exception ex){
							
						}
						if(index != -1 )
						  html +="<h3>" + index + ".&nbsp;" + ques + "</h3>" ;
						else
						  html +="<h3>" + ques + "</h3>" ;
						  
						if( question != null ) 
						 	 html += getPicture(question.getFile(),exportToWord, serverUrl) ;
			}			
			 
			if(question.getType() == Constant.QUESTION_TYPE_TIME_RANGE_PICKER){					 
					html += "<p>Start time</p>" ; 			
					html +="<table class=MsoNormalTable border=1 cellpadding=0 width=\"100%\"  style='width:100.0%;mso-cellspacing:1.5pt;border-top:outset;border-left:outset;  border-bottom:inset;border-right:inset;border-width:1.0pt;mso-border-top-alt:  outset;mso-border-left-alt:outset;mso-border-bottom-alt:inset;mso-border-right-alt:  inset;mso-border-color-alt:windowtext;mso-border-width-alt:.75pt;mso-yfti-tbllook:  1184'>  <thead>   <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>    <td nowrap style='border:none;background:white;padding:.75pt .75pt .75pt .75pt'>    <p class=MsoNormal><span style='mso-fareast-font-family:\"Times New Roman\"'>&nbsp;<o:p></o:p></span></p>    </td>   </tr>  </thead> </table>" ;
					html += "<p>End time</p>" ; 			
					html +="<table class=MsoNormalTable border=1 cellpadding=0 width=\"100%\"  style='width:100.0%;mso-cellspacing:1.5pt;border-top:outset;border-left:outset;  border-bottom:inset;border-right:inset;border-width:1.0pt;mso-border-top-alt:  outset;mso-border-left-alt:outset;mso-border-bottom-alt:inset;mso-border-right-alt:  inset;mso-border-color-alt:windowtext;mso-border-width-alt:.75pt;mso-yfti-tbllook:  1184'>  <thead>   <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>    <td nowrap style='border:none;background:white;padding:.75pt .75pt .75pt .75pt'>    <p class=MsoNormal><span style='mso-fareast-font-family:\"Times New Roman\"'>&nbsp;<o:p></o:p></span></p>    </td>   </tr>  </thead> </table>" ;
			}
			else{
				html += "<p>Start date</p>" ; 			
				html +="<table class=MsoNormalTable border=1 cellpadding=0 width=\"100%\"  style='width:100.0%;mso-cellspacing:1.5pt;border-top:outset;border-left:outset;  border-bottom:inset;border-right:inset;border-width:1.0pt;mso-border-top-alt:  outset;mso-border-left-alt:outset;mso-border-bottom-alt:inset;mso-border-right-alt:  inset;mso-border-color-alt:windowtext;mso-border-width-alt:.75pt;mso-yfti-tbllook:  1184'>  <thead>   <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>    <td nowrap style='border:none;background:white;padding:.75pt .75pt .75pt .75pt'>    <p class=MsoNormal><span style='mso-fareast-font-family:\"Times New Roman\"'>&nbsp;<o:p></o:p></span></p>    </td>   </tr>  </thead> </table>" ;
				html += "<p>End date</p>" ; 			
				html +="<table class=MsoNormalTable border=1 cellpadding=0 width=\"100%\"  style='width:100.0%;mso-cellspacing:1.5pt;border-top:outset;border-left:outset;  border-bottom:inset;border-right:inset;border-width:1.0pt;mso-border-top-alt:  outset;mso-border-left-alt:outset;mso-border-bottom-alt:inset;mso-border-right-alt:  inset;mso-border-color-alt:windowtext;mso-border-width-alt:.75pt;mso-yfti-tbllook:  1184'>  <thead>   <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>    <td nowrap style='border:none;background:white;padding:.75pt .75pt .75pt .75pt'>    <p class=MsoNormal><span style='mso-fareast-font-family:\"Times New Roman\"'>&nbsp;<o:p></o:p></span></p>    </td>   </tr>  </thead> </table>" ;
			}
			 
			return html ;
    }
    public String getMultipleChoiceSingleAnswerText( Question question, QuestionColoumn col, int index, boolean isRepeatedColumnHeader,String exportToWord, String serverUrl ){
			String html = "" ;
			String ques = "" ;
			Choice []choices = null ;
			if(question != null ){
				ques = question.getQuestion() ;
				choices = question.getChoices();
			}else{
				ques = col.getColoumn() ;
				choices = col.getChoices();
			}
			if(isRepeatedColumnHeader == false){
						
						
						try{
						      ques = (String) engine.eval("unescape('" + Base64.decode(ques) + "')") ;
						}catch(Exception ex){
							
						}
						if(index != -1 )
						  html +="<h3>" + index + ".&nbsp;" + ques + "</h3>" ;
						else
						  html +="<h3>" + ques + "</h3>" ;
						  
						if( question != null ) 
						 	 html += getPicture(question.getFile(), exportToWord, serverUrl) ;
			}			
			if(choices != null && choices.length > 0){  
				for( int i=0; i< choices.length; i++ ){
						String ch = "" ;
					try{
							ch = (String) engine.eval("unescape('" + Base64.decode(choices[i].getChoice()) + "')") ;
						}catch(Exception ex){
							
						}
					html += "<p><input type=\"radio\" value=\"male\">" + ch + "</p>" ;
				}	
			}
			return html ;
    }
    public String getMultipleChoiceSingleAnswerImage( Question question, QuestionColoumn col, int index, boolean isRepeatedColumnHeader,String exportToWord, String serverUrl ){
			String html = "" ;
			String ques = "" ;
			Choice []choices = null ;
			if(question != null ){
				ques = question.getQuestion() ;
				choices = question.getChoices();
			}else{
				ques = col.getColoumn() ;
				choices = col.getChoices();
			}
			if(isRepeatedColumnHeader == false){
						
						
						try{
						      ques = (String) engine.eval("unescape('" + Base64.decode(ques) + "')") ;
						}catch(Exception ex){
							
						}
						if(index != -1 )
						  html +="<h3>" + index + ".&nbsp;" + ques + "</h3>" ;
						else
						  html +="<h3>" + ques + "</h3>" ;
						  
						if( question != null ) 
						 	 html += getPicture(question.getFile(), exportToWord, serverUrl) ;
			}			
			if(choices != null && choices.length > 0){  
				for( int i=0; i< choices.length; i++ ){
						String ch = "" ;
					try{
							ch = (String) engine.eval("unescape('" + Base64.decode(choices[i].getChoice()) + "')") ;
						}catch(Exception ex){
							
						}
					if( choices[i].getFile() != null ){
						html += "<table border=\"0\">" ;
						html += "<tr><td valign=\"top\" >"  + "<input type=\"radio\" value=\"male\"></td>" ;
						html += "<td valign=\"top\">" + getPicture(choices[i].getFile(), exportToWord, serverUrl) ;
						html += "<p>" + ch + "</p></td>" ;
						html += "</td></tr>" ;
						html += "</table>" ;
						 
					}
					else{
						html += "<p><input type=\"radio\" value=\"male\">" + ch + "</p>" ;
						
					}
				}	
			}
			return html ;
    }
    
    
    public String getMultipleChoiceImage( Question question, QuestionColoumn col, int index, boolean isRepeatedColumnHeader, String exportToWord, String serverUrl){
			String html = "" ;
			String ques = "" ;
			Choice []choices = null ;
			if(question != null ){
				ques = question.getQuestion() ;
				choices = question.getChoices();
			}else{
				ques = col.getColoumn() ;
				choices = col.getChoices();
			}
			
			try{
			  ques = (String) engine.eval("unescape('" + Base64.decode(question.getQuestion()) + "')") ;
			}catch(Exception ex){
				
			}
			if(index != -1 )
			  html +="<h3>" + index + ".&nbsp;" + ques + "</h3>" ;
			else
			  html +="<h3>" + ques + "</h3>" ;
			 
			  html += getPicture( question.getFile(), exportToWord, serverUrl ) ;
			  
			for( int i=0; i< choices.length; i++ ){
					String ch = "" ;
				try{
						ch = (String) engine.eval("unescape('" + Base64.decode(choices[i].getChoice()) + "')") ;
					}catch(Exception ex){
						
					}
				html += "<p><input type=\"radio\" value=\"male\">" + ch + "</p>" ;
			}			  
			return html ;
    }
%>