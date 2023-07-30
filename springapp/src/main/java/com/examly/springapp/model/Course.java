package com.examly.springapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Courses")
public class Course {
    @Id
	// @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "Course_Name")
	private String name;
	
	@Column(name = "Description")
	private String description;
	
	@Column(name = "Prerequisites")
	private String prerequisites;
	
	@Column(name = "Credits")
	private String credits;


	public Course() {
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPrerequisites() {
		return prerequisites;
	}

	public void setPrerequisites(String prerequisites) {
		this.prerequisites = prerequisites;
	}

	public String getCredits() {
		return credits;
	}

	public void setCredits(String credits) {
		this.credits = credits;
	}

	public Course(long id, String name, String description, String prerequisites, String credits) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.prerequisites = prerequisites;
		this.credits = credits;
	}
	
}