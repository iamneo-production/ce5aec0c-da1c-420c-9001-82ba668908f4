package com.examly.springapp.service;
import org.springframework.beans.factory.annotation.Autowired;
import com.examly.springapp.repository.StudentRepo;

import java.util.List;

import com.examly.springapp.model.Student;
public class StudentService {
    @Autowired
	private StudentRepo studentRepo;
	
	
	 public StudentService(StudentRepo studentRepo) {
		super();
		this.studentRepo = studentRepo;
	}

	public Student insertStudent(Student student) {
	        return studentRepo.save(student);
	    }

	    public List<Student> getAllStudents() {
	        return studentRepo.findAll();
	    }
	    public Student getStudentById(long id) {
			return studentRepo.findById(id).get();
		}
    
}
