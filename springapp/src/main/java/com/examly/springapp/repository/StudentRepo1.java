package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo1 extends JpaRepository<Student, Long> {
	Student findByEmailAndPassword(String email, String password);
	Student findByEmail(String email);

}
