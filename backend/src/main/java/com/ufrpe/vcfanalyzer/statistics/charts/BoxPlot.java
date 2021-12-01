package com.ufrpe.vcfanalyzer.statistics.charts;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.ufrpe.vcfanalyzer.statistics.Calculations;

public class BoxPlot {

	private float primeiroQuartil; // Q1
	private float mediana; // Q2
	private float terceiroQuartil; // Q3
	private float valorMinimo;
	private float valorMaximo;
//	private float intervaloInterQuartil; // comprimento da caixa
	private List<Float> outliersMaioresQueOValorMaximoDoBigode;
	private List<Float> outliersMenoresQueOValorMinimoDoBigode;

	public BoxPlot(List<Float> numList) {
		// Ordenando lista
		Collections.sort(numList);
		inicializarVariaveis(numList);
	}

	public float calculaPrimeiroQuartil(List<Float> numList) {
		int middlePosition = (numList.size()) / 2;
		float medianValue = 0;
		List<Float> numbers = new ArrayList<>();

		for (int i = 0; i < middlePosition; i++) {
			numbers.add(numList.get(i));
		}
		medianValue = Calculations.mediana(numbers);
		return medianValue;
	}

	public float calculaTerceiroQuartil(List<Float> numList) {
		int middlePosition = (numList.size()) / 2;
		float medianValue = 0;

		List<Float> numbers = new ArrayList<>();

		for (int i = middlePosition; i < numList.size(); i++) {
			numbers.add(numList.get(i));
		}
		medianValue = Calculations.mediana(numbers);
		return medianValue;
	}

	public float calculaValorMinimo(List<Float> numList, float terceiroQuartil, float primeiroQuartil) {
		float intervaloInterQuartil = terceiroQuartil - primeiroQuartil;

		float limiteInferiorDoBigode = primeiroQuartil - (1.5f * intervaloInterQuartil);

		if (numList.get(0) > limiteInferiorDoBigode) {
			return numList.get(0);
		}
		return limiteInferiorDoBigode;
	}

//	public float calculaValorMaximo(List<Float> numList, float terceiroQuartil, float primeiroQuartil) {
//		float intervaloInterQuartil = terceiroQuartil - primeiroQuartil;
//		float tamanhoMaximoDoBigodeDaCaixa = intervaloInterQuartil * 1.5f;
//
//		float valorMaximoParaBigode = terceiroQuartil + tamanhoMaximoDoBigodeDaCaixa;
//
//		if (numList.get(numList.size() - 1) < valorMaximoParaBigode) {
//			return numList.get(numList.size() - 1);
//		}
//		return valorMaximoParaBigode;
//	}
	
	public float calculaValorMaximo(List<Float> numList, float terceiroQuartil, float primeiroQuartil) {
		float intervaloInterQuartil = terceiroQuartil - primeiroQuartil;
		float limiteSuperiorDoBigode = terceiroQuartil + (1.5f * intervaloInterQuartil) ;

		if (numList.get(numList.size() - 1) < limiteSuperiorDoBigode) {
			return numList.get(numList.size() - 1);
		}
		return limiteSuperiorDoBigode;
	}


	public List<Float> encontraOutliersSuperiores(List<Float> numbers) {
		List<Float> outliersSuperiores = new ArrayList<>();

		int middlePosition = (numbers.size()) / 2;

		for (int i = middlePosition + (middlePosition / 2); i < numbers.size(); i++) {
			if (numbers.get(i) > this.valorMaximo) {
				if(!outliersSuperiores.contains(numbers.get(i))) {
					outliersSuperiores.add(numbers.get(i));
					System.out.println("Outileirs: "+ numbers.get(i));
				}
				
			}
			
		}

		return outliersSuperiores;
	}

	public List<Float> encontraOutliersInferiores(List<Float> numbers) {
		List<Float> outliersInferiores = new ArrayList<>();

		int middlePosition = (numbers.size()) / 2;

		for (int i = middlePosition - (middlePosition / 2); i >= 0; i--) {
			if (numbers.get(i) < this.valorMinimo) {
				outliersInferiores.add(numbers.get(i));
				
			}
		}

		return outliersInferiores;
	}

	public void inicializarVariaveis(List<Float> numList) {
		this.mediana = Calculations.mediana(numList);
		this.primeiroQuartil = this.calculaPrimeiroQuartil(numList);
		this.terceiroQuartil = this.calculaTerceiroQuartil(numList);

		this.valorMaximo = this.calculaValorMaximo(numList, this.terceiroQuartil, this.primeiroQuartil);
		this.valorMinimo = this.calculaValorMinimo(numList, this.terceiroQuartil, this.primeiroQuartil);

		this.outliersMaioresQueOValorMaximoDoBigode = this.encontraOutliersSuperiores(numList);
		this.outliersMenoresQueOValorMinimoDoBigode = this.encontraOutliersInferiores(numList);

	}

	public float getPrimeiroQuartil() {
		return primeiroQuartil;
	}

	public float getMediana() {
		return mediana;
	}

	public float getTerceiroQuartil() {
		return terceiroQuartil;
	}

	public float getValorMinimo() {
		return valorMinimo;
	}

	public float getValorMaximo() {
		return valorMaximo;
	}

	public List<Float> getOutliersMaioresQueOValorMaximoDoBigode() {
		return outliersMaioresQueOValorMaximoDoBigode;
	}

	public List<Float> getOutliersMenoresQueOValorMinimoDoBigode() {
		return outliersMenoresQueOValorMinimoDoBigode;
	}

}
