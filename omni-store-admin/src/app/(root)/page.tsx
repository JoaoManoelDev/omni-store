"use client"

import { Modal } from "@/components/ui/modal"

export default function SetupPage() {
  return (
    <div>
      <Modal title="Modal" description="test description" isOpen onClose={() => {}}>
        Children
      </Modal>
    </div>    
  )
}
