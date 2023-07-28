package com.examly.springapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;

import com.examly.springapp.model.Student1;
import com.examly.springapp.model.Course1;


@Entity
@Table(name = "Enrollment")
public class Enrollment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long enrollId;
	
	@ManyToOne
	@JoinColumn(name = "student_id")
	private Student1 student;
	
	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course1 course;
	
	@Column(name = "Grade")
	private String grade;

	
	
	
	public Enrollment() {
		super();
	}

	public Enrollment(long enrollId, Student1 student, Course1 course, String grade) {
		super();
		this.enrollId = enrollId;
		this.student = student;
		this.course = course;
		this.grade = grade;
	}

	public long getEnrollId() {
		return enrollId;
	}

	public void setEnrollId(long enrollId) {
		this.enrollId = enrollId;
	}

	public Student1 getStudent() {
		return student;
	}

	public void setStudent(Student1 student) {
		this.student = student;
	}

	public Course1 getCourse() {
		return course;
	}

	public void setCourse(Course1 course) {
		this.course = course;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	
	
	
}
