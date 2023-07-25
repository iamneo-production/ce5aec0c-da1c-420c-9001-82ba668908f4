package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin("*")
@RequestMapping("/ap")
public class StudentController1 {

    @Autowired
	private StudentService studentService;
	@Autowired
	private StudentRepo studentRepo;
	@Autowired
	private UserRepo userrep;

	public StudentController(StudentService studentService) {
		this.studentService = studentService;
	}

    @GetMapping("/students")
	public ResponseEntity<List<Student>> getAllStudents() {
		List<Student> students = studentService.getAllStudents();
		return new ResponseEntity<>(students, HttpStatus.OK);
	}

    @PostMapping("/students")
	public ResponseEntity<Boolean> createStudent(@RequestBody Student student) {
		studentRepo.save(student);
		User user = new User();
	    
    	user.setEmailId(student.getEmail());
    	user.setPassword(student.getPassword());
    	user.setRole("Student");
    	userrep.save(user);

	return ResponseEntity.ok(true);
	}
    @PostMapping("/students/login")
	public ResponseEntity<Student> loginUser(@RequestBody Student loginStudent) {
		Student student = studentService.login(loginStudent.getEmail(), loginStudent.getPassword());
		if (student != null) {
			return new ResponseEntity<>(student, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}
}
