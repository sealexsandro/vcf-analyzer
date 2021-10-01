package com.ufrpe.vcfanalyzer.dtos;

import java.util.List;

import com.ufrpe.vcfanalyzer.domain.TagHeader;

public class FileVcfDataDto {
	
	private List<TagHeader> tagsCabecalho;

	public FileVcfDataDto(List<TagHeader> tagsCabecalho) {
		this.tagsCabecalho = tagsCabecalho;
	}
	
	

}
