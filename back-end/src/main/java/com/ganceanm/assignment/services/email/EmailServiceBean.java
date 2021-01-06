package com.ganceanm.assignment.services.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailServiceBean implements EmailService{
	
	@Autowired
	private JavaMailSender emailSender;

	@Override
	public void sendEmail(String mailTo, String subject, String text) {
		SimpleMailMessage message = new SimpleMailMessage(); 
        message.setTo(mailTo); 
        message.setSubject(subject); 
        message.setText(text);
        emailSender.send(message);
	}

}
