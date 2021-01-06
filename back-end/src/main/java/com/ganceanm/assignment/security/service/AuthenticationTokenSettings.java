package com.ganceanm.assignment.security.service;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("authentication.jwt")
public class AuthenticationTokenSettings {

	/*
	 * JWT token configuration
	 */

	private String secret = "SECRET";

	private Long clockSkew = Long.valueOf(10);

	private String audience = "audience";

	private String issuer = "issuer";

	private String authorityClaimName = "authority";

	private String refreshCountClaimName = "refreshCount";

	private String refreshLimitClaimName = "refreshLimit";

	private Long validFor = Long.valueOf(3600);

	private Integer refreshLimit = 2;

	public String getSecret() {
		return secret;
	}

	public Long getClockSkew() {
		return clockSkew;
	}

	public String getAudience() {
		return audience;
	}

	public String getIssuer() {
		return issuer;
	}

	public String getAuthorityClaimName() {
		return authorityClaimName;
	}

	public String getRefreshCountClaimName() {
		return refreshCountClaimName;
	}

	public String getRefreshLimitClaimName() {
		return refreshLimitClaimName;
	}

	public Long getValidFor() {
		return validFor;
	}

	public void setValidFor(Long validFor) {
		this.validFor = validFor;
	}

	public Integer getRefreshLimit() {
		return refreshLimit;
	}

	public void setRefreshLimit(Integer refreshLimit) {
		this.refreshLimit = refreshLimit;
	}

	public void setSecret(String secret) {
		this.secret = secret;
	}

	public void setClockSkew(Long clockSkew) {
		this.clockSkew = clockSkew;
	}

	public void setAudience(String audience) {
		this.audience = audience;
	}

	public void setIssuer(String issuer) {
		this.issuer = issuer;
	}

	public void setAuthorityClaimName(String authorityClaimName) {
		this.authorityClaimName = authorityClaimName;
	}

	public void setRefreshCountClaimName(String refreshCountClaimName) {
		this.refreshCountClaimName = refreshCountClaimName;
	}

	public void setRefreshLimitClaimName(String refreshLimitClaimName) {
		this.refreshLimitClaimName = refreshLimitClaimName;
	}
	
}
