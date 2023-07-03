package main.java.com.examly.springapp.service;

import java.util.List;

import main.java.com.examly.springapp.model.Profile;

public interface ProfileService {
      public abstract List<Profile> getProfile();
      
      public Profile getProfile(long profileId);
      
      public Profile addProfile(Profile profile);
      
      public Profile updateProfile(Profile profile);
      
      public int deleteProfile(long parseLong);
      
}
