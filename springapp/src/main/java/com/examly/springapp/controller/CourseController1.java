package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Course1;
import com.examly.springapp.model.Enrollment;
import com.examly.springapp.repository.CourseRepo1;
import com.examly.springapp.repository.EnrollmentRepo;
import com.examly.springapp.service.CourseService1;

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
	private CourseService1 courser;
	@Autowired
	private EnrollmentRepo enrollmentRepo;
	@Autowired
	private CourseRepo1 courep;
	
	public CourseController1(CourseService1 courser) {
		this.courser = courser;
	}

	@GetMapping("/courses")
	public List<Course1> getAllCourses() {
		return courep.findAll();
	}

    @PostMapping("/courses")
	public ResponseEntity<Boolean> createcourse(@RequestBody Course1 course) {
		courep.save(course);

		return ResponseEntity.ok(true);
	}

	@GetMapping("/courses/{id}")
	public ResponseEntity<Course1> getCourseById(@PathVariable long id){
		Optional<Course1> courseOptional = courep.findById(id);
		if (courseOptional.isPresent()) {
			Course1 course = courseOptional.get();
			return ResponseEntity.ok(course);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PutMapping("/courses/{id}")
	public ResponseEntity<Course1> updatecoursedata(@PathVariable long id,@RequestBody Course1 coursedet) {
		Course1 cors = courser.getCourseById(id);
		cors.setName(coursedet.getName());
		cors.setDescription(coursedet.getDescription());
		cors.setPrerequisites(coursedet.getPrerequisites());
		cors.setCredits(coursedet.getCredits());
		
		courep.save(cors);

		return ResponseEntity.ok(cors);
	}


    @DeleteMapping("/courses/{id}")
	public ResponseEntity<?> deleteCourse(@PathVariable long id) {
	    Optional<Course1> courseOptional = courep.findById(id);
	    if (courseOptional.isPresent()) {
	        Course1 course = courseOptional.get();
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
