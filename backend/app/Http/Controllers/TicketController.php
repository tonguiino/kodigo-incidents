<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TicketController extends Controller
{
    public function index()
    {
        $counters = [
            'abiertos'=> Ticket::where('status', 'Abierto')->count(),
            'en_progreso'=> Ticket::where('status', 'En progreso')->count(),
            'resueltos'=> Ticket::where('status', 'Resuelto')->count(),
        ];

        $tickets= Ticket::with('user:id,name')->latest()->paginate(10);

        return response()->json([
            'counters' => $counters,
            'tickets' => $tickets
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'required|string|max:255',
            'client' => 'required|string|max:100',
            'priority' => ['required', Rule::in(['Bajo', 'Medio', 'Alto', 'Crítico'])], // <- Comillas agregadas
            'user_id' => 'required|exists:users,id',
        ]);

        $ticket = Ticket::create($validated);

        return response()->json([
            'message' => 'Ticket creado exitosamente',
            'ticket' => $ticket
        ], 201);
    }

    public function show(Ticket $ticket)
    {
        return response()->json($ticket->load('user:id,name'));
    }

    public function update(Request $request, Ticket $ticket)
    {
        //No se puede editar si está resuelto
        if($ticket->status === 'Resuelto') {
            return response()->json([
                'message' => 'No se puede editar un ticket resuelto',
            ], 403);
        }

        $validated = $request->validate([
            'status' => ['required', Rule::in(['Abierto', 'En progreso', 'Resuelto'])],
        ]);

        $ticket->update(['status' => $validated['status']]);

        return response()->json([
            'message' => 'Estado del ticket actualizado exitosamente',
            'ticket' => $ticket
        ]);
    }

    public function destroy(Ticket $ticket)
    {
        if ($ticket->status !== 'Abierto') {
            return response()->json([
                'error' => 'Solo se pueden eliminar tickets en estado Abierto.'
            ], 403);
        }

        $ticket->delete();

        return response()->json([
            'message' => 'Ticket eliminado correctamente'
        ]);
    }
}