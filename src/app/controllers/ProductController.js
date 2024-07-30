import * as Yup from 'yup'; // Estou pegando tudo ( * ) que da biblioteca yup e chamando de ' Yup '
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';

class ProductController {
    // Criando os produtos
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.string().required(),
            category_id: Yup.number().required(),
        })

        // Aqui iremos mandar um erro, caso tenha algo errado
        try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        }

        // Verificação se o usuário é um Admin, procurando pelo ID do usuário
        const { admin: isAdmin } = await User.findByPk(req.userId)
        if(!isAdmin) {
            return res.status(401).json();
        };

        // Pegando os dados
        const { filename: path } = req.file;
        const { name, price, category_id } = req.body;

        // Criando no banco de dados o Produto
        const product = await Product.create({
            name,
            price,
            category_id,
            path
        })

        return res.status(201).json(product)
    }

    // Listar todos os produtos, e avisando sobre a referência entre a tabela de categoria
    async index(req, res) {
        const products = await Product.findAll({
            // Referência da Categoria
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ]
        });

        return res.json(products)
    }
}

export default new ProductController()