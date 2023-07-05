/**
 * Tblproductos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    pro_nombre:{
        type: 'string'
    },
    pro_palabra:{
        type: 'string'
    },
    foto:{
      type: 'string'
    },
    pro_descripcion:{
        type: 'string'
    },
    pro_marca:{
        type: 'string'
    },
    pro_categoria:{
        model: 'tblcategorias'
    },
    pro_sub_categoria:{
        model: 'tblcategorias'
    },
    cat_clave_int:{
        type: 'number'
    },
    pro_activo:{
        type: 'number',
        defaultsTo: 0
    },
    pro_mostrar_agotado:{
        type: 'number'
    },
    pro_descripcionbreve:{
        type: 'string'
    },
    pro_codigo:{
        type: 'string'
    },
    pro_usu_creacion:{
        model: "tblusuario"
    },
    pro_usu_actualiz:{
        type: 'string'
    },
    pro_fec_actualiz:{
        type: 'string'
    },
    pro_uni_compra:{
        type: 'number'
    },
    pro_pes_compra:{
        type: 'number'
    },
    pro_unidad_disponible:{
        type: 'integer'
    },
    pro_mu_compra:{
        type: 'integer'
    },
    pro_mp_compra:{
        type: 'integer'
    },
    pro_uni_venta:{
        type: 'number'
    },
    pro_pes_venta:{
        type: 'number'
    },
    pro_mu_venta:{
        type: 'integer'
    },
    pro_mp_venta:{
        type: 'integer'
    },
    pro_reserva:{
        type: 'number'
    },
    pro_estado:{
        type: 'number'
    },
    pro_tamano:{
        type: 'number'
    },
    pro_kilo:{
        type: 'integer'
    },
    pro_und_kilo:{
        type: 'integer'
    },
    pro_precio_venta_cliente:{
        type: 'integer'
    },
    pro_sw_tallas:{
        model: 'tbltipotalla'
    },
    tit_clave_int:{
        type: 'number'
    },
    listColor:{
        type: 'json'
    },
    checkMayor:{
        type: 'number',
        defaultsTo: 0 // 0 inactivo, 1 activo
    },
    listPrecios:{
        type: 'json'
    },
    listaTallas:{
        type: 'json'
    },
    listaGaleria:{
        type: 'json'
    },
    listDetalles:{  // detalles del producto
        type: 'json'
    },
    pro_vendedor:{
        type: 'integer',
        defaultsTo: 0
    },
    pro_vendedorCompra:{
      type: 'integer',
      defaultsTo: 0
    }
  },

};

