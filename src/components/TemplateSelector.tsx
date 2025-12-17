"use client"

import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { templates } from "@/lib/templates"

interface TemplateSelectorProps {
  onSelectTemplate: (template: any) => void;
}

export function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  // console.log("Templates carregados:", templates); // Debug log removido para produção

  if (!templates || Object.keys(templates).length === 0) {
    return <div className="p-4 text-sm text-red-500">Nenhum template disponível.</div>;
  }

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
    <Accordion type="single" collapsible className="w-full">
      {Object.entries(templates).map(([category, categoryTemplates]) => (
        <AccordionItem value={category} key={category}>
          <AccordionTrigger className="text-lg font-semibold px-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-t">
            {category}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-1 p-1">
              {Array.isArray(categoryTemplates) && categoryTemplates.map((template: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-300 cursor-pointer transition-colors"
                  onClick={() => onSelectTemplate(template)}
                >
                  <span className="font-medium truncate">
                    {getTemplateName(category, template, index)}
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
