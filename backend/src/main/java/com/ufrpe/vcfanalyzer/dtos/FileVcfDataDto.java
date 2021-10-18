package com.ufrpe.vcfanalyzer.dtos;

import java.util.List;

import com.ufrpe.vcfanalyzer.domain.TagHeader;
import com.ufrpe.vcfanalyzer.domain.Variant;

public class FileVcfDataDto {

	private List<TagHeader> tagsCabecalho;
	private List<Variant> variants;

	public FileVcfDataDto(List<TagHeader> tagsCabecalho, List<Variant> variants) {
		this.tagsCabecalho = tagsCabecalho;
		this.variants = variants;
	}

	public List<TagHeader> getTagsCabecalho() {
		return tagsCabecalho;
	}

	public List<Variant> getVariants() {
		return variants;
	}

}
