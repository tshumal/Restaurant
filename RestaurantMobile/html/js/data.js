function listReservas(){
	//var data = restaurant.listReservas();
	var data = '[{"id":1,"sucursal":{"id":1,"nombre":"Galerias","telefono":"0313155970","direccion":"CL 53 No 27 - 16","latitud":4.642279,"longitud":-74.076621,"imagen":"restaurant.png"},"numPersonas":4,"fecha":1335762000000},{"id":2,"sucursal":{"id":3,"nombre":"Nicolas Federman","telefono":"0313155970","direccion":"Calle 53A # 35-2 a 35-100","latitud":4.64368,"longitud":-74.080639,"imagen":"restaurant.png"},"numPersonas":8,"fecha":1336798800000}]';
	var json = $.parseJSON(data);
	$('#listReservas').empty();
	$.each(json, function(i,reserva) {
		var fecha = new Date(reserva.fecha);
		var date = fecha.getDate() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getFullYear();		
		$('#listReservas').append("<li><a id=\"res_"+reserva.id+"\" href=\"detalleReserva.html\"><h1>Reserva "+reserva.sucursal.nombre+"</h1><p>"+date+"</p></a></li>");    	
   });
}

function enumSucursales(){
	//var data = restaurant.listSucursales();
	var data = '[{"id":1,"nombre":"Galerias","telefono":"0313155970","direccion":"CL 53 No 27 - 16","latitud":4.642279,"longitud":-74.076621,"imagen":"restaurant.png"},{"id":2,"nombre":"Pablo VI","telefono":"0313155970","direccion":"Calle 56B # 53A-1 a 53A-99","latitud":4.649567,"longitud":-74.087859,"imagen":"restaurant.png"},{"id":3,"nombre":"Nicolas Federman","telefono":"0313155970","direccion":"Calle 53A # 35-2 a 35-100","latitud":4.64368,"longitud":-74.080639,"imagen":"restaurant.png"},{"id":4,"nombre":"Uniandes","telefono":"0313155970","direccion":"Calle 19A # 1E-2 a 1E-100","latitud":4.60206,"longitud":-74.064503,"imagen":"restaurant.png"},{"id":5,"nombre":"La Pola","telefono":"0313155970","direccion":"Carrera 1 # 18A-1 a 18A-99","latitud":4.601418,"longitud":-74.066391,"imagen":"restaurant.png"}]';
	var json = $.parseJSON(data);
	$.each(json, function(i,sucursal) {				
		$('#add-select-sucursal').append("<option value=\""+sucursal.id+"\">"+sucursal.nombre+"</option>");    	
   });
}

function listSucursales(){
	//var data = restaurant.listSucursales();
	var data = '[{"id":1,"nombre":"Galerias","telefono":"0313155970","direccion":"CL 53 No 27 - 16","latitud":4.642279,"longitud":-74.076621,"imagen":"restaurant.png"},{"id":2,"nombre":"Pablo VI","telefono":"0313155970","direccion":"Calle 56B # 53A-1 a 53A-99","latitud":4.649567,"longitud":-74.087859,"imagen":"restaurant.png"},{"id":3,"nombre":"Nicolas Federman","telefono":"0313155970","direccion":"Calle 53A # 35-2 a 35-100","latitud":4.64368,"longitud":-74.080639,"imagen":"restaurant.png"},{"id":4,"nombre":"Uniandes","telefono":"0313155970","direccion":"Calle 19A # 1E-2 a 1E-100","latitud":4.60206,"longitud":-74.064503,"imagen":"restaurant.png"},{"id":5,"nombre":"La Pola","telefono":"0313155970","direccion":"Carrera 1 # 18A-1 a 18A-99","latitud":4.601418,"longitud":-74.066391,"imagen":"restaurant.png"}]';
	var json = $.parseJSON(data);
	$.each(json, function(i,sucursal) {				
		$('#listSucursales').append("<li><a id=\"suc_"+sucursal.id+"\" href=\"detalleSucursal.html\"><img src=\"../img/restaurant.png\"/><h1>"+sucursal.nombre+"</h1><p>"+sucursal.direccion+"</p></a></li>");
		
   });
}

function listSucursalesCercanos(){
	//var data = restaurant.listSucursalesCercanos();
	var data = '[{"id":1,"nombre":"Galerias","telefono":"0313155970","direccion":"CL 53 No 27 - 16","latitud":4.642279,"longitud":-74.076621,"imagen":"restaurant.png"},{"id":2,"nombre":"Pablo VI","telefono":"0313155970","direccion":"Calle 56B # 53A-1 a 53A-99","latitud":4.649567,"longitud":-74.087859,"imagen":"restaurant.png"},{"id":3,"nombre":"Nicolas Federman","telefono":"0313155970","direccion":"Calle 53A # 35-2 a 35-100","latitud":4.64368,"longitud":-74.080639,"imagen":"restaurant.png"},{"id":4,"nombre":"Uniandes","telefono":"0313155970","direccion":"Calle 19A # 1E-2 a 1E-100","latitud":4.60206,"longitud":-74.064503,"imagen":"restaurant.png"},{"id":5,"nombre":"La Pola","telefono":"0313155970","direccion":"Carrera 1 # 18A-1 a 18A-99","latitud":4.601418,"longitud":-74.066391,"imagen":"restaurant.png"}]';
	var json = $.parseJSON(data);
	$.each(json, function(i,sucursal) {				
		$('#listSucursalesCercanos').append("<li><a id=\"suc_"+sucursal.id+"\" href=\"detalleSucursal.html\"><img src=\"../img/restaurant.png\"/><h1>"+sucursal.nombre+"</h1><p>"+sucursal.direccion+"</p></a></li>");
		
   });
}

function getReserva(idReserva){
	var substr = idReserva.split('_');
	var id = substr[1];
	//var data = restaurant.getReserva(id);
	var data = '{"id":2,"sucursal":{"id":3,"nombre":"Nicolas Federman","telefono":"0313155970","direccion":"Calle 53A # 35-2 a 35-100","latitud":4.64368,"longitud":-74.080639,"imagen":"restaurant.png"},"numPersonas":8,"fecha":1336798800000}';
	var reserva = $.parseJSON(data);
	var fecha = new Date(reserva.fecha);
	var date = fecha.getDate() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getFullYear();
	$('#hdnIdReserva').attr("value",reserva.id)
	$('#resFechaDetalle').empty();
	$('#resFechaDetalle').append(date);
	$('#resNumDetalle').empty();
	$('#resNumDetalle').append(reserva.numPersonas);
	$('#resSucursalDetalle1').empty();
	$('#resSucursalDetalle1').append(reserva.sucursal.nombre);
	$('#resSucursalDetalle2').empty();
	$('#resSucursalDetalle2').append(reserva.sucursal.nombre);
}

function getSucursal(idSucursal){
	var substr = idSucursal.split('_');
	var id = substr[1];
	//var data = restaurant.getSucursal(id);
	var data = '{"id":5,"nombre":"La Pola","telefono":"0313155970","direccion":"Carrera 1 # 18A-1 a 18A-99","latitud":4.601418,"longitud":-74.066391,"imagen":"restaurant.png"}';
	var sucursal = $.parseJSON(data);
	
	$('#hdnIdSucursal').attr("value",sucursal.id)
	$('#sucNombreDetalle').empty();
	$('#sucNombreDetalle').append(sucursal.nombre);
	$('#sucTelDetalle').empty();
	$('#sucTelDetalle').append(sucursal.telefono);
	$('#sucDirDetalle').empty();
	$('#sucDirDetalle').append(sucursal.direccion);
}