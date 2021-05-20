const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
  // be sure to include its associated Product data
    include: 
    { model: Product, through: ProductTag, as: 'associated_product'}
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  });
  


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: 
      { model: Product, through: ProductTag, as: 'associated_product'}
    });
  // be sure to include its associated Product data

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});




router.post('/', (req, res) => {
  // create a new tag
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    console.log(`Changing Tag Name To..${req.body.tag_name}`)

    const tagData = await Tag.update(
      { tag_name: req.body.tag_name },
      { returning: true, where: { id: req.params.id } }
    )
      .then((result) => {
        res.status(200).json(result);
      });

    } catch (err) {
      res.status(400).json(err);
    }
  });



router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  
  try{
    const tagData  = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
  if (!tagData) {
    res.status(404).json({ message: 'No tag found with this ID'})
    return;
  }

    res.status(200).json(tagData);
} catch (err) {
    res.status(500).json(err);
}
});
module.exports = router;
