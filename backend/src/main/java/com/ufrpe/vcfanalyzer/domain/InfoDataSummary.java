package com.ufrpe.vcfanalyzer.domain;

import java.io.Serializable;

public class InfoDataSummary implements Serializable {

	private static final long serialVersionUID = 1L;

	private String infoName;
	private String variantType;
	private Float infoValue;
	private Integer infoCount;

	public InfoDataSummary() {
	}

	public InfoDataSummary(String infoName, String variantType, Float infoValue, Integer infoCount) {
		this.infoName = infoName;
		this.variantType = variantType;
		this.infoValue = infoValue;
		this.infoCount = infoCount;
	}

	public String getInfoName() {
		return infoName;
	}

	public void setInfoName(String infoName) {
		this.infoName = infoName;
	}

	public String getVariantType() {
		return variantType;
	}

	public void setVariantType(String variantType) {
		this.variantType = variantType;
	}

	public Float getInfoValue() {
		return infoValue;
	}

	public void setInfoValue(Float infoValue) {
		this.infoValue = infoValue;
	}

	public Integer getInfoCount() {
		return infoCount;
	}

	public void setInfoCount(Integer infoCount) {
		this.infoCount = infoCount;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
