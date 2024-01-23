import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/usuario";
import jwt from "jsonwebtoken";

export const newUser = async (req: Request, res: Response) => {

    const {username, password} = req.body;

    console.log(username);
    console.log(password);

    const hashedPassword = await bcrypt.hash(password, 10);

    // Validamos si el usuario existe en la base de datos

    const user = await User.findOne({where:{username:username}})

    if(user){
       return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        })
    }

    try {
        // Guardamos usuario en la base de datos
        await User.create({
            username: username,
            password: hashedPassword
        })

        res.json({
            msg: `Usuario ${username} creado con exito`,
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error', error
        })
    }


}

export const loginUser = async (req: Request, res: Response) => {

    const {username, password} = req.body;

    // Validamos si el usuario existe en la base de datos

    const user: any = await User.findOne({where:{username:username}})

    if(!user){
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la bd`
        })
    }

    // Validamos password

    const passwordValid = await bcrypt.compare(password, user.password)
    
    if(!passwordValid){
        return res.status(400).json({
            msg: 'Password incorrecta'
        })
    }

    // Generar el token

    const token = jwt.sign({
        username: username
    },process.env.SECRET_KEY || 'prueba123')

    res.json({token});

}