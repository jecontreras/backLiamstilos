/**
 * TblproductosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let Procedures = Object();
const _ = require('lodash');
const moment = require('moment');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

Procedures.querys = async (req, res)=>{
	let params = req.allParams();
  let resultado = Object();
  if( params.where.pro_categoria == 0 ) delete params.where.pro_categoria;
  let cacheMan = [];
  if( params.page == 0 ) await Cache.aleatorioList('products');
  if( !params.where.or ) {
    cacheMan = await Cache.leer('products');
    cacheMan = _.orderBy( cacheMan, ['idAleatorio'], ['desc'])
  }
  if( cacheMan.length === 0 ) {
    console.log("***CONSULTANDO DBS TBLPRODUCTOS*************");
    resultado = await QuerysServices( Tblproductos, params );
  }
  else {
    cacheMan = Cache.filterProcess( cacheMan, params, 'products' );
    //cacheMan = _.orderBy( cacheMan, ['createdAt'], ['DESC'])
    //console.log("****26", cacheMan.length)
    resultado.count = cacheMan.length;
    resultado.data = _.clone( Cache.paginate( cacheMan, params.limit, ( ( params.page || params.skip ) + 1 ) ) );
    if( cacheMan.length === 0 ) resultado = ( await QuerysServices( Tblproductos, params ) );
  }
  let dataFinal = Array();

	for(let row of resultado.data){
    row.idAleatorio = getRandomInt(1000000000000);
    let cuerpo = _.clone( row );
		cuerpo.precioProveedor = cuerpo.pro_vendedor;
    row.listComentarios = _.orderBy( await Procedures.comentarios( row.id ), ['posicion', 'age'] );
    //row.listComment = Procedures.listComment();
		if( cuerpo.cat_clave_int ) {
      let cacheManCat = ( _.cloneWith( await Cache.leer('categorias') ) ).find( off => off.id === cuerpo.cat_clave_int );
      if( !cacheMan ) {
        console.log("***CONSULTANDO DBS************* TBLCATEGORIAS");
        cuerpo.cat_clave_int = await Tblcategorias.findOne({ id: cuerpo.cat_clave_int });
      }
      else cuerpo.cat_clave_int = cacheManCat;
    }
		if( cuerpo.pro_usu_creacion ) {
      let cacheManUs = ( _.cloneWith( await Cache.leer('user') ) ).find( off => off.id === cuerpo.pro_usu_creacion );
      if( !cacheManUs ) {
        console.log("***CONSULTANDO DBS************* TBLUSUARIO");
        cuerpo.pro_usu_creacion = await Tblusuario.findOne({ id: cuerpo.pro_usu_creacion });
      }
      else cuerpo.pro_usu_creacion = cacheManUs;
    }
		if( cuerpo.pro_sw_tallas && !cuerpo.listaTallas ) {
      let cacheManTl = ( _.cloneWith( await Cache.leer('tallas') ) ).find( off => off.tal_tipo === cuerpo.pro_sw_tallas );
      if( !cacheManTl ) {
        console.log("***CONSULTANDO DBS************* TBLTALLA");
        cuerpo.listTallas = await Tbltallas.find({ tal_tipo: cuerpo.pro_sw_tallas });
      }
      else cuerpo.listTallas = cacheManTl;
			cuerpo.listTallas = _.orderBy( cuerpo.listTallas, ['tal_descripcion'], ['asc'] );
		}
		if( cuerpo.listaTallas ) cuerpo.listTallas = _.orderBy( cuerpo.listaTallas, ['tal_descripcion'], ['asc'] );
		if( cuerpo.pro_categoria ) {
      let cacheManCat = ( _.cloneWith( await Cache.leer('categorias') ) ).find( off => off.id === cuerpo.pro_categoria );
      if( !cacheManCat ) {
        console.log("***CONSULTANDO DBS************* TBLCATEGORIAS");
        cuerpo.pro_categoria = await Tblcategorias.findOne({ where: { id: cuerpo.pro_categoria }});
      }
      else cuerpo.pro_categoria = cacheManCat;
    }
    dataFinal.push( cuerpo );
	}
  //dataFinal = _.orderBy( dataFinal, ['idAleatorio'], ['desc'])
	return res.ok({ status:200, data:dataFinal, count: resultado.count } );
}

Procedures.comentarios = async ( id )=>{
	let resultado = await Tbltestimonio.find( { productos: id } );
	let dataFinix = [];
	dataFinix =  [
		{
			nombre: "Antonio",
			fecha: new moment().format("DD/MM/YYYY"),
			descripcion: "Producto genial muy util y facil de usar.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Carlos montaño",
			fecha: (new moment().add(-1, 'days')).format("DD/MM/YYYY"),
			descripcion: "Me Encanto en Todas Formas Recomendado.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Rafael",
			fecha: (new moment().add(-2, 'days')).format("DD/MM/YYYY"),
			descripcion: "LLego muy rapido y me encanto.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Estafany",
			fecha: (new moment().add(-3, 'days')).format("DD/MM/YYYY"),
			descripcion: "A mi esposo le gusto saludos.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Ester",
			fecha: (new moment().add(-4, 'days')).format("DD/MM/YYYY"),
			descripcion: "Es Muy Genial Gracias.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Jose",
			fecha: (new moment().add(-5, 'days')).format("DD/MM/YYYY"),
			descripcion: "Gracias Tienda Recomendado.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Olga",
			fecha: (new moment().add(-6, 'days')).format("DD/MM/YYYY"),
			descripcion: "Tenia Miedo alcomprar pero me llego bien gracias.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Cristian",
			fecha: (new moment().add(-7, 'days')).format("DD/MM/YYYY"),
			descripcion: "Gracias tienda recomendad.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Miguel",
			fecha: (new moment().add(-8, 'days')).format("DD/MM/YYYY"),
			descripcion: "Gracias me encanto.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		}
	];
	let result = _.map( resultado, ( key )=>{
		return {
			nombre: key.nombre,
			fecha: new moment( key.createdAt ).format("DD/MM/YYYY"),
			descripcion: key.descripcion,
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		}
	});
	dataFinix.push( ...result );
	return dataFinix;
}

Procedures.tridy = async (req, res) => {
//Procedures.querys = async (req, res) => {
	let params = req.allParams();
  console.log("****127")
	res.status(200).send({ status: 200, data: "ok" });
	await TblproductosServices.ProLokompro()
	return false;
	await TblproductosServices.procesoCategoria();
	await TblproductosServices.procesoProvedor();
	await TblproductosServices.nextTridy();
  return res.status(200).send( {data: "ok"})

}

module.exports = Procedures;

