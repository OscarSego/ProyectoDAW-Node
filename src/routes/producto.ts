import {Router} from "express"
import { deleteProduct, getProduct, getProductName, getProducts, postProduct, updateProduct } from "../controllers/producto";
import validateToken from "./validate-token";

const router = Router();

router.get('/', validateToken, getProducts);
router.get('/nombre/:name', validateToken, getProductName);
router.get('/:id', validateToken, getProduct);
router.delete('/:id', validateToken, deleteProduct);
router.post('/', validateToken, postProduct);
router.put('/:id', validateToken, updateProduct);



export default router;