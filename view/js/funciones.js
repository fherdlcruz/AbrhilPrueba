/**
* Construncción de Kendo Grind 
* @fherdlcruz
*/
$(function(){

	accion = { operacion : "listar" }

	var dataSource = new kendo.data.DataSource({           
		transport: {
			read: {
				url: "controller/funciones.php",
				dataType: "json",
				data : accion,
				contentType: "application/json; charset=utf-8",
				type: "GET"		
			},
			update: {	
				url: "controller/funciones.php",
				data : accion,
				dataType: "json",
				beforeSend:function(){
					$(".k-edit-form-container").append(loadingElement());
				},complete:function(){
					$(".k-loading").remove();
				}

			}
			,create: {	
				url: "controller/funciones.php",
				data : accion,
				dataType: "json",
				beforeSend:function(){
					$(".k-edit-form-container").append(loadingElement());
				},complete:function(){
					$(".k-loading").remove();
				}	
			},
			destroy:{
				url: "controller/funciones.php",
				data : { operacion : "delete" },
				dataType: "json",
				beforeSend:function(){
					$(".k-grid-content").append(loadingElement());
				},complete:function(){
					$(".k-loading").remove();
				}
			}
		},requestEnd: function(e) {

			var response = e.response
			type=e.type;
			mensa = '';

			console.log(type);

			if(type=='read' || type == undefined) return;

			if(type=='create') mensa = 'Se registro Satisfactoriamente';
			if(type=='update') mensa = 'Se modifico Satisfactoriamente';
			if(type=='destroy') mensa = 'Se elimino Satisfactoriamente';

			var mensaje = $("#msg").kendoWindow({
				title: "Mensaje",
				visible: false,
				actions: [
				"Close"
				],
				modal : true,
				width: "300px",
				height: "70px"
			}).data("kendoWindow")
			,mensaje_div=obtener_html('mensaje'),
			data_Send = {
				msg : mensa

			};
			mensaje.content(mensaje_div(data_Send));
			mensaje.open().center();  



			setTimeout(function(){
				mensaje.close();
			},3000);
			

		}
		,schema: {
			model: {
				id: "id_trabajador",
				fields: {
					nombre:{},
					paterno:{},
					materno:{},
					fecha_nacimiento:{type:"date"},
					fecha_registro:{}
				}
			}
		},
		pageSize: 10
	});



	var grid=$("#trabajadores").kendoGrid({
		dataSource: dataSource,
		columns: [             
		{ field: "nombre", title: "Nombre",width: 120 },
		{ field: "paterno" , title: "Apellido paterno",width: 90},
		{ field: "materno", title: "Apellido materno" ,width: 130}, 
		{ field: "fecha_nacimiento",title:"Fecha de nacimiento", format:"{0:yyyy-MM-dd HH:mm}",editor: dateEditor, width:60},
		{field:"",title:"Acción",width:100, 
		command: [
		{
			name: "edit",
			text: {
				edit: "Editar",
				update:"Grabar",
				cancel:"Cancelar"
			}
		},
		{
			name: "destroy",
			text: "Eliminar"
		}]}
		],
		toolbar: [
		{ name: "create", text: "Agregar trabajador" }  
		],
		groupable: {
			messages: {
				empty: "Arrastre las cabeceras para agrupar los datos"
			}
		},
		sortable: true,
		height : 600,
		resizable: true,
		filterable: {
			extra: false,
			operators: {
				string: {
					startswith: "empieze con",
				},           
			}	,
			messages: {
				info: "Ingrese dato a buscar",
				filter: "Buscar", 
				clear: "Todo"
			}     
		},

		pageable: {
			refresh: true,
			pageSizes: true,
			buttonCount: 5,
			messages:{
				display:"{0} - {1} de {2} registros",
				itemsPerPage: "registros por pagina",
				empty: "No hay registros"
			}
		},
		edit:function(e){
			if (e.model.isNew()){ 
				$(".k-window-title").text("Nuevo trabajador");
				accion.operacion="insert";	
			}else {
				$(".k-window-title").text("Editar trabajador");
				accion.operacion="update";	
			}
		},
		editable: { 
			mode: "popup",
			confirmation: "¿Seguro que quiere borrar al trabajador?" 
		}
	}).data("kendoGrid");
	$("#trabajadores").kendoTooltip({
		filter: "td:nth-child(4)",
	    position: "left",
	    content: function(e){
	    	var dataItem = $("#trabajadores").data("kendoGrid").dataItem(e.target.closest("tr"));
	        var content = "<strong>Edad : "+dataItem.edad+"</strong>";
	        return content;
	    }
	 }).data("kendoTooltip")
});

function obtener_html(htmlbody){
	return kendo.template($("#"+htmlbody).html());
}

function loadingElement() {
	return $("<div class='k-loading' precarga=\"ok\"><span class='k-loading-text'>Loading...</span><div class='k-loading-image'/><div class='k-loading-color'/></div>");
}

function dateEditor(container, options) {
    $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
            .appendTo(container)
            .kendoDateTimePicker({});

}	
