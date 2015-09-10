<%@page import="com.radiotalky.survey.SearchReport"%>
<%@page import="com.radiotalky.survey.RequestObject"%>
<%@page import="com.mkyong.ExcelExport"%>
<%
System.out.println("Going to create excel file") ;
String uri = request.getScheme() + "://" +   // "http" + "://
        request.getServerName() +       // "myhost"
        ":" +                           // ":"
        request.getServerPort() + "/survey/"  ;
        		ExcelExport.server = uri ;
	ExcelExport export = new ExcelExport() ;
		RequestObject request1 = new RequestObject() ;
		SearchReport re = new SearchReport() ;
		
		re.setBusinessId(2);
		re.setSurveyId(127);
		re.setStartDate("2014-09-03 12:15:17");
		re.setEndDate("2015-09-05 12:15:17") ;
		request1.setSearchReport(re);
		export.createWorkSheet(request1) ;
		 
		
System.out.println("End of creating excel file : " + uri ) ;
%>