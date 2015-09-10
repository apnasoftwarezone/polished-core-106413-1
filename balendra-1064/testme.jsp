
<%@ page import="com.crystaldecisions.report.web.viewer.CrystalReportViewer" %>
<%@ page import="com.crystaldecisions.sdk.occa.report.application.ReportClientDocument" %>
<%
	System.out.println("STARTING>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
/*	
 " com.crystaldecisions.report.web.viewer.ReportExportControl,com.crystaldecisions.reports.reportengineinterface.JPEReportSourceFactory, com.crystaldecisions.reports.sdk.ReportClientDocument, com.crystaldecisions.sdk.occa.report.application.ReportSource, com.crystaldecisions.sdk.occa.report.exportoptions.ExportOptions, com.crystaldecisions.sdk.occa.report.exportoptions.PDFExportFormatOptions, com.crystaldecisions.sdk.occa.report.exportoptions.ReportExportFormat, com.crystaldecisions.sdk.occa.report.reportsource.IReportSource, com.crystaldecisions.sdk.occa.report.reportsource.IReportSourceFactory2,java.io.ByteArrayInputStream" 
		IReportSourceFactory2 rsf = new JPEReportSourceFactory();
		IReportSource reportSource = (IReportSource)rsf.createReportSource("test.rpt", request.getLocale());
		PDFExportFormatOptions  pdfOptions = new PDFExportFormatOptions();
		ExportOptions exportOptions = new ExportOptions();
		exportOptions.setExportFormatType(ReportExportFormat.PDF);		
		exportOptions.setFormatOptions(pdfOptions);

		ReportExportControl reportExportControl = new ReportExportControl();
		reportExportControl.setReportSource(reportSource);
		reportExportControl.setExportOptions(exportOptions);
		// ExportAsAttachment(true) prompts for open or save; false opens the report
		// in the specified format after exporting.
		reportExportControl.setExportAsAttachment(false);
		// Export the report
		reportExportControl.processHttpRequest(request, response, application, null);
*/
String REPORT_NAME = "D:\\Software\\crystal report\\account.rpt";
ReportClientDocument reportClientDoc = new ReportClientDocument();
reportClientDoc.open(REPORT_NAME, 0);

// set up a viewer
CrystalReportViewer viewer = new CrystalReportViewer();
viewer.setOwnPage(true);
viewer.setOwnForm(true);
//viewer.setPrintMode(CrPrintMode.ACTIVEX);

// pass it the report source
viewer.setReportSource(reportClientDoc.getReportSource());

//Render the report.
viewer.processHttpRequest(request, response, getServletConfig().getServletContext(), null); 		
		
	System.out.println("ending>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");		
		
%>		 