package main.java.com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springrest.springrest.entities.Profile;
import com.springrest.springrest.services.ProfileService;

@RestController
public class MyController {
	
	@Autowired
	private ProfileService profileService;
	@GetMapping("/Home")
	public String Home() {
		return "This is Home Page";
	}
	//get the courses
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/profile")
	public List<Profile> getProfile()
	{
		return this.profileService.getProfile();
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/profile/{profileId}")
	public Profile getProfile(@PathVariable String profileId) {
		return this.profileService.getProfile(Long.parseLong(profileId));
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/profile")
	public Profile addProfile(@RequestBody Profile profile) {
		
		return this.profileService.addProfile(profile);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("/profile")
	public Profile updateProfile(@RequestBody Profile profile) {
		
		return this.profileService.updateProfile(profile);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/profile/{profileId}")
	public int deleteProfile(@PathVariable String profileId) {
		
		return this.profileService.deleteProfile(Long.parseLong(profileId));
	}
}
