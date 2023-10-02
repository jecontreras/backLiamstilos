var jwt = require('jsonwebtoken');
const _ = require('lodash');

let Procedures = Object();
let Storage = {
  products: Array(),
  categorias: Array(),
  user: Array(),
  tallas: Array()
};
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
setTimeout(()=> Procedures.aleatorioList('products'), 3600*2 )
setTimeout(()=> Procedures.aleatorioList('priceArticle'), 3600*2 )
/*setTimeout(()=> aleatorioList('products'), 2000 )
setTimeout(()=> aleatorioList('priceArticle'), 2000 )*/
Procedures.aleatorioList = ( model )=>{
  if( model === 'products') {
    for( let row of Storage.products ) row.idAleatorio = getRandomInt(1000000000000);
    Storage.products = _.orderBy( Storage.products, ['idAleatorio'], ['desc']);
    console.log("*****23 ALEATORIO PRODUCTOS **************************");
  }
}
Procedures.loadDBS = async(model)=>{
  if( model === 'products') {
    try {
      Storage.products = await Tblproductos.find();
    } catch (error) {}
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>CARGADO PRODUCTO AL CACHE", Storage.products.length );
    Procedures.aleatorioList('products')
  }
  if( model === 'categorias') {
    try {
      Storage.categorias = await Tblcategorias.find( );
    } catch (error) {}
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>CARGADO CATEGORIAS AL CACHE", Storage.categorias.length );
  }
  if( model === 'user') {
    try {
      Storage.user = await Tblusuario.find( );
    } catch (error) {}
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>CARGADO USUARIO AL CACHE", Storage.user.length );
  }
  if( model === 'tallas') {
    try {
      Storage.tallas = await Tbltallas.find( );
    } catch (error) {}
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>CARGADO TALLAS AL CACHE", Storage.tallas.length );
  }
  return true;
}

Procedures.leer = async( opt )=>{
    //console.log("***QUE LLEGO", opt, Storage.products.length )
    return Storage[opt];
}

Procedures.read = async( id, opt )=>{
    let filtro = Storage[opt].find( row => row.id == id );
    return filtro || {};
}

Procedures.filterProcess= ( cacheMan, params, model )=>{
  let ProcessItem = Object.keys( params.where );
  let dataFinix = cacheMan;
  //console.log("***ENTRE Cantidad Lista ");
  if(model === 'products' && params.where.id >=0 ) dataFinix = dataFinix.filter( item=> item.id == params.where.id );
  if(model === 'products' && params.where.pro_categoria >=0 ) dataFinix = dataFinix.filter( item=> item.pro_categoria == params.where.pro_categoria );
  try {
    if(model === 'products' && ( params.where.pro_usu_creacion >=0 || params.where.pro_usu_creacion['!=']) ) {
      if( params.where.pro_usu_creacion['!='] ) dataFinix = dataFinix.filter( item=> item.pro_usu_creacion !== params.where.pro_usu_creacion['!='] );
      else dataFinix = dataFinix.filter( item=> item.pro_usu_creacion === params.where.pro_usu_creacion );
    }
  } catch (error) {
    if(model === 'products' && params.where.pro_usu_creacion >=0 ) dataFinix = dataFinix.filter( item=> item.pro_usu_creacion === params.where.pro_usu_creacion );
  }
  if(model === 'products' && params.where.pro_sub_categoria >=0 ) dataFinix = dataFinix.filter( item=> item.pro_sub_categoria === params.where.pro_sub_categoria );
  if(model === 'products' && params.where.pro_stado >=0 ) dataFinix = dataFinix.filter( item=> item.pro_estado === params.where.pro_estado );
  if(model === 'products' && params.where.pro_activo >=0 ) dataFinix = dataFinix.filter( item=> item.pro_activo == params.where.pro_activo );
  if(model === 'products' && params.where.pro_mp_venta >=0 ) dataFinix = dataFinix.filter( item=> item.pro_mp_venta === params.where.pro_mp_venta );
  //console.log("**30", dataFinix.length, "REsk",ProcessItem, dataFinix[0])
  return  dataFinix;
}

Procedures.paginate = (array, page_size, page_number)=>{
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

Procedures.guardar = async( data, opt )=>{
    // let filtro = Storage.find( row => row.user == data.user );
    let filtro = _.findIndex( Storage[opt], [ 'user', data.user ]);
    if( filtro >= 0 ) Storage[opt][filtro] = data;
    else Storage[opt].push( data );
}

Procedures.eliminar = async( id, opt )=>{
    let filtro = Storage[opt].filter( row => row.id !== id );
    Storage[opt] = filtro;
    return filtro;
}

Procedures.editar = async( data, id, opt )=>{
    let filtro = _.findIndex( Storage[opt], [ 'id', id ]);
    if( filtro >= 0 ) return Storage[opt][filtro] = data;
    else return "Error al actualizar";
}

Procedures.validar = async( token ) =>{
    if(!token) return { status:400, data: "Es necesario el token de autenticación" };

    token = token.replace('Bearer ', '');
    //console.log( token , "********", Storage );
    let filtro = Storage.find( row => row.tokens == token );
    if( !filtro ) return { status:401, data: "Token inválido" };


    return new  Promise( resolve =>{
        jwt.verify(token, 'Secret Password', function(err, user) {
            if (err) return resolve({ status:401, data: "Token inválido" });
            else return resolve({ status: 200, data: "Awwwww yeah!!!!" });
        })
    })
}

module.exports = Procedures;
