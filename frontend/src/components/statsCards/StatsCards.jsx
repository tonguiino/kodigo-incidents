import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { Folder, CircleUserRound, CheckCircle } from "lucide-react";

const StatsCards = () => {
    const [counters, setCounters] = useState({
        abiertos: 0,
        en_progreso: 0,
        resueltos: 0
    });

    useEffect(() => {
        const fetchCounters = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/tickets');
                setCounters(response.data.counters);
            } catch (error) {
                console.error("Error trayendo los contadores:", error);
            }
        };

        fetchCounters();
        window.addEventListener('ticketCreated', fetchCounters);
    }, []); 

    const stats = [
        {
            label: 'ABIERTOS',
            value: counters.abiertos || 0,
            icon: Folder,
            color: 'yellow'
        },
        {
            label: 'EN PROGRESO',
            value: counters.en_progreso || 0,
            icon: CircleUserRound,
            color: 'blue'
        },
        {
            label: 'RESUELTOS',
            value: counters.resueltos || 0,
            icon: CheckCircle,
            color: 'green'
        }
    ];

    const iconColors = {
        yellow: 'text-amber-500',
        blue: 'text-sky-500',
        green: 'text-emerald-500'
    };

    const bgColors = {
        yellow: 'bg-amber-100',
        blue: 'bg-sky-100',
        green: 'bg-emerald-100'
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
                <Card key={stat.label}>
                    <CardContent className="p-8 flex items-center gap-6">
                        <div className={`p-4 rounded-full ${bgColors[stat.color]}`}>
                            <stat.icon className={`w-8 h-8 ${iconColors[stat.color]}`} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-700 tracking-wider">
                                {stat.label}
                            </p>
                            <h3 className="text-5xl font-bold text-gray-900 mt-1">
                                {stat.value}
                            </h3>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default StatsCards;