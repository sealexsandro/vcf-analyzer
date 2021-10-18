package com.ufrpe.vcfanalyzer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ufrpe.vcfanalyzer.domain.FileVcfData;
import com.ufrpe.vcfanalyzer.domain.TagHeader;

@Repository
public interface FileVcfRepository extends JpaRepository<FileVcfData, Integer> {
	
	//@Query(value = "select * from filevcf f join tag_header tag on f.id = tag.filevcf_id and f.id = :id", nativeQuery = true)
	@Query(value = "select f.tag_header from filevcf f where f.id = :id ", nativeQuery = true)
	List<TagHeader> getTagHeaderByIdVcf(@Param(value = "id") Integer id);

}
