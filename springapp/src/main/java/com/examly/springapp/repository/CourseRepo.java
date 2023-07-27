package com.examly.springapp.repository;

import com.examly.springapp.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepo extends JpaRepository<Course,Long>{
    
}