package com.examly.springapp.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class MediaFileService {

    private final Cloudinary cloudinary;

    public MediaFileService() {
    	cloudinary = new Cloudinary(ObjectUtils.asMap(
    			  "cloud_name", "demckz56k",
    			  "api_key", "289139676889144",
    			  "api_secret", "3DxyY5y_jlOrijttXdaLff2ZZ90"));
    }

    public String saveMediaFile(MultipartFile file) throws IOException {
        // Check if the file is null or has a valid content type
        if (file == null || file.getContentType() == null) {
            // Handle the case where the file is null or the content type is missing
            throw new IllegalArgumentException("Invalid file or missing content type.");
        }

        // Get the original filename
        String originalFilename = file.getOriginalFilename();

        // Check if the file is an image
        String contentType = file.getContentType();
        boolean isImage = contentType != null && contentType.startsWith("image");

        // If the file is not an image, throw an exception
        if (!isImage) {
            throw new IllegalArgumentException("Invalid file type. Only image files are allowed.");
        }

        // Upload the image file to Cloudinary with the appropriate resource type
        return cloudinary.uploader()
                .upload(file.getBytes(), ObjectUtils.asMap("public_id", originalFilename))
                .get("url").toString();

        // Return the public URL of the uploaded image file
     
    }

}