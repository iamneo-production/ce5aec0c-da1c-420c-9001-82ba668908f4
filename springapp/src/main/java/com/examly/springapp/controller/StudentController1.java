package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Student1;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.StudentRepo1;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.service.StudentService1;

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
	private StudentService1 studentService;
	@Autowired
	private StudentRepo1 studentRepo;
	@Autowired
	private UserRepo userrep;

	public StudentController1(StudentService1 studentService) {
		this.studentService = studentService;
	}

    @GetMapping("/students")
	public ResponseEntity<List<Student1>> getAllStudents() {
		List<Student1> students = studentService.getAllStudents();
		return new ResponseEntity<>(students, HttpStatus.OK);
	}
	@GetMapping("/students/{id}")
	public ResponseEntity<Student1> getStudentById(@PathVariable Long id) {
		Optional<Student1> studentOptional = studentRepo.findById(id);
		if (studentOptional.isPresent()) {
			Student1 student = studentOptional.get();
			return ResponseEntity.ok(student);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
    @PostMapping("/students")
	public ResponseEntity<Boolean> createStudent(@RequestBody Student1 student) {
		studentRepo.save(student);
		User user = new User();
	    
    	user.setEmailId(student.getEmail());
    	user.setPassword(student.getPassword());
    	user.setRole("Student");
    	userrep.save(user);

	return ResponseEntity.ok(true);
	}
    @PostMapping("/students/login")
	public ResponseEntity<Student1> loginUser(@RequestBody Student1 loginStudent) {
		Student1 student = studentService.login(loginStudent.getEmail(), loginStudent.getPassword());
		if (student != null) {
			return new ResponseEntity<>(student, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}

	@PutMapping("/students/{id}")
	public ResponseEntity<Student1> updateStudentById(@PathVariable long id, @RequestBody Student1 updatedStudent) {
		Optional<Student1> studentOp = studentRepo.findById(id);
		if (studentOp.isPresent()) {
			Student1 student = studentOp.get();
			student.setFirstName(updatedStudent.getFirstName());
			student.setLastName(updatedStudent.getLastName());
			student.setEmail(updatedStudent.getEmail());
			student.setPassword(updatedStudent.getPassword());
			student.setAddress(updatedStudent.getAddress());
			student.setPhoneNumber(updatedStudent.getPhoneNumber());
			student.setDob(updatedStudent.getDob());
			student.setGender(updatedStudent.getGender());
			studentRepo.save(student);

			return ResponseEntity.ok(student);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	@DeleteMapping("/students/{id}")
	public ResponseEntity<List<Student1>> deleteStudentById(@PathVariable Long id) {
		Student1 student = studentService.getStudentById(id);
		studentRepo.delete(student);

		return ResponseEntity.ok(studentRepo.findAll());
	}
}
