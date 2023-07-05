let Procedures = Object();
const _ = require('lodash');

Procedures.nextTridy = async ()=>{
	let resultado = Object();
	resultado = await Procedures.provedor();
	/*let data1 = [ { id_tienda:8368 } ];
	resultado = data1;*/
	for( let row of resultado ){
		row.articulos = ( await Procedures.articuloProvedor( row.id_tienda ) ) || [];
		//console.log("*********", row)
	}
	console.log("*****1333333", resultado.length )
	for (let row of resultado ){
		console.log("///////////////", row.articulos.length )
		if( !row.articulos ) continue;
		for( let key of row.articulos ){
			let detalle = ( await Procedures.getArticulosDetalles( key.id_producto ) ) || false;
			detalle = detalle[0];
			//console.log("*************", detalle )
			try {
				let data = {
					"id": detalle.id_producto,
					"pro_nombre": detalle.nombre,
					"foto": detalle.imagen,
					"pro_descripcion": detalle.descripcion + "  "+ detalle.modo_uso || '',
					"cat_clave_int": 1,
					"pro_activo": 1,
					"pro_mostrar_agotado": 0,
					"pro_descripcionbreve": "",
					"pro_codigo": _.camelCase( ( _.split(detalle.nombre, "-") ) [0] ) || detalle.id_producto,
					"pro_usu_creacion": detalle.id_tienda,
					"pro_usu_actualiz": "",
					"pro_fec_actualiz": "",
					"pro_uni_compra": 0,
					"pro_pes_compra": 0,
					"pro_unidad_disponible": 0,
					"pro_mu_compra": 0,
					"pro_mp_compra": detalle.costo,
					"pro_uni_venta": Number( detalle.precio_venta ) + 5000 ,
					"pro_marca": detalle.tiendas_que_lo_venden, // empresa que lo vende
					"pro_pes_venta": 0,
					"pro_mu_venta": detalle.total_vendidos, // total vendios
					"pro_mp_venta": 0,
					"pro_reserva": 0,
					"pro_estado": 0,
					"pro_tamano": detalle.alto,
					"pro_kilo": 0,
					"pro_und_kilo": 0,
					"pro_precio_venta_cliente": 0,
					"tit_clave_int": 0,
					"listColor": null,
					"checkMayor": 0,
					"listPrecios": null,
					"pro_categoria": detalle.id_categoria || 2,
					"pro_sw_tallas": 1
				}
				let filtro = await Tblproductos.find( { where: { id: detalle.id_producto } } );
				filtro = filtro[0];
				//console.log("*****111", filtro )

				if( !filtro ) { console.log("*****62 Creando..........." ); await Procedures.createImage( detalle.id_producto ); await Tblproductos.create( data );}
				else {
					console.log("*****64 Actualizar..........." );
					await Tblproductos.update( { id: detalle.id_producto },
						{
							pro_mu_venta: data.pro_mu_venta,
							//pro_categoria: data.pro_categoria,
							pro_marca: data.pro_marca,
							pro_uni_venta: data.pro_uni_venta,
							pro_mp_compra: data.pro_mp_compra,
							pro_descripcion: data.pro_descripcion,
							foto: data.foto,
							pro_nombre: data.pro_nombre,
							pro_codigo: _.camelCase( ( _.split(detalle.nombre, "-") ) [0] ),
							pro_usu_creacion: data.pro_usu_creacion,
						}
					);
				}
			} catch (error) {

			}
		}
	}
	console.log("******Completado...........")
	return true;
}

Procedures.createImage = async( id )=>{
	let resultado = Object();
	let galeria = await Procedures.GetGaleriaProducto( id );
	for( let row of galeria ){
		resultado = await Tblproductosimagen.create(
			{
				producto: id,
				pri_imagen: row.url_imagen,
				id: row.id_imagen
			}
		);
	}
	return true;
}

