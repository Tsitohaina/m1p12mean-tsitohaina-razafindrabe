import { IUser } from '../../user/models/User';

export interface Appointment {
    _id?: string;
    user: IUser;
    vehicle: string;
    appointmentDateTime: string | Date; 
    serviceType: 'Changement d\'huile' | 'Changement de pneus' | 'Entretien général';
    status: 'Planifié' | 'En cours' | 'Terminé' | 'Annulé';
    mechanic?: string;
    date:Date;
}