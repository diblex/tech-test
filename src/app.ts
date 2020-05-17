import express from 'express'
import { router as orderRouter, routePath as orderRoutePath } from 'routes/order'

export async function init() {
  const PORT = process.env.PORT;
  const app = express()


  app.get('/health', (req, res) => {
    res.status(200).send('OK')
  })

  app.use(orderRoutePath, orderRouter);

  return new Promise((resolve, reject) => {
    app.listen(PORT, () => {
      console.info(`API server started at port ${PORT}`)
      resolve(app)
    })
  })
}
