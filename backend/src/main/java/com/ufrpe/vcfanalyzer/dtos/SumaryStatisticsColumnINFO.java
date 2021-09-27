package com.ufrpe.vcfanalyzer.dtos;

public class SumaryStatisticsColumnINFO {

	// DP = Profundidade total de leitura no local
	private Integer dpValue; 
	// Numero de DPs de um mesmo valor
	private Integer dpCountSameValue;
	
	
	public SumaryStatisticsColumnINFO(Integer dpValue, Integer dpCountSameValue) {
		this.dpValue = dpValue;
		this.dpCountSameValue = dpCountSameValue;
	}


	public Integer getDpValue() {
		return dpValue;
	}

	public Integer getDpCountSameValue() {
		return dpCountSameValue;
	}
	
}
