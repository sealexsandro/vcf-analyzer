package com.ufrpe.vcfanalyzer.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ufrpe.vcfanalyzer.domain.Variant;
import com.ufrpe.vcfanalyzer.dtos.QualityVariantDTO;
import com.ufrpe.vcfanalyzer.dtos.VariantDto;

@Repository
public interface VariantRepository extends JpaRepository<Variant, Integer> {

	@Query("SELECT new com.ufrpe.vcfanalyzer.dtos.QualityVariantDTO(obj.quality, CAST (COUNT(obj.quality) AS integer))"
			+ " FROM Variant AS obj GROUP BY obj.quality")
	List<QualityVariantDTO> summaryByQuality();
	
	@Query( value = "SELECT * FROM variant v where v.filevcf_id = :id", nativeQuery = true)
	Page<Variant> getVariantsById(@Param(value = "id") Integer id, Pageable pageable);
	
//	@Query("SELECT new com.ufrpe.vcfanalyzer.dtos.VariantDto(obj.reference, obj.alteration, obj.infoCol)"
//			+ " FROM Variant AS obj")
//	List<VariantDto> findAllVariantsByIdVcfToInfoStatics();

	@Query( value = "SELECT * FROM variant v where v.filevcf_id = :id", nativeQuery = true)
	List<Variant> getVariantsById(@Param(value = "id") Integer id);	
}
