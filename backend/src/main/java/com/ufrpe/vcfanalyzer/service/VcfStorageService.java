package com.ufrpe.vcfanalyzer.service;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ufrpe.vcfanalyzer.domain.FileVcfData;
import com.ufrpe.vcfanalyzer.domain.TagHeader;
import com.ufrpe.vcfanalyzer.domain.Variant;
import com.ufrpe.vcfanalyzer.dtos.QualityVariantDTO;
import com.ufrpe.vcfanalyzer.dtos.SumaryStatisticsColumnINFO;
import com.ufrpe.vcfanalyzer.dtos.VariantDto;
import com.ufrpe.vcfanalyzer.repository.FileVcfRepository;
import com.ufrpe.vcfanalyzer.repository.TagHeaderVcfRepository;
import com.ufrpe.vcfanalyzer.repository.VariantRepository;
import com.ufrpe.vcfanalyzer.statistics.Statistics;
import com.ufrpe.vcfanalyzer.utils.VariantToken;
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

	public List<VariantDto> findAllVariantsByVcfId(Integer idvcf) {
		List<Variant> variantsResult = variantRepository.findAllVariantsByVcfId(idvcf);
		List<VariantDto> variantsDto = variantsResult.stream().map(variant -> new VariantDto(variant))
				.collect(Collectors.toList());
		return variantsDto;
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
	public List<TagHeader> getTagsInfoHeaderByIdVcf(Integer idvcf) {
		System.out.println("ID ----> " + idvcf);
		List<TagHeader> result = tagRepository.getTagsInfoHeaderByIdVcf(idvcf);
		return result;
		// return result;
	}

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

	public Map<String, Integer> findVariantsTypes(Integer idvcf) {
		List<Variant> variantsResult = variantRepository.findAllVariantsByVcfId(idvcf);
		Map<String, Integer> variantsTypes = vcfAnalisis.variantsTypesSummary(variantsResult);
		return variantsTypes;
	}

	public List<Statistics> statisticsFieldInfo(String fieldInfo, Integer idvcf) {
		List<Variant> variantsResult = variantRepository.findAllVariantsByVcfId(idvcf);
		List<Statistics> infoStatistics = vcfAnalisis.statisticsFieldInfo(fieldInfo, variantsResult);
		return infoStatistics;
	}

	public List<SumaryStatisticsColumnINFO> dpsStatistics() {
		List<Variant> variants = variantRepository.findAll();

		List<String> colInfos = variants.stream().map(obj -> obj.getInfoCol()).collect(Collectors.toList());
		return statistics.dpsStatistics(colInfos);
	}

	@Transactional
	public Map<String, List<String>> getVariantsOfAttributesNotDuplicatesById(Integer idVcf) {

		Map<String, List<String>> atributesMap = new HashMap<>();

		List<String> chroms = variantRepository.getChromNotDuplicatesByIdVcf(idVcf);
		List<String> references = variantRepository.getReferenceNotDuplicatesByIdVcf(idVcf);
		List<String> alterations = variantRepository.getAlterationNotDuplicatesByIdVcf(idVcf);
		List<String> qualities = variantRepository.getQualityNotDuplicatesByIdVcf(idVcf);
		List<String> filters = variantRepository.getFilterNotDuplicatesByIdVcf(idVcf);

		atributesMap.put(VariantToken.CHROM, chroms);
		atributesMap.put(VariantToken.REF, references);
		atributesMap.put(VariantToken.ALT, alterations);
		atributesMap.put(VariantToken.QUAL, qualities);
		atributesMap.put(VariantToken.FILTER, filters);

		return atributesMap;
	}

	public Map<String, Set<String>> getValuesInfoNotDuplicatesById(Integer idVcf) {

		List<String> infoCol = this.variantRepository.getInfoColById(idVcf);
		Map<String, Set<String>> keyAndValuesOfInfoCol = this.vcfAnalisis.getValuesNoDuplicateInfoCol(infoCol);

		return keyAndValuesOfInfoCol;
	}

	@Transactional
	public Page<VariantDto> findPageVariantsByFields(Map<String, String> filtersMap, Integer idvcf, Pageable pageable) {
		Page<Variant> result = variantRepository.findPageVariantsByFilds(filtersMap, idvcf, pageable);
		return result.map(obj -> new VariantDto(obj));
	}

	@Transactional
	public List<VariantDto> findAllVariantsByFields(Map<String, String> filters, Integer idvcf) {
		List<Variant> variantsResult = variantRepository.findAllVariantsByFields(filters, idvcf);
		List<VariantDto> variantsDto = variantsResult.stream().map(variant -> new VariantDto(variant))
				.collect(Collectors.toList());
		return variantsDto;
	}

}
