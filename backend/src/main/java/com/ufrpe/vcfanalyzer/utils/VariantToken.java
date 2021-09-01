package com.ufrpe.vcfanalyzer.utils;

public class VariantToken {
	//CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT

    public static final String HEADER= "linhas_de_cabecalho";
    public static final String DATA_LINE = "linhas_de_dados";
    public static final String CHROM = "CHROM";
    public static final String POS = "POS";
    public static final String ID = "ID";
    public static final String REF = "REF";
    public static final String ALT = "ALT";
    public static final String QUAL = "QUAL";
    public static final String FILTER = "FILTER";
    public static final String INFO = "INFO";
    public static final String FORMAT = "FORMAT";
    public static final String SAMPLES = "SAMPLES";
    
    public static final String tokens[] = {CHROM, POS, ID, REF, ALT, QUAL, FILTER, INFO, FORMAT, SAMPLES};

}
