import { findIndex } from "lodash"
import data from 'data/items.json'

export class Item {
  id: number
  name: string
  price: number
  currency: string

  constructor(attrs?: {
    id?: number
    name?: string
    price?: number
    currency?: string
  }) {
    if (attrs) {
      this.id = attrs.id
      this.name = attrs.name
      this.price = attrs.price
      this.currency = attrs.currency
    }
  }

  fetch() {
    let index = findIndex(data, {id: this.id})
    this.name = data[index].name
    this.price = data[index].price
    this.currency = data[index].currency
  }

  save() {
   //
  }
}
