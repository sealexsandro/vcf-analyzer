package com.ufrpe.vcfanalyzer.statistics;

import java.util.List;

public class InfoStatistics {

	private String idTagName;
	private List<Statistics> fullStatistics;

	public InfoStatistics(String idTagName, List<Statistics> fullStatistics) {
		this.idTagName = idTagName;
		this.fullStatistics = fullStatistics;
	}
	
	public String getIdTagName() {
		return idTagName;
	}

	public List<Statistics> getFullStatistics() {
		return fullStatistics;
	}

}
