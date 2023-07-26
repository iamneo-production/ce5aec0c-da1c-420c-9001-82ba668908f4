package com.examly.springapp.service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UserService {
	@Autowired
	private UserRepo userrep;
	
	public boolean loginUser(User admin) {
    	User user = userrep.findByEmailIdAndPassword(
    			admin.getEmailId(), admin.getPassword());
        return user != null;
    }
}