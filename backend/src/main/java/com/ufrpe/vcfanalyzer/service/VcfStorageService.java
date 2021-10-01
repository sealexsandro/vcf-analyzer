package com.ufrpe.vcfanalyzer.service;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ufrpe.vcfanalyzer.domain.FileVcfData;
import com.ufrpe.vcfanalyzer.domain.Variant;
import com.ufrpe.vcfanalyzer.dtos.QualityVariantDTO;
import com.ufrpe.vcfanalyzer.dtos.SumaryStatisticsColumnINFO;
import com.ufrpe.vcfanalyzer.dtos.VariantDto;
import com.ufrpe.vcfanalyzer.repository.FileVcfRepository;
import com.ufrpe.vcfanalyzer.repository.VariantRepository;
import com.ufrpe.vcfanalyzer.vcfAnalisis.SummaryStatistics;
import com.ufrpe.vcfanalyzer.vcfAnalisis.VcfAnalisis;

@Service
public class VcfStorageService {

	@Autowired
	private FileVcfRepository vcfRepository;

	@Autowired
	private VariantRepository variantRepository;

	@Autowired
	private VcfAnalisis vcfAnalisis;

	@Autowired
	private SummaryStatistics statistics;

	@Transactional(readOnly = true)
	public Page<VariantDto> findAll(Pageable pageable) {
		//variantRepository.findAll();
		Page<Variant> result = variantRepository.findAll(pageable);
		return result.map(obj -> new VariantDto(obj));
	}
	
	@Modifying
	@Transactional
	public Page<VariantDto> findByFileId(Integer idvcf, Pageable pageable) {
		System.out.println("ID ----> "+idvcf);
		Page<Variant> result = variantRepository.getVariantsById(idvcf, pageable);	
//		System.out.println(result.toString());
		return result.map(obj -> new VariantDto(obj));
	//	return result;
	}
	
	
	

	public void saveFile(MultipartFile multipart) throws IOException {

		InputStream stream = new BufferedInputStream(multipart.getInputStream());

		List<String> fileVcf = this.vcfAnalisis.readFile(stream);
		FileVcfData vcfData = this.vcfAnalisis.organizeVcf(fileVcf);
		this.vcfRepository.save(vcfData);

		System.out.println("Terminou****************");
	}

	public List<QualityVariantDTO> variantQualitySummary() {
		return this.variantRepository.summaryByQuality();
	}

	public List<SumaryStatisticsColumnINFO> dpsStatistics() {
		List<Variant> variants = variantRepository.findAll();

		List<String> colInfos = variants.stream().map(obj -> obj.getInfoCol()).collect(Collectors.toList());
		return statistics.dpsStatistics(colInfos);
	}
}
