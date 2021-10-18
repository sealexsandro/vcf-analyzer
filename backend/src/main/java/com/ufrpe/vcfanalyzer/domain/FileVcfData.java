package com.ufrpe.vcfanalyzer.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "filevcf")
@Inheritance(strategy = InheritanceType.JOINED) // Tabela por subclasse Classe Pai e todas suas filhas
public class FileVcfData implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	// CABEÇALHO DO VCF
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "filevcf_id")
	private List<TagHeader> tagsCabecalho;

	// Corpo do vcf, linhas com todas as variantes
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "filevcf_id")
	private List<Variant> variants;

	public FileVcfData() {
		this.tagsCabecalho = new ArrayList<TagHeader>();
		this.variants = new ArrayList<Variant>();
	}

	public FileVcfData(List<TagHeader> tagsCabecalho, List<Variant> variants) {
		this.tagsCabecalho = tagsCabecalho;
		this.variants = variants;
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

//	public List<Variant> getRowsBodyVcf() {
//		return variants;
//	}

//	public void setRowsBodyVcf(List<Variant> rowsBodyVcf) {
//		this.variants = rowsBodyVcf;
//	}
//	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public List<Variant> getVariants() {
		return variants;
	}

	public void setVariants(List<Variant> variants) {
		this.variants = variants;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FileVcfData other = (FileVcfData) obj;
		return Objects.equals(id, other.id);
	}

}
