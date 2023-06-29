package com.examly.springapp.service;

import com.examly.springapp.model.Student;
import com.examly.springapp.repository.StudentRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private final StudentRepo studentRepo;

    @Autowired
    public StudentService(StudentRepo studentRepo) {
        this.studentRepo = studentRepo;
    }

    public Student insertStudent(Student student) {
        return studentRepo.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepo.findById(id);
    }

    public Student updateStudentById(Long id, Student updatedStudent) {
        Optional<Student> optionalStudent = studentRepo.findById(id);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            student.setFirstName(updatedStudent.getFirstName());
            student.setLastName(updatedStudent.getLastName());
            student.setEmail(updatedStudent.getEmail());
            student.setPassword(updatedStudent.getPassword());
            student.setAddress(updatedStudent.getAddress());
            student.setPhoneNumber(updatedStudent.getPhoneNumber());
            return studentRepo.save(student);
        }
        return null;
    }

    public boolean deleteStudentById(Long id) {
        if (studentRepo.existsById(id)) {
            studentRepo.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean loginUser(Student student) {
        Student user = studentRepo.findByEmailAndPassword(
                student.getEmail(), student.getPassword());
        return user != null;
    }
}
