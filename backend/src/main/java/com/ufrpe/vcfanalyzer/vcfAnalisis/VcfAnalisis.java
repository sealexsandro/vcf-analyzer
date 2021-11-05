package com.ufrpe.vcfanalyzer.vcfAnalisis;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.ufrpe.vcfanalyzer.domain.FileVcfData;
import com.ufrpe.vcfanalyzer.domain.TagHeader;
import com.ufrpe.vcfanalyzer.domain.Variant;
import com.ufrpe.vcfanalyzer.statistics.Statistics;
import com.ufrpe.vcfanalyzer.utils.VariantToken;

@Component
public class VcfAnalisis {

	private FileVcfData vcfFileData;
//	private int numeroDeColunas = 0;
	private List<String> columnSamples = new ArrayList<String>();

	public VcfAnalisis() {

	}

	public List<String> readFile(InputStream stream) throws IOException {

		List<String> fileVcf = null; // todo o arquivo será colocado nesta lista

		if (stream != null) {
			// StringBuilder sb = new StringBuilder();
			String line;
			fileVcf = new ArrayList<>();

			try {
				BufferedReader reader = new BufferedReader(new InputStreamReader(stream, "UTF-8"));
				while ((line = reader.readLine()) != null) {
					fileVcf.add(line);
					// sb.append(line).append("\n");
				}
			} finally {
				stream.close();
			}

		}
		return fileVcf;
	}

	public FileVcfData organizeVcf(List<String> vcfFile) {

		this.vcfFileData = new FileVcfData();
		int indice = 0; // índice do arquivoBruto
		String row = vcfFile.get(indice);
		char caracter;
		boolean isfinalLine = false;

		// Separar O Cabeçalho dos dados
		while (!isfinalLine) {
			caracter = row.charAt(0);
			if (caracter == '#') {// verifica se a linha é parte do cabeçalho
				caracter = row.charAt(1);
				if (caracter == '#') {// verifica se a linha do cabeçalho é uma Tag com meta informações
					TagHeader tagHeader = montarTagCabecalho(row);
					if (tagHeader != null) {
						this.vcfFileData.addTagCabecalho(tagHeader);
					}
					indice++;
					row = vcfFile.get(indice); // chama a próxima linha
					// this.qntLinhasDoCabecalhoVcf++;
				} else { // Se entrar no Else significa que encontrou os Headers das colunas, Ex: CHROM,
							// POS, ID
					String columnHeader[] = row.split("\t");
					for (int i = 0; i < columnHeader.length; i++) {
//						this.vcfFileData.addColumnHeader(columnHeader[i]);
//						this.numeroDeColunas++;
						this.columnSamples.add(columnHeader[i]);
					}
					isfinalLine = true;
					indice++;
				}
			}
		}

		// Pegar Os Dados Do Corpo que não Fazem Parte Do Cabeçalho
		for (int i = indice; i < vcfFile.size(); i++) {
			String bodyRow = vcfFile.get(i);
			Variant variant = this.montarRowData(bodyRow);
			if (variant != null) {
				this.vcfFileData.addBodyRow(variant);
				// this.qntLinhasDoCorpoVcf++;
			}
		}

		return this.vcfFileData;
	}

	private TagHeader montarTagCabecalho(String row) {

		TagHeader tagHeader = null;

		String nameTag;
		String atribTag[] = new String[4]; // 4 posicções para os atributos: idTag, number, type, description

		// inicio e fim do corte da string, para separar od metadados das tags
		int inicioCorte = 0;
		int fimCorte = row.length() - 2;

		if (row.substring(2, 6).equalsIgnoreCase("INFO")) {
			nameTag = "INFO";
			inicioCorte = 8;
		} else if (row.substring(2, 8).equalsIgnoreCase("FORMAT")) {
			nameTag = "FORMAT";
			inicioCorte = 10;
		} else {
			return null;
		}

		String atributos[] = row.substring(inicioCorte, fimCorte).split(",");

		for (int i = 0; i < 4; i++) {
			String atributo[] = atributos[i].split("=");
			atribTag[i] = atributo[1];
		}
		tagHeader = new TagHeader(nameTag, atribTag[0], atribTag[1], atribTag[2], atribTag[3]);
		return tagHeader;
	}

