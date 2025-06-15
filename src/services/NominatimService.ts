import type { INominatimResponse } from "../types/INominatimResponse";


const getFromCacheOrFetch = async (lat: number, lon: number): Promise<INominatimResponse> => {

    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    const response = await fetch(url, {
        headers: {
            'User-Agent': 'MiApp/1.0 (miapp@dominio.com)',
        },
    });


    return response.json();



};

export default getFromCacheOrFetch