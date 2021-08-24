package com.ufrpe.vcfanalyzer.controller;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@Controller
@CrossOrigin("http://localhost:3000")
public class UploadFileController {
	
	@PostMapping("/upload")
	public ResponseEntity<Void> uploadFile(@RequestParam("file") MultipartFile multipart) throws IllegalStateException, IOException{	
	
		InputStream stream = new BufferedInputStream(multipart.getInputStream());


        if (stream != null) {
            StringBuilder sb = new StringBuilder();
            String line;

            try {
                BufferedReader reader = new BufferedReader(new InputStreamReader(stream, "UTF-8"));
                int i = 0;
                while ((line = reader.readLine()) != null) {
                	//System.out.println(line);
                	i += 1;
                	System.out.println("Contador: " + i);
                    sb.append(line).append("\n");
                }
            } finally {
            	stream.close();
            	System.out.println("terminou");
            }

        }

		return ResponseEntity.noContent().build();		
	}
}
