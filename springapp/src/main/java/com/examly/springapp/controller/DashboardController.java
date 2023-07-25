package com.examly.springapp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/dashboard")
public class DashboardController {

	
	@Autowired
	private StudentRepo sturep;
	
	@Autowired
	private AdmissionRepo admrep;
	
	@Autowired
	private CourseRepo coursrep;
	
	@Autowired
	private EnrollmentRepo enrolrep;
	
	@Autowired
	private UserRepo userep;
	
	@GetMapping
	public Map<String,Long> getTotalCount(){
		List<Student> stu = sturep.findAll();
		List<Admission> adm = admrep.findAll();
		List<Course> cours = coursrep.findAll();
		List<Enrollment> enrol = enrolrep.findAll();
		List<User> user = userep.findAll();
		List<Admission> accept = admrep.findByStatus("Accepted");
		List<Admission> reject = admrep.findByStatus("Rejected");
		List<Admission> pending = admrep.findByStatus("pending");

		Map<String,Long> mp = new HashMap<>();
		
		mp.put("coursecount", (long)cours.size());
		mp.put("admissioncount", (long)adm.size());
		mp.put("studentcount", (long)stu.size());
		mp.put("enrollmentcount", (long)enrol.size());
		mp.put("usercount", (long)user.size());
		mp.put("acceptedcount", (long)accept.size());
		mp.put("rejectedcount", (long)reject.size());
		mp.put("pendingcount", (long)pending.size());
		
		return mp;
	}
}
