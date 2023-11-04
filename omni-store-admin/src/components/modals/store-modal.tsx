"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Modal } from "@/components/ui/modal"
import { NewStoreInput, newStoreSchema } from "@/lib/validations/store"
import { storeModalStore } from "@/stores/store-modal-store"
import { Input } from "../ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "../ui/button"

export const StoreModal = () => {
  const storeModal = storeModalStore()

  const onSubmit = (data: NewStoreInput) => {
    console.log(data)
    // TODO: Create Store
  }

  const newStoreForm = useForm<NewStoreInput>({
    resolver: zodResolver(newStoreSchema),
    defaultValues: {
      name: ""
    }
  }) 

  return (
    <Modal
      title="Criar Loja"
      description="Crie uma loja para gerenciar produtos e categorias"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...newStoreForm}>
          <form onSubmit={newStoreForm.handleSubmit(onSubmit)}>
            <FormField
              control={newStoreForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da loja</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 space-x-2 flex items-center justify-end">
              <Button type="button" variant="outline" onClick={storeModal.onClose}>Cancelar</Button>
              <Button type="submit">Criar</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}