package com.ufrpe.vcfanalyzer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value="/fileinfo")
public class FiloInfoController {

	public ResponseEntity<?> findAll(){
		return null;
	}
}
