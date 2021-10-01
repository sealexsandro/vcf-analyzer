package com.ufrpe.vcfanalyzer.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ufrpe.vcfanalyzer.domain.Variant;
import com.ufrpe.vcfanalyzer.dtos.QualityVariantDTO;
import com.ufrpe.vcfanalyzer.dtos.SumaryStatisticsColumnINFO;
import com.ufrpe.vcfanalyzer.dtos.VariantDto;
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
	public ResponseEntity<Page<VariantDto>> findAll(Pageable pageable) {
		Page<VariantDto> list = vcfService.findAll(pageable);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value = "/filesgetbyid", params = "id")
	public ResponseEntity<Page<VariantDto>> findAllById(Pageable pageable, @RequestParam Integer id) {
		Page<VariantDto> list = vcfService.findByFileId(id, pageable);
		return ResponseEntity.ok(list);
	}
	
	
	@GetMapping(value = "/quality-summary")
	public ResponseEntity<List<QualityVariantDTO>> variantQualitySummary() {
		List<QualityVariantDTO> list = vcfService.variantQualitySummary();
//		System.out.println(list);
		return ResponseEntity.ok(list);
	}

	@GetMapping(value = "/dps-statistics")
	public ResponseEntity<List<SumaryStatisticsColumnINFO>> dpsStatistics() {
		List<SumaryStatisticsColumnINFO> list = vcfService.dpsStatistics();
		return ResponseEntity.ok(list);
	}

}
