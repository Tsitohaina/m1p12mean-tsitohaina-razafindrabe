export interface IAppointmentHistory {
    date: string; 
    serviceDetails?: string;
    cost?: number;
  }
  
export interface IAssignedRepair {
    repairId: string;
    status: 'en attente' | 'en cours' | 'terminé';
  }
  
export interface IManagedMechanic {
    mechanicId: string;
    permissions: string[];
  }
  
 
export interface IUser {
    _id: string;
    name: string;
    mail: string;
    mobil: string;
    password: string;
    role: 'client' | 'mécanicien' | 'manager';
    appointmentHistory: IAppointmentHistory[];
    assignedRepairs: IAssignedRepair[];
    managedMechanics: IManagedMechanic[];
    createdAt?: string;
    updatedAt?: string;
}