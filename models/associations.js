/**
 * Created by Frank Ricardo R. on 12/20/2015.
 * Associations from Models
 */
// Sector > Organismo
DTG.Model.Sector.hasMany(DTG.Model.Organismo, { onUpdate:'cascade', onDelete:'cascade' });
DTG.Model.Organismo.belongsTo(DTG.Model.Sector);
// Organismo > Empresa
DTG.Model.Organismo.hasMany(DTG.Model.Empresa, { onUpdate: 'cascade', onDelete: 'cascade' });
DTG.Model.Empresa.belongsTo(DTG.Model.Organismo);
// Cargo > Persona
DTG.Model.Cargo.hasMany(DTG.Model.Persona, { onUpdate: 'cascade', onDelete: 'cascade' });
// Empresa > Persona
DTG.Model.Empresa.hasMany(DTG.Model.Persona, { onUpdate: 'cascade', onDelete: 'cascade' });
// Empresa > Demanda
DTG.Model.Empresa.hasMany(DTG.Model.Demanda, { onUpdate: 'cascade', onDelete: 'cascade' });
DTG.Model.Demanda.belongsTo(DTG.Model.Empresa);
// TipoPersona > Persona
DTG.Model.TipoPersona.hasMany(DTG.Model.Persona, { onUpdate: 'cascade', onDelete: 'cascade' });
// Persona < Cargo, Empresa, TipoPersona (belongsTo)
DTG.Model.Persona.belongsTo(DTG.Model.Cargo);
DTG.Model.Persona.belongsTo(DTG.Model.Empresa);
DTG.Model.Persona.belongsTo(DTG.Model.TipoPersona);
// Demanda > DemandaServicioProducto
DTG.Model.Demanda.hasMany(DTG.Model.DemandaServicioProducto, { onUpdate: 'cascade', onDelete: 'cascade' });
// ServicioProducto > DemandaServicioProducto
DTG.Model.ServicioProducto.hasMany(DTG.Model.DemandaServicioProducto, { onUpdate: 'cascade', onDelete: 'cascade' });
// DemandaServicioProducto < Demanda, ServicioProducto (belongsTo)
DTG.Model.DemandaServicioProducto.belongsTo(DTG.Model.Demanda);
DTG.Model.DemandaServicioProducto.belongsTo(DTG.Model.ServicioProducto);
// DemandaServicioProducto > DemandaServicioIdentificacion
DTG.Model.DemandaServicioProducto.hasMany(DTG.Model.DemandaServicioIdentificacion, { onUpdate: 'cascade', onDelete: 'cascade' });
// DemandaPlaso > DemandaServicioIdentificacion
DTG.Model.DemandaPlazo.hasMany(DTG.Model.DemandaServicioIdentificacion, { onUpdate: 'cascade', onDelete: 'cascade' });
// DemandaServicioIdentificacion < DemandaServicioProducto, DemandaPlaso (belongsTo)
DTG.Model.DemandaServicioIdentificacion.belongsTo(DTG.Model.DemandaServicioProducto);
DTG.Model.DemandaServicioIdentificacion.belongsTo(DTG.Model.DemandaPlazo);
// Many to Many (PeriodoGuerra <=> Demandas)
DTG.Model.PeriodoGuerra.belongsToMany(DTG.Model.Demanda, {
    as: 'Demandas', through: 'demanda_periodo_guerra'
});
DTG.Model.Demanda.belongsToMany(DTG.Model.PeriodoGuerra, {
    as: 'PeriodosGuerra', through: 'demanda_periodo_guerra'
});
// Many to Many (Persona <=> Demandas)
DTG.Model.Demanda.belongsToMany(DTG.Model.Persona, {
    as: 'Personas', through: 'demanda_persona'
});
DTG.Model.Persona.belongsToMany(DTG.Model.Demanda, {
    as: 'Demandas', through: 'demanda_persona'
});

// Sync Sequelize whit DB
//DTG.Sequelize.sync({ force: false }).then(function(){
//    console.log("sync > OK");
//}).catch(function(err) {
//    console.log(err);
//});