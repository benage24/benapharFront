import { IsNotEmpty } from "class-validator"
import { GenericValidatorMessages } from "../utilities/generic-validator-message"

export class AddSale{
    @IsNotEmpty(GenericValidatorMessages.genericEmptyMessage("La date "))
    date!:string
    @IsNotEmpty(GenericValidatorMessages.genericEmptyMessage("Le montant"))
    amount!:number
}