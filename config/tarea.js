
module.exports.tarea = async function() {
    var Cron    =  require('./cron')
    Cron = Cron.cron;
    let cron      = new Cron()
    /////////////////////////////////////////////////////////////////////////////////////////////
    let tarea        = Object()
    const moment = require('moment');
    /////////////////////////////////////////////////////////////////////////////////////////////

    tarea        = new Object()
    tarea.nombre = "Reinicio Automatico 12 Horas"
    tarea.tiempo = 24
    tarea.unidad = "hora"
    tarea.log    = false
    tarea.accion = async function(){

        console.log("*******************Reinicio Sistema***************")
        cron.parar()
        process.exit(0)

    }
    cron.AgregarTarea(tarea)

    tarea        = new Object()
    tarea.nombre = "Sincronisador de productos"
    tarea.tiempo = 10
    tarea.unidad = "hora"
    tarea.log    = false
    tarea.accion = async function(){

        console.log("*******************Sincronisador de productos***************")
        await TblproductosServices.procesoCategoria();
        await TblproductosServices.nextTridy( );
    }
    //cron.AgregarTarea(tarea)


    cron.iniciar();

    async function init(){
        await Cache.loadDBS('categorias');
        await Cache.loadDBS('products');
        await Cache.loadDBS('tallas');
        await Cache.loadDBS('user');
        console.log("***COMPlETADO CACHE");
        //await TblproductosServices.procesoCategoria();
        //await TblproductosServices.nextTridy( );
    }
    init();
}
