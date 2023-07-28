package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Enrollment;

public interface EnrollmentRepo extends JpaRepository<Enrollment, Long>{
	List<Enrollment> findByStudentId(Long studentId);
	List<Enrollment> findByCourseId(Long id);
}
