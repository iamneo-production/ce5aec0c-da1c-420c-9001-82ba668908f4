package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentService {

	@Autowired
	private EnrollmentRepo enrolrep;
	
	public Enrollment getEnrolmentById(long id) {
		return enrolrep.findById(id).get();
	}
	
}
