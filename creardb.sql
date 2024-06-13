CREATE TABLE Producto (
	id INTEGER PRIMARY KEY,
    meli_id TEXT NOT NULL UNIQUE,
   	precio REAL NOT NULL
);

-- Insertar datos en la tabla Producto
-- INSERT INTO Producto (nombre, precio) VALUES ("MLA20013277", NULL);

SELECT * FROM Producto;