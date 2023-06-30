package com.examly.springapp.controller;

import java.util.List;
import java.util.Map;

import com.examly.springapp.model.Course;
import com.examly.springapp.service.CourseService;
import com.examly.springapp.repository.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
// @RequestMapping("/api/admin")
public class CourseController {
	
	@Autowired
	private CourseService courser;

	@Autowired
	private CourseRepo courep;

	public CourseController(CourseService courser){
		this.courser=courser;
	}
	
	@GetMapping("/courses")
	public List<Course> getAllCourses() {
		return courep.findAll();

		// return new ResponseEntity<List<Course>>(courser.getAllCourses(),HttpStatus.OK);
	}
	
	@PostMapping("/courses")
	public ResponseEntity<?> createcourse(@RequestBody Course course) {
		return new ResponseEntity<String>(courser.InsertCourse(course),HttpStatus.CREATED);
	}
	
	@PutMapping("/courses/{id}")
	public ResponseEntity<?> updatecoursedata(@PathVariable long id,@RequestBody Course coursedet) {
		Course cors = courser.getCourseById(id);
		cors.setName(coursedet.getName());
		cors.setDescription(coursedet.getDescription());
		cors.setPrerequisites(coursedet.getPrerequisites());
		cors.setCredits(coursedet.getCredits());
		
		return new ResponseEntity<String>(courser.update(cors), HttpStatus.OK);
	}
	
	@GetMapping("/courses/{id}")
	public ResponseEntity<?> getCourseById(@PathVariable long id){
		
		// return cou
		return new ResponseEntity<Course>(courser.getCourseById(id),HttpStatus.OK);
	}
	
	@DeleteMapping("/courses/{id}")
	public ResponseEntity<?> deletecourse(@PathVariable long id) {
		
		return new ResponseEntity<String>(courser.Delete(id),HttpStatus.OK);
	}
}
