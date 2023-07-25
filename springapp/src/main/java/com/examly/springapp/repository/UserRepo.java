package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long>{
	public User findByEmailIdAndPassword(String email,String password); 

}