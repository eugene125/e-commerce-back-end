const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
      // Including associated products
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"]
        }
      ]
    })
    if (allCategories) {
      res.status(200).json(allCategories);
    } else {
      res.status(400).json({ message: "Category not found" });
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const singleCategory = await Category.findOne({
      where: {
        id: req.params.id
      },
      // Including associated products
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"]
        }
      ]
    })
    if (singleCategory) {
      res.status(200).json(singleCategory);
    } else {
      res.status(400).json({ message: "Category not found" });
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name
    })
    res.send(createCategory);
  } catch (err) {
    res.status(400).send(err.error.map(e => e.message));
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    res.send(updatedCategory);
  } catch (err) {
    res.status(400).json(err.errors.map(e => e.message))
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const destroyCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!destroyCategory) {
      res.status(400).json({ message: "That category was not found" })
    } else {
      res.json(destroyCategory);
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;