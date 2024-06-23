import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();


export const PORT = process.env.PORT || 3000;
export interface Producto {
    meli_id: string,
    precio: number,
    nombre: string
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
    return  productos;
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
export async function actualizarProducto(meli_id: string, nuevoPrecio: number): Promise<void> {
    const db = await abrirConexion();
    const query = `UPDATE Producto SET precio ='${nuevoPrecio}' WHERE meli_id ='${meli_id}'`;
    await db.run(query);
}



 const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASS
    }
  });
export async function enviarCorreo(meli_id: string, price: number) {
    //try {//const productos = producto.productos_carrito.map(item => ${item.cantidad} x ${item.producto.nombre}).join(', ');
/*         const producto = ;
 */        const mailOptions = {
            from: 'alertasproductos@gmail.com',
            to: 'belubragazzi@gmail.com',
            subject: '¡Nuevo aumento!',
            text:  'Hubo un nuevo aumento del producto:' + meli_id + 'subió a ' + price
        };

        // Envía el correo
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          })
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: %s', info.messageId);
    /* } catch (error) {
        console.error('Error enviando el correo:', error);
        throw error;
        
  } */
}