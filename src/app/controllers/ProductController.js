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
            offer: Yup.boolean(),
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
        const { name, price, category_id, offer } = req.body;

        // Criando no banco de dados o Produto
        const product = await Product.create({
            name,
            price,
            category_id,
            path,
            offer
        })

        return res.status(201).json(product)
    }

    // Método Update para atualizar os Produtos
    async update(req, res) {
        const schema = Yup.object({
            name: Yup.string(),
            price: Yup.string(),
            category_id: Yup.number(),
            offer: Yup.boolean(),
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
        }

        // Verificação se o ID do produto existe para atualizarmos baseado no ID
        const { id } = req.params;
        const findProduct = await Product.findByPk(id)
        if(!findProduct) {
            return res.status(400).json({ error: 'Verifique se ID do produto está correto 🛑'})
        }

        // Deixando a variável 'path' opcional
        let path;
        if(req.file) {
            path = req.file.filename
        }

        // Pegando os dados
        const { name, price, category_id, offer } = req.body;

        // Atualizando os dados do Produto, e avisando onde(where) vamos fazer o Update
        await Product.update({
            name,
            price,
            category_id,
            path,
            offer
        }, {
            where: {
                id
            }
        })

        return res.status(200).json();
    };


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