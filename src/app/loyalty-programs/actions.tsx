"use server"

import { revalidatePath } from "next/cache"
import { Item } from "./columns"

let items: Item[] = [
  {
    id: "1",
    name: "Laptop",
    category: "Electronics",
    price: 999.99,
    stock: 50,
  },
  {
    id: "2",
    name: "T-shirt",
    category: "Clothing",
    price: 19.99,
    stock: 100,
  },
  {
    id: "3",
    name: "Coffee Maker",
    category: "Appliances",
    price: 79.99,
    stock: 30,
  },
]

export async function getItems() {
  return items
}

export async function addItem(newItem: Omit<Item, "id">) {
  const item = { ...newItem, id: (items.length + 1).toString() }
  items.push(item)
  revalidatePath("/loyalty-programs")
  return item
}

export async function updateItem(id: string, updatedItem: Partial<Item>) {
  const index = items.findIndex(item => item.id === id)
  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem }
    revalidatePath("/loyalty-programs")
    return items[index]
  }
  return null
}

export async function deleteItem(id: string) {
  const index = items.findIndex(item => item.id === id)
  if (index !== -1) {
    items.splice(index, 1)
    revalidatePath("/loyalty-programs")
    return true
  }
  return false
}

