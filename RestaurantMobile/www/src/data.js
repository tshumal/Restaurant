function getReserva(idReserva){
	var substr = idReserva.split('_');
	var id = substr[1];
	var data = '{"id":2,"sucursal":{"id":3,"nombre":"Nicolas Federman","telefono":"0313155970","direccion":"Calle 53A # 35-2 a 35-100","latitud":4.64368,"longitud":-74.080639,"imagen":"noimage.png"},"numPersonas":8,"fecha":1336798800000}';
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