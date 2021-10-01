package com.ufrpe.vcfanalyzer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ufrpe.vcfanalyzer.domain.FileVcfData;

@Repository
public interface FileVcfRepository extends JpaRepository<FileVcfData, Integer> {

}
