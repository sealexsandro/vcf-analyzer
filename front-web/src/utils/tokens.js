
export const frameTypes = [
    'table', 'charts',
]

export const VariantsAttribs = {
    CHROM: "chrom",
    POS: "position",
    ID: "idVariant",
    REFERENCE: "reference",
    ALTERATION: "alteration",
    QUALITY: "quality",
    FILTER: "filter",
    FORMAT: "format",
    SAMPLES: "samples",
    INFO: "infoCol",
}

export const VariantsAttribsMap = new Map(Object.entries(VariantsAttribs));

export const HeaderFields = {
    CHROM: "CHROM",
    POS: "POS",
    ID: "ID",
    REF: "REFERENCE",
    ALT: "ALTERATION",
    QUAL: "QUALITY",
    FILTER: "FILTER",
    INFO: "INFO",
    FORMAT: "FORMAT",
    SAMPLES: "SAMPLES",
}

export const HeaderFieldsList = [
    HeaderFields.CHROM,
    HeaderFields.POS,
    HeaderFields.ID,
    HeaderFields.REF,
    HeaderFields.ALT,
    HeaderFields.QUAL,
    HeaderFields.FILTER,
    HeaderFields.FORMAT,
    HeaderFields.SAMPLES,
    HeaderFields.INFO
]

export const VariantTypes = {
    FULL_VARIANT_TYPE: 'allVariantsTypes',
    INDEL_VARIANT_TYPE: 'indel',
    SNP_VARIANT_TYPE: 'snp',
    INSERCAO_VARIANT_TYPE: 'ins',
    DELECAO_VARIANT_TYPE: 'del',
}

const VariantTypesCode ={
    allVariantsTypes: 1,
    snp: 2, 
    indel: 3, 
    
}

export const CodeVariantTypesMap = new Map(Object.entries(VariantTypesCode));
// export default frameTypes;
