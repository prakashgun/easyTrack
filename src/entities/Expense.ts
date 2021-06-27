import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm/browser"
import { Account } from "./Account"
import { Category } from "./Category"

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable:true,
        length: 200
    })
    name: string

    @ManyToOne(type => Account, account => account.expenses, {
        onDelete: 'CASCADE'
    })
    account: Account
    
    @ManyToOne(type => Category, category => category.expenses, {
        onDelete: 'CASCADE'
    })
    category: Category
}
