const Router = require('express')
const router = new Router()
const playersRouter = require('./playersRouter')
const teamsRouter = require('./teamsRouter')
const gamesRouter = require('./gamesRouter')

router.use('/players', playersRouter)
router.use('/teams', teamsRouter)
router.use('/games', gamesRouter)

module.exports = router