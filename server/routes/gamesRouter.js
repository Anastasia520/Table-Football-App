const Router = require('express')
const gamesController = require('../controllers/gamesController')
const router = new Router()

router.post('/', gamesController.create)
router.get('/', gamesController.getAll)
router.get('/:id', gamesController.getOne)


module.exports = router