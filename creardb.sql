CREATE TABLE Producto (
	meli_id TEXT NOT NULL UNIQUE,
   	precio REAL NOT NULL,
	nombre TEXT NOT NULL 
);

-- Insertar datos en la tabla Producto
-- INSERT INTO Producto (nombre, precio) VALUES ("MLA20013277", NULL);

SELECT * FROM Producto;