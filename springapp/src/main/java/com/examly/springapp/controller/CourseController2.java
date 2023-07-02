package com.examly.springapp.controller;

import com.examly.springapp.model.Course2;
import com.examly.springapp.service.CourseService2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/courses")
public class CourseController2 {

    private final CourseService2 courseService;

    @Autowired
    public CourseController2(CourseService2 courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<Course2> createCourse(@RequestBody Course2 course) {
        Course2 createdCourse = courseService.createCourse(course);
        if (createdCourse == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCourse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course2> updateCourse(@PathVariable("id") int courseId, @RequestBody Course2 course) {
        Course2 updatedCourse = courseService.updateCourse(courseId, course);
        if (updatedCourse == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(updatedCourse);
    }
}
