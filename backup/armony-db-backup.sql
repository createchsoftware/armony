-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: armony
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `pkIdCategoria` int unsigned NOT NULL AUTO_INCREMENT,
  `fkPilar` int unsigned NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`pkIdCategoria`),
  KEY `FKPilar1` (`fkPilar`),
  CONSTRAINT `FKPilar1` FOREIGN KEY (`fkPilar`) REFERENCES `tipoPilar` (`pkIdPilar`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (2,2,'Productos','Categoria de Venta de Productos'),(3,2,'Spa','Categoria de Servicios de Spa'),(4,2,'Salon','Categoria de Servicios de Salon de Estetica');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cita`
--

DROP TABLE IF EXISTS `cita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cita` (
  `fkVenta` int unsigned NOT NULL,
  `fkEmpleado` int unsigned NOT NULL,
  `fkSucursal` int unsigned NOT NULL,
  `fecha` date NOT NULL,
  `horaIn` time NOT NULL,
  `horaFin` time NOT NULL,
  `Descripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`fkVenta`),
  KEY `FKEmp3` (`fkEmpleado`),
  KEY `FKSucursal3` (`fkSucursal`),
  CONSTRAINT `FKEmp3` FOREIGN KEY (`fkEmpleado`) REFERENCES `empleado` (`fkUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKSucursal3` FOREIGN KEY (`fkSucursal`) REFERENCES `sucursal` (`pkIdSucursal`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKVenta2` FOREIGN KEY (`fkVenta`) REFERENCES `venta` (`pkIdVenta`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cita`
--

LOCK TABLES `cita` WRITE;
/*!40000 ALTER TABLE `cita` DISABLE KEYS */;
/*!40000 ALTER TABLE `cita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `fkUsuario` int unsigned NOT NULL,
  `fkMembresia` int unsigned DEFAULT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellidoP` varchar(20) NOT NULL,
  `apellidoM` varchar(20) NOT NULL,
  `duracionMem` time DEFAULT NULL,
  PRIMARY KEY (`fkUsuario`),
  KEY `FKMem2` (`fkMembresia`),
  CONSTRAINT `FKMem2` FOREIGN KEY (`fkMembresia`) REFERENCES `membresia` (`pkIdMembresia`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKUser1` FOREIGN KEY (`fkUsuario`) REFERENCES `usuario` (`pkIdUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalleVenta`
--

DROP TABLE IF EXISTS `detalleVenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalleVenta` (
  `fkPS` int unsigned NOT NULL,
  `fkVenta` int unsigned NOT NULL,
  `fkPromocion` int unsigned DEFAULT NULL,
  `cantidad` int unsigned NOT NULL,
  `precio` decimal(7,2) unsigned NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`fkPS`,`fkVenta`),
  KEY `FKVenta1` (`fkVenta`),
  KEY `FKPromo1` (`fkPromocion`),
  CONSTRAINT `FKMem3` FOREIGN KEY (`fkPS`) REFERENCES `membresia` (`pkIdMembresia`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKPromo1` FOREIGN KEY (`fkPromocion`) REFERENCES `promociones` (`pkIdPromocion`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKPS4` FOREIGN KEY (`fkPS`) REFERENCES `prodServ` (`pkIdPS`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKVenta1` FOREIGN KEY (`fkVenta`) REFERENCES `venta` (`pkIdVenta`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalleVenta`
--

LOCK TABLES `detalleVenta` WRITE;
/*!40000 ALTER TABLE `detalleVenta` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalleVenta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `fkUsuario` int unsigned NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellidoP` varchar(20) NOT NULL,
  `apellidoM` varchar(20) NOT NULL,
  `horaEntrada` time NOT NULL,
  `horaSalida` time NOT NULL,
  `valoracion` decimal(2,1) NOT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`fkUsuario`),
  CONSTRAINT `FKUser2` FOREIGN KEY (`fkUsuario`) REFERENCES `usuario` (`pkIdUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritos` (
  `fkCliente` int unsigned NOT NULL,
  `fkProd` int unsigned NOT NULL,
  PRIMARY KEY (`fkCliente`,`fkProd`),
  KEY `FKProd1` (`fkProd`),
  CONSTRAINT `FKCliente2` FOREIGN KEY (`fkCliente`) REFERENCES `cliente` (`fkUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKProd1` FOREIGN KEY (`fkProd`) REFERENCES `prodServ` (`pkIdPS`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritos`
--

LOCK TABLES `favoritos` WRITE;
/*!40000 ALTER TABLE `favoritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario` (
  `fkSucursal` int unsigned NOT NULL,
  `fkPS` int unsigned NOT NULL,
  `stock` int unsigned NOT NULL,
  PRIMARY KEY (`fkSucursal`,`fkPS`),
  KEY `FKPS3` (`fkPS`),
  CONSTRAINT `FKPS3` FOREIGN KEY (`fkPS`) REFERENCES `prodServ` (`pkIdPS`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKSucursal2` FOREIGN KEY (`fkSucursal`) REFERENCES `sucursal` (`pkIdSucursal`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membresia`
--

DROP TABLE IF EXISTS `membresia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membresia` (
  `pkIdMembresia` int unsigned NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `duracion` time NOT NULL,
  `costo` decimal(7,2) NOT NULL,
  PRIMARY KEY (`pkIdMembresia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membresia`
--

LOCK TABLES `membresia` WRITE;
/*!40000 ALTER TABLE `membresia` DISABLE KEYS */;
/*!40000 ALTER TABLE `membresia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patologias`
--

DROP TABLE IF EXISTS `patologias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patologias` (
  `fkCliente` int unsigned NOT NULL,
  PRIMARY KEY (`fkCliente`),
  CONSTRAINT `FKCliente1` FOREIGN KEY (`fkCliente`) REFERENCES `cliente` (`fkUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patologias`
--

LOCK TABLES `patologias` WRITE;
/*!40000 ALTER TABLE `patologias` DISABLE KEYS */;
/*!40000 ALTER TABLE `patologias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prodServ`
--

DROP TABLE IF EXISTS `prodServ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prodServ` (
  `pkIdPS` int unsigned NOT NULL AUTO_INCREMENT,
  `fkCat` int unsigned NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `precio` decimal(7,2) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `valoracion` decimal(2,1) NOT NULL,
  `tiempo` time DEFAULT NULL,
  PRIMARY KEY (`pkIdPS`),
  KEY `FKCat1` (`fkCat`),
  CONSTRAINT `FKCat1` FOREIGN KEY (`fkCat`) REFERENCES `categoria` (`pkIdCategoria`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prodServ`
--

LOCK TABLES `prodServ` WRITE;
/*!40000 ALTER TABLE `prodServ` DISABLE KEYS */;
INSERT INTO `prodServ` VALUES (1,2,'Mascarilla',120.00,'Tratamiento facial profundo',1,0.0,NULL),(2,2,'Crema',275.00,'Hidratación intensiva para la piel',1,0.0,NULL),(3,2,'Exfoliante',319.00,'Remueve las células muertas y renueva la piel',1,0.0,NULL),(4,3,'Baños termales',300.00,'Tratamiento facial profundo',1,0.0,'00:25:00'),(5,3,'Masajes',250.00,'Terapias relajantes y rejuvenecedoras',1,0.0,'00:30:00'),(6,3,'Baños termales',300.00,'Exfoliación corporal rejuvenecedora',1,0.0,'00:25:00');
/*!40000 ALTER TABLE `prodServ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promociones`
--

DROP TABLE IF EXISTS `promociones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promociones` (
  `pkIdPromocion` int unsigned NOT NULL AUTO_INCREMENT,
  `fkMembresia` int unsigned NOT NULL,
  `fkPS` int unsigned NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `valorDescuento` decimal(7,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`pkIdPromocion`),
  KEY `FKMem1` (`fkMembresia`),
  KEY `FKPS1` (`fkPS`),
  CONSTRAINT `FKMem1` FOREIGN KEY (`fkMembresia`) REFERENCES `membresia` (`pkIdMembresia`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKPS1` FOREIGN KEY (`fkPS`) REFERENCES `prodServ` (`pkIdPS`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promociones`
--

LOCK TABLES `promociones` WRITE;
/*!40000 ALTER TABLE `promociones` DISABLE KEYS */;
/*!40000 ALTER TABLE `promociones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servEmp`
--

DROP TABLE IF EXISTS `servEmp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servEmp` (
  `fkEmpleado` int unsigned NOT NULL,
  `fkServ` int unsigned NOT NULL,
  PRIMARY KEY (`fkEmpleado`,`fkServ`),
  KEY `FKServ1` (`fkServ`),
  CONSTRAINT `FKEmp1` FOREIGN KEY (`fkEmpleado`) REFERENCES `empleado` (`fkUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKServ1` FOREIGN KEY (`fkServ`) REFERENCES `prodServ` (`pkIdPS`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servEmp`
--

LOCK TABLES `servEmp` WRITE;
/*!40000 ALTER TABLE `servEmp` DISABLE KEYS */;
/*!40000 ALTER TABLE `servEmp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursal`
--

DROP TABLE IF EXISTS `sucursal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sucursal` (
  `pkIdSucursal` int unsigned NOT NULL AUTO_INCREMENT,
  `calle` varchar(30) NOT NULL,
  `colonia` varchar(30) NOT NULL,
  `numero` varchar(4) NOT NULL,
  `codigoPostal` varchar(5) NOT NULL,
  `horaApertura` time NOT NULL,
  `horaCierre` time NOT NULL,
  `valoracion` decimal(2,1) NOT NULL,
  PRIMARY KEY (`pkIdSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursal`
--

LOCK TABLES `sucursal` WRITE;
/*!40000 ALTER TABLE `sucursal` DISABLE KEYS */;
/*!40000 ALTER TABLE `sucursal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoPilar`
--

DROP TABLE IF EXISTS `tipoPilar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoPilar` (
  `pkIdPilar` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(15) NOT NULL,
  PRIMARY KEY (`pkIdPilar`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoPilar`
--

LOCK TABLES `tipoPilar` WRITE;
/*!40000 ALTER TABLE `tipoPilar` DISABLE KEYS */;
INSERT INTO `tipoPilar` VALUES (1,'Clinica'),(2,'Spa'),(3,'Cafereria'),(4,'Wellness'),(5,'Colectivo'),(6,'Knowledge'),(7,'Emprendimiento');
/*!40000 ALTER TABLE `tipoPilar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `pkIdUsuario` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(75) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `pass` varchar(64) NOT NULL,
  `tipo` tinyint NOT NULL,
  PRIMARY KEY (`pkIdUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valoracion`
--

DROP TABLE IF EXISTS `valoracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valoracion` (
  `pkIdValoracion` int unsigned NOT NULL AUTO_INCREMENT,
  `fkCliente` int unsigned NOT NULL,
  `fkPS` int unsigned DEFAULT NULL,
  `fkSucursal` int unsigned DEFAULT NULL,
  `fkEmpleado` int unsigned DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `comentario` varchar(100) DEFAULT NULL,
  `valoracion` decimal(2,1) DEFAULT NULL,
  PRIMARY KEY (`pkIdValoracion`),
  KEY `FKCliente3` (`fkCliente`),
  KEY `FKPS2` (`fkPS`),
  KEY `FKSucursal1` (`fkSucursal`),
  KEY `FKEmp2` (`fkEmpleado`),
  CONSTRAINT `FKCliente3` FOREIGN KEY (`fkCliente`) REFERENCES `cliente` (`fkUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKEmp2` FOREIGN KEY (`fkEmpleado`) REFERENCES `empleado` (`fkUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKPS2` FOREIGN KEY (`fkPS`) REFERENCES `prodServ` (`pkIdPS`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKSucursal1` FOREIGN KEY (`fkSucursal`) REFERENCES `sucursal` (`pkIdSucursal`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valoracion`
--

LOCK TABLES `valoracion` WRITE;
/*!40000 ALTER TABLE `valoracion` DISABLE KEYS */;
/*!40000 ALTER TABLE `valoracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `pkIdVenta` int unsigned NOT NULL AUTO_INCREMENT,
  `fkCliente` int unsigned NOT NULL,
  `total` decimal(7,2) unsigned NOT NULL DEFAULT '0.00',
  `serieComprobante` varchar(18) NOT NULL,
  `impuesto` decimal(7,2) unsigned NOT NULL DEFAULT '0.00',
  `fecha` date NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`pkIdVenta`),
  KEY `FKCliente4` (`fkCliente`),
  CONSTRAINT `FKCliente4` FOREIGN KEY (`fkCliente`) REFERENCES `cliente` (`fkUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'armony'
--
/*!50003 DROP FUNCTION IF EXISTS `getProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getProducto`(pilar VARCHAR(15)) RETURNS json
    DETERMINISTIC
BEGIN
	DECLARE jsarr JSON;
	SET jsarr = (SELECT JSON_ARRAYAGG(JSON_OBJECT( 
		'id', pkIdPS, 'categoria', fkCat, 'nombre', 
		nombre, 'precio', precio, 'descripcion', descripcion )) 
	FROM prodServ WHERE fkCat = (SELECT pkIdCategoria 
		FROM categoria WHERE nombre = "Productos" AND fkPilar  = (
			SELECT pkIdPilar FROM tipoPilar WHERE nombre = pilar)));
RETURN jsarr;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getServicio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getServicio`(servicio VARCHAR(15), pilar VARCHAR(15)) RETURNS json
    DETERMINISTIC
BEGIN
	DECLARE jsarr JSON;
	SET jsarr = (SELECT JSON_ARRAYAGG(JSON_OBJECT( 
		'id', pkIdPS, 'categoria', fkCat, 'nombre', 
		nombre, 'precio', precio, 'descripcion', descripcion )) 
	FROM prodServ WHERE fkCat = (SELECT pkIdCategoria 
		FROM categoria WHERE nombre = servicio AND fkPilar  = (
			SELECT pkIdPilar FROM tipoPilar WHERE nombre = pilar)));
RETURN jsarr;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addCategoria` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addCategoria`(pilar INT, nom VARCHAR(15), descr VARCHAR(50))
BEGIN
	INSERT INTO categoria VALUES(NULL, pilar, nom, descr);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addCliente`(usuario INT, nom VARCHAR(25), ap VARCHAR(20), am VARCHAR(20))
BEGIN
	INSERT INTO cliente VALUES(usuario, NULL, nom, ap, am, NULL);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addEmpleado` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addEmpleado`(usuario INT, nom VARCHAR(25), ap VARCHAR(20), am VARCHAR(20), horaE TIME, horaS TIME)
BEGIN
	INSERT INTO empleado VALUES(usuario, nom, ap, am, horaE, horaS, 0.0, 1);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addFav` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addFav`(cl INT, ps INT)
BEGIN
	INSERT INTO favoritos VALUES(cl, ps);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addMembresia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addMembresia`(id INT, nom VARCHAR(25), descr VARCHAR(100), dur TIME, cost DECIMAL(7,2))
BEGIN
	INSERT INTO membresia VALUES(id, nom, descr, dur, cost);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addPilar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addPilar`(nom VARCHAR(15))
BEGIN
	INSERT INTO tipoPilar VALUES(NULL, nom);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addProducto`(nom VARCHAR(15), precio DECIMAL(7,2), descr VARCHAR(50), pilar VARCHAR(15))
BEGIN
	DECLARE categ INT UNSIGNED;
    SET categ = (SELECT pkIdCategoria FROM categoria WHERE nombre = "Productos" AND fkPilar = (SELECT pkIdPilar FROM tipoPilar WHERE nombre = pilar));
	INSERT INTO prodServ VALUES(NULL, categ, nom, precio, descr, 1, 0.0, NULL);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addServEmp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addServEmp`(emp INT, serv INT)
BEGIN
	INSERT INTO servEmp VALUES(emp, serv);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addServicio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addServicio`(nom VARCHAR(15), precio DECIMAL(7,2), descr VARCHAR(50), tiempo TIME, cat VARCHAR(15), pilar VARCHAR(15))
BEGIN
	DECLARE categ INT UNSIGNED;
    SET categ = (SELECT pkIdCategoria FROM categoria WHERE nombre = cat AND fkPilar = (SELECT pkIdPilar FROM tipoPilar WHERE nombre = pilar));
	INSERT INTO prodServ VALUES(NULL, categ, nom, precio, descr, 1, 0.0, tiempo);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addSucursal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addSucursal`(sc INT, calle VARCHAR(30), col VARCHAR(30), num VARCHAR(4), cp VARCHAR(4), hA TIME, hC TIME)
BEGIN
	INSERT INTO sucursal VALUES (NULL, calle, col, num, cp, hA, hC, 0.0);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addUser`(email VARCHAR(75), tel VARCHAR(10), pas VARCHAR(64), tipo TINYINT)
BEGIN
	INSERT INTO usuario VALUES(NULL, email, telefono, pass, tipo);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addValEmpleado` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addValEmpleado`(cl INT, emp INT, fecha DATE, hora TIME, com VARCHAR(100), val DECIMAL(2,1))
BEGIN
 INSERT INTO valoracion VALUES (NULL, cl, NULL, NULL, emp, fecha, hora, com, val);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addValProdServ` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addValProdServ`(cl INT, ps INT, fecha DATE, hora TIME, com VARCHAR(100), val DECIMAL(2,1))
BEGIN
 INSERT INTO valoracion VALUES (NULL, cl, ps, NULL, NULL, fecha, hora, com, val);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addValSucursal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addValSucursal`(cl INT, sc INT, fecha DATE, hora TIME, com VARCHAR(100), val DECIMAL(2,1))
BEGIN
 INSERT INTO valoracion VALUES (NULL, cl, NULL, sc, NULL, fecha, hora, com, val);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delFav` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delFav`(cl INT, prod INT)
BEGIN
	DELETE FROM favoritos WHERE fkCliente = cl AND fkProd = prod;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delServEmp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delServEmp`(emp INT, serv INT)
BEGIN
	DELETE FROM servEmp WHERE fkEmpleado = emp AND fkServ = serv;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-04 14:45:21