	private Variant montarRowData(String row) {

		Variant variant;
		String rowData[] = row.split("\t");

		String chrom = "", id = "", reference = "", alteration = "", filter = "", format = "";
		Integer position = 0;
		Double quality = 0D;
//		Map<String, String> infoCol = new HashMap<String, String>();
//		Map<String, String> samples = new HashMap<String, String>();
		String infoCol = "";
		String samples = "";

		for (int coluna = 0; coluna < 10; coluna++) {
			if (coluna == 0) {
				chrom = rowData[coluna];
			} else if (coluna == 1) {
				position = Integer.parseInt(rowData[coluna]);
			} else if (coluna == 2) {
				id = rowData[coluna];
			} else if (coluna == 3) {
				reference = rowData[coluna];
			} else if (coluna == 4) {
				alteration = rowData[coluna];
			} else if (coluna == 5) {
				quality = Double.parseDouble(rowData[coluna]);
			} else if (coluna == 6) {
				filter = rowData[coluna];
			} else if (coluna == 7) {
				infoCol = rowData[coluna];
//				String metaInformacoes[] = rowData[coluna].split(";");
//				for (int j = 0; j < metaInformacoes.length; j++) {
////					String metaDado[] = metaInformacoes[j].split("=");
////					infoCol.put(metaDado[0], metaDado[1]);
//					infoCol.add(metaInformacoes[j]);
//				}
			} else if (coluna == 8) {
				format = rowData[coluna];
			} else {
				for (int colunaSamples = coluna; colunaSamples < rowData.length; colunaSamples++) {
					if (!rowData[colunaSamples].equals(".")) {
						// samples.put(this.columnSamples.get(colunaSamples), rowData[colunaSamples]);
						String samp = this.columnSamples.get(colunaSamples) + "===" + rowData[colunaSamples];
						samples = samples.concat(samp);

						if (colunaSamples < rowData.length) {
							samples = samples.concat("&&");
						}

//						System.out.println(samples);
					}

				}

			}
		}
		variant = new Variant(chrom, position, id, reference, alteration, quality, filter, infoCol, format, samples);
		return variant;
	}

	/*
	 * Metodo para organizar em forma de chave e valor, todas as linhas da coluna
	 * INFO Para cada Campo info do cabeçalho, será pego todos os valores não
	 * repetidos
	 */
	public Map<String, Set<String>> getValuesNoDuplicateInfoCol(List<String> rowsOfInfoCol) {

		Map<String, Set<String>> keyAndValuesMap = new HashMap<>();

		for (String row : rowsOfInfoCol) {
			String vectorInfo[] = row.split(";");
			String keyAndValue[];

			for (int i = 0; i < vectorInfo.length; i++) {
				keyAndValue = vectorInfo[i].split("=");

				if (keyAndValuesMap.containsKey(keyAndValue[0])) {
					keyAndValuesMap.get(keyAndValue[0]).add(keyAndValue[1]);
				} else {
					Set<String> values = new HashSet<>();
					values.add(keyAndValue[1]);
					keyAndValuesMap.put(keyAndValue[0], values);
				}
			}

		}

		return keyAndValuesMap;
	}

