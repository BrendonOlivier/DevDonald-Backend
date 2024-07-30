import * as Yup from 'yup' // Estou pegando tudo ( * ) que da biblioteca yup e chamando de ' Yup '
import User from '../models/User';
import jwt from 'jsonwebtoken' // JWT - Web Token
import authConfig from '../../config/auth' // Config do Token

class SessionController {
    async store(req, res) {
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        })

        const isValid = await schema.isValid(req.body)

        const userEmailOrPasswordIncorrect = () => {
            res.status(400).json({ error: 'Make sure password or email are correct' })
        }

        if (!isValid) {
            return userEmailOrPasswordIncorrect()
        }

        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return userEmailOrPasswordIncorrect()
        }

        const isSamePassword = await user.checkPassword(password)

        if (!isSamePassword) {
            return userEmailOrPasswordIncorrect()
        }

        return res.json({
            id: user.id,
            name: user.name,
            email,
            admin: user.admin,
            token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,

            })
        })
    }
}

export default new SessionController()