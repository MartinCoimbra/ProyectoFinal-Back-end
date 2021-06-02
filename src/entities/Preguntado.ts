import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany,
    BaseEntity, JoinTable, OneToMany, JoinColumn, ManyToOne
} from 'typeorm';
import { Comentario } from "./Comentario"
import { Categoria } from "./Categoria"
import { Preguntas } from './Preguntas';

@Entity()
export class Preguntado extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column({default: 0})
    calificacion: number;

    @Column()
    url_foto: string;

    @OneToMany(() => Comentario, comentario => comentario.preguntado)
    comentario: Comentario;

    @ManyToOne(() => Categoria, categoria => categoria.preguntado)
    categoria: Categoria;

    @OneToMany(() => Preguntas, preguntas => preguntas.preguntado, {
        cascade: true,
    })

    preguntas: Preguntas



}