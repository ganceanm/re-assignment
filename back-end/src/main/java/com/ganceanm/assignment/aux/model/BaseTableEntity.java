package com.ganceanm.assignment.aux.model;

import java.util.Date;

import javax.persistence.Embeddable;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;

@Embeddable
@MappedSuperclass
public class BaseTableEntity {
	@NotNull
	private Date createdAt;
	
	@NotNull
	private Date modifiedAt;
	
	@NotNull
	private Boolean deleted = false;
	
	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(Date modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}
}
