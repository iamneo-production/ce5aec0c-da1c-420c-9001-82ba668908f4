package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.User;

public interface UserRepo extends JpaRepository<User, Long>{
	public User findByEmailIdAndPassword(String email,String password); 
	public User findByEmailId(String email);
}