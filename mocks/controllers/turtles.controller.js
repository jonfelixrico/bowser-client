const { Router } = require('express')

module.exports = function (app) {
  const router = Router()

  router.get('/', (req, res) => {
    res.json([
      {
        id: '1',
        name: 'turtle1',
        x: 0,
        y: 0,
        z: 0,
        fuelLevel: 10,
        fuelLimit: 1000,
        bearing: 1
      },
      {
        id: '2',
        name: 'turtle2',
        x: 10,
        y: 0,
        z: -10,
        fuelLevel: 10,
        fuelLimit: 1000,
        bearing: 3
      },
      {
        id: '3',
        name: 'turtle3',
        x: 17,
        y: 0,
        z: 20,
        fuelLevel: 150,
        fuelLimit: 1000,
        bearing: 2
      },
      {
        id: '4',
        name: 'turtle4',
        x: 1,
        y: 1,
        z: 1,
        fuelLevel: 1000,
        fuelLimit: 1000,
        bearing: 4
      }
    ])
  })

  app.use('/turtles', router)
}