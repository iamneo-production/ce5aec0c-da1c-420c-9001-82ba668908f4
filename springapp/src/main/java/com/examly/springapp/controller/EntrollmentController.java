package com.examly.springapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/enrollments")
public class EntrollmentController {
    
    @Autowired
	private EnrollmentRepo enrolrep;
	
	@Autowired
	private EnrollmentService enrolserv;
	
	@Autowired
	private StudentService stuser;
	
	@Autowired
	private CourseService couser;
	
	@GetMapping
	public List<Enrollment> getAllEnrollments(){
		return enrolrep.findAll();
	}
	
	@PostMapping
	public Enrollment createEnrollment(@RequestBody Map<String, String> enroll){
		
		Enrollment enrollment = new Enrollment();
		
		long id=Long.parseLong(enroll.get("studentId"));
		Student stu = stuser.getStudentById(id);
		
		enrollment.setStudent(stu);
		
		Course cou = couser.getCourseByName(enroll.get("coursename"));
		
		enrollment.setCourse(cou);
		
		return enrolrep.save(enrollment);
	}
	
	@GetMapping("/{enrollId}")
	public Enrollment getEnrollmentByID(@PathVariable long enrollId) {
		Enrollment enroll = enrolserv.getEnrolmentById(enrollId);
		
		return enroll;
	}
}
