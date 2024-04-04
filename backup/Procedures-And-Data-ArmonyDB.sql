USE armony;

-- AGREGAR PROCEDURE PRODSERV
-- AGREGAR PROCEDURE PROMOCIONES

/*
CREATE PROCEDURE addPilar (nom VARCHAR(15))
BEGIN
	INSERT INTO tipoPilar VALUES(NULL, nom);
END
*/
CALL addPilar("Clinica");
CALL addPilar("Spa");
CALL addPilar("Cafereria");
CALL addPilar("Wellness");
CALL addPilar("Colectivo");
CALL addPilar("Knowledge");
CALL addPilar("Emprendimiento");

CALL addMembresia(1, "PLATINUM", "a", "720:00", "1000.00");
CALL addMembresia(2, "GOLD", "a", "720:00", "2000.00");
CALL addMembresia(3, "VIP", "a", "720:00", "5000.00");

CALL addCategoria(2, "Productos", "Categoria de Venta de Productos");
CALL addCategoria(2, "Spa", "Categoria de Servicios de Spa");
CALL addCategoria(2, "Salon", "Categoria de Servicios de Salon de Estetica");

CALL addProducto("Mascarilla", 120.00, "Tratamiento facial profundo", "Spa");
CALL addProducto("Crema", 275.00, "Hidratación intensiva para la piel", "Spa");
CALL addProducto("Exfoliante", 319.00, "Remueve las células muertas y renueva la piel", "Spa");

CALL addServicio("Masajes", 250.00, "Terapias relajantes y rejuvenecedoras", "00:30", "Spa", "Spa");
CALL addServicio("Faciales", 330.00, "Tratamientos faciales revitalizantes", "00:45", "Spa", "Spa");
CALL addServicio("Baños termales", 300.00, "Exfoliación corporal rejuvenecedora", "00:25", "Spa", "Spa");

CALL addServicio("Corte de Pelo", 180.00, "Corte personalizado para damas", "00:35", "Salon", "Spa");
CALL addServicio("Manicure", 280.00, "Manicura profesional", "00:50", "Salon", "Spa");
CALL addServicio("Depilacion", 150.00, "Tratamiento facial profundo", "00:20", "Salon", "Spa");


SELECT JSON_ARRAYAGG(JSON_OBJECT( 'id', pkIdPS, 'categoria', fkCat, 'nombre', nombre, 'precio', precio, 'descripcion', descripcion )) FROM prodServ WHERE fkCat = (SELECT pkIdCategoria FROM categoria WHERE nombre = "Productos" AND fkPilar =(SELECT pkIdPilar FROM tipoPilar WHERE nombre = "Spa"));
SELECT getProducto("Spa");
SELECT * FROM tipoPilar;
SELECT * FROM membresia;
SELECT * FROM categoria;
SELECT * FROM prodServ;

/*
CREATE PROCEDURE addCita (venta INT, emp INT, sc INT, fecha DATE, horaI TIME, horaF TIME, descripcion VARCHAR(100))
BEGIN
	INSERT INTO cita VALUES(venta, emp, sc, fecha, horaI, horaF, descripcion);
END
*/

/*
CREATE DEFINER=`root`@`localhost` PROCEDURE `addDetVenta`(ps INT, venta INT, cantidad INT)
BEGIN
	DECLARE total DECIMAL(7,2);
    DECLARE promo INT UNSIGNED;
    SET promo = NULL;
    IF checkPromo(ps) > 0 THEN
		set promo = (SELECT getPromo(ps));
	END IF;
    SET total = (SELECT getPrecio(ps) * cantidad);
	INSERT INTO detalleVenta VALUES(ps, venta, promo, cantidad, total);
END
*/

/*
CREATE PROCEDURE addFav (cl INT, prod INT)
BEGIN
	INSERT INTO favoritos VALUES(cl, prod);
END
*/

/*
INVENTARIO
*/

/*
CREATE DEFINER=`root`@`localhost` PROCEDURE `delFav`(cl INT, prod INT)
BEGIN
	DELETE FROM favoritos WHERE fkCliente = cl AND fkProd = prod;
END
*/

/*
PATOLOGIAS
*/

/*
CREATE PROCEDURE addCategoria (pilar INT, nom VARCHAR(15), descr VARCHAR(50))
BEGIN
	INSERT INTO categoria VALUES(NULL, pilar, nom, descr);
END
*/

/*
CREATE PROCEDURE addProducto (nom VARCHAR(15), precio DECIMAL(7,2), descr VARCHAR(50), cat VARCHAR(15), pilar VARCHAR(15))
BEGIN
	DECLARE categ INT UNSIGNED;
    SET categ = (SELECT pkIdCategoria FROM categoria WHERE nombre = cat AND fkPilar = (SELECT pkIdPilar FROM tipoPilar WHERE nombre = pilar));
	INSERT INTO prodServ VALUES(NULL, categ, nom, precio, descr, 1, 0.0);
END
*/

/*
CREATE PROCEDURE addServicio (nom VARCHAR(15), precio DECIMAL(7,2), descr VARCHAR(50), tiempo TIME, cat VARCHAR(15), pilar VARCHAR(15))
BEGIN
	DECLARE categ INT UNSIGNED;
    SET categ = (SELECT pkIdCategoria FROM categoria WHERE nombre = cat AND fkPilar = (SELECT pkIdPilar FROM tipoPilar WHERE nombre = pilar));
	INSERT INTO prodServ VALUES(NULL, categ, nom, precio, descr, 1, 0.0, tiempo);
END
*/

/*
CREATE PROCEDURE addServEmp (emp INT, serv INT)
BEGIN
	INSERT INTO servEmp VALUES(emp, serv);
END
*/

/*
CREATE PROCEDURE delServEmp (emp INT, serv INT)
BEGIN
	DELETE FROM servEmp WHERE fkEmpleado = emp AND fkServ = serv;
END
*/

/*
CREATE PROCEDURE addSucursal (sc INT, calle VARCHAR(30), col VARCHAR(30), num VARCHAR(4), cp VARCHAR(4), hA TIME, hC TIME)
BEGIN
	INSERT INTO sucursal VALUES (NULL, calle, col, num, cp, hA, hC, 0.0);
END
*/

/*
CREATE PROCEDURE addUser (email VARCHAR(75), tel VARCHAR(10), pas VARCHAR(64), tipo TINYINT)
BEGIN
	INSERT INTO usuario VALUES(NULL, email, telefono, pass, tipo);
END
*/

/*
CREATE PROCEDURE addCliente (usuario INT, nom VARCHAR(25), ap VARCHAR(20), am VARCHAR(20))
BEGIN
	INSERT INTO cliente VALUES(usuario, NULL, nom, ap, am, NULL);
END
*/

/*
CREATE PROCEDURE addEmpleado (usuario INT, nom VARCHAR(25), ap VARCHAR(20), am VARCHAR(20), horaE TIME, horaS TIME)
BEGIN
	INSERT INTO empleado VALUES(usuario, nom, ap, am, horaE, horaS, 0.0, 1);
END
*/

/*
CREATE PROCEDURE addVal (cl INT, ps INT, fecha DATE, hora TIME, com VARCHAR(100), val DECIMAL(2,1))
BEGIN
 INSERT INTO valoracion VALUES (NULL, cl, ps, fecha, hora, com, val);
END
*/

/*
VENTA
*/

/*
CREATE PROCEDURE addMembresia (id INT, nom VARCHAR(25), descr VARCHAR(100), dur TIME, cost DECIMAL(7,2))
BEGIN
	INSERT INTO membresia VALUES(id, nom, descr, dur, cost);
END
*/