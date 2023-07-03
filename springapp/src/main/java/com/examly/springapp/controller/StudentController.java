package com.examly.springapp.controller;

import com.examly.springapp.model.Student;
import com.examly.springapp.repository.StudentRepo;
import com.examly.springapp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.ResponseCache;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
// @RequestMapping("/students")
public class StudentController {
    private StudentService studentService;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> studentOptional = studentRepo.findById(id);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}