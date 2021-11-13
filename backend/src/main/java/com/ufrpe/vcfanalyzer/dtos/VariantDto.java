package com.ufrpe.vcfanalyzer.dtos;

import java.util.HashMap;
import java.util.Map;

import com.ufrpe.vcfanalyzer.domain.Variant;

public class VariantDto {

	private String chrom;
	private Integer position;
	private String idVariant;
	private String reference;
	private String alteration;
	private Double quality;
	private String filter;
	private Map<String, String> infoCol;
	private String format;
//	private Map<String, String> samples;

	private String samples;

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
		this.samples = organizeSample(variant.getSamples());
		this.infoCol = organizeColunaInfo(variant.getInfoCol());
		this.format = variant.getFormat();
//		this.samples = variant.getSamples();
	}

	public VariantDto(String chrom, Integer position, String idVariant, String reference, String alteration,
			Double quality, String filter) {
		this.chrom = chrom;
		this.position = position;
		this.idVariant = idVariant;
		this.reference = reference;
		this.alteration = alteration;
		this.quality = quality;
		this.filter = filter;
	}

	public VariantDto(String reference, String alteration, String infoCol) {
		this.reference = reference;
		this.alteration = alteration;
		this.infoCol = organizeColunaInfo(infoCol);
	}

	public String organizeSample(String samples) {
		String sample = "";
		String vector[];
		String vectorSamples[] = samples.split("&&");

//		System.out.println(samples.split("$$"));
		for (int i = 0; i < vectorSamples.length; i++) {

			vector = vectorSamples[i].split("===");
//			System.out.println(vectorSamples[i]);
//			System.out.println();

			sample = sample.concat(vector[0]);
			if (i < vectorSamples.length - 1) {
				sample = sample.concat(", ");
			}
		}
		return sample;
	}

	public Map<String, String> organizeColunaInfo(String dataInfoCol) {
		// Key = ID ---- Valor = Valor do ID
		Map<String, String> infoColMap = new HashMap<String, String>();

		String vectorInfo[] = dataInfoCol.split(";");
		String keyAndValueColInfo[];

		for (int i = 0; i < vectorInfo.length; i++) {
			keyAndValueColInfo = vectorInfo[i].split("=");
			infoColMap.put(keyAndValueColInfo[0], keyAndValueColInfo[1]);
		}

		return infoColMap;
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

	public String getSamples() {
		return samples;
	}

	public Map<String, String> getInfoCol() {
		return infoCol;
	}
//
	public String getFormat() {
		return format;
	}
//
//	public Map<String, String> getSamples() {
//		return samples;
//	}

}
