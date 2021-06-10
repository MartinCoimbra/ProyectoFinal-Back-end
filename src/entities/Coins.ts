import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany,
    BaseEntity, JoinTable, OneToOne, JoinColumn
} from 'typeorm';
import { Usuario } from "./Usuario"


@Entity()
export class Coins extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
     
    @Column({default:100})
    coins: number;

    @OneToOne(() => Usuario, usuario => usuario.coins)
    @JoinColumn()
    usuario: Usuario;

}
