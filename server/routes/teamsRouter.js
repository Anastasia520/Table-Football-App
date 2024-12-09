const Router = require('express')
const teamsController = require('../controllers/teamsController')
const router = new Router()

router.post('/',teamsController.create )
router.get('/', teamsController.getAll)
router.get('/:id', teamsController.getOne)


module.exports = router