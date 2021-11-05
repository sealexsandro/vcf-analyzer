package com.ufrpe.vcfanalyzer.statistics;

import java.util.Collections;
import java.util.List;

public class Calculations {

	// Observação: todas as funções devem ordenar a lista que recebe de forma
	// crescente

	public static float media(List<Float> numList) {

		if (numList.size() > 0) {
			Collections.sort(numList);

			int qntDeNumeros = numList.size();
			float somaDeNumeros = 0;

			for (float number : numList) {
				somaDeNumeros += number;
			}
			float media = somaDeNumeros / qntDeNumeros;

			return media;
		}
		return 0;
	}

	public static float valorMinimo(List<Float> numList) {

		if (numList.size() > 0) {
			Collections.sort(numList);
			return numList.get(0);
		}
		return 0;
	}

	public static float valorMaximo(List<Float> numList) {

		if (numList.size() > 0) {
			Collections.sort(numList);
			return numList.get(numList.size() - 1);
		}
		return 0;
	}

	// calculo da mediana
	public static float mediana(List<Float> numList) {

		if (numList.size() > 0) {
			Collections.sort(numList);
			int middle = (numList.size()) / 2;
			float medianValue = 0;
			// lista com quantidade de elementos = n, onde n é par
			if (numList.size() % 2 == 0) {
				medianValue = (numList.get(middle - 1) + numList.get(middle)) / 2;
			} else {
				medianValue = numList.get(middle);
			}
			return medianValue;
		}
		return 0;
	}

}
