package com.ufrpe.vcfanalyzer.vcfAnalisis;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Component;

import com.ufrpe.vcfanalyzer.dtos.SumaryStatisticsColumnINFO;

@Component
public class SummaryStatistics {

	public float mediana(List<Integer> numberList) {
		float mediana;
		// lista com quantidade de elementos = n, onde n é par
		if (numberList.size() % 2 == 0) {
			float elementoDoCentro = numberList.get(numberList.size() / 2);
			float elementoDoCentroMaisUm = numberList.get((numberList.size() / 2) + 1);
			mediana = (elementoDoCentro + elementoDoCentroMaisUm) / 2;
			return mediana;
		} else {
			mediana = numberList.get((numberList.size() + 1) / 2);
			return mediana;
		}
	}

	public List<SumaryStatisticsColumnINFO> dpsStatistics(List<String> colInfo) {
		String info[];
		String vector[];
		List<Integer> dpsValues = new ArrayList<>();
		List<SumaryStatisticsColumnINFO> dpsStatistics = new ArrayList<>();

		for (int i = 0; i < colInfo.size(); i++) {
			vector = colInfo.get(i).split(";");
			for (int j = 0; j < vector.length; j++) {
				info = vector[j].split("=");
				if (info[0].equalsIgnoreCase("DP")) {
					dpsValues.add(Integer.parseInt(info[1]));
					break;
				}
			}
		}

		HashSet<Integer> singleDpsValues = new HashSet<>();
		singleDpsValues.addAll(dpsValues);

		for (Integer valor : singleDpsValues) {
			dpsStatistics.add(new SumaryStatisticsColumnINFO(valor, Collections.frequency(dpsValues, valor)));
		}
		return dpsStatistics;
	}

}
