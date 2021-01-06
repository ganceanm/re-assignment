package com.ganceanm.assignment.user.api.message;

import java.util.List;

public class FindUserMsg {
	private Long page;
	private List<String> text;

	public Long getPage() {
		return page;
	}

	public void setPage(Long page) {
		this.page = page;
	}

	public List<String> getText() {
		return text;
	}

	public void setText(List<String> text) {
		this.text = text;
	}
}
