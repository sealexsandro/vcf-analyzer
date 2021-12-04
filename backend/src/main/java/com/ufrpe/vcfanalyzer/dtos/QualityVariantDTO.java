package com.ufrpe.vcfanalyzer.dtos;

import java.io.Serializable;

public class QualityVariantDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Double quality;
	private Integer qualityCount;

	public QualityVariantDTO() {
		// TODO Auto-generated constructor stub
	}

	public QualityVariantDTO(Double quality, Integer qualityCount) {
		this.quality = quality;
		this.qualityCount = qualityCount;
	}

	public Double getQuality() {
		return quality;
	}

	public void setQuality(Double quality) {
		this.quality = quality;
	}

	public Integer getQualityCount() {
		return qualityCount;
	}

	public void setQualityCount(Integer qualityCount) {
		this.qualityCount = qualityCount;
	}

}
