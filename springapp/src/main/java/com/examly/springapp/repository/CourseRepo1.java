package com.examly.springapp.repository;

import java.util.List;
import com.examly.springapp.model.Course1;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepo1 extends JpaRepository <Course1, Long>{
    public Course1 findByname(String s);
}