Procedures.ProLokompro = async( )=>{
	let resultado = Object();
  console.log("***ENTRE")
	resultado = await Procedures.getLokompro();
	console.log("*************107", resultado.data.length);
	for( let row of resultado.data ){
		try {
			let data = {
				"pro_nombre": row.pro_nombre,
				"foto": row.foto,
				"pro_descripcion": row.pro_descripcion,
				"cat_clave_int": row.cat_clave_int,
				"pro_activo": row.pro_activo,
				"pro_mostrar_agotado": row.pro_mostrar_agotado,
				"pro_descripcionbreve": row.pro_descripcionbreve,
				"pro_codigo": row.pro_codigo,
				"pro_usu_creacion": row.pro_usu_creacion.id,
				"pro_usu_actualiz": row.pro_usu_actualiz,
				"pro_fec_actualiz": row.pro_fec_actualiz,
				"pro_uni_compra": row.pro_uni_compra,
				"pro_pes_compra": row.pro_pes_compra,
				"pro_unidad_disponible": row.pro_unidad_disponible,
				"pro_mu_compra": row.pro_mu_compra,
				"pro_mp_compra": row.pro_mp_compra,
				"pro_uni_venta": row.pro_uni_venta,
				"pro_marca": row.pro_marca,
				"pro_pes_venta": row.pro_pes_venta,
				"pro_mu_venta": row.pro_mu_venta,
				"pro_mp_venta": row.pro_mp_venta,
				"pro_reserva": row.pro_reserva,
				"pro_estado": row.pro_estado,
				"pro_tamano": row.pro_tamano,
				"pro_kilo": row.pro_kilo,
				"pro_und_kilo": row.pro_und_kilo,
				"pro_precio_venta_cliente": row.pro_precio_venta_cliente,
				"tit_clave_int": row.tit_clave_int,
				"listColor": row.listColor,
				"checkMayor": row.checkMayor,
				"listPrecios": row.listPrecios,
				"pro_categoria": row.pro_categoria.id,
				"pro_sw_tallas": row.pro_sw_tallas1,
				pro_sub_categoria: row.pro_sub_categoria,
				listaGaleria: row.listaGaleria,
				listDetalles: row.listDetalles,
				pro_vendedor: row.pro_vendedor,
				listaTallas: row.listaTallas
			}
			//let filtro = await Tblproductos.find( { where: { id: row.id_producto } } );
      let filtro = []
			filtro = filtro[0];
			//console.log("*****111", filtro )
			console.log("*****153 ENTRAndo...........", data);

			if( !filtro ) {
        console.log("CREANDI");
        let resul = await Tblproductos.create( data );
				console.log("*****150 Creando...........", resul);}
			else {
				console.log("*****64 Actualizar..........." );
				await Tblproductos.update( { pro_nombre: row.pro_nombre },
					{
						pro_mu_venta: data.pro_mu_venta,
						//pro_categoria: data.pro_categoria,
						pro_marca: data.pro_marca,
						pro_uni_venta: data.pro_uni_venta,
						pro_mp_compra: data.pro_mp_compra,
						pro_descripcion: data.pro_descripcion,
						foto: data.foto,
						pro_nombre: data.pro_nombre,
						//pro_codigo: _.camelCase( ( _.split(row.nombre, "-") ) [0] ),
						pro_usu_creacion: data.pro_usu_creacion,
					}
				);
			}
		} catch (error) {
      console.log("****EL ERROR", error)
		}
	}
}

Procedures.getLokompro = async()=>{
	let resultado = Array();
	let url = `https://lokomproaqui.herokuapp.com/tblproductos/querys`;
	let headers = {
		'Connection': 'keep-alive',
		'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
		'Accept': 'application/json, text/plain, */*',
		'Content-Type': 'application/json',
		'sec-ch-ua-mobile': '?0',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
		'sec-ch-ua-platform': '"Windows"',
		'Origin': 'https://lokomproaqui.com',
		'Sec-Fetch-Site': 'cross-site',
		'Sec-Fetch-Mode': 'cors',
		'Sec-Fetch-Dest': 'empty',
		'Referer': 'https://lokomproaqui.com/',
		'Accept-Language': 'es-US,es-419;q=0.9,es;q=0.8,en;q=0.7,und;q=0.6,pl;q=0.5,pt;q=0.4',
		'Cookie': 'sails.sid=s%3AE6n8Hn9mZtp4HfZ9GILhy4NJhlZgUmc6.bIvVeOFkguQgG3wMfEZjYZhDajhIXuwizOViT8Qff44'
	};
	let body = JSON.stringify({
		"where": {
		  "pro_activo": 0,
      "id":429,
		  "pro_mp_venta": 0
		},
		"page": 0,
		"limit": 1000000,
		"skip": 0
	  });

	resultado = await HttpService.request(url, body, false, headers, {}, 'POST');
	//console.log("************", resultado)
	try {
		return JSON.parse( resultado ) || [];
	} catch (error) {
		return [];
	}
}

