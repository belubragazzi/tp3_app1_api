import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
// import { fetch } from 'node-fetch';
//import nodemailer from 'nodemailer';
//const nodemailer = require("nodemailer");

export const PORT = process.env.PORT || 3000;
export interface Producto {
    id: number,
    meli_id: string,
    precio: number
}

async function abrirConexion() {
    return open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })
}

export async function consultarListadoProductos(): Promise<Producto[]> {
    const db = await abrirConexion();

    const productos: Producto[] = await db.all<Producto[]>('SELECT * FROM Producto');
    console.log(productos);
    return productos;
}

// Agrega uno nuevo Producto a la base de datos
export async function agregarProducto(meli_id: string, precio: number): Promise<void> {
    const db = await abrirConexion();

    const query = `INSERT INTO Producto (meli_id, precio) VALUES ('${meli_id}', ${precio})`;
    await db.run(query);
}

// Borra un Producto de la base de datos
export async function borrarProducto(meli_id: string): Promise<void> {
    const db = await abrirConexion();

    const query = `DELETE FROM Producto WHERE meli_id='${meli_id}'`;
    await db.run(query);
}

//BUSCAR PRECIO
export async function buscarPrecioEnMeli(meli_id: string): Promise<number> {
    try {
        const apiUrl = `http://localhost:${PORT}/meli/${meli_id}`;

        const response = await fetch(apiUrl);
        const data: any = await response.json();
        console.log(`me llego de la falsa API:`, data);

        return data.precio;
    } catch (error) {
        console.error('Error en buscarPrecioEnMeli:', error);
        throw error;
    }
}

/* // actualiza el precio actual
async function actualizarTemperatura(meli_id: number, price: number) {
    const db = await abrirConexion();

    const query = `UPDATE Producto SET price=${price} WHERE id=${meli_id}`;
    await db.run(query);
}
 */
// Proceso que se ejecuta cada una hora y chequea si hay que mandar una alerta
/*  export async function verificarAlertas(): Promise<Alerta[]> {
    const db = await abrirConexion();

    const productos: Producto[] = await db.all<Producto[]>('SELECT * FROM Producto');

    // Itero todas las productos y si me devolvio alguna alerta la agrego a la lista de retorno
    var alertas: Alerta[] = [];

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        var alerta = await verificarAlertasParaProducto(producto);
        if (alerta != null)
            alertas.push(alerta);
    }

    return alertas;
} */

/*  async function verificarAlertasParaProducto(producto: Producto): Promise<Alerta | null> {
    // Busco la latitud y longitud de esta ciudad. Estaria bueno guardar esta info en la tabla de Ciudades porque no cambia en el tiempo.
    const response1 = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${ciudad.nombre}&count=1&language=en&format=json`
    )
    const response1Json = await response1.json() as any
    // console.log(response1Json)
    const { latitude, longitude } = response1Json.results[0]

    // console.log(latitude)
    // console.log(longitude)

    // Busco la ultima temperatura en base a la lat y long
    const response2 = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&forecast_days=1`
    )
    const { current } = await response2.json() as any;
    var temperatura = current.temperature_2m;

    // Actualizo la termperatura actual para la ciudad
    console.log(`Temperatura para ${ciudad.nombre}: ${temperatura}`);
    actualizarTemperatura(ciudad.id, temperatura);


    // Ajuste los valores para que me tire mas alertas
    if (temperatura >= 30 || temperatura <= 18) {
        return {
            cuando: new Date(),
            nombreCiudad: ciudad.nombre,
            temperaturaActual: temperatura
        }
    } else {
        return null
    }
}  */

/* const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASS
    }
  });
export async function enviarCorreo(producto: Producto[], meli_id: string, price: number) {
    try {//const productos = producto.productos_carrito.map(item => ${item.cantidad} x ${item.producto.nombre}).join(', ');
        const producto = "producto en cuestion";
        const mailOptions = {
            from: 'alertasproductos@gmail.com',
            to: 'alertasproductos@gmail.com',
            subject: '¡Nuevo aumento!',
            text:  'Hubo un nuevo aumento del' + producto
        };

        // Envía el correo
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: %s', info.messageId);
    } catch (error) {
        console.error('Error enviando el correo:', error);
        throw error;
  }
}  */