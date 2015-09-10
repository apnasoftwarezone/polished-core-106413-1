<%@ page import="com.radiotalky.survey.*" %> 
<jsp:useBean id="user" scope="session" class="com.radiotalky.survey.UserAccount" type="com.radiotalky.survey.UserAccount" />
<%
	 

	String serverName = request.getServerName().trim().toLowerCase();
//	String baseUrl = "http://" + serverName ;
	String baseUrl = "http://" + serverName + ":8080";
//	String baseUrl = "http://" + serverName + ":8080";
	
	
	String serverUrl = baseUrl + "/survey";
	String serviceUrl = serverUrl + "/services/admin/requesthandler/" ;
	System.out.println("serverName : " + serverName );
	System.out.println("serverUrl : " + serverUrl );
	System.out.println("serviceUrl : " + serviceUrl );
%>
 

