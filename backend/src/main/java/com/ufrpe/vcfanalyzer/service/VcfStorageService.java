package com.ufrpe.vcfanalyzer.service;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ufrpe.vcfanalyzer.model.FileVcfData;
import com.ufrpe.vcfanalyzer.model.VariantDto;
import com.ufrpe.vcfanalyzer.repository.FileDBRepository;
import com.ufrpe.vcfanalyzer.vcfAnalisis.VcfAnalisis;

@Service
public class VcfStorageService {
	
	@Autowired
	private VcfAnalisis vcfAnalisis;
	
	@Autowired
	private FileDBRepository repository;
	
	public List<VariantDto> findAll(){
		List<VariantDto> variants = vcfAnalisis.getVcfFileData().getRowsBodyVcf().
							stream().map(obj -> new VariantDto(obj)).collect(Collectors.toList());
		return variants;
	}
	
	public void saveFile (MultipartFile multipart) throws IOException {
//		System.out.println("Chegou Aqui****************");
		
		InputStream stream = new BufferedInputStream(multipart.getInputStream());
		
		List<String> fileVcf = this.vcfAnalisis.readFile(stream);
		FileVcfData vcfData = this.vcfAnalisis.organizeVcf(fileVcf);
		this.repository.save(vcfData);
		
		System.out.println("Terminou****************");
	}

}
