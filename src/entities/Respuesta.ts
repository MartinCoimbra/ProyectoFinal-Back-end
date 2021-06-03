import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany,
    BaseEntity, JoinTable, OneToMany, OneToOne, ManyToOne, JoinColumn
} from 'typeorm';
import { Preguntas } from "./Preguntas"



@Entity()
export class Respuesta extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    opcion_correcta: string;

    @Column()
    opcion_b: string;

    @Column()
    opcion_c: string;

    @ManyToOne(() => Preguntas, preguntas => preguntas.respuesta)
    @JoinColumn({name:'preguntas'})
    pregunta: Preguntas

    @Column({type:'int',nullable: true})
    preguntas:number;
}