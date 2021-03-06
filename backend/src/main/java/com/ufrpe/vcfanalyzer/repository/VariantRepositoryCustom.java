package com.ufrpe.vcfanalyzer.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ufrpe.vcfanalyzer.domain.VariantFilters;
import com.ufrpe.vcfanalyzer.domain.Variant;

public interface VariantRepositoryCustom {

	Page<Variant> findPageVariantsByFilds(Map<String, String> filtersMap, Integer idvcf, Pageable pageable);

	List<Variant> findAllVariantsByFields(Map<String, String> filtersMap, Integer idvcf);

//	/*
//	 * Buscar os campos de Filtros não duplicados das variantes
//	 */
	VariantFilters findAttributesUniqueOfVariants(Map<String, String> filtersMap, Integer idvcf);
//	
}
