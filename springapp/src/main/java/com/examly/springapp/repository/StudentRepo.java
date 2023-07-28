package com.examly.springapp.repository;

import com.examly.springapp.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {
    // You can add custom repository methods here if needed
    Student findByEmailAndPassword(String email, String password);
}