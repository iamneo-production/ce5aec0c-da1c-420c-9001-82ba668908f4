package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepo1 extends JpaRepository <Course, Long>{
    public Course findByname(String s);
}
