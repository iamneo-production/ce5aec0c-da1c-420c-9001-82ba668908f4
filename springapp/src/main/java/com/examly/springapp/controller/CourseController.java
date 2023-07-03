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
	}
}
