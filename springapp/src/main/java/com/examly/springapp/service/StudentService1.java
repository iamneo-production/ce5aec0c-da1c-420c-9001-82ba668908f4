package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService1 {
    @Autowired
	private StudentRepo studentRepo;
	
	
	 public StudentService(StudentRepo studentRepo) {
		this.studentRepo = studentRepo;
	}
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }
    public Student login(String email,String password) {
        Student student = studentRepo.findByEmail(email);
        if(student != null && student.getPassword().equals(password))
        {
            return student;
        }
        else {
        return null;}
    }
}
