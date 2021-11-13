
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
    FULL_VARIANT_TYPE: 'fullVariantsTypes',
    INDEL_VARIANT_TYPE: 'INDEL',
    SNP_VARIANT_TYPE: 'SNP',
    INSERCAO_VARIANT_TYPE: 'INS',
    DELECAO_VARIANT_TYPE: 'DEL',
}
// export default frameTypes;
