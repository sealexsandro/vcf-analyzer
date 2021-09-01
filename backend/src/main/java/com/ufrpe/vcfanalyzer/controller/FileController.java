package com.ufrpe.vcfanalyzer.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ufrpe.vcfanalyzer.model.VariantDto;
import com.ufrpe.vcfanalyzer.service.VcfStorageService;

@RestController
@CrossOrigin("*")
public class FileController {

	@Autowired
	private VcfStorageService vcfService;

	@PostMapping("/upload")
	public ResponseEntity<Void> uploadFile(@RequestParam("file") MultipartFile multipart)
			throws IllegalStateException, IOException {
		
		vcfService.saveFile(multipart);

		return ResponseEntity.noContent().build();
	}

	@GetMapping(value = "/files")
	public ResponseEntity<List<VariantDto>> findAll() {
		List<VariantDto> list = vcfService.findAll();
		return ResponseEntity.ok(list);
	}
}
