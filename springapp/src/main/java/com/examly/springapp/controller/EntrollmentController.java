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

	@PutMapping("{id}")
	public ResponseEntity<Enrollment> updateEnrollment(@PathVariable long id, @RequestBody long enroldet) {
	    Enrollment enroll = enrolserv.getEnrolmentById(id);

	    if (enroll == null) {
	        return ResponseEntity.notFound().build();
	    }

//	    long courseId = Long.parseLong(enroldet.get("courseId")); // Assuming the key for course ID is "courseId" in the request body
	    Course cour = couser.getCourseById(enroldet); // Assuming you have a method to retrieve the Course by its ID

	    if (cour == null) {
	        return ResponseEntity.badRequest().body(enroll);
	    }

	    enroll.setCourse(cour);

	    enrolrep.save(enroll);

	    return ResponseEntity.ok(enroll);
	}

	@PutMapping("/grade/{id}")
	public ResponseEntity<Enrollment> updateGrade(@PathVariable long id,@RequestBody String grade){
		Enrollment enroll = enrolserv.getEnrolmentById(id);
		
		if (enroll == null) {
	        return ResponseEntity.notFound().build();
	    }
		enroll.setGrade(grade.substring(1, 2));
		
		enrolrep.save(enroll);
		
		return ResponseEntity.ok(enroll);
	}
	    @DeleteMapping("/{enrollId}")
	    public ResponseEntity<String> deleteEnrollment(@PathVariable long enrollId) {
	        Enrollment enroll = enrolserv.getEnrolmentById(enrollId);

	        if (enroll == null) {
	            return ResponseEntity.notFound().build();
	        }

	        enrolrep.delete(enroll);

	        return ResponseEntity.ok("Enrollment with ID: " + enrollId + " has been deleted successfully.");
	    }
}
