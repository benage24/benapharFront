// import { IsNotEmpty, IsString } from "class-validator";
// import { GenericValidatorMessages } from "../utilities/generic-validator-message";

export class UserLogin{

    // @IsString()
    // @IsNotEmpty(GenericValidatorMessages.genericEmptyMessage("Nom d'utilisateur"))
    username!: string;

    // @IsString()
    // @IsNotEmpty(GenericValidatorMessages.genericEmptyMessage('Password'))
    password!: string;
}
