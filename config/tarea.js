
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
    tarea.tiempo = 2
    tarea.unidad = "hora"
    tarea.log    = false
    tarea.accion = async function(){
        
        console.log("*******************Sincronisador de productos***************")
        await TblproductosServices.nextTridy( );
        await TblproductosServices.procesoCategoria();
    }
    //cron.AgregarTarea(tarea)


    cron.iniciar()
}