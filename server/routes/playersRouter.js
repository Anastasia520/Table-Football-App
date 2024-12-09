const Router = require('express')
const playersController = require('../controllers/playersController')
const router = new Router()

router.post('/', playersController.create)
router.get('/', playersController.getAll)
router.get('/:id', playersController.getOne)

module.exports = router