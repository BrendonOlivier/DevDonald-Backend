import * as Yup from 'yup'; // Estou pegando tudo ( * ) que da biblioteca yup e chamando de ' Yup '
import Category from '../models/Category';

class CategoryController {
    // Criando nossas categorias
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required()
        });

        // Aqui iremos mandar um erro, caso tenha algo errado
        try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        };

        // Pegando os dados
        const { name } = req.body;

        // Validação para não criar categorias repetidas
        const categoryExists = await Category.findOne({
            where: {
                name
            },
        });

        if (categoryExists) {
            return res.status(400).json({ error: 'Categoria já criada 🛑' })
        }

        // Criando no banco de dados o Produto
        const { id } = await Category.create({
            name
        });

        return res.status(201).json({ id, name });
    };

    // Listar todos as nossas categorias
    async index(req, res) {
        const categories = await Category.findAll();

        return res.json(categories);
    }
};

export default new CategoryController();