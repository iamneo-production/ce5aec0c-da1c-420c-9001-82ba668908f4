package com.examly.springapp.service;

import com.examly.springapp.model.Course;
import com.examly.springapp.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public boolean createCourse(Course course) {
        Course savedCourse = courseRepository.save(course);
        return savedCourse != null;
    }

    public Course updateCourse(int courseId, Course course) {
        if (!courseRepository.existsById(courseId)) {
            return null;
        }
        course.setId(courseId);
        return courseRepository.save(course);
    }
}
