package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Course1;
import com.examly.springapp.repository.CourseRepo1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService1 {
    
    @Autowired
    private CourseRepo1 courserep;

    public List<Course1> getAllCourses(){
		return courserep.findAll();
	}

    public Course1 getCourseById(long id) {
		return courserep.findById(id).get();
	}

    public Course1 getCourseByName(String name) {
		return courserep.findByname(name);
	}

    public String InsertCourse(Course1 course) {
		courserep.save(course);
		return "Insert SuccessFully";
	}

    public String Delete(long id) {
        courserep.deleteById(id);
        return "Course deleted successfully";
    }

    public String update(Course1 cor) {
        courserep.save(cor);
        return "Course Updated successfully";
    }
}
