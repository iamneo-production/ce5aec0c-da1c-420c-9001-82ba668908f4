package com.examly.springapp.repository;

import com.examly.springapp.model.Course1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository1 extends JpaRepository<Course1, Integer> {
}
