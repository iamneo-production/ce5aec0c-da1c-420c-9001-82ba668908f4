package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Student1;


public interface StudentRepo1 extends JpaRepository<Student1, Long> {
	Student1 findByEmailAndPassword(String email, String password);
	Student1 findByEmail(String email);

}
