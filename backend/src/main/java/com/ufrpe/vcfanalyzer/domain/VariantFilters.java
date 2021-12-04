package com.ufrpe.vcfanalyzer.domain;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class VariantFilters {

	/*
	 * Filtros da caixa de filtros da pagina de apresentação dos dados
	 */
	private Set<String> chroms;
	private Set<String> references;
	private Set<String> alterations;
	private Set<Double> qualities;
	private Set<String> filters;
	private Map<String, Set<String>> infoCol;

	public VariantFilters() {
		this.chroms = new HashSet<String>();
		this.references = new HashSet<String>();
		this.alterations = new HashSet<String>();
		this.qualities = new HashSet<Double>();
		this.filters = new HashSet<String>();
		this.infoCol = new HashMap<String, Set<String>>();
	}

	public void addChroms(String chrom) {
		this.chroms.add(chrom);
	}

	public void addReferences(String reference) {
		this.references.add(reference);
	}

	public void addAlterations(String alteration) {
		this.alterations.add(alteration);
	}

	public void addQualities(double qualitie) {
		this.qualities.add(qualitie);
	}

	public void addFilters(String filter) {
		this.filters.add(filter);
	}

	public void addInfoCol(String rowInfoCol) {

		String vectorInfo[] = rowInfoCol.split(";");
		String keyAndValue[];

		for (int i = 0; i < vectorInfo.length; i++) {
			keyAndValue = vectorInfo[i].split("=");

			if (this.infoCol.containsKey(keyAndValue[0])) {

				String value = "";
				try {
					value = keyAndValue[1];
				} catch (ArrayIndexOutOfBoundsException err) {
					value = "";
				}
				this.infoCol.get(keyAndValue[0]).add(value);
			} else {
				Set<String> values = new HashSet<>();
				String value = "";
				try {
					value = keyAndValue[1];
				} catch (ArrayIndexOutOfBoundsException err) {
					value = "";
				}
				values.add(value);
				this.infoCol.put(keyAndValue[0], values);
			}
		}
	}

	public Set<String> getChroms() {
		return chroms;
	}

	public Set<String> getReferences() {
		return references;
	}

	public Set<String> getAlterations() {
		return alterations;
	}

	public Set<Double> getQualities() {
		return qualities;
	}

	public Set<String> getFilters() {
		return filters;
	}

	public Map<String, Set<String>> getInfoCol() {
		return infoCol;
	}
}
