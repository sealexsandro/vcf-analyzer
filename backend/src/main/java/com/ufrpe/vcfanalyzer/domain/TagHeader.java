package com.ufrpe.vcfanalyzer.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TagHeader implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String nameTag;
	private String idTag;
	private String number;
	private String type;
	
	@Column(columnDefinition="text")
	private String description;

	public TagHeader() {
	}
	
	
	
	public TagHeader(String nameTag, String idTag, String number, String type, String description) {
		this.nameTag = nameTag;
		this.idTag = idTag;
		this.number = number;
		this.type = type;
		this.description = description;
	}



	public Integer getId() {
		return id;
	}

	public String getNameTag() {
		return nameTag;
	}

	public String getIdTag() {
		return idTag;
	}

	public String getNumber() {
		return number;
	}

	public String getType() {
		return type;
	}
	public String getDescription() {
		return description;
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
		TagHeader other = (TagHeader) obj;
		return Objects.equals(id, other.id);
	}
	
	
	
}
