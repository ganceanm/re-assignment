package com.ganceanm.assignment.search;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public class SearchCriteria {
	private List<String> key;
	private String operation;
	private List<String> value;
	private Optional<HashMap<String, ?>> optionals;

	public SearchCriteria(List<String> key, String operation, List<String> value, Optional<HashMap<String, ?>> optionals) {
		super();
		this.key = key;
		this.operation = operation;
		this.value = value;
		this.optionals = optionals;
	}

	public List<String> getKey() {
		return key;
	}

	public void setKey(List<String> key) {
		this.key = key;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public List<String> getValue() {
		return value;
	}

	public void setValue(List<String> value) {
		this.value = value;
	}

	public Optional<HashMap<String, ?>> getOptionals() {
		return optionals;
	}

	public void setOptionals(Optional<HashMap<String, ?>> optionals) {
		this.optionals = optionals;
	}
}
