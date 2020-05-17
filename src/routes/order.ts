import {Router} from 'express'
import {Order} from 'models/Order'

export const router = Router()
export const routePath = '/order'

router.get('/', (req, res) => {
  res.status(200).send()
})

router.get('/:id', (req, res) => {
  res.status(200).send()
})

router.post('/', (req, res) => {
  let order = new Order({
    createdAt: req.body.createdAt,
    deliveredAt: req.body.deliveredAt,
    itemsIds: req.body.itemsIds
  })
  order.save()
  res.status(201).send()
})

router.post('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  let order = new Order({
    id,
    createdAt: req.body.createdAt,
    deliveredAt: req.body.deliveredAt,
    itemsIds: req.body.itemsIds
  })
  order.save()
  res.status(204).send()
})


