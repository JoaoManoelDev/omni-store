"use client"

import { useEffect } from "react"

import { storeModalStore } from "@/stores/store-modal-store"

export default function SetupPage() {
  const onOpen = storeModalStore((state) => state.onOpen)
  const isOpen = storeModalStore((state) => state.isOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return null
}
