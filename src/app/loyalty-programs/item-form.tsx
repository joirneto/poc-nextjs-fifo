"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"

import { Item } from "./columns"

import { toast, Toaster } from "sonner"
import { updateItem } from "./actions"


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome do programa dever ter no mínimo 2 caracteres.",
  }),
  identifier: z.string().min(2, {
    message: "Identificador do programa dever ter no mínimo 2 caracteres.",
  }),
})

export function ItemForm({ initialData }: { initialData?: Item }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      identifier: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      if (initialData) {
        await updateItem(initialData.id, values)
 
      } else {
        await fetch(`/api/loyalty-programs`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }); 
      }
      toast.success('Item criado com sucesso!')
      router.push("/loyalty-programs")
      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Programa</FormLabel>
              <FormControl>
                <Input placeholder="Nome do Programa" {...field} />
              </FormControl>
              <FormDescription>
                Insira o nome do programa de pontos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meu identificador</FormLabel>
              <FormControl>
                <Input placeholder="Meu identificador" {...field} />
              </FormControl>
              <FormDescription>
                Insira o seu identificador dentro do programa (CPF, ID, Login, etc).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : (initialData ? "Atualizar programa" : "Adicionar")}
        </Button>
      </form>
    </Form>
    <Toaster richColors position="top-right" />
      </div>
  )
}

