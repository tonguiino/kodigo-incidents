import { useState, useEffect } from "react"
import axios from "axios"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

import { Field, FieldLabel } from "@/components/ui/field"
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
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    const [formData, setFormData] = useState({
        title: "",
        client: "",
        priority: "Medio",
        description: "",
        user_id: "", 
    })

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/users")
                const data = Array.isArray(response.data) ? response.data : []
                setUsers(data)
                
                if (data.length > 0) {
                    setFormData((prev) => ({ ...prev, user_id: data[0].id }))
                }
            } catch (error) {
                console.error("Error cargando usuarios:", error)
            }
        }
        fetchUsers()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await axios.post("http://localhost:8000/api/tickets", formData)
            
            window.dispatchEvent(new Event('ticketCreated'))
            
            setFormData({ 
                title: "", 
                client: "", 
                priority: "Medio", 
                description: "", 
                user_id: users.length > 0 ? users[0].id : "" 
            })
            setOpen(false)
            
        } catch (error) {
            alert("Hubo un error al crear el ticket. Revisa la consola.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button className="px-5 py-2.5 text-sm font-medium text-white transition-opacity rounded-lg bg-brand hover:opacity-90">
                    + Nuevo Ticket
                </Button>
            </AlertDialogTrigger>
            
            <AlertDialogContent className="max-w-[550px] p-8 rounded-[1.25rem] border-0 shadow-2xl">
                <form onSubmit={handleSubmit} className="relative text-left w-full">
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
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                type="text"
                                placeholder="Ej: Error en cierre de caja"
                                className="h-11 border-gray-200 focus-visible:ring-1 focus-visible:ring-brand focus-visible:border-brand rounded-lg shadow-sm"
                            />
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            <Field className="space-y-1.5 focus-within:text-brand">
                                <FieldLabel className="text-sm font-semibold text-gray-700">Cliente *</FieldLabel>
                                <Input
                                    name="client"
                                    value={formData.client}
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    placeholder="Ej. Kodigo"
                                    className="h-11 border-gray-200 focus-visible:ring-1 focus-visible:ring-brand focus-visible:border-brand rounded-lg shadow-sm"
                                />
                            </Field>
                            <Field className="space-y-1.5 focus-within:text-brand">
                                <FieldLabel className="text-sm font-semibold text-gray-700">Prioridad *</FieldLabel>
                                <Select 
                                    value={formData.priority} 
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, priority: val }))}
                                >
                                    <SelectTrigger className="w-full h-11 border-gray-200 focus:ring-1 focus:ring-brand rounded-lg shadow-sm">
                                        <SelectValue placeholder="Selecciona..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Bajo">Bajo</SelectItem>
                                            <SelectItem value="Medio">Medio</SelectItem>
                                            <SelectItem value="Alto">Alto</SelectItem>
                                            <SelectItem value="Crítico">Crítico</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>

                        <Field className="space-y-1.5 focus-within:text-brand">
                            <FieldLabel className="text-sm font-semibold text-gray-700">Agente Asignado</FieldLabel>
                            <Select 
                                value={formData.user_id ? formData.user_id.toString() : ""} 
                                onValueChange={(val) => setFormData(prev => ({ ...prev, user_id: parseInt(val) }))}
                            >
                                <SelectTrigger className="w-full h-11 border-gray-200 focus:ring-1 focus:ring-brand rounded-lg shadow-sm">
                                    <SelectValue placeholder="Selecciona un agente" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {users.map((user) => (
                                            <SelectItem key={user.id} value={user.id.toString()}>
                                                {user.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field className="space-y-1.5 focus-within:text-brand">
                            <FieldLabel className="text-sm font-semibold text-gray-700">Descripción *</FieldLabel>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                placeholder="Escribe los detalles aquí..."
                                className="min-h-[120px] border-gray-200 focus-visible:ring-1 focus-visible:ring-brand focus-visible:border-brand resize-none rounded-lg shadow-sm w-full"
                            />
                        </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6 w-full">
                        <AlertDialogCancel type="button" className="w-full h-11 m-0 font-semibold text-gray-700 border-0 bg-neutral-100 hover:bg-neutral-200 rounded-lg sm:mt-0">
                            Cancelar
                        </AlertDialogCancel>
                        <Button type="submit" disabled={loading} className="w-full h-11 m-0 font-semibold text-white bg-brand hover:opacity-90 rounded-lg sm:mt-0">
                            {loading ? "Creando..." : "Crear Ticket"}
                        </Button>
                    </div>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}