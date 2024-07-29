import * as Yup from 'yup' // Estou pegando tudo ( * ) que da biblioteca yup e chamando de ' Yup '
import Product from '../models/Product'

class ProductController {
    // Criando os produtos
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

        // Pegando os dados
        const { filename: path } = req.file;
        const { name, price, category } = req.body;

        // Criando no banco de dados o Produto
        const product = await Product.create({
            name,
            price,
            category,
            path
        })

        return res.status(201).json(product)
    }

    // Listar todos os produtos
    async index(req, res) {
        const products = await Product.findAll();

        return res.json(products)
    }
}

export default new ProductController()