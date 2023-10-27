"use client"

import { Modal } from "@/components/ui/modal"
import { storeModalStore } from "@/stores/store-modal-store"

export const StoreModal = () => {
  const storeModal = storeModalStore()

  return (
    <Modal
      title="Criar Loja"
      description="Crie uma loja para gerenciar produtos e categorias"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Future Create Store Form
    </Modal>
  )
}