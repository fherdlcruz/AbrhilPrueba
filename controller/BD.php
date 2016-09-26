<?php
/**
* Clase de conexión a la Base de datos
* @fherdlcruz
*/
class DataBase
{
	
    private $conexion;

    public function DataBase() {
        if (!isset($this->conexion)) {
            $this->conexion = (odbc_connect("conexionphp", "fherdlcruz", "12345")) or die(odbc_error());
        }
    }

	public function consulta($sql){
		$resultado=odbc_exec($this->conexion,$sql);
		return $resultado;		
	}

	public function ejecutar($sql){
		$stmt=odbc_prepare($this->conexion,$sql);
		odbc_execute($stmt);
	}

	public function respondeData($data){
		$rows=array();
		while($fila=odbc_fetch_object($data)){
			$rows[]=$fila;
		}
		return $rows;
	}

	public function getFormatoFecha($fecha){
		$dateFormat= mb_substr($fecha, 3,21);
		$sql="SELECT convert(DATETIME,'".$dateFormat."', 9)";
		$result=odbc_exec($this->conexion,$sql);
		$mydate="";
		while(odbc_fetch_row($result)){
		    for($i=1;$i<=odbc_num_fields($result);$i++){
		        $mydate=(odbc_result($result,$i));
		    }
		}
		return $dateFormat;
	}

	public function getUltimoRegistro($column, $table){
		$sql="SELECT (SELECT max($column)) AS id FROM $table";
		$result=odbc_exec($this->conexion,$sql);
		$newId=0;
		while(odbc_fetch_row($result)){
		    for($i=1;$i<=odbc_num_fields($result);$i++){
		        $newId=(odbc_result($result,$i)+1);
		    }
		}
		return $newId;
	}
}
?>
