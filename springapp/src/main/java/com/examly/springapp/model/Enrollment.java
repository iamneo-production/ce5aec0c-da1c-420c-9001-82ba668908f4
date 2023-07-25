package com.examly.springapp.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;



@Entity
@Table(name = "Enrollment")
public class Enrollment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long enrollId;
	
	@ManyToOne
	@JoinColumn(name = "student_id")
	private Student student;
	
	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course course;
	
	@Column(name = "Grade")
	private String grade;

	
	
	
	public Enrollment() {
		super();
	}

	public Enrollment(long enrollId, Student student, Course course, String grade) {
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

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	
	
	
}
