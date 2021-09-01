package com.ufrpe.vcfanalyzer.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "filevcf")
public class FileVcfData {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	// CABEÇALHO DO VCF
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name= "tagheader_key") 
	private List<TagHeader> tagsCabecalho;

	// Corpo do vcf, linhas com todas as variantes
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name= "variant_key") 
	private List<Variant> variants;

	public FileVcfData() {
		this.tagsCabecalho = new ArrayList<TagHeader>();
		this.variants = new ArrayList<Variant>();
	}

	public void addTagCabecalho(TagHeader tagHeader) {
		this.tagsCabecalho.add(tagHeader);
	}

	public void addBodyRow(Variant variant) {
		this.variants.add(variant);
	}

	public List<TagHeader> getTagsCabecalho() {
		return tagsCabecalho;
	}

	public void setTagsCabecalho(List<TagHeader> tagsCabecalho) {
		this.tagsCabecalho = tagsCabecalho;
	}

	public List<Variant> getRowsBodyVcf() {
		return variants;
	}

	public void setRowsBodyVcf(List<Variant> rowsBodyVcf) {
		this.variants = rowsBodyVcf;
	}
	
	public Long getId() {
		return id;
	}

}
