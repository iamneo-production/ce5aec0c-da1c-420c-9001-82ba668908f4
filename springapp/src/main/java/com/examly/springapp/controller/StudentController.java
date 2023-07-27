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

    @PostMapping("/students")
    public ResponseEntity<Boolean> createStudent(@RequestBody Student student) {
        studentRepo.save(student);
        return ResponseEntity.ok(true);
    }

    @PutMapping("/students/{id}")
	public ResponseEntity<Student> updateStudentById(@PathVariable long id,@RequestBody Student updatedStudent) {
		Optional<Student> studentOp = studentRepo.findById(id);
        if(studentOp.isPresent()){ 
            Student student = studentOp.get();
		student.setFirstName(updatedStudent.getFirstName());
            student.setLastName(updatedStudent.getLastName());
            student.setEmail(updatedStudent.getEmail());
            student.setPassword(updatedStudent.getPassword());
            student.setAddress(updatedStudent.getAddress());
            student.setPhoneNumber(updatedStudent.getPhoneNumber());
            studentRepo.save(student);

		return ResponseEntity.ok(student);
        }
        else{
            return ResponseEntity.notFound().build();
        }
	}

    @DeleteMapping("/students/{id}")
    public ResponseEntity<List<Student>> deleteStudentById(@PathVariable Long id) {
        Student student = studentService.getStudentById(id);
        studentRepo.delete(student);

        return ResponseEntity.ok(studentRepo.findAll());
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Student student) {
        boolean isAuthenticated = studentService.loginUser(student);
        if (isAuthenticated) {
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid email or Password", HttpStatus.UNAUTHORIZED);
        }
    }

}