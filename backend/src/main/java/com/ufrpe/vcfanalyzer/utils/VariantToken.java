package com.ufrpe.vcfanalyzer.utils;

public class VariantToken {
	//CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT

    public static final String HEADER= "linhas_de_cabecalho";
    public static final String DATA_LINE = "linhas_de_dados";
    public static final String CHROM = "chrom";
    public static final String POS = "posicao";
    public static final String ID = "idVariant";
    public static final String REF = "reference";
    public static final String ALT = "alteration";
    public static final String QUAL = "quality";
    public static final String FILTER = "filter";
    public static final String INFO = "info";
    public static final String FORMAT = "format";
    public static final String SAMPLES = "samples";
    
//    public static final String tokens[] = {CHROM, POS, ID, REF, ALT, QUAL, FILTER, INFO, FORMAT, SAMPLES};

    // Todas os tipos de variações juntas
    public static final String FULL_VARIANTS_TYPES = "fullVariantsTypes";
    // Tipos de Variações
    
    public static final String SNP = "snp";
    public static final String MNP = "mnp";
    public static final String INDEL = "indel";
    public static final String INS = "ins";   // indel de inserção
    public static final String DEL = "del";   // indel de exclusão
    
    
}
