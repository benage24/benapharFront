import { ExpenseList } from "./expense-lis"
import { SaleList } from "./sale-list"

export class SaleResponse{
    count!:number
    previous!:any
    page_size!:number
    next!:any
    results!:ExpenseList[]
}