import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';

import User from './User';

// o @Entiy('appointments') : indico que os dados da class Appointment serão salvos na tabela appointments
@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    // Como a colunap rovider_id, acima, se relaciona no banco eu coloco o tipo de relacionamento e qual coluna.
    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id'})
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

// posso passar no constructor tab assim: provider: string, date: Date.
// Informo que quero omitir, não vou passar a variavel ID pois ela é criada na função e não recebo ela. Omit<Appointment, 'id'>
/* 
    Como estou usando o Typeorm e as funçoes Entity, Column, PrimaryGeneratedColumn do typeorm não preciso utilizar como exeplo abaixo 
    uma função constructor para minha classe pois o typeorm já faz isso e vamos utilzar chamadas específica deste componente. 

    import { uuid } from 'uuidv4';
    constructor({provider, date}: Omit<Appointment, 'id'>){
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
*/

}


export default Appointment;