package com.ufrpe.vcfanalyzer.service;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.ufrpe.vcfanalyzer.domain.FileVcfData;
import com.ufrpe.vcfanalyzer.domain.TagHeader;
import com.ufrpe.vcfanalyzer.domain.Variant;
import com.ufrpe.vcfanalyzer.dtos.FileVcfDataDto;
import com.ufrpe.vcfanalyzer.dtos.QualityVariantDTO;
import com.ufrpe.vcfanalyzer.dtos.SumaryStatisticsColumnINFO;
import com.ufrpe.vcfanalyzer.dtos.VariantDto;
import com.ufrpe.vcfanalyzer.repository.FileVcfRepository;
import com.ufrpe.vcfanalyzer.repository.TagHeaderVcfRepository;
import com.ufrpe.vcfanalyzer.repository.VariantRepository;
import com.ufrpe.vcfanalyzer.statistics.InfoStatistics;
import com.ufrpe.vcfanalyzer.statistics.Statistics;
import com.ufrpe.vcfanalyzer.vcfAnalisis.SummaryStatistics;
import com.ufrpe.vcfanalyzer.vcfAnalisis.VcfAnalisis;

@Service
public class VcfStorageService {

	@Autowired
	private FileVcfRepository vcfRepository;

	@Autowired
	private VariantRepository variantRepository;

	@Autowired
	private TagHeaderVcfRepository tagRepository;

	@Autowired
	private VcfAnalisis vcfAnalisis;

	@Autowired
	private SummaryStatistics statistics;

	@Transactional(readOnly = true)
	public Page<VariantDto> findAll(Pageable pageable) {
		// variantRepository.findAll();
		Page<Variant> result = variantRepository.findAll(pageable);
		return result.map(obj -> new VariantDto(obj));
	}

	@Modifying
	@Transactional
	public Page<VariantDto> findByFileId(Integer idvcf, Pageable pageable) {
		System.out.println("ID ----> " + idvcf);
		Page<Variant> result = variantRepository.getVariantsById(idvcf, pageable);
		return result.map(obj -> new VariantDto(obj));
	}

	@Modifying
	@Transactional
	public List<TagHeader> getTagsHeaderInfoByIdVcf(Integer idvcf) {
		System.out.println("ID ----> " + idvcf);
		List<TagHeader> result = tagRepository.getTagsHeaderByIdVcf(idvcf);
		return result;
		// return result;
	}

//	public /* List<VariantDto> */ void findAllVariantsToInfoStatics(Integer idvcf) {
//		List<TagHeader> TagResult = tagRepository.getTagsHeaderByIdVcf(idvcf);
//		List<Variant> variantsResult = variantRepository.findAllVariantsByIdVcfToInfoStatics(idvcf);
////		List<VariantDto> variantDtoResult = variantsResult.stream()
////				.map(obj -> new VariantDto(obj.getReference(), obj.getAlteration(), obj.getInfoCol()))
////				.collect(Collectors.toList());
//		FileVcfDataDto vcfDataDto = new FileVcfDataDto(TagResult, variantsResult);
//		// return result.map(obj -> new VariantDto(obj));
//	}

	public void saveFile(MultipartFile multipart) throws IOException {

		InputStream stream = new BufferedInputStream(multipart.getInputStream());

		List<String> fileVcf = this.vcfAnalisis.readFile(stream);
		FileVcfData vcfData = this.vcfAnalisis.organizeVcf(fileVcf);
		this.vcfRepository.save(vcfData);

		System.out.println("**************Terminou****************");
	}

	public List<QualityVariantDTO> variantQualitySummary() {
		return this.variantRepository.summaryByQuality();
	}

	public Map<String, Integer> getVariantsTypes(Integer idvcf) {
		List<Variant> variantsResult = variantRepository.getVariantsById(idvcf);
		Map<String, Integer> variantsTypes = vcfAnalisis.variantsTypesSummary(variantsResult);
		return variantsTypes;
	}

	public List<Statistics> statisticsFieldInfo(String fieldInfo, Integer idvcf){
		List<Variant> variantsResult = variantRepository.getVariantsById(idvcf);
		List<Statistics> infoStatistics = vcfAnalisis.statisticsFieldInfo(fieldInfo, variantsResult);
		return infoStatistics;
	}

	
	
	
	
	public List<SumaryStatisticsColumnINFO> dpsStatistics() {
		List<Variant> variants = variantRepository.findAll();

		List<String> colInfos = variants.stream().map(obj -> obj.getInfoCol()).collect(Collectors.toList());
		return statistics.dpsStatistics(colInfos);
	}
}
