package com.examly.springapp.service;

import com.examly.springapp.model.Course1;
import com.examly.springapp.repository.CourseRepository1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService1 {

    private final CourseRepository1 courseRepository;

    @Autowired
    public CourseService1(CourseRepository1 courseRepository) {
        this.courseRepository = courseRepository;
    }

    public boolean createCourse(Course1 course) {
        Course1 savedCourse = courseRepository.save(course);
        return savedCourse != null;
    }

    public Course1 updateCourse(int courseId, Course1 course) {
        if (!courseRepository.existsById(courseId)) {
            return null;
        }
        course.setId(courseId);
        return courseRepository.save(course);
    }
}
