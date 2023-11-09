"use client"

import { useState } from "react"
import { Store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { storeModalStore } from "@/stores/store-modal-store"
import { cn } from "@/lib/utils"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[]
}

export const StoreSwitcher = ({
  className,
  items = [],
}: StoreSwitcherProps) => {
  const storeModal = storeModalStore()
  const params = useParams()
  const router = useRouter()

  const formattedItems = items.map(item => ({
    label: item.name,
    value: item.id
  }))

  const currentStore = formattedItems.find(item => item.value === params.storeId)

  const [open, setOpen] = useState(false)

  const onStoreSelect = (store: { value: string, label: string }) => {
    setOpen(false)
    router.push(`/${store.value}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Selecione a loja"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 w-4 h-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto w-4 h-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Buscar loja..." />
            <CommandEmpty>Nenhuma loja encontrada.</CommandEmpty>
            <CommandGroup heading="Lojas">
              {formattedItems.map(store => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 w-4 h-4" />
                  {store.label}
                  <Check className={cn(
                    "ml-auto w-4 h-4",
                    currentStore?.value === store.value
                      ? "opacity-100"
                      : "opacity-0"
                  )} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  storeModal.onOpen()
                }}
              >
                <PlusCircle className="mr-2 w-5 h-5" />
                Criar Loja
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}