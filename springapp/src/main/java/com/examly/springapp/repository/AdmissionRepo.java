package com.examly.springapp.repository;
import java.util.List;

import com.examly.springapp.model.Admission;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdmissionRepo extends JpaRepository<Admission, Long> {
	List<Admission> findByStudentId(Long studentId);
	public List<Admission> findByStatus(String status);
    // Custom queries or methods can be added here if needed
}