Procedures.getArticulos = async () => {
	let resultado = Array();
	let url = `https://triidy.info/serviciosTriidy/Servicio.asmx/GetProductosPrivados?id_tienda=9289&token=jq2gh66o6dxr.54&codigo_pais=57`;
	let headers = {
		'authority': 'triidy.info',
		'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
		'accept': 'application/json, text/plain, */*',
		'sec-ch-ua-mobile': '?0',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
		'sec-ch-ua-platform': '"Windows"',
		'origin': 'https://triidy.com',
		'sec-fetch-site': 'cross-site',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'referer': 'https://triidy.com/',
		'accept-language': 'es-US,es-419;q=0.9,es;q=0.8,en;q=0.7,und;q=0.6,pl;q=0.5,pt;q=0.4',
		'Cookie': 'AWSALB=ZJvDw6oRA6uP2RQJRGQB8IgQP4a3ES4NyPsC3u8gdYnUJ2/prU4sfvnOI0wlI8m3MLFON4PfZ4cV6T1QvD5CAeVw1DIvQJyvc7wZeWn5IYugdI+Ne5fzDuOwDbFf; AWSALBCORS=ZJvDw6oRA6uP2RQJRGQB8IgQP4a3ES4NyPsC3u8gdYnUJ2/prU4sfvnOI0wlI8m3MLFON4PfZ4cV6T1QvD5CAeVw1DIvQJyvc7wZeWn5IYugdI+Ne5fzDuOwDbFf'
	};

	resultado = await HttpService.request(url, "", false, headers, {}, 'GET');
	//console.log("************", resultado)
	try {
		return JSON.parse(resultado) || [];
	} catch (error) {
		return [];
	}
}

Procedures.provedor = async () => {
	let resultado = Object();

	let url = "https://triidy.info/serviciosTriidy/Servicio.asmx/GetProveedor?id_tienda=9289&token=jq2gh66o6dxr.54&nombre_pais=Colombia";
	let headers = {
		'authority': 'triidy.info',
		'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
		'accept': 'application/json, text/plain, */*',
		'sec-ch-ua-mobile': '?0',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
		'sec-ch-ua-platform': '"Windows"',
		'origin': 'https://triidy.com',
		'sec-fetch-site': 'cross-site',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'referer': 'https://triidy.com/',
		'accept-language': 'es-US,es-419;q=0.9,es;q=0.8,en;q=0.7,und;q=0.6,pl;q=0.5,pt;q=0.4',
		'Cookie': 'AWSALB=qGd/r1WqIzco1IfrDbdXvqA9bX8C545Ifpuavrluef1Z6lwIjLgdhQuVlhetxIyo0UvWAksU6zpuKwbA+pvXXzfywJIcdu0Ld9n7fhqpvQ0XMilmhvQ+lYmysiRn; AWSALBCORS=qGd/r1WqIzco1IfrDbdXvqA9bX8C545Ifpuavrluef1Z6lwIjLgdhQuVlhetxIyo0UvWAksU6zpuKwbA+pvXXzfywJIcdu0Ld9n7fhqpvQ0XMilmhvQ+lYmysiRn'
	};

	resultado = await HttpService.request(url, "", false, headers, {}, 'GET');
	return JSON.parse(resultado) || [];


}

Procedures.articuloProvedor = async (id) => {
	let resultado = Object();
	let url = `https://triidy.info/serviciosTriidy/Servicio.asmx/GetCatalogo?id_proveedor=${id}&id_tienda_logueada=9289&token=jq2gh66o6dxr.55&tipo=Tienda&codigo_pais=57`;
	let headers = {
		'authority': 'triidy.info',
		'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
		'accept': 'application/json, text/plain, */*',
		'sec-ch-ua-mobile': '?0',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
		'sec-ch-ua-platform': '"Windows"',
		'origin': 'https://triidy.com',
		'sec-fetch-site': 'cross-site',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'referer': 'https://triidy.com/',
		'accept-language': 'es-US,es-419;q=0.9,es;q=0.8,en;q=0.7,und;q=0.6,pl;q=0.5,pt;q=0.4',
		'Cookie': 'AWSALB=dYYkSJGLyuBBv+P5MLs74O8rrwYiv7zoSOUUJCXGuswCsmiUarqkStPijJN12NPcdtnZxIvyKFleoOY2iimpnKLU+qYqeqazwLTfqQDlZASOAqQNqSivnE2jf3pi; AWSALBCORS=dYYkSJGLyuBBv+P5MLs74O8rrwYiv7zoSOUUJCXGuswCsmiUarqkStPijJN12NPcdtnZxIvyKFleoOY2iimpnKLU+qYqeqazwLTfqQDlZASOAqQNqSivnE2jf3pi'
	};

	resultado = await HttpService.request(url, "", false, headers, {}, 'GET');
	//console.log("************", resultado)
	try {
		return JSON.parse(resultado) || [];
	} catch (error) {
		return [];
	}
}

