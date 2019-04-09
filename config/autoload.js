/**
 * Created by Frank Ricardo R. on 12/18/15.
 */

/* Load Models */
DTG.loadScript([
    "models/SectorModel.js",
    "models/OrganismoModel.js",
    "models/EmpresaModel.js",
    "models/CargoModel.js",
    "models/TipoPersonaModel.js",
    "models/PeriodoGuerraModel.js",
    "models/PersonaModel.js",
    "models/DemandaModel.js",
    "models/ServicioProductoModel.js",
    "models/DemandaServicioProductoModel.js",
    "models/DemandaPlazoModel.js",
    "models/DemandaServicioIdentificacionModel.js",
    "models/UserModel.js",
    "models/associations.js",
    "models/DemandaRepository.js",
    "models/BaseRepository.js"
]);

/* Load App */
DTG.loadScript(["views/app.js", "views/util/util.js"]);

DTG.loadScript("reports/report.js");