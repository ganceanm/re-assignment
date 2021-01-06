package com.ganceanm.assignment.room.model;

import java.math.BigDecimal;

public enum RoomType {
	Three(new BigDecimal(330), 3), Four(new BigDecimal(310), 4);

	private BigDecimal pricePerMonth;
	private Integer maxInhabitants;

	private RoomType(BigDecimal pricePerMonth, Integer maxInhabitants) {
		this.pricePerMonth = pricePerMonth;
		this.maxInhabitants = maxInhabitants;
	}

	public BigDecimal getPricePerMonth() {
		return pricePerMonth;
	}

	public void setPricePerMonth(BigDecimal pricePerMonth) {
		this.pricePerMonth = pricePerMonth;
	}

	public Integer getMaxInhabitants() {
		return maxInhabitants;
	}

	public void setMaxInhabitants(Integer maxInhabitants) {
		this.maxInhabitants = maxInhabitants;
	}

}