Procedures.getArticulosDetalles = async ( id ) => {
	let resultado = Array();
	let url = `https://triidy.info/serviciosTriidy/Servicio.asmx/GetProducto?id=${ id }&token=jq2gh66o6dxr.54`;
	let headers = {
		'authority': 'triidy.info',
		'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
		'accept': 'application/json, text/plain, */*',
		'sec-ch-ua-mobile': '?0',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
		'sec-ch-ua-platform': '"Windows"',
		'origin': 'https://triidy.com',
		'sec-fetch-site': 'cross-site',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'referer': 'https://triidy.com/',
		'accept-language': 'es-US,es-419;q=0.9,es;q=0.8,en;q=0.7,und;q=0.6,pl;q=0.5,pt;q=0.4',
		'Cookie': 'AWSALB=zxWPPHJxI34x1dwlAbTIPJS20zfRXSt44edXE7hna0IFsBP6NHXhpA8b1XqKDvqe5CH3HpfR0JEAQIiBs7pVvb+kQMK6uy02k1EC4LytKRpmvy6RB5KPItZGs3UG; AWSALBCORS=zxWPPHJxI34x1dwlAbTIPJS20zfRXSt44edXE7hna0IFsBP6NHXhpA8b1XqKDvqe5CH3HpfR0JEAQIiBs7pVvb+kQMK6uy02k1EC4LytKRpmvy6RB5KPItZGs3UG'
	};

	resultado = await HttpService.request(url, "", false, headers, {}, 'GET');
	//console.log("************", resultado)
	try {
		return JSON.parse(resultado) || [];
	} catch (error) {
		return [];
	}
}

Procedures.procesoCategoria = async()=>{
	let resultado = Object();
	resultado = await Procedures.GetCategorias();
	if( !resultado[0] ) return false;
	for( let row of resultado ){
		let filtro = await Tblcategorias.find( { id: row.id_categoria } );
		filtro = filtro[0];
		if( filtro ) {
			await Tblcategorias.update( { id: row.id_categoria }, { cat_nombre: row.nombre } )
		}else{
			console.log("************",{
				id: row.id_categoria,
				cat_nombre: row.nombre,
				cat_palabra: _.toLower( row.nombre ),
				cat_descripcion: row.nombre,
				cat_usu_actualiz: 1
			})
			await Tblcategorias.create( {
				id: row.id_categoria,
				cat_nombre: row.nombre,
				cat_palabra: _.toLower( row.nombre ),
				cat_descripcion: row.nombre,
				cat_usu_actualiz: 1
			});
		}
	}
	return true;
}

Procedures.GetCategorias = async( )=>{
	let resultado = Array();
	let url = `https://triidy.info/serviciosTriidy/Servicio.asmx/GetCategoriaProductos?token=jq2gh66o6dxr.54`;
	let headers = {
		'authority': 'triidy.info',
		'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
		'accept': 'application/json, text/plain, */*',
		'sec-ch-ua-mobile': '?0',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
		'sec-ch-ua-platform': '"Windows"',
		'origin': 'https://triidy.com',
		'sec-fetch-site': 'cross-site',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'referer': 'https://triidy.com/',
		'accept-language': 'es-US,es-419;q=0.9,es;q=0.8,en;q=0.7,und;q=0.6,pl;q=0.5,pt;q=0.4',
		'Cookie': 'AWSALB=dvuerNQYJs8t3oAYkc+v2xzLCZEqyWwkjc6omOni38C6SRUE9DKG/Jyb1sOtpIWOcjQQ1kUQWpjW4lKfydFled15TtGvti57drn35A2YE3T+Cpui3HDw2pHS3MMl; AWSALBCORS=dvuerNQYJs8t3oAYkc+v2xzLCZEqyWwkjc6omOni38C6SRUE9DKG/Jyb1sOtpIWOcjQQ1kUQWpjW4lKfydFled15TtGvti57drn35A2YE3T+Cpui3HDw2pHS3MMl'
	};

	resultado = await HttpService.request(url, "", false, headers, {}, 'GET');
	//console.log("************", resultado)
	try {
		return JSON.parse(resultado) || [];
	} catch (error) {
		return [];
	}
}

