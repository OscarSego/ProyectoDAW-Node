import {Request, Response} from "express";
import { Producto } from "../models/productos";
//import { Producto } from "../models/producto";

export const getProducts = async (req: Request, res: Response) =>{

    const listProducts = await Producto.findAll();

    res.json({
        listProducts
    })
}

export const getProduct = async (req: Request, res: Response) =>{

    const { id } = req.params;
    const products = await Producto.findByPk(id);

    if(products){
        res.json(products)
    }else{
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    }
}

export const deleteProduct = async (req: Request, res: Response) =>{

    const { id } = req.params;
    const products = await Producto.findByPk(id);

    if(!products){
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    }else{
        await products.destroy();
        res.json({
            msg: `El producto fue eliminado`
        })
    }
}

export const postProduct = async (req: Request, res: Response) =>{

    try {
        const { body } = req;

        await Producto.create(body);

        res.json({
            msg: 'El producto fue creado con éxito',
        });
    } catch (error) {
       
        console.error('Error al crear el producto:', error);
        res.status(500).json({
            msg: 'Hubo un error al procesar la solicitud',
        });
    }
}

export const updateProduct = async (req: Request, res: Response) =>{

    const { body } = req;
    const { id } = req.params;

    try {
        const products = await Producto.findByPk(id);

        if(products){
            await products.update(body);
            res.json({
                msg: 'El producto fue actualizado con exito'
            })
        }else{
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            })
        }
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({
            msg: 'Hubo un error al procesar la solicitud',
        });
    }
}

export  const getProductName = async (req: Request, res: Response) =>{

    const { name } = req.params;
    const products = await Producto.findOne({
        where: {name:name}
    });

    if(products){
        res.json(products)
    }else{
        res.status(404).json({
            msg: `No existe un producto con el id ${name}`
        })
    }
        
}