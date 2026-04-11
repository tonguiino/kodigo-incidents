import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

import {
    Field,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function ModalGenerate() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="px-5 py-2.5 text-sm font-medium text-white transition-opacity rounded-lg bg-brand hover:opacity-90">
                    + Nuevo Ticket
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[550px] p-8 rounded-[1.25rem] border-0 shadow-2xl">
                <div className="relative text-left w-full">
                    <div className="flex items-center justify-between mb-4">
                        <AlertDialogTitle className="text-[22px] font-bold text-gray-900">
                            Nueva Incidencia
                        </AlertDialogTitle>
                        <AlertDialogCancel className="absolute w-8 h-8 p-0 m-0 bg-transparent border-0 rounded-md -top-1 -right-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 sm:mt-0">
                            <X className="w-5 h-5" />
                        </AlertDialogCancel>
                    </div>
                    <AlertDialogDescription className="hidden">
                        Crea una nueva incidencia rellenando el formulario.
                    </AlertDialogDescription>

                    <div className="flex flex-col gap-5 mt-2 font-sans w-full">
                        <Field className="space-y-1.5 focus-within:text-brand">
                            <FieldLabel className="text-sm font-semibold text-gray-700">Título del Incidente *</FieldLabel>
                            <Input
                                type="text"
                                placeholder="Ej: Error en cierre de caja"
                                className="h-11 border-gray-200 focus-visible:ring-1 focus-visible:ring-brand focus-visible:border-brand rounded-lg shadow-sm"
                            />
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            <Field className="space-y-1.5 focus-within:text-brand">
                                <FieldLabel className="text-sm font-semibold text-gray-700">Cliente *</FieldLabel>
                                <Input
                                    type="text"
                                    placeholder="Ej. Kodigo"
                                    className="h-11 border-gray-200 focus-visible:ring-1 focus-visible:ring-brand focus-visible:border-brand rounded-lg shadow-sm"
                                />
                            </Field>
                            <Field className="space-y-1.5 focus-within:text-brand">
                                <FieldLabel className="text-sm font-semibold text-gray-700">Prioridad *</FieldLabel>
                                <Select>
                                    <SelectTrigger className="w-full h-11 border-gray-200 focus:ring-1 focus:ring-brand rounded-lg shadow-sm">
                                        <SelectValue placeholder="Medio" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="bajo">Bajo</SelectItem>
                                            <SelectItem value="medio">Medio</SelectItem>
                                            <SelectItem value="alto">Alto</SelectItem>
                                            <SelectItem value="critico">Crítico</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>

                        <Field className="space-y-1.5 focus-within:text-brand">
                            <FieldLabel className="text-sm font-semibold text-gray-700">Agente Asignado</FieldLabel>
                            <Input
                                type="text"
                                placeholder="Nombre del agente"
                                className="h-11 border-gray-200 focus-visible:ring-1 focus-visible:ring-brand focus-visible:border-brand rounded-lg shadow-sm"
                            />
                        </Field>

                        <Field className="space-y-1.5 focus-within:text-brand">
                            <FieldLabel className="text-sm font-semibold text-gray-700">Descripción</FieldLabel>
                            <Textarea
                                placeholder="Escribe los detalles aquí..."
                                className="min-h-[120px] border-gray-200 focus-visible:ring-1 focus-visible:ring-brand focus-visible:border-brand resize-none rounded-lg shadow-sm w-full"
                            />
                        </Field>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6 w-full">
                    <AlertDialogCancel className="w-full h-11 m-0 font-semibold text-gray-700 border-0 bg-neutral-100 hover:bg-neutral-200 rounded-lg sm:mt-0">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction className="w-full h-11 m-0 font-semibold text-white bg-brand hover:opacity-90 rounded-lg sm:mt-0">
                        Crear Ticket
                    </AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}