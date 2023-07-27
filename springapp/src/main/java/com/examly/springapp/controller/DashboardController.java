package com.examly.springapp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.examly.springapp.model.Admission;
import com.examly.springapp.model.Course1;
import com.examly.springapp.model.Enrollment;
import com.examly.springapp.model.Student1;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.AdmissionRepo;
import com.examly.springapp.repository.CourseRepo1;
import com.examly.springapp.repository.EnrollmentRepo;
import com.examly.springapp.repository.StudentRepo1;
import com.examly.springapp.repository.UserRepo;

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
	private StudentRepo1 sturep;
	
	@Autowired
	private AdmissionRepo admrep;
	
	@Autowired
	private CourseRepo1 coursrep;
	
	@Autowired
	private EnrollmentRepo enrolrep;
	
	@Autowired
	private UserRepo userep;
	
	@GetMapping
	public Map<String,Long> getTotalCount(){
		List<Student1> stu = sturep.findAll();
		List<Admission> adm = admrep.findAll();
		List<Course1> cours = coursrep.findAll();
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
