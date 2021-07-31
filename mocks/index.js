const Router = require('express').Router

module.exports = function ({ app }) {
  
  const router = Router()

  router.get('/turtles', (req, res) => {
    res.json([
      {
        id: '1',
        name: 'turtle1',
        x: 0,
        y: 0,
        z: 0,
        fuelLevel: 10,
        fuelLimit: 1000
      },
      {
        id: '2',
        name: 'turtle2',
        x: 69,
        y: 0,
        z: -69,
        fuelLevel: 10,
        fuelLimit: 1000
      },
      {
        id: '3',
        name: 'turtle3',
        x: 17,
        y: 0,
        z: 38,
        fuelLevel: 150,
        fuelLimit: 1000
      },
      {
        id: '3',
        name: 'turtle4',
        x: 1,
        y: 1,
        z: 1,
        fuelLevel: 1000,
        fuelLimit: 1000
      }
    ])
  })

  app.use('/api', router)
}
