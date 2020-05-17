import {findIndex, clone, orderBy} from 'lodash'
import data from 'data/orders.json'
import { Item } from './Item'

interface SearchParams {
  limit: number,
  page: number,
  sort?: string,
  order?: 'asc' | 'desc'
}

export class Order {
    id: number
    createdAt: Date
    deliveredAt: Date
    itemsIds: number[]
    items: Item[]

    constructor(attrs?: {
      id?: number,
      createdAt?: Date,
      deliveredAt?: Date,
      itemsIds?: number[]
    }) {
      if (attrs) {
        this.id = attrs.id
        this.createdAt = attrs.createdAt
        this.deliveredAt = attrs.deliveredAt
      }
    }

    fetch(opts?: {include?: boolean}) {
      let index = findIndex(data, {id: this.id})
      this.createdAt = new Date(data[index].createdAt)
      this.deliveredAt = new Date(data[index].deliveredAt)
      this.itemsIds = data[index].itemsIds

    }

    static fetchAll(searchParams: SearchParams): Order[] {
      return []
    }

    save() {
      //
    }
}
