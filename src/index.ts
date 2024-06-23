//index es el controlador
import express, { Express, Request, Response, response, NextFunction} from "express";
import dotenv from "dotenv";
import { consultarListadoProductos, borrarProducto, agregarProducto,  buscarPrecioEnMeli, PORT, enviarCorreo, actualizarProducto } from "./Modelo";

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
let precios = new Map();
precios.set('ID1', 1000);
precios.set('ID2', 2500);
precios.set('ID3', 5000);

const random = (min: number, max: number): number => Math.random() * (max - min) + min;

app.get("/meli/:meli_id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const meli_id = req.params.meli_id;

        const ret = {
            precio: Math.floor(precios.get(meli_id) * random(0.80, 1.2))
        };

        res.send(ret);
    } catch (error) {
        next(error)
    }
    
});


// Para que lo llame el cron
app.get("/v1/actualizarPrecios", async (req: Request, res: Response, next: NextFunction) => {
    try {    // - traer productos que tenemos en la BD
        const listado = await consultarListadoProductos();
        // - `foreach` producto
        for (let i = 0; i < listado.length; i++) {
            const producto = listado[i];
            const nuevoPrecio = await buscarPrecioEnMeli(producto.meli_id)
            if (nuevoPrecio != producto.precio) {
                producto.precio = nuevoPrecio; 
                await actualizarProducto(producto.meli_id, nuevoPrecio);    
                console.log('el pecio se cambio')

                if (nuevoPrecio >= producto.precio*1.1 || nuevoPrecio <= producto.precio*0.9 ) {
                
                    await enviarCorreo(producto.meli_id, producto.precio);
                } else {console.log('no hace falta mandar mail')}
            } else {
                console.log('el pecio se mantiene')
            }
        }
        res.send("Actualización de precios completada");

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

app.listen(PORT, () => {
    console.log(`[server]: Servidor iniciado en http://localhost:${PORT}`);
}); 