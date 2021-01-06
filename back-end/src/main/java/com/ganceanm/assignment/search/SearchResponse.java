package com.ganceanm.assignment.search;

import java.util.List;

public class SearchResponse {
	private int page;
	private int pageCount;
	private long total;
	private List<?> values;

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public List<?> getValues() {
		return values;
	}

	public void setValues(List<?> userList) {
		this.values = userList;
	}
}
