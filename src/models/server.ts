import express from "express";
import cors from "cors";
import routesProduct from "../routes/producto";
import routerUser from "../routes/usuario";
//import { Producto } from "./producto";
import { User } from "./usuario";
import { Producto } from "./productos";
import { Product } from "./producto";

export class Server {

    private app: express.Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "3001";
        this.listen();
        this.midleware();
        this.routes();
        this.dbConnect();

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("aplicacion corriendo en el puerto " + this.port)
        });
    }

    routes(){
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/products/', routesProduct);
        this.app.use('/api/products/nombre', routesProduct);
        this.app.use('/api/users', routerUser);
    }
    

    midleware(){

        // Parseo body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());

    }

    async dbConnect(){
        try {
            await Producto.sync();
            await User.sync();
        } catch (error) {
            console.log('Unable to connect to the database', error);
        }
    }
}