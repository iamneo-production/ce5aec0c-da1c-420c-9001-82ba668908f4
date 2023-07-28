package com.examly.springapp.service;
import java.util.List;

import com.examly.springapp.model.Admission;
import com.examly.springapp.repository.AdmissionRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdmissionService {
    @Autowired
    private final AdmissionRepo admissionRepository;

  
    public AdmissionService(AdmissionRepo admissionRepository) {
        this.admissionRepository = admissionRepository;
    }

    public Admission createAdmission(Admission admission) {
        return admissionRepository.save(admission);
    }
    public Admission getadmissionById(long id) {
		return admissionRepository.findById(id).get();
	}
    public List<Admission> getAlladmissions() {
        return admissionRepository.findAll();
    }
    
    public Admission updateAdmissionById(Long admId, Admission updatedAdmission) {
        // Step 4.1: Find the existing admission in the database
        Admission existingAdmission = admissionRepository.findById(admId)
                .orElseThrow(() -> new RuntimeException("Admission not found with id: " + admId));

        // Step 4.2: Update properties of existing admission with the new values from the updatedAdmission
        existingAdmission.setStatus(updatedAdmission.getStatus());
        existingAdmission.setRequiredDocuments(updatedAdmission.getRequiredDocuments());
        existingAdmission.setFeedback(updatedAdmission.getFeedback());
        // Update other properties similarly as above

        // Step 4.3: Save the updated admission in the database
        return admissionRepository.save(existingAdmission);
    }
    
    public void deleteAdmissionById(Long id) {
    	admissionRepository.deleteById(id);
    }
}
