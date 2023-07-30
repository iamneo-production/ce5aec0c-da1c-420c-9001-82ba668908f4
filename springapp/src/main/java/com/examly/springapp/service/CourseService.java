package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.repository.CourseRepo;
import com.examly.springapp.model.Course;
import org.springframework.beans.factory.annotation.Autowired;

public class CourseService{
    @Autowired
    private CourseRepo courserep;

    public List<Course> getAllCourses(){
		return courserep.findAll();
	}
	
	public String InsertCourse(Course course) {
		courserep.save(course);
		return "Insert SuccessFully";
	}
	
	public Course getCourseById(long id) {
		return courserep.findById(id).get();
	}
	
	public String Delete(long id) {
        courserep.deleteById(id);
        return "Course deleted successfully";
    }
	
    public String update(Course cor) {
        courserep.save(cor);
        return "Course Updated successfully";
    }
}
