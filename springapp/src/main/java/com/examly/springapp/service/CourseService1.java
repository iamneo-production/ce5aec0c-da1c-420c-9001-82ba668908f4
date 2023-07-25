package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService1 {
    
    @Autowired
    private CourseRepo courserep;

    public String InsertCourse(Course course) {
		courserep.save(course);
		return "Insert SuccessFully";
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
