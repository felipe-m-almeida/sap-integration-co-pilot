"use client"

import * as React from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } = "@/components/ui/separator"
import { ChevronDownIcon } from "@radix-ui/react-icons"

import { templates } from "@/lib/templates"

interface TemplateSelectorProps {
  onSelectTemplate: (template: any) => void;
}

export function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const getTemplateName = (category: string, template: any, index: number) => {
    if (category === "Cliente") {
      const name = template?.DEBMAS06?.E1KNA1M?.NAME1;
      const ktokd = template?.DEBMAS06?.E1KNA1M?.KTOKD;
      return name ? `${name} (${ktokd || 'Cliente'})` : `Cliente ${index + 1}`;
    } else if (category === "Fornecedor") {
      const name = template?.CREMAS06?.E1LFA1M?.NAME1;
      const ktokd = template?.CREMAS06?.E1LFA1M?.KTOKD;
      return name ? `${name} (${ktokd || 'Fornecedor'})` : `Fornecedor ${index + 1}`;
    } else if (category === "Material") {
      const maktx = template?.MATMAS05?.E1MARAM?.[0]?.E1MAKTM?.[0]?.MAKTX;
      const mtart = template?.MATMAS05?.E1MARAM?.[0]?.MTART;
      return maktx ? `${maktx} (${mtart || 'Material'})` : `Material ${index + 1}`;
    }
    return `Template ${index + 1}`;
  };

  return (
    <Collapsible className="w-full space-y-2">
      {Object.entries(templates).map(([category, categoryTemplates]) => (
        <div key={category}>
          <CollapsibleTrigger className="flex w-full items-center justify-between space-x-4 px-4 py-2 text-lg font-semibold border-b">
            {category}
            <ChevronDownIcon className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 py-2 px-4">
            {Array.isArray(categoryTemplates) && categoryTemplates.map((template: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md border px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => onSelectTemplate(template)}
              >
                <span className="text-sm font-medium leading-none">
                  {getTemplateName(category, template, index)}
                </span>
              </div>
            ))}
            <Separator />
          </CollapsibleContent>
        </div>
      ))}
    </Collapsible>
  )
}
