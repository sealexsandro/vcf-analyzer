
export var variant = {
    chrom: String,
    position: Number,
    id: String,
    reference: String,
    alteration: String,
    quality: Number,
    filtro: String,
    infoCol: [],
    format: String,
    samples: []
}

export var variantPage = {
    content: [],
    last: Boolean,
    totalElements: Number,
    totalPages: Number,
    size: Number,
    number: Number,
    first: Boolean,
    numberOfElements: Number,
    empty: Boolean,
}



// class Variante {
//     constructor(
//         chrom,
//         posicao,
//         id,
//         referencia,
//         alteracao,
//         qualidade,
//         filtro,
//         infoCol,
//         format,
//         samples
//     ) {
//         this.chrom = chrom;
//         this.posicao = posicao;
//         this.id = id;
//         this.referencia = referencia;
//         this.alteracao = alteracao;
//         this.qualidade = qualidade;
//         this.filtro = filtro;
//         this.infoCol = infoCol;
//         this.format = format;
//         this.samples = samples;
//     }
// }