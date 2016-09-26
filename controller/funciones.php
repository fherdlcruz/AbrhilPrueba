<?php 
/**
* Clase controlador e iteración con la Base de datos
* @fherdlcruz
*/
include 'BD.php';
$bd = new DataBase();

$operacion = $_REQUEST["operacion"];

if(strcmp($operacion,'listar')==0){
	$sql = "SELECT id_trabajador,nombre, paterno, materno, (cast(datediff(DD,fecha_nacimiento,GETDATE()) / 365.25 as int)) as edad, fecha_nacimiento,fecha_regitro from trabajador_hernandez";
	$resulset  = $bd->consulta($sql);
	$data = $bd->respondeData($resulset);
	echo json_encode($data);
}

if(strcmp($operacion,'insert')==0){
	extract($_REQUEST);
	$idnew=$bd->getUltimoRegistro("id_trabajador","trabajador_hernandez");
	$fecha_format=$bd->getFormatoFecha($fecha_nacimiento);
	$sql="INSERT INTO trabajador_hernandez VALUES (".$idnew.",'".$nombre."','".$paterno."','".$materno."','".$fecha_format."',GETDATE())";
	$bd->ejecutar($sql);
	$sql = "SELECT * FROM trabajador_hernandez order by id_trabajador desc";
	$resulset  = $bd->consulta($sql);
	$data = $bd->respondeData($resulset);
	echo json_encode($data);
}

if(strcmp($operacion,'update')==0){
	extract($_REQUEST);
	$fecha_format=$bd->getFormatoFecha($fecha_nacimiento);	
	$sql="UPDATE trabajador_hernandez SET nombre = '".$nombre."',
	paterno = '".$paterno."',
	materno = '".$materno."',
	fecha_nacimiento = '".$fecha_format."' WHERE id_trabajador = '".$id_trabajador."'";
	$bd->ejecutar($sql);
	$sql = "SELECT * FROM trabajador_hernandez where id_trabajador = '".$id_trabajador."'";
	$resulset  = $bd->consulta($sql);
	$data = $bd->respondeData($resulset);
	echo json_encode($data);
}

if(strcmp($operacion,'delete')==0){
	extract($_REQUEST);
	$sql = "DELETE FROM trabajador_hernandez WHERE id_trabajador = ".$id_trabajador."";
	$bd->ejecutar($sql);
	$sql = "SELECT * FROM trabajador_hernandez";
	$resulset  = $bd->consulta($sql);
	$data = $bd->respondeData($resulset);
	echo json_encode($data);
}

?>