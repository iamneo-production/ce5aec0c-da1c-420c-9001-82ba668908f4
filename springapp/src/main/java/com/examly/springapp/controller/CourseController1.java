package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

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
@RequestMapping("/api/admin")
public class CourseController1 {

	@Autowired
	private CourseService courser;

	@Autowired
	private CourseRepo courep;

	public CourseController1(CourseService courser){
		this.courser=courser;
	}
	
	@GetMapping("/courses")
	public List<Course> getAllCourses() {
		return courep.findAll();
	}
	private long cid;
	@PostMapping("/courses")
	public ResponseEntity<Boolean> createcourse(@RequestBody Course course) {
        List<Course> al= courser.getAllCourses();
		cid=al.get(al.size()-1).getId();
		cid++;
		course.setId(cid);
		courep.save(course);

		return ResponseEntity.ok(true);
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
	
	@DeleteMapping("/courses/{id}")
	public ResponseEntity<List<Course>> deletecourse(@PathVariable long id) {
		Optional<Course> courseOptional = courep.findById(id);
		if (courseOptional.isPresent()) {
			Course course = courseOptional.get();
			courep.delete(course);
			List<Course> courses = courep.findAll();
			return ResponseEntity.ok(courses);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
}
