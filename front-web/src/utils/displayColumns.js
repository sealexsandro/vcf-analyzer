import { HeaderFields, HeaderFieldsList } from "./tokens";


// Aqui eu configuro as colunas que começarão visiveis na tabela,
// os campos  INFO que se tornarão colunas não são incluidos aqui, pois ele
// devem ser congurado dinamicamente
export const findVisibleColumns = () => {
    var colsVisible = new Map();
    HeaderFieldsList.forEach(col => {
        if (col === HeaderFields.CHROM) {
            colsVisible.set(HeaderFields.CHROM, true);
        } else if (col === HeaderFields.POS) {
            colsVisible.set(HeaderFields.POS, true);
        } else if (col === HeaderFields.ID) {
            colsVisible.set(HeaderFields.ID, true);
        } else if (col === HeaderFields.REF) {
            colsVisible.set(HeaderFields.REF, true);
        } else if (col === HeaderFields.ALT) {
            colsVisible.set(HeaderFields.ALT, true);
        } else if (col === HeaderFields.QUAL) {
            colsVisible.set(HeaderFields.QUAL, true);
        } else if (col === HeaderFields.FILTER) {
            colsVisible.set(HeaderFields.FILTER, false);
        } else if (col === HeaderFields.FORMAT) {
            colsVisible.set(HeaderFields.FORMAT, false);
        } else if (col === HeaderFields.SAMPLES) {
            colsVisible.set(HeaderFields.SAMPLES, true);
        }
    })
    return colsVisible;
};

export const displayColumns = () => {
    let colsVisible = new Map();
    HeaderFieldsList.forEach(col => {
        if (col === HeaderFields.CHROM) {
            colsVisible.set(HeaderFields.CHROM, {
                name: HeaderFields.CHROM,
                display: true,
            });
        } else if (col === HeaderFields.POS) {
            colsVisible.set(HeaderFields.POS, {
                name: HeaderFields.POS,
                display: true,
            });
        } else if (col === HeaderFields.ID) {
            colsVisible.set(HeaderFields.ID, {
                name: HeaderFields.ID,
                display: false,
            });
        } else if (col === HeaderFields.REF) {
            colsVisible.set(HeaderFields.REF, {
                name: HeaderFields.REF,
                display: true,
            });
        } else if (col === HeaderFields.ALT) {
            colsVisible.set(HeaderFields.ALT, {
                name: HeaderFields.ALT,
                display: true,
            });
        } else if (col === HeaderFields.QUAL) {
            colsVisible.set(HeaderFields.QUAL, {
                name: HeaderFields.QUAL,
                display: true,
            });
        } else if (col === HeaderFields.FILTER) {
            colsVisible.set(HeaderFields.FILTER, {
                name: HeaderFields.FILTER,
                display: false,
            });
        } else if (col === HeaderFields.FORMAT) {
            colsVisible.set(HeaderFields.FORMAT, {
                name: HeaderFields.FORMAT,
                display: false,
            });
        } else if (col === HeaderFields.SAMPLES) {
            colsVisible.set(HeaderFields.SAMPLES, {
                name: HeaderFields.SAMPLES,
                display: true,
            });
        }
    })
    return colsVisible;
};