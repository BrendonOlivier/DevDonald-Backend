import * as Yup from 'yup'; // Estou pegando tudo ( * ) que da biblioteca yup e chamando de ' Yup '
import Category from '../models/Category';
import User from '../models/User';

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

        // Verificação se o usuário é um Admin, procurando pelo ID do usuário
        const { admin: isAdmin } = await User.findByPk(req.userId)
        if (!isAdmin) {
            return res.status(401).json();
        };

        // Pegando os dados
        const { filename: path } = req.file;
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
            name,
            path
        });

        return res.status(201).json({ id, name });
    };

    // Método Update para atualizar Categorias
    async update(req, res) {
        const schema = Yup.object({
            name: Yup.string()
        });

        // Aqui iremos mandar um erro, caso tenha algo errado
        try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        };

        // Verificação se o usuário é um Admin, procurando pelo ID do usuário
        const { admin: isAdmin } = await User.findByPk(req.userId)
        if (!isAdmin) {
            return res.status(401).json();
        };

        // Pegando pelo ID qual categoria iremos alterar
        const { id } = req.params;
        const categoryExists = await Category.findByPk(id);

        if (!categoryExists) {
            return res.status(400).json({ message: 'Tenha certeza que o ID da categoria está correto 🛑' })
        }

        // Deixando a variável 'path' opcional
        let path;
        if (req.file) {
            path = req.file.filename
        }

        // Pegando os dados
        const { name } = req.body;

        // Se eu for mudar o Nome da Categoria...
        if (name) {
            // Validação para não criar categorias repetidas
            const categoryNameExists = await Category.findOne({
                where: {
                    name
                },
            });

            if (categoryNameExists && categoryNameExists.id !== +id) {
                return res.status(400).json({ error: 'Categoria já criada 🛑' })
            }
        }

        // Atualizando os dados da Categoria, e avisando onde(where) vamos fazer o Update
        await Category.update({
            name,
            path
        }, {
            where: {
                id
            }
        })

        return res.status(200).json();
    };

    // Listar todos as nossas categorias
    async index(req, res) {
        const categories = await Category.findAll();

        return res.json(categories);
    }
};

export default new CategoryController();