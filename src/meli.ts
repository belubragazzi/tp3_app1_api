import { Request, Response, NextFunction} from "express";

export async function falsaMeli(req: Request, res: Response, next: NextFunction) {
    try {
        const meli_id = req.params.meli_id;
        const fecha =  req.params.fecha != null ? new Date(req.params.fecha) : new Date();

        const ret = generarInformacionProductoFalsa(meli_id, fecha)

        res.send(ret);
    } catch (error) {
        next(error)
    }   
};

function generarInformacionProductoFalsa(meli_id: string, fecha: Date): { nombre: string, precio: number } {
    const nombresDeProductos: string[] = [
        "Chocolatina", "Galletitas", "Caramelo", "Chicle", "Gaseosa", 
        "Agua Mineral", "Papas Fritas", "Maní con Chocolate", "Turrón", "Alfajor"
    ];

    // Función de hash para el nombre
    const hashCode = (str: string): number => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    // Generador de números pseudoaleatorios basado en xorshift
    let seed = hashCode(meli_id);
    const random = (): number => {
        seed ^= seed << 13;
        seed ^= seed >> 17;
        seed ^= seed << 5;
        return Math.abs(seed) / Math.pow(2, 31);
    };

    const nombreIndex = Math.abs(hashCode(meli_id)) % nombresDeProductos.length;
    const nombreProducto = nombresDeProductos[nombreIndex];

    const fechaBase = new Date('2024-06-21');
    const milisegundosPorDia = 24 * 60 * 60 * 1000;
    const diasDesdeEpoch = Math.floor((fecha.getTime() - fechaBase.getTime()) / milisegundosPorDia);

    const precioBase = Math.floor(random() * (10000 - 1000 + 1)) + 1000;

    const incremento = 1 + (random() * (0.15 - 0.05) + 0.05);
    const incrementoTotal = Math.pow(incremento, diasDesdeEpoch);
    const precioFinal = Math.round(precioBase * incrementoTotal);

    return {
        nombre: nombreProducto,
        precio: precioFinal
    };
}

// Ejemplo de uso
// const ejemplos = [
//     "asd123",
//     "xyz456",
//     "def789",
//     "ghi012",
//     "jkl345",
//     "mno678",
//     "pqr901",
//     "stu234",
//     "vwx567",
//     "yza890"
// ];

// ejemplos.forEach(id => {
// console.log(generarInformacionProductoFalsa(id, new Date('2024-06-21')));
// console.log(generarInformacionProductoFalsa(id, new Date('2024-06-21')));
// console.log(generarInformacionProductoFalsa(id, new Date('2024-06-22')));
// console.log(generarInformacionProductoFalsa(id, new Date('2024-06-23')));
// console.log(generarInformacionProductoFalsa(id, new Date('2024-06-24')));
// })
