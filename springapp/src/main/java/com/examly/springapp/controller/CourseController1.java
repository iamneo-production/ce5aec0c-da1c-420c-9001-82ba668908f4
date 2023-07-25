package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

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
@RequestMapping("/ap")
public class CourseController1 {

    @Autowired
	private CourseService courser;
	@Autowired
	private EnrollmentRepo enrollmentRepo;
	@Autowired
	private CourseRepo courep;
	
	public CourseController(CourseService courser) {
		this.courser = courser;
	}

	@GetMapping("/courses")
	public List<Course> getAllCourses() {
		return courep.findAll();
	}

    @PostMapping("/courses")
	public ResponseEntity<Boolean> createcourse(@RequestBody Course course) {
		courep.save(course);

		return ResponseEntity.ok(true);
	}

	@GetMapping("/courses/{id}")
	public ResponseEntity<Course> getCourseById(@PathVariable long id){
		Optional<Course> courseOptional = courep.findById(id);
		if (courseOptional.isPresent()) {
			Course course = courseOptional.get();
			return ResponseEntity.ok(course);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PutMapping("/courses/{id}")
	public ResponseEntity<Course> updatecoursedata(@PathVariable long id,@RequestBody Course coursedet) {
		Course cors = courser.getCourseById(id);
		cors.setName(coursedet.getName());
		cors.setDescription(coursedet.getDescription());
		cors.setPrerequisites(coursedet.getPrerequisites());
		cors.setCredits(coursedet.getCredits());
		
		courep.save(cors);

		return ResponseEntity.ok(cors);
	}


    @DeleteMapping("/courses/{id}")
	public ResponseEntity<?> deleteCourse(@PathVariable long id) {
	    Optional<Course> courseOptional = courep.findById(id);
	    if (courseOptional.isPresent()) {
	        Course course = courseOptional.get();
	        // First, find the enrollments associated with the course
	        List<Enrollment> enrollmentsToDelete = enrollmentRepo.findByCourseId(id);
	        enrollmentRepo.deleteAll(enrollmentsToDelete);
	        // Second, delete the course
	        courep.delete(course);
	        return ResponseEntity.ok().build(); // Return a success response without a body
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
}
