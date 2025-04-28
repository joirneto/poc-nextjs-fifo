"use server"

import { revalidatePath } from "next/cache"
import { Item } from "./columns"

const items: Item[] = [
  {
    id:1,
    name: "testeAB",
    identifier: "testeAB",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function getItems() {
  return items
}

export async function addItem(newItem: Omit<Item, "id">) {
  const item = { ...newItem, id: (items.length + 1) }
  items.push(item)
  revalidatePath("/loyalty-programs")
  return item
}

export async function updateItem(id: number, updatedItem: Partial<Item>) {
  const index = items.findIndex(item => item.id === id)
  if (index !== -1) {
    console.log('updatedItem', updatedItem)
    revalidatePath("/loyalty-programs")
    return items[index]
  }
  return null
}

export async function deleteItem(id: number) {
  const index = items.findIndex(item => item.id === id)
  if (index !== -1) {
    items.splice(index, 1)
    revalidatePath("/loyalty-programs")
    return true
  }
  return false
}

