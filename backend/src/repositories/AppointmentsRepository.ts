import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment) // Passo como parametro o meu model. 
class AppointmentsRepository extends Repository<Appointment> { // Repository<Appointment> digo que a interface ou classe repository recebe como paramentro  de um tipagem

    // Se eu quero aguardar a função responder devo utilzar o await e com uma função do tipo async
    // O retorno de uma função async sempre vai ser uma Promise. Por isso coloquei Promise na função.
    public async findByDate(date: Date): Promise <Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date }
        });

        return findAppointment || null;

    }
}

export default AppointmentsRepository;


// SEM USAR O TYPEORM
/*
import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// DTO -> Data Transfer Object
interface CreateAppointmentDTO{
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    
    private appointments: Appointment[];

    constructor(){
        this.appointments = [];
    }

    public all(): Appointment[]{
        return this.appointments;
    }

    // { provider, date } -> Entre {} quer dizer que é um objeto ai já posso pegar o objeto específico
    // ou posso usar -> date: CreateAppointmentDTO e na hora de chamar a variavel uso: data.provider
    public create({ provider, date }: CreateAppointmentDTO ): Appointment {
        const appointment = new Appointment({provider, date});

        this.appointments.push(appointment);

        return appointment;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment => 
            isEqual(date, appointment.date),    
        );

        return findAppointment || null;

    }
}

export default AppointmentsRepository;
*/