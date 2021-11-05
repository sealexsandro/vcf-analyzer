package com.ufrpe.vcfanalyzer.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ufrpe.vcfanalyzer.domain.Variant;

public interface VariantRepositoryCustom {

	Page<Variant> getVariantsByFilds(String chrom, Integer posicao, String reference, String alteration,
			String valueInfoField, Integer idvcf, Pageable pageable);
	
//	Page<Variant> getVariantsByFilds(String queryCustom, Pageable pageable);
}
