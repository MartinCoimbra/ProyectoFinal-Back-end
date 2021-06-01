import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany,
    BaseEntity, JoinTable, OneToMany, ManyToOne, JoinColumn
} from 'typeorm';
import { Usuario } from "./Usuario"
import { Preguntado } from './Preguntado';


@Entity()
export class Comentario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    comentario: string;

    @Column()
    calificacion: number;

    @ManyToOne(() => Usuario, usuario => usuario.comentario)
    @JoinColumn()
    usuario: Usuario;

    @ManyToOne(() => Preguntado, preguntado => preguntado.comentario)
    @JoinColumn()
    preguntado: Preguntado;


}