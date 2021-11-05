package com.ufrpe.vcfanalyzer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ufrpe.vcfanalyzer.domain.TagHeader;

@Repository
public interface TagHeaderVcfRepository extends JpaRepository<TagHeader, Integer> {

	@Query(value = "select * from tag_header tag where tag.filevcf_id = :id and tag.name_tag like '%INFO' order by tag.id_tag asc", nativeQuery = true)
	List<TagHeader> getTagsInfoHeaderByIdVcf(@Param(value = "id") Integer id);
}
