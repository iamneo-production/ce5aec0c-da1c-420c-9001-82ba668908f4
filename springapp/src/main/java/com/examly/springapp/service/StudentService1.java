package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Student1;
import com.examly.springapp.repository.StudentRepo1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService1 {
    @Autowired
	private StudentRepo1 studentRepo;
	
	 public StudentService1(StudentRepo1 studentRepo) {
		this.studentRepo = studentRepo;
	}
    public List<Student1> getAllStudents() {
        return studentRepo.findAll();
    }
    public Student1 login(String email,String password) {
        Student1 student = studentRepo.findByEmail(email);
        if(student != null && student.getPassword().equals(password))
        {
            return student;
        }
        else {
        return null;}
    }
    public Student1 getStudentById(long id) {
        return studentRepo.findById(id).get();
    }
    public Student1 insertStudent(Student1 student) {
        return studentRepo.save(student);
    }
    
}
