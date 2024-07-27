import * as Yup from 'yup' // Estou pegando tudo ( * ) que da biblioteca yup e chamando de ' Yup '

class ProductController {
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.string().required(),
            category: Yup.string().required(),
        })

        // Aqui iremos mandar um erro, caso tenha algo errado
        try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        }

        return res.status(201).json({message: 'Ok'})
    }
}

export default new ProductController()