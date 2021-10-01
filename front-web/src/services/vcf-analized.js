var VcfAnalized = (function () {
    var vcfName = "";
    var idVcf = 0;

    var getName = function () {
        return vcfName;    // Or pull this from cookie/localStorage
    };

    var getIdVcf = function () {
        return idVcf;
    };

    var setName = function (name) {
        vcfName = name;
        // Also set this in cookie/localStorage
    };

    var setIdVcf = function (id) {
        idVcf = id;
    };

    return {
        getName: getName,
        getIdVcf: getIdVcf,
        setName: setName,
        setIdVcf: setIdVcf
    }

})();

export default VcfAnalized;