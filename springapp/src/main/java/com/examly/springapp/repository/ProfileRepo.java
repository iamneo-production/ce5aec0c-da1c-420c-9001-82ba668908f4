package main.java.com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import main.java.com.examly.springapp.model.Profile;

public interface ProfileRepo extends JpaRepository<Profile, Long>{

}