Procedures.procesoProvedor = async()=>{
	let resultado = Object();
	resultado = await Procedures.GetProvedor();
	if( !resultado[0] ) return false;
	for( let row of resultado ){
		let filtro = await Tblproveedor.find( { id: row.id_tienda } );
		filtro = filtro[0];
		if( filtro ) {
			await Tblproveedor.update( { id: row.id_tienda }, { cat_nombre: row.nombre } )
		}else{
			await Tblproveedor.create( {
				id: row.id_tienda,
				prv_nombre: row.nombre_tienda,
				prv_email: _.toLower( row.nombre_tienda ),
				prv_nro_docum: row.logo,
			});
		}
	}
	return true;
}

Procedures.GetGaleriaProducto = async( id )=>{
	let resultado = Array();
	let url = `https://triidy.info/serviciosTriidy/Servicio.asmx/GetImagenProducto?id_producto=${ id }&token=jq2gh66o6dxr.54`;
	let headers = {
		'authority': 'triidy.info',
		'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
		'accept': 'application/json, text/plain, */*',
		'sec-ch-ua-mobile': '?0',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
		'sec-ch-ua-platform': '"Windows"',
		'origin': 'https://triidy.com',
		'sec-fetch-site': 'cross-site',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'referer': 'https://triidy.com/',
		'accept-language': 'es-US,es-419;q=0.9,es;q=0.8,en;q=0.7,und;q=0.6,pl;q=0.5,pt;q=0.4',
		'Cookie': 'AWSALB=C8qw6c9yrQNHMIYrqScuLg8weIU0SZu6SbM2vjNcV7Wbbpp65ewxHlPZYj4nGoFYrwtSawLkXaI/QCYie8DwKRYl0H5+jGEOdO+DOI+qUpOAe7v4Wcm1m/KbprOu; AWSALBCORS=C8qw6c9yrQNHMIYrqScuLg8weIU0SZu6SbM2vjNcV7Wbbpp65ewxHlPZYj4nGoFYrwtSawLkXaI/QCYie8DwKRYl0H5+jGEOdO+DOI+qUpOAe7v4Wcm1m/KbprOu'
	};

	resultado = await HttpService.request(url, "", false, headers, {}, 'GET');
	//console.log("************", resultado)
	try {
		return JSON.parse(resultado) || [];
	} catch (error) {
		return [];
	}
}

Procedures.GetProvedor = async( )=>{
	let resultado = Array();
	let url = `https://triidy.info/serviciosTriidy/Servicio.asmx/GetProveedor?id_tienda=9289&token=jq2gh66o6dxr.54&nombre_pais=Colombia`;
	let headers = {
		'authority': 'triidy.info',
		'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
		'accept': 'application/json, text/plain, */*',
		'sec-ch-ua-mobile': '?0',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
		'sec-ch-ua-platform': '"Windows"',
		'origin': 'https://triidy.com',
		'sec-fetch-site': 'cross-site',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'referer': 'https://triidy.com/',
		'accept-language': 'es-US,es-419;q=0.9,es;q=0.8,en;q=0.7,und;q=0.6,pl;q=0.5,pt;q=0.4',
		'Cookie': 'AWSALB=NpaBWkSWt9D45SvRx2Z54HTC4a2PdpYr1pN/SLgVFtVFAqZtP0ySqIGge/uycJTaHmN8czJ6pNbN60c7kMCozESTCaQzE/L/DoVD3PKdRYK4Afap+ckmOnO5PnhK; AWSALBCORS=NpaBWkSWt9D45SvRx2Z54HTC4a2PdpYr1pN/SLgVFtVFAqZtP0ySqIGge/uycJTaHmN8czJ6pNbN60c7kMCozESTCaQzE/L/DoVD3PKdRYK4Afap+ckmOnO5PnhK'
	};

	resultado = await HttpService.request(url, "", false, headers, {}, 'GET');
	//console.log("************", resultado)
	try {
		return JSON.parse(resultado) || [];
	} catch (error) {
		return [];
	}
}

module.exports = Procedures;
