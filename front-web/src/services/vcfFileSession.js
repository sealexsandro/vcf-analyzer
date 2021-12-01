var vcfFileSession = (function () {
    var vcfName = "";
    var idVcf = 0;

    var getName = function () {
        // return vcfName;    // Or pull this from cookie/localStorage
        vcfName = window.sessionStorage.getItem('name');
        return vcfName;
    };

    var getIdVcf = function () {
        // return idVcf;
        idVcf = window.sessionStorage.getItem('idVcf');
        return idVcf;
    };

    var setName = function (name) {
        // vcfName = name;
        // Also set this in cookie/localStorage
        window.sessionStorage.setItem('name', name);
    };

    var setIdVcf = function (id) {
        // idVcf = id;
        window.sessionStorage.setItem('idVcf', id);
    };

    return {
        getName: getName,
        getIdVcf: getIdVcf,
        setName: setName,
        setIdVcf: setIdVcf
    }

})();

export default vcfFileSession;