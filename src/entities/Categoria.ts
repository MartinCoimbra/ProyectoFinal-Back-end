import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne,
    BaseEntity, JoinTable, OneToMany, JoinColumn
} from 'typeorm';
import { Preguntado } from "./Preguntado"

@Entity()
export class Categoria extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Preguntado, preguntado => preguntado.categoria)
    preguntado: Preguntado;

}