const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll({
      // Including associated Product data
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"]
        }
      ]
    })
    if (allTags) {
      res.status(200).json(allTags);
    } else {
      res.status(400).json({ message: "Tag not found" });
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const singleTag = await Tag.findOne({
      where: {
        id: req.params.id
      },
      // be sure to include its associated Product data
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    })
    if (singleTag) {
      res.status(200).json(singleTag);
    } else {
      res.status(400).json({ message: "Tag not found" });
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const postTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(postTag);
  }
  catch (err) {
    res.status(400).json({ message: "Error creating tag" })
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const result = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  const response = { success: result[0] }
  result[0] >= 1 ? res.send(response) : res.status(400).json(response)
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const destroyTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!destroyTag) {
      res.status(400).json({ message: "Tag not found" });
    } else {
      res.json(destroyTag);
    }
  }
  catch {
    res.status(400).json(err);
  }
});

module.exports = router;
