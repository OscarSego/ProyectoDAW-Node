"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductName = exports.updateProduct = exports.postProduct = exports.deleteProduct = exports.getProduct = exports.getProducts = void 0;
const productos_1 = require("../models/productos");
//import { Producto } from "../models/producto";
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield productos_1.Producto.findAll();
    res.json({
        listProducts
    });
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const products = yield productos_1.Producto.findByPk(id);
    if (products) {
        res.json(products);
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
});
exports.getProduct = getProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const products = yield productos_1.Producto.findByPk(id);
    if (!products) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
    else {
        yield products.destroy();
        res.json({
            msg: `El producto fue eliminado`
        });
    }
});
exports.deleteProduct = deleteProduct;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        yield productos_1.Producto.create(body);
        res.json({
            msg: 'El producto fue creado con éxito',
        });
    }
    catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({
            msg: 'Hubo un error al procesar la solicitud',
        });
    }
});
exports.postProduct = postProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const products = yield productos_1.Producto.findByPk(id);
        if (products) {
            yield products.update(body);
            res.json({
                msg: 'El producto fue actualizado con exito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            });
        }
    }
    catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({
            msg: 'Hubo un error al procesar la solicitud',
        });
    }
});
exports.updateProduct = updateProduct;
const getProductName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const products = yield productos_1.Producto.findOne({
        where: { name: name }
    });
    if (products) {
        res.json(products);
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id ${name}`
        });
    }
});
exports.getProductName = getProductName;
