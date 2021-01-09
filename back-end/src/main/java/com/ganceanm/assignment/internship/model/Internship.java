package com.ganceanm.assignment.internship.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.ganceanm.assignment.helpers.model.BaseTableEntity;
import com.ganceanm.assignment.user.model.User;

@Entity
@Table(name = "internships")
public class Internship extends BaseTableEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@ManyToOne
	private User createdBy;
	

	@NotNull
	@Enumerated(EnumType.STRING)
	private InternshipCategory category;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private InternshipStatus status;
	
	@Lob
    private String description;
	
	@Column
	private String title;

	@Column
	private Date startingDate;
	
	@Column
	private String duration;
	
	@Column
	private Boolean paid;
	
	@Column
	private String location;
	
	@Column
	private Integer hoursPerDay;
	
	
	
	public Date getStartingDate() {
		return startingDate;
	}

	public void setStartingDate(Date startingDate) {
		this.startingDate = startingDate;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public Boolean getPaid() {
		return paid;
	}

	public void setPaid(Boolean paid) {
		this.paid = paid;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Integer getHoursPerDay() {
		return hoursPerDay;
	}

	public void setHoursPerDay(Integer hoursPerDay) {
		this.hoursPerDay = hoursPerDay;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public InternshipCategory getCategory() {
		return category;
	}

	public void setCategory(InternshipCategory category) {
		this.category = category;
	}

	public InternshipStatus getStatus() {
		return status;
	}

	public void setStatus(InternshipStatus status) {
		this.status = status;
	}


}
