package com.ufrpe.vcfanalyzer.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Variant implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String chrom;
	private Integer position;
	private String id_variant;
	private String reference;
	private String alteration;
	private Double quality;
	private String filter;
	private String format;
	// Desisti dessa forma, pois o mapeamento pelo hibernate fica complicado
//	private Map<String, String> infoCol; 
	
//	@ElementCollection
//	@CollectionTable(name = "InfoColumn")
//	@Column(name = "info", columnDefinition="text")
//	private List<String> infoCol;
	@Column(columnDefinition="text")
	private String infoCol;
	
//	@ElementCollection
//	@CollectionTable(name = "samples")
//	@Column(name = "sample", columnDefinition="text")
//	private List<String> samples;
	
	@Column(columnDefinition="text")
	private String samples;
	
//	@ElementCollection
//	@CollectionTable(name = "Samples")
//	@MapKeyColumn(name = "sample_key")
//	private Map<String, String> samples; 

	public Variant() {
		// TODO Auto-generated constructor stub
	}

	public Variant(String chrom, Integer position, String id_variant, String reference, String alteration, double quality,
			String filter, String infoCol, String format, String samples) {
		this.chrom = chrom;
		this.position = position;
		this.id_variant = id_variant;
		this.reference = reference;
		this.alteration = alteration;
		this.quality = quality;
		this.filter = filter;
		this.infoCol = infoCol;
		this.format = format;
		this.samples = samples;
	}
	
	
	
	
	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Variant other = (Variant) obj;
		return Objects.equals(id, other.id);
	}

	public Integer getId() {
		return id;
	}

	public String getChrom() {
		return chrom;
	}

	public Integer getPosition() {
		return position;
	}

	public String getIdVariant() {
		return id_variant;
	}

	public String getReference() {
		return reference;
	}

	public String getAlteration() {
		return alteration;
	}

	public Double getQuality() {
		return quality;
	}

	public String getFilter() {
		return filter;
	}


	public String getFormat() {
		return format;
	}

	public String getInfoCol() {
		return infoCol;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getId_variant() {
		return id_variant;
	}

	public String getSamples() {
		return samples;
	}


//	public Map<String, String> getSamples() {
//		return samples;
//	}
	

}
