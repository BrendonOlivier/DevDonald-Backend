/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

// O next dá continuidade para a aplicação
function authMiddleware(req, res, next) {
    // Verificar se o Auth Token existe na aquisição
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ error: 'Token não aprovado ❌' })
    }

    // Verificar a validade do token
    const token = authToken.split(' ').at(1); // Com o split elimanos o espaço, e o '.at(1)' pegamos só a segunda posição(o token)

    // Validando o token >
    try {
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                throw new Error()
            }

            req.userId = decoded.id;
            req.userName = decoded.name;
        })
    } catch (err) {
        return res.status(401).json({ error: 'Token está inválido ❌' })
    }

    return next();
}

export default authMiddleware