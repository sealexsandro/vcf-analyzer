package com.ufrpe.vcfanalyzer.statistics;

import java.util.List;

import com.ufrpe.vcfanalyzer.statistics.charts.BoxPlot;

public class Statistics {

	private String idTagHeaderName;
	private String dataName;
	private float media;
	private float mediana;
	private float valorMinimo;
	private float valorMaximo;
	private BoxPlot boxPlot;

	public Statistics() {

	}

	public Statistics(String idTagHeaderName, String dataName, List<Float> numList) {
		this.idTagHeaderName = idTagHeaderName;
		this.dataName = dataName;
		this.media = Calculations.media(numList);
		this.mediana = Calculations.mediana(numList);
		this.valorMinimo = Calculations.valorMinimo(numList);
		this.valorMaximo = Calculations.valorMaximo(numList);
		this.boxPlot = new BoxPlot(numList);
	}
//
//	public Statistics(List<Float> numList) {
//		this.media = Calculations.media(numList);
//		this.valorMinimo = Calculations.valorMinimo(numList);
//		this.valorMaximo = Calculations.valorMaximo(numList);
//		this.boxPlot = new BoxPlot(numList);
//	}
	

	public float getMedia() {
		return media;
	}

	public float getMediana() {
		return mediana;
	}

	public void setMediana(float mediana) {
		this.mediana = mediana;
	}

	public String getDataName() {
		return dataName;
	}

	public float getValorMinimo() {
		return valorMinimo;
	}

	public float getValorMaximo() {
		return valorMaximo;
	}

	public BoxPlot getBoxPlot() {
		return boxPlot;
	}
}
