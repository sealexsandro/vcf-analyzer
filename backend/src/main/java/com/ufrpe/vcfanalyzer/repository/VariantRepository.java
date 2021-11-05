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

@Repository
public interface VariantRepository extends JpaRepository<Variant, Integer>, VariantRepositoryCustom{

	@Query("SELECT new com.ufrpe.vcfanalyzer.dtos.QualityVariantDTO(obj.quality, CAST (COUNT(obj.quality) AS integer))"
			+ " FROM Variant AS obj GROUP BY obj.quality")
	List<QualityVariantDTO> summaryByQuality();

	@Query(value = "SELECT * FROM variant v where v.filevcf_id = :id", nativeQuery = true)
	Page<Variant> getVariantsById(@Param(value = "id") Integer id, Pageable pageable);

//	@Query("SELECT new com.ufrpe.vcfanalyzer.dtos.VariantDto(obj.reference, obj.alteration, obj.infoCol)"
//			+ " FROM Variant AS obj")
//	List<VariantDto> findAllVariantsByIdVcfToInfoStatics();

	@Query(value = "SELECT * FROM variant v where v.filevcf_id = :id", nativeQuery = true)
	List<Variant> getVariantsById(@Param(value = "id") Integer id);

//	@Query(value = "select distinct v.chrom, v.position, v.id_variant, v.reference, v.alteration, v.quality, v.filter from variant v where v.filevcf_id = :id", nativeQuery = true)
//	List<Variant> getVariantsOfAttributesNotDuplicatesById(@Param(value = "id") Integer id);
	
	@Query(value = "select distinct v.chrom  from variant v where v.filevcf_id = :id", nativeQuery = true)
	List<String> getChromNotDuplicatesByIdVcf(@Param(value = "id") Integer id);
	
	@Query(value = "select distinct v.reference  from variant v where v.filevcf_id = :id", nativeQuery = true)
	List<String> getReferenceNotDuplicatesByIdVcf(@Param(value = "id") Integer id);
	
	@Query(value = "select distinct v.alteration  from variant v where v.filevcf_id = :id", nativeQuery = true)
	List<String> getAlterationNotDuplicatesByIdVcf(@Param(value = "id") Integer id);
	
	@Query(value = "select distinct v.quality  from variant v where v.filevcf_id = :id", nativeQuery = true)
	List<String> getQualityNotDuplicatesByIdVcf(@Param(value = "id") Integer id);
	
	@Query(value = "select distinct v.filter  from variant v where v.filevcf_id = :id", nativeQuery = true)
	List<String> getFilterNotDuplicatesByIdVcf(@Param(value = "id") Integer id);
	
	
	@Query(value = "SELECT v.info_col FROM variant v where v.filevcf_id = :id", nativeQuery = true)
	List<String> getInfoColById(@Param(value = "id") Integer id);
	
}
