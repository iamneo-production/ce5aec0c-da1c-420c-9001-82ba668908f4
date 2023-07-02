package com.examly.springapp.repository;

import com.examly.springapp.model.Course2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository2 extends JpaRepository<Course2, Integer> {
}
