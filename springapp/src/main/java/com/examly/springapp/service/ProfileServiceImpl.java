package main.java.com.examly.springapp.service;

import java.util.List;

//import org.hibernate.annotations.DialectOverride.OverridesAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.java.com.examly.springapp.repository.ProfileRepo;
import main.java.com.examly.springapp.model.Profile;

@Service
public class ProfileServiceImpl implements ProfileService {
    @Autowired    
	private ProfileRepo ProfileRepo;
	public ProfileServiceImpl() {
		//hkjguyfg
		//hjfgfg
	}
	@Override
	public List<Profile> getProfile(){
		return ProfileRepo.findAll();
	}
	
	@Override
	public Profile getProfile(long profileId) {
		return ProfileRepo.findById(profileId).get();
	}
	
	@Override
	public Profile addProfile(Profile profile) {
		ProfileRepo.save(profile);
		return profile;
	}
	
	
	@Override
	public Profile updateProfile(Profile profile) {
		ProfileRepo.save(profile);
		return profile;
	}
	
	
	@Override
	public int deleteProfile(long parseLong) {
		ProfileRepo.deleteById(parseLong);
		return 0;
	}
	
}
