package com.ufrpe.vcfanalyzer.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TagHeader {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
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



	public Long getId() {
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
	
}
