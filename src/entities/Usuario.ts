import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany,
    BaseEntity, JoinTable, OneToMany, OneToOne
} from 'typeorm';
import { Coins } from "./Coins"
import { Comentario } from "./Comentario"



@Entity()
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;
 
    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({default:0})
    puntos: number;

    @Column()
    descripcion: string;

    @Column()
    urlfoto: string;

    @OneToOne(() => Coins, coins => coins.usuario)
    coins: Coins;

    @OneToMany(() => Comentario, comentario => comentario.usuario)
    comentario: Comentario[];

}