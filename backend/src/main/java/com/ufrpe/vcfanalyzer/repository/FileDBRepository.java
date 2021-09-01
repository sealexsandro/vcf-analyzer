package com.ufrpe.vcfanalyzer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ufrpe.vcfanalyzer.model.FileVcfData;

@Repository
public interface FileDBRepository extends JpaRepository<FileVcfData, Long> {

}
