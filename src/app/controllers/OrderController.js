import * as Yup from 'yup'; // Estou pegando tudo ( * ) que da biblioteca yup e chamando de ' Yup '
import Order from '../schemas/Order';
import Product from '../models/Product';
import Category from '../models/Category';

class OrderController {
    // Criando a ordem de serviço
    async store(req, res) {
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                }),
            ),
        });

        // Aqui iremos mandar um erro, caso tenha algo errado
        try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        };

        // Pegando os dados de produtos
        const { products } = req.body;

        // Buscando os dados do produto atráves do ID
        const productsIds = products.map(product => product.id);

        // Buscando os dados do banco de categorias
        const findProducts = await Product.findAll({
            where: {
                id: productsIds
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }
            ]
        });

        // Formatando os dados para trazer só os que eu queira
        const formattedProducts = findProducts.map(product => {
            const productIndex = req.body.products.findIndex(item => item.id === product.id);

            const newProduct = {
                id: product.id,
                name: product.name,
                category: product.category.name,
                price: product.price,
                url: product.url,
                quantity: products[productIndex].quantity
            };

            return newProduct;
        });

        // Pegando os dados do Usuário
        const order = {
            user: {
                id: req.userId,
                name: req.userName
            },
            products: formattedProducts
        };

        return res.status(201).json(order);
    };
};

export default new OrderController();