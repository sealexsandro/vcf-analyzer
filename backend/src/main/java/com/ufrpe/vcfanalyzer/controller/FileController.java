package com.ufrpe.vcfanalyzer.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ufrpe.vcfanalyzer.domain.TagHeader;
import com.ufrpe.vcfanalyzer.dtos.QualityVariantDTO;
import com.ufrpe.vcfanalyzer.dtos.SumaryStatisticsColumnINFO;
import com.ufrpe.vcfanalyzer.dtos.VariantDto;
import com.ufrpe.vcfanalyzer.service.VcfStorageService;
import com.ufrpe.vcfanalyzer.statistics.Statistics;

@RestController
@CrossOrigin("*")
public class FileController {

	@Autowired
	private VcfStorageService vcfService;

	@PostMapping("/upload")
	public ResponseEntity<Integer> uploadFile(@RequestParam("file") MultipartFile multipart)
			throws IllegalStateException, IOException {

		Integer fileDataId = vcfService.saveFile(multipart);

//		return ResponseEntity.noContent().build();
		return ResponseEntity.ok(fileDataId);
	}

//	@GetMapping(value = "/files")
//	public ResponseEntity<Page<VariantDto>> findAllVariants(Pageable pageable) {
//		Page<VariantDto> list = vcfService.findAll(pageable);
//		return ResponseEntity.ok(list);
//	}

	@GetMapping(value = "/allvariants", params = "idvcf")
	public ResponseEntity<List<VariantDto>> findAllVariantsByVcfId(@RequestParam Integer idvcf) {
		List<VariantDto> variantsDto = vcfService.findAllVariantsByVcfId(idvcf);
		return ResponseEntity.ok(variantsDto);
	}

	@GetMapping(value = "/filesgetbyid", params = "id")
	public ResponseEntity<Page<VariantDto>> findAllById(Pageable pageable, @RequestParam Integer id) {
		Page<VariantDto> list = vcfService.findByFileId(id, pageable);
		return ResponseEntity.ok(list);
	}

	@GetMapping(value = "/tagsInfobyidvcf", params = "id")
	public ResponseEntity<List<TagHeader>> getTagsHeaderInfoByIdVcf(@RequestParam Integer id) {
		List<TagHeader> list = vcfService.getTagsInfoHeaderByIdVcf(id);
		return ResponseEntity.ok(list);
	}

	@GetMapping(value = "/summaryquality", params = "idvcf")
	public ResponseEntity<List<QualityVariantDTO>> summaryOfVariantQuality(@RequestParam Integer idvcf) {
		List<QualityVariantDTO> list = vcfService.summaryOfVariantQuality(idvcf);
//		System.out.println(list);
		return ResponseEntity.ok(list);
	}

	@GetMapping(value = "/variant-types", params = "id")
	public ResponseEntity<Map<String, Integer>> findVariantTypes(@RequestParam Integer id) {
		Map<String, Integer> variantsTypes = vcfService.findVariantsTypes(id);
		return ResponseEntity.ok(variantsTypes);
	}

	@GetMapping(value = "/info-statistics", params = { "field_info", "id" })
	public ResponseEntity<List<Statistics>> statisticsFieldInfo(@RequestParam String field_info,
			@RequestParam Integer id) {
		List<Statistics> infoStatistics = vcfService.statisticsFieldInfo(field_info, id);
		return ResponseEntity.ok(infoStatistics);
	}

	@GetMapping(value = "/dps-statistics")
	public ResponseEntity<List<SumaryStatisticsColumnINFO>> dpsStatistics() {
		List<SumaryStatisticsColumnINFO> list = vcfService.dpsStatistics();
		return ResponseEntity.ok(list);
	}

	@GetMapping(value = "/variants-by-unique-attributes", params = "id")
	public ResponseEntity<Map<String, List<String>>> getVariantsOfAttributesNotDuplicates(@RequestParam Integer id) {
		Map<String, List<String>> atributesMap = vcfService.getVariantsOfAttributesNotDuplicatesById(id);
		return ResponseEntity.ok(atributesMap);
	}

	@GetMapping(value = "/info-attributes", params = "id")
	public ResponseEntity<Map<String, Set<String>>> getValuesInfoNotDuplicatesById(@RequestParam Integer id)
			throws SQLException, IOException {
		Map<String, Set<String>> atributesInfoColMap = this.vcfService.getValuesInfoNotDuplicatesById(id);
		return ResponseEntity.ok(atributesInfoColMap);
	}

	@GetMapping(value = "/pagevariantsbyfields")
	public ResponseEntity<Page<VariantDto>> findPageVariantsByFields(@RequestParam Map<String, String> filtersMap,
			@RequestParam Integer idvcf, Pageable pageable) {
		Page<VariantDto> variants = vcfService.findPageVariantsByFields(filtersMap, idvcf, pageable);
		return ResponseEntity.ok(variants);
	}

	@GetMapping(value = "/allvariantsbyfields")
	public ResponseEntity<List<VariantDto>> findAllVariantsByFields(@RequestParam Map<String, String> filtersMap,
			@RequestParam Integer idvcf) {
		List<VariantDto> variants = vcfService.findAllVariantsByFields(filtersMap, idvcf);
		return ResponseEntity.ok(variants);
	}
}
