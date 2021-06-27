import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm/browser"
import { Expense } from "./Expense"

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        length: 50
    })
    name: string

    @Column()
    icon: string

    @OneToMany(type=>Expense, expense => expense.category)
    expenses: Expense[]
}
