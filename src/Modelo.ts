import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export interface Producto {
    nombre: string,
    precio: number
}
export interface Kiosco {
    productos: Producto[]
}
export interface Reporte {
    fecha: Date,
    producto: Producto
}

async function abrirConexion() {
    return open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })
}

// Arma un Listado que contiene todas las ciudades en la base de datos
/* export async function consultarListado(): Promise<Listado> {
    const db = await abrirConexion();

    const ciudades: Ciudad[] = await db.all<Ciudad[]>('SELECT * FROM Ciudad');
    return { ciudades: ciudades };
}
 */
export async function consultarListadoProductos(): Promise<Kiosco> {
    const db = await abrirConexion();

    const productos: Producto[] = await db.all<Producto[]>('SELECT * FROM Producto');
    console.log(productos);
    return { productos: productos };
}

// Agrega uno nuevo Producto a la base de datos
export async function agregarProducto(nombre: string, precio: number): Promise<void> {
    const db = await abrirConexion();

    const query = `INSERT INTO Producto (nombre, precio) VALUES ('${nombre}', ${precio})`;
    await db.run(query);
}
/* // Agrega uno nuevo Producto a la base de datos
 export async function agregarProducto(nombre: string, precio: number): Promise<Producto> {
    const db = await abrirConexion();

    const query = `INSERT INTO Producto (nombre, precio) VALUES ('${nombre}', ${precio})`;
    await db.run(query);


    const producto = await db.get<Producto>(`SELECT * FROM Producto WHERE nombre=${nombre}`);
    if (producto == undefined)
        throw new Error("Esto nunca deberia pasar!");

    return producto;
} */
// Borra un Producto de la base de datos
export async function borrarProducto(nombre: string): Promise<void> {
    const db = await abrirConexion();

    const query = `DELETE FROM Producto WHERE nombre='${nombre}'`;
    await db.run(query);
} 
// actualiza el precio actual
async function actualizarTemperatura(idCiudad: number, temperatura: number) {
    const db = await abrirConexion();

    const query = `UPDATE Ciudad SET temperatura=${temperatura} WHERE id=${idCiudad}`;
    await db.run(query);
}
/* async function searchItems(query: string): Promise<Promise<Producto[]>> {
    try {
        const accessToken = process.env.ACCESS_TOKEN;
        
        const apiUrl = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&access_token=${accessToken}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error en searchItems:', error);
        throw error;
    }
  } */
  







// Proceso que se ejecuta cada una hora y chequea si hay que mandar una alerta
/* export async function verificarAlertas(): Promise<Alerta[]> {
    const db = await abrirConexion();

    const ciudades: Ciudad[] = await db.all<Ciudad[]>('SELECT * FROM Ciudad');

    // Itero todas las ciudades y si me devolvio alguna alerta la agrego a la lista de retorno
    var alertas: Alerta[] = [];

    for (let i = 0; i < ciudades.length; i++) {
        const ciudad = ciudades[i];
        var alerta = await verificarAlertasParaCiudad(ciudad);
        if (alerta != null)
            alertas.push(alerta);
    }

    return alertas;
}
 */
/* async function verificarAlertasParaCiudad(ciudad: Ciudad): Promise<Alerta | null> {
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
} */





    
/* export function compareItemsPerDay (precioDeUno: Producto, precioDelOtro: Producto): Producto {
    //comparo el precio del día anterior que fue registrado con el precio que me llega de la base de 
    return kiosco;
}
    
export function compareItemsPerWeek (precioDeUno: Producto, precioDelOtro: Producto): Reporte {
    //comparo el precio del día anterior que fue registrado con el precio que me llega de la base de datos
    return reporte;
}
    
    
export function putItemsInDataBase (productos: Producto) {
    //piso la base de datos con la nueva información de los items del kiosco
}
    
export function showItems (itemsParaMostrar: Producto) {
    //aprovecho la info de la base de datos para actualizar el "panel de control"del Kiosquero
} */