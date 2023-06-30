package com.examly.springapp.controller;

import com.examly.springapp.model.Course1;
import com.examly.springapp.service.CourseService1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/courses")
public class CourseController1 {

    private final CourseService1 courseService;

    @Autowired
    public CourseController1(CourseService1 courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<Boolean> createCourse(@RequestBody Course1 course) {
        boolean created = courseService.createCourse(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course1> updateCourse(@PathVariable("id") int courseId, @RequestBody Course1 course) {
        Course1 updatedCourse = courseService.updateCourse(courseId, course);
        if (updatedCourse == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(updatedCourse);
    }
}
