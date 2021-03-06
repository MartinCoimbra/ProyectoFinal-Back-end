import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany,
    BaseEntity, JoinTable, OneToMany, OneToOne, JoinColumn, ManyToOne,
} from 'typeorm';
import { Preguntado } from "./Preguntado"
import { Respuesta } from "./Respuesta"



@Entity()
export class Preguntas extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    preguntas: string;

    @Column()
    foto_pregunta: string;

    @ManyToOne(() => Preguntado, preguntado => preguntado.preguntas)
    @JoinColumn({name:'preguntados'})
    preguntado: Preguntado

    @Column({type:'int',nullable: true})
    preguntados:number;

    @OneToMany(() => Respuesta, respuesta => respuesta.pregunta, {
        cascade: true,
    })
    respuesta: Respuesta[]

}