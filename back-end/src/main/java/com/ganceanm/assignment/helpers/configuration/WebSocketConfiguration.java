package com.ganceanm.assignment.helpers.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration extends AbstractSecurityWebSocketMessageBrokerConfigurer {
 
	@Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/secured/user/queue/specific");
        config.setApplicationDestinationPrefixes("/socket");
        config.setUserDestinationPrefix("/secured/user");
    }
 
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/secured/room").withSockJS();
    }
    
    @Override
    protected void configureInbound(
      MessageSecurityMetadataSourceRegistry messages) { 
        messages
          .simpDestMatchers("/secured/**").authenticated()
          .anyMessage().authenticated(); 
    }
    
    @Override
    protected boolean sameOriginDisabled() {
        return true;
    }
}
