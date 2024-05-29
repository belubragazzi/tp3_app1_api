//index es el controlador
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { consultarListadoProductos, borrarProducto, agregarProducto } from "./Modelo";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
    const listado = await consultarListadoProductos();
    res.send(listado);
});
 

// index.ts
app.put("/agregar/:nombre/:precio", async (req: Request, res: Response) => {
    const nombre = req.params.nombre;//no me acuerdo q es req
    const precio = parseFloat(req.params.precio);

    const producto = await agregarProducto(nombre, precio);
    res.send("OK");
});

app.delete("/borrar/:nombre", async (req: Request, res: Response) => {
    const nombre = req.params.nombre;
    await borrarProducto(nombre);
    res.send("OK");
});

/*
app.get("/verificarAlertas", async (req: Request, res: Response) => {
    const alertas = await verificarAlertas();
    res.send(alertas);
});
*/
app.listen(port, () => {
    console.log(`[server]: Servidor iniciado en http://localhost:${port}`);
}); 