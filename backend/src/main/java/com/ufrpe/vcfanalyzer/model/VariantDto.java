package com.ufrpe.vcfanalyzer.model;

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
//		this.infoCol = variant.getInfoCol();
//		this.format = variant.getFormat();
//		this.samples = variant.getSamples();
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
