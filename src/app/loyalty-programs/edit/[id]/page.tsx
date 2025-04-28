import { getItems } from "../../actions"
import { ItemForm } from "../../item-form"


export default async function EditItem({ params }: { params: Promise<{ id: number }> }) {
  const items = await getItems()
  const {id} = await params;
  const item = items.find(item => item.id === id)

  if (!item) {
    return <div>Item not found</div>
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Edit Item</h1>
      <ItemForm initialData={item} />
    </div>
  )
}

