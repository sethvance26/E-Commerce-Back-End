const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // find all categories
    try {
      const categoryData = await Category.findAll({
        // be sure to include its associated Products     
        include: [{ model: Product }]
      })
      .then((result) => res.status(200).json(result));
  
    } catch (err) {
      res.status(500).json(err);
    }
  });
 


router.get('/:id', async (req, res) => {
        // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {

      include: [{ model: Product }]
        // be sure to include its associated Products
    })
  
    if (!categoryData) {
      res.status(404).json({ message: 'No category was found containing this ID.'});
    } else {
      res.status(200).json(categoryData);
    }

  } catch (err) {
    res.status(500).json(err)
  }
  
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
      res.status(200).json(categoryData);
  } catch (err) {
      res.status(400).json(err);
  }
  });
  // creating a new category (POST request)

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
