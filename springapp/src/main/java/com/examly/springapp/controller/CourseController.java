package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Course;

import com.examly.springapp.repository.CourseRepo;
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
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseRepo courep;

    @GetMapping
    public List<Course> getAllCourses() {
        return courep.findAll();
    }

    @PostMapping
    public ResponseEntity<Boolean> createcourse(@RequestBody Course course) {
        courep.save(course);

        return ResponseEntity.ok(true);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourseData(@PathVariable long id, @RequestBody Course courseDetails) {
        Optional<Course> courseOptional = courep.findById(id);
        if (courseOptional.isPresent()) {
            Course course = courseOptional.get();
            course.setName(courseDetails.getName());
            course.setDescription(courseDetails.getDescription());
            course.setPrerequisites(courseDetails.getPrerequisites());
            course.setCredits(courseDetails.getCredits());
            courep.save(course);
            return ResponseEntity.ok(course);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable long id) {
        Optional<Course> courseOptional = courep.findById(id);
        if (courseOptional.isPresent()) {
            Course course = courseOptional.get();
            return ResponseEntity.ok(course);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
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