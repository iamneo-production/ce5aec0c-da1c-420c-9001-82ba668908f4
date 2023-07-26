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

	@PutMapping("/students/{id}")
	public ResponseEntity<Student> updateStudentById(@PathVariable long id, @RequestBody Student updatedStudent) {
		Optional<Student> studentOp = studentRepo.findById(id);
		if (studentOp.isPresent()) {
			Student student = studentOp.get();
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
	public ResponseEntity<List<Student>> deleteStudentById(@PathVariable Long id) {
		Student student = studentService.getStudentById(id);
		studentRepo.delete(student);

		return ResponseEntity.ok(studentRepo.findAll());
	}
}
