package com.ganceanm.assignment.security.model;

import java.time.ZonedDateTime;

import com.ganceanm.assignment.user.model.UserRole;

public class AuthenticationTokenDetails {
	private final String id;
	private final String username;
	private final UserRole authority;
	private final ZonedDateTime issuedDate;
	private final ZonedDateTime expirationDate;
	private final int refreshCount;
	private final int refreshLimit;

	private AuthenticationTokenDetails(String id, String username, UserRole authority, ZonedDateTime issuedDate,
			ZonedDateTime expirationDate, int refreshCount, int refreshLimit) {
		this.id = id;
		this.username = username;
		this.authority = authority;
		this.issuedDate = issuedDate;
		this.expirationDate = expirationDate;
		this.refreshCount = refreshCount;
		this.refreshLimit = refreshLimit;
	}

	public String getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public UserRole getAuthority() {
		return authority;
	}

	public ZonedDateTime getIssuedDate() {
		return issuedDate;
	}

	public ZonedDateTime getExpirationDate() {
		return expirationDate;
	}

	public int getRefreshCount() {
		return refreshCount;
	}

	public int getRefreshLimit() {
		return refreshLimit;
	}

	/**
	 * Check if the authentication token is eligible for refreshment.
	 *
	 * @return
	 */
	public boolean isEligibleForRefreshment() {
		return refreshCount < refreshLimit;
	}

	/**
	 * Builder for the {@link AuthenticationTokenDetails}.
	 */
	public static class Builder {

		private String id;
		private String username;
		private UserRole authority;
		private ZonedDateTime issuedDate;
		private ZonedDateTime expirationDate;
		private int refreshCount;
		private int refreshLimit;

		public Builder withId(String id) {
			this.id = id;
			return this;
		}

		public Builder withUsername(String username) {
			this.username = username;
			return this;
		}

		public Builder withAuthorities(UserRole authority) {
			this.authority = authority;
			return this;
		}

		public Builder withIssuedDate(ZonedDateTime issuedDate) {
			this.issuedDate = issuedDate;
			return this;
		}

		public Builder withExpirationDate(ZonedDateTime expirationDate) {
			this.expirationDate = expirationDate;
			return this;
		}

		public Builder withRefreshCount(int refreshCount) {
			this.refreshCount = refreshCount;
			return this;
		}

		public Builder withRefreshLimit(int refreshLimit) {
			this.refreshLimit = refreshLimit;
			return this;
		}

		public AuthenticationTokenDetails build() {
			return new AuthenticationTokenDetails(id, username, authority, issuedDate, expirationDate, refreshCount,
					refreshLimit);
		}
	}
}
