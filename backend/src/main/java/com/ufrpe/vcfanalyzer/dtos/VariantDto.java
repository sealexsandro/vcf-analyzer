package com.ufrpe.vcfanalyzer.dtos;

import java.util.List;

import javax.persistence.Column;

import com.ufrpe.vcfanalyzer.domain.Variant;

//import java.util.Map;

public class VariantDto {

	private String chrom;
	private Integer position;
	private String idVariant;
	private String reference;
	private String alteration;
	private Double quality;
	private String filter;
//	private Map<String, String> infoCol;
//	private String format;
//	private Map<String, String> samples;

	private String sample;

	public VariantDto() {
	}

	public VariantDto(Variant variant) {
		this.chrom = variant.getChrom();
		this.position = variant.getPosition();
		this.idVariant = variant.getIdVariant();
		this.reference = variant.getReference();
		this.alteration = variant.getAlteration();
		this.quality = variant.getQuality();
		this.filter = variant.getFilter();
		this.sample = organizeSample(variant.getSamples());
//		this.infoCol = variant.getInfoCol();
//		this.format = variant.getFormat();
//		this.samples = variant.getSamples();
	}

	public String organizeSample(List<String> samples) {
		String sample = "";
		String vector[];
		int limite = samples.size();
		if(limite > 10) {
			limite = limite - 10;
		}
//		for (int i = 0; i < samples.size(); i++)
		for (int i = 0; i < limite ; i++) {
			
			vector = samples.get(i).split("===");
//			System.out.println(vector[0]);
			sample = sample.concat(vector[0]);
			if (i < samples.size()-1) {
				sample = sample.concat(", ");
			}
		}
		return sample;
	}

	public String getChrom() {
		return chrom;
	}

	public Integer getPosition() {
		return position;
	}

	public String getIdVariant() {
		return idVariant;
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

	public String getSample() {
		return sample;
	}

//	public Map<String, String> getInfoCol() {
//		return infoCol;
//	}
//
//	public String getFormat() {
//		return format;
//	}
//
//	public Map<String, String> getSamples() {
//		return samples;
//	}

}
