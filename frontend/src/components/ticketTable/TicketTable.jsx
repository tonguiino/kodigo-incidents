import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2 } from "lucide-react";

const TicketTable = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    // Traer los tickets al cargar
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/tickets');
                setTickets(response.data.tickets.data);
            } catch (error) {
                console.error("Error trayendo los tickets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
        window.addEventListener('ticketCreated', fetchTickets);

    }, []);

    const handleStatusChange = async (ticket) => {
        let nextStatus = '';
        if (ticket.status === 'Abierto') nextStatus = 'En progreso';
        else if (ticket.status === 'En progreso') nextStatus = 'Resuelto';
        else return;

        try {
            await axios.patch(`http://localhost:8000/api/tickets/${ticket.id}`, {
                status: nextStatus
            });

            setTickets(currentTickets =>
                currentTickets.map(t =>
                    t.id === ticket.id ? { ...t, status: nextStatus } : t
                )
            );
        } catch (error) {
            console.error("Error actualizando estado:", error);
            alert("Hubo un error al cambiar el estado del ticket.");
        }
    };

    const handleDelete = async (ticketId) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este ticket?")) return;

        try {
            await axios.delete(`http://localhost:8000/api/tickets/${ticketId}`);

            setTickets(currentTickets => currentTickets.filter(t => t.id !== ticketId));
        } catch (error) {
            console.error("Error eliminando ticket:", error);
            alert("Hubo un error al eliminar el ticket.");
        }
    };

    const priorityStyles = {
        'Crítico': 'bg-red-100 text-red-700 hover:bg-red-100 border-transparent',
        'Alto': 'bg-orange-100 text-orange-700 hover:bg-orange-100 border-transparent',
        'Medio': 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-transparent',
        'Bajo': 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-transparent',
    };

    const statusStyles = {
        'Resuelto': 'bg-green-100 text-green-700 hover:bg-green-100 border-transparent',
        'En progreso': 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-transparent',
        'Abierto': 'bg-amber-100 text-amber-700 hover:bg-amber-100 border-transparent',
    };

    return (
        <div className="rounded-[1.25rem] border border-gray-100 bg-white shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-b-gray-100">
                        <TableHead className="font-semibold text-gray-500 text-xs tracking-wider py-4 pl-6">TICKET / CLIENTE</TableHead>
                        <TableHead className="font-semibold text-gray-500 text-xs tracking-wider py-4">PRIORIDAD</TableHead>
                        <TableHead className="font-semibold text-gray-500 text-xs tracking-wider py-4">ESTADO</TableHead>
                        <TableHead className="font-semibold text-gray-500 text-xs tracking-wider py-4">ASIGNADO</TableHead>
                        <TableHead className="font-semibold text-gray-500 text-xs tracking-wider py-4 text-right pr-6">ACCIONES</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="py-8 text-center text-gray-400 font-medium animate-pulse">
                                Cargando tickets...
                            </TableCell>
                        </TableRow>
                    ) : tickets.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="py-8 text-center text-gray-500 font-medium">
                                No hay tickets para mostrar.
                            </TableCell>
                        </TableRow>
                    ) : (
                        tickets.map((ticket) => (
                            <TableRow key={ticket.id} className="border-b-gray-50 hover:bg-gray-50/50 transition-colors">
                                <TableCell className="py-4 pl-6">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900 text-[15px]">{ticket.title}</span>
                                        <span className="text-gray-500 text-sm mt-0.5">{ticket.client}</span>
                                    </div>
                                </TableCell>

                                <TableCell className="py-4">
                                    <Badge variant="outline" className={`px-3 py-1 font-semibold rounded-full ${priorityStyles[ticket.priority]}`}>
                                        {ticket.priority}
                                    </Badge>
                                </TableCell>

                                <TableCell className="py-4">
                                    <Badge variant="outline" className={`px-3 py-1 font-semibold rounded-full ${statusStyles[ticket.status]}`}>
                                        {ticket.status}
                                    </Badge>
                                </TableCell>

                                <TableCell className="py-4 text-gray-600 text-sm">
                                    {ticket.user?.name || 'Sin asignar'}
                                </TableCell>

                                <TableCell className="py-4 pr-6 text-right">
                                    <div className="flex items-center justify-end gap-2">

                                        {ticket.status !== 'Resuelto' && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleStatusChange(ticket)}
                                                className="h-8 w-8 text-brand hover:text-brand hover:bg-brand/10"
                                                title={`Mover a ${ticket.status === 'Abierto' ? 'En progreso' : 'Resuelto'}`}
                                            >
                                                <ArrowRight className="h-5 w-5" />
                                            </Button>
                                        )}
                                        {ticket.status === 'Abierto' && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(ticket.id)}
                                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                title="Eliminar ticket"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default TicketTable;