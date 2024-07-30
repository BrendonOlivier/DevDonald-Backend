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

        // Pegando os dados do pedido do Usuário e salvando no banco
        const order = {
            user: {
                id: req.userId,
                name: req.userName
            },
            products: formattedProducts,
            status: 'Pedido realizado'
        };

        //Criar os dados no banco de dados (MongoDB)
        const createdOrder = await Order.create(order);

        return res.status(201).json(createdOrder);
    }

    // Método index para pegar os pedidos do banco (GET)
    async index(req, res) {
        const orders = await Order.find();

        return res.json(orders)
    }

    // Método update para atualizar/mudar o Status do pedo (PUT)
    async update(req, res) {
        const schema = Yup.object({
            status: Yup.string().required()
        });

        // Aqui iremos mandar um erro, caso tenha algo errado
        try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        }

        // Verificando qual é o pedido que iremos atualizar no caso pelo ID
        const { id } = req.params;
        const { status } = req.body;

        // Procuro o pedido pelo  ID e mudo o Status, e caso o ID não existir mostro o erro
        try {
            await Order.updateOne({ _id: id }, { status })
        } catch (err) {
            return res.status(400).json({ error: err.message })
        }

        return res.json({ message: 'Status alterado com sucesso ✅' })
    }
};

export default new OrderController();