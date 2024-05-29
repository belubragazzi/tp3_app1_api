CREATE TABLE Producto (
	id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
   	precio INTEGER NOT NULL
);

CREATE TABLE ReportePrecio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    producto_id INTEGER NOT NULL,
    precio INTEGER NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (producto_id) REFERENCES Producto(id)
);
-- Insertar datos en la tabla Producto
INSERT INTO Producto (nombre, precio) VALUES ("Guaymallen", 200);
INSERT INTO Producto (nombre, precio) VALUES ("Jorgito", 600);
INSERT INTO Producto (nombre, precio) VALUES ("Fulbito", 50);
INSERT INTO Producto (nombre, precio) VALUES ("TriShot", 1000);

-- Insertar datos en la tabla ReportePrecio
INSERT INTO ReportePrecio (producto_id, precio, fecha) VALUES (1, 90, '2024-05-20');
INSERT INTO ReportePrecio (producto_id, precio, fecha) VALUES (1, 100, '2024-05-21');
INSERT INTO ReportePrecio (producto_id, precio, fecha) VALUES (2, 180, '2024-05-20');
INSERT INTO ReportePrecio (producto_id, precio, fecha) VALUES (2, 200, '2024-05-21');

SELECT * FROM Producto;
SELECT * FROM ReportePrecio;