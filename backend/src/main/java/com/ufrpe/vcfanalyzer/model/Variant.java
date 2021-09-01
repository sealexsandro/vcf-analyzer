package com.ufrpe.vcfanalyzer.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Variant {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String chrom;
	private Integer position;
	private String id_variant;
	private String reference;
	private String alteration;
	private Double quality;
	private String filter;
	private String format;
	// Desisti dessa forma, pois o mapeamento pelo hibernate fica complicado
//	private Map<String, String> infoCol; 
	
	@ElementCollection
	@CollectionTable(name = "InfoColumn")
	@Column(name = "info", columnDefinition="text")
	private List<String> infoCol;
	
	@ElementCollection
	@CollectionTable(name = "SampleColumn")
	@Column(name = "sample", columnDefinition="text")
	private List<String> samples;

	public Variant() {
		// TODO Auto-generated constructor stub
	}

	public Variant(String chrom, Integer position, String id_variant, String reference, String alteration, double quality,
			String filter, List<String> infoCol, String format, List<String> samples) {
		this.chrom = chrom;
		this.position = position;
		this.id_variant = id_variant;
		this.reference = reference;
		this.alteration = alteration;
		this.quality = quality;
		this.filter = filter;
		this.infoCol = infoCol;
		this.format = format;
		this.samples = samples;
	}
	
	public Long getId() {
		return id;
	}

	public String getChrom() {
		return chrom;
	}

	public Integer getPosition() {
		return position;
	}

	public String getIdVariant() {
		return id_variant;
	}

	public String getReference() {
		return reference;
	}

	public String getAlteration() {
		return alteration;
	}

	public Double getQuality() {
		return quality;
	}

	public String getFilter() {
		return filter;
	}

//	public Map<String, String> getInfoCol() {
//		return infoCol;
//	}
	

	public String getFormat() {
		return format;
	}

	public List<String> getInfoCol() {
		return infoCol;
	}

	public List<String> getSamples() {
		return samples;
	}

//	public Map<String, String> getSamples() {
//		return samples;
//	}
	

}
