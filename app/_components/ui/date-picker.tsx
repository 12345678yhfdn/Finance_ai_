"use client";

import * as React from "react";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react"; // Importando diretamente da biblioteca
import { cn } from "@/app/_lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { SelectSingleEventHandler } from "react-day-picker";
// Supondo que o ícone está importado aqui
// Certifique-se de que este import está correto

interface DatePickerProps {
  value?: Date;
  onChange?: SelectSingleEventHandler;
}

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {value ? (
            new Date(value).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          ) : (
            <span>Selecionde uma data...</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
};
