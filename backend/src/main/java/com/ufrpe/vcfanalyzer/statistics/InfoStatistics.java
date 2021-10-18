package com.ufrpe.vcfanalyzer.statistics;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class InfoStatistics {

	private String idTagName;
//	private Statistics statistics;
//	private List<Map<String, Statistics>> infoStatisticsOfVariantType;
	private List<Statistics> fullStatistics;

	public InfoStatistics(String idTagName, List<Statistics> fullStatistics) {
//		this.statistics = new Statistics(numberListOfFullFieldInfo);
		this.idTagName = idTagName;
		this.fullStatistics = fullStatistics;
	}
	
	public void addInfoSummary(String variantType, List<Float> numberListOfVariantType) {
//		this.infoStatisticsOfVariantType.add(null)
	}

	
//	public class InfoStatisticsOfVariantType {
//
//		String variantType;
//		Statistics statistics;
//
//		public InfoStatisticsOfVariantType(String variantType, List<Float> numberListOfVariantType) {
//			this.variantType = variantType;
//			this.statistics = new Statistics(numberListOfVariantType);
//
//		}
//
//	}

	public String getIdTagName() {
		return idTagName;
	}

	public List<Statistics> getFullStatistics() {
		return fullStatistics;
	}

//	public List<Map<String, Statistics>> getInfoStatisticsOfVariantType() {
//		return infoStatisticsOfVariantType;
//	}
	
	


	
}
