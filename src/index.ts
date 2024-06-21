//index es el controlador
import express, { Express, Request, Response, response, NextFunction} from "express";
import dotenv from "dotenv";
import { consultarListadoProductos, borrarProducto, agregarProducto,  buscarPrecioEnMeli, PORT } from "./Modelo";
import { falsaMeli } from "./meli";

dotenv.config();

const app: Express = express();

function errorHandler(
    error: Error, req: Request, res: Response, next: NextFunction
) {
    console.log(`Hubo un error! ${error.message}`);
    response.header("Content-Type", 'application/json');
    response.status(500).json({ mensaje: error.message})
}

app.use(express.json())

app.get("/v1/producto", async (req: Request, res: Response, next: NextFunction) => {
    try {    
        const listado = await consultarListadoProductos();
        res.send(listado);
    } catch (error) {
        next(error)
    }
});
 

// index.ts
app.post("/v1/producto", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const meli_id = req.body.meli_id;
        const precio = await buscarPrecioEnMeli(meli_id);

        await agregarProducto(meli_id, precio);
        res.send("OK");
    } catch (error) {
        next(error)
    }
});

app.delete("/v1/producto", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const meli_id = req.body.meli_id;
        await borrarProducto(meli_id);
        res.send("OK");
    } catch (error) {
        next(error)
    }

});

app.get("/meli/:meli_id/:fecha?", falsaMeli);


// Para que lo llame el cron
app.get("/v1/actualizarPrecios", async (req: Request, res: Response) => {
// - traer productos que tenemos en la BD
// - `foreach` producto
//     - traer nuevos precios de producto con la API de ML
//     - comparar el nuevo precio con el que esta en la BD
//     - `if` precio cambio
//         - `if` precio cambio mas del 10%
//             - envio notificacion
//         - actualizo la BD
});




/*
app.post("/verificarAlertas", async (req: Request, res: Response) => {
    const alertas = await verificarAlertas();
    res.send(alertas);
});
*/

//ANALIZAR ERROR 404??? 
//El error handler tiene que ir al final para que sea el middleware
//siguiente a los controladores
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`[server]: Servidor iniciado en http://localhost:${PORT}`);
}); 