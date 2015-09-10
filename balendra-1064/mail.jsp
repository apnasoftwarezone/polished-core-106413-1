<%@ page import="java.util.Properties,javax.mail.Message,javax.mail.MessagingException,javax.mail.Session,javax.mail.Transport,javax.mail.internet.AddressException,javax.mail.internet.InternetAddress,javax.mail.internet.MimeMessage" %> 

<%
Properties props = new Properties();
Session session1 = Session.getDefaultInstance(props, null);

String msgBody = "This is messag...";

try {
	System.out.println("Start sending message");
    Message msg = new MimeMessage(session1);
    msg.setFrom(new InternetAddress("bsingh@saasmob.com", "saasmob.com Balendra"));
    msg.addRecipient(Message.RecipientType.TO,
    new InternetAddress("balendra4u@gmail.com", "Mr. User"));
    msg.setSubject("Your Example.com account has been activated");
    msg.setText(msgBody);
    Transport.send(msg);
    System.out.println("end sending message");
} catch (AddressException e) {
    System.out.println("Address exception 1111: " + e.getMessage());
} catch (MessagingException e) {
	System.out.println("Messaging exception 1111 : " + e.getMessage());
} catch (Exception e) {
	System.out.println("Messaging exception 1111 : " + e.getMessage());
}
%>