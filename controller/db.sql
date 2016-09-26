/**
* DB
* @fherdlcruz
*/
/*==============================================================*/
/* Data base: abrhildb                                  */
/*==============================================================*/
CREATE DATABASE abrhildb

/*==============================================================*/
/* Table: trabajador_hernandez                                  */
/*==============================================================*/
create table trabajador_hernandez (
   id_trabajador        int                  not null,
   nombre               varchar(100)         null,
   paterno              varchar(100)         null,
   materno              varchar(100)         null,
   fecha_nacimiento     datetime             null,
   fecha_regitro       datetime             null,
   constraint PK_TRABAJADOR_HERNANDEZ primary key (ID_TRABAJADOR)
)