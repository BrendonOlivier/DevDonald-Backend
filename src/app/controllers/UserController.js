import { v4 } from 'uuid'
import * as Yup from 'yup'

import User from '../models/User'

class UserController {
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),          // required() = OBRIGATÓRIO o campo
            email: Yup.string().email().required(),
            password_hash: Yup.string().required().min(6), // Alem de obrigatório, tem um minimo de 6 digitos obritorios pra senha
            admin: Yup.boolean(),
        })

         // Aqui iremos mandar um erro, caso tenha algo incorreto no cadastro
         try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        }

        const { name, email, password_hash, admin } = req.body

        const user = await User.create({
            id: v4(),
            name,
            email,
            password_hash,
            admin
        })

        return res.status(201).json({
            id: user.id,
            name,
            email,
            admin
        })
    }
}

export default new UserController()