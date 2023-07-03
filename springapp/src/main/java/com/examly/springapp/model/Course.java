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