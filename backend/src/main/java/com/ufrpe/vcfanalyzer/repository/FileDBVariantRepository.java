package com.ufrpe.vcfanalyzer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ufrpe.vcfanalyzer.domain.Variant;
import com.ufrpe.vcfanalyzer.dtos.QualityVariantDTO;

@Repository
public interface FileDBVariantRepository extends JpaRepository<Variant, Integer> {

	@Query("SELECT new com.ufrpe.vcfanalyzer.dtos.QualityVariantDTO(obj.quality, CAST (COUNT(obj.quality) AS integer))"
			+ " FROM Variant AS obj GROUP BY obj.quality")
	List<QualityVariantDTO> summaryByQuality();
	
}
