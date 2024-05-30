//index es el controlador
import express, { Express, Request, Response, response, NextFunction} from "express";
import dotenv from "dotenv";
import { consultarListadoProductos, borrarProducto, agregarProducto } from "./Modelo";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

function errorHandler(
    error: Error, req: Request, res: Response, next: NextFunction
) {
    console.log(`Hubo un error! ${error.message}`);
    response.header("Content-Type", 'application/json');
    response.status(500).json({ mensaje: error.message})
}

app.use(express.json())

app.get("/v1/listado", async (req: Request, res: Response, next: NextFunction) => {
    try {    
        const listado = await consultarListadoProductos();
        res.send(listado);
    } catch (error) {
        next(error)
    }
});
 

// index.ts
app.post("/v1/producto/agregar", async (req: Request, res: Response, next: NextFunction) => {
   try {
        const nombre = req.body.nombre;//no me acuerdo q es req
        const precio = parseFloat(req.body.precio);
        await agregarProducto(nombre, precio);
        res.send("OK");
    } catch (error) {
        next(error)
    }
});

app.post("/v1/producto/borrar", async (req: Request, res: Response, next: NextFunction) => {
    try {   
        const nombre = req.body.nombre;
        await borrarProducto(nombre);
        res.send("OK"); 
    } catch (error) {
        next(error)
    }
    
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

app.listen(port, () => {
    console.log(`[server]: Servidor iniciado en http://localhost:${port}`);
}); 