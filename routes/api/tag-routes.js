const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const tags = await Tag.findAll({
     // Include its associated Product data
    include: [Product]
  });
  res.json(tags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // tags is associated w Products
  const tags = await Tag.findOne({
    where:{id: req.params.id},
    include: [Product]
  })
  res.json(tags);
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const tags = await Tag.create(req.body)
    res.status(200).json(tags)
  }
  catch(err){
    res.status(500).json(err)
  }
  
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tags = await Tag.update(req.body, {
      where: {id: req.params.id}
    })
    res.status(200).json(tags)
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tags = await Tag.destroy({
      where:{id:req.params.id}
    })
    res.status(200).json(tags);
  }
  catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;