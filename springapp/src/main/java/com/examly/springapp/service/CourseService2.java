package com.examly.springapp.service;

import com.examly.springapp.model.Course2;
import com.examly.springapp.repository.CourseRepository2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService2 {

    private final CourseRepository2 courseRepository;

    @Autowired
    public CourseService2(CourseRepository2 courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course2 createCourse(Course2 course) {
        return courseRepository.save(course);
    }

    public Course2 updateCourse(int courseId, Course2 course) {
        if (!courseRepository.existsById(courseId)) {
            return null;
        }
        course.setId(courseId);
        return courseRepository.save(course);
    }
}
