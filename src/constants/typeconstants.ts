import type { IIncidentType } from "../types/IncidentType"


const IncidentTypes: IIncidentType[] = [
    {
        name: 'Basura',
        color: '#6B7280', // gris
    },
    {
        name: 'Contaminación del agua',
        color: '#1E90FF', // azul
    },
    {
        name: 'Contaminación del aire',
        color: '#4B5563', // grafito oscuro
    },
    {
        name: 'Vertido químico',
        color: '#DC2626', // rojo
    },
    {
        name: 'Ruido excesivo',
        color: '#F59E0B', // ámbar
    },
    {
        name: 'Deforestación',
        color: '#16A34A', // verde
    },
    {
        name: 'Vida silvestre en peligro',
        color: '#10B981', // verde claro
    },
    {
        name: 'Inundación',
        color: '#3B82F6', // azul vivo
    },
    {
        name: 'Erosión del suelo',
        color: '#A16207', // marrón
    },
]


export default IncidentTypes

