const express = require('express');
const router = express.Router();
const quotesController = require('../../controllers/quotes/quotes-controller');

router.get('/', quotesController.GetPosts);
router.post('/', quotesController.AddPost);
router.put('/:id', quotesController.UpdatePost);
router.delete('/:id', quotesController.DeletePost);

module.exports = router