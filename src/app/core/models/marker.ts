export class Marker {
    title: string;
    street1?: string;
    street2?: string;
    lat: number;
    lng: number;
    id: string;
    iconUrl?: string;
    label?: string;
    author?: string;
    created?: Date;
    lastUpdated?: Date;
    approved?: Date = null;
    declined?: Date = null;
    deleted: boolean;
}