	public String analizeTipoDeVariacao(String referencia, String alteracao) {

		String alelosAlternativos[] = alteracao.split(",");

		if (referencia.length() == 1 && !referencia.equalsIgnoreCase(".")) {
			if (alelosAlternativos[0].length() == 1) {
				return VariantToken.SNP;
			} else {
				// Caso para entrar aqui: | ref = C alt = CTAG | //houve uma inserção, ou seja
				// um indel
				return VariantToken.INDEL;
			}

		} else if (referencia.length() > 1 && !referencia.equalsIgnoreCase(".")) {

			boolean mnp = false; // mnp = polimorfismo de nucleotideo multiplo

			for (int i = 0; i < alelosAlternativos.length; i++) {
				if (alelosAlternativos[i].length() == referencia.length()) {
					mnp = true;
				} else {
					mnp = false;
					break;
				}
			}
			if (mnp) {
				return VariantToken.MNP;
			} else {
				return VariantToken.INDEL;
			}

		}

		return "";
	}

	public Map<String, Integer> variantsTypesSummary(List<Variant> variants) {

		Map<String, Integer> variantTypes = new HashMap<String, Integer>();
		int contSnps = 0;
		int contIndels = 0;

		String tipoVariacao = "";
		for (Variant v : variants) {
			tipoVariacao = analizeTipoDeVariacao(v.getReference(), v.getAlteration());
			if (VariantToken.SNP.equalsIgnoreCase(tipoVariacao)) {
				contSnps++;
			} else if (VariantToken.INDEL.equalsIgnoreCase(tipoVariacao)) {
				contIndels++;
			}
		}
		variantTypes.put(VariantToken.SNP, contSnps);
		variantTypes.put(VariantToken.INDEL, contIndels);

		return variantTypes;
	}

	public float getValueSingleFieldInfo(String rowFieldInfo, String singleFieldInfo) {

		String vectorInfo[] = rowFieldInfo.split(";");
		String keyAndValueColInfo[];

		for (int i = 0; i < vectorInfo.length; i++) {
			keyAndValueColInfo = vectorInfo[i].split("=");
			if (keyAndValueColInfo[0].equalsIgnoreCase(singleFieldInfo)) {
				try {
					float value = Float.parseFloat(keyAndValueColInfo[1]);
					return value;
				} catch (Exception err) {
					System.out.println("Deu Erro na conversão de string para float, linha 259 da classe VCFAnalisis");
					System.err.println(err);
					return 0;
				}
			}
		}
		return 0;
	}

	private Map<String, List<Float>> getValuesOfFieldInfoOfVariantType(String fieldInfo, List<Variant> variants) {

		Map<String, List<Float>> valuesOfFieldInfoOfVariantType = new HashMap<>();
		float valueOfFieldInfo = 0;
		String tipoVariacao = "";
		valuesOfFieldInfoOfVariantType.put(VariantToken.FULL_VARIANTS_TYPES, new ArrayList<>());

		for (Variant v : variants) {
			tipoVariacao = analizeTipoDeVariacao(v.getReference(), v.getAlteration());
			valueOfFieldInfo = getValueSingleFieldInfo(v.getInfoCol(), fieldInfo);

			valuesOfFieldInfoOfVariantType.get(VariantToken.FULL_VARIANTS_TYPES).add(valueOfFieldInfo);

			if (valuesOfFieldInfoOfVariantType.containsKey(tipoVariacao)) {
				valuesOfFieldInfoOfVariantType.get(tipoVariacao).add(valueOfFieldInfo);
			} else {
				valuesOfFieldInfoOfVariantType.put(tipoVariacao, new ArrayList<>());
				valuesOfFieldInfoOfVariantType.get(tipoVariacao).add(valueOfFieldInfo);
			}
		}
		return valuesOfFieldInfoOfVariantType;
	}

	public List<Statistics> statisticsFieldInfo(String fieldInfo, List<Variant> variants) {

		Map<String, List<Float>> valuesMap = getValuesOfFieldInfoOfVariantType(fieldInfo, variants);
		List<Statistics> fullStatistics = new ArrayList<>();
		for (Entry<String, List<Float>> entry : valuesMap.entrySet()) {
			Statistics statistics = new Statistics(fieldInfo, entry.getKey(), entry.getValue());
			fullStatistics.add(statistics);
		}

		return fullStatistics;
	}

}
