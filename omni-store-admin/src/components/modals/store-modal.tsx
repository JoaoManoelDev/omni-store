"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import toast from "react-hot-toast"

import { Modal } from "@/components/ui/modal"
import { NewStoreInput, newStoreSchema } from "@/lib/validations/store"
import { storeModalStore } from "@/stores/store-modal-store"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"

export const StoreModal = () => {
  const storeModal = storeModalStore()

  const onSubmit = async (data: NewStoreInput) => {
    try {
      await axios.post("/api/store", data)

      toast.success("Loja criada.")

      newStoreForm.reset()
    } catch (error) {
      console.log("[CREATE STORE MODAL]", error)
      toast.error("Algo deu errado.")
    }
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
                    <Input disabled={newStoreForm.formState.isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 space-x-2 flex items-center justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={storeModal.onClose}
                disabled={newStoreForm.formState.isSubmitting}
              >
                Cancelar
              </Button>
              
              <Button
                type="submit"
                disabled={newStoreForm.formState.isSubmitting}
              >
                Criar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}
