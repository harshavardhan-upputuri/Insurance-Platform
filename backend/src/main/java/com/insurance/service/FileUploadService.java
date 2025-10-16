package com.insurance.service;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUploadService {

    private static final String UPLOAD_DIR = "src/main/resources/static/images/";

    public static String saveFile(MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename();
        File dest = new File(UPLOAD_DIR + filename);
        file.transferTo(dest);
        return filename; // store only filename in DB
    }
}
