CREATE DATABASE Datos_Login

USE Datos_Login

CREATE TABLE Usuarios_Registrados(
ID_User INT PRIMARY KEY IDENTITY (1,1),
Usuario VARCHAR (100) NOT NULL,
Correo_Electronico VARCHAR (100) NOT NULL,
Contraseña VARCHAR (100) NOT NULL
);