import { ValidationPropertyResult } from "../../ValidationPropertyResult";
import { Validator } from "../../Validator";
import { EmailValidatorSetup } from "./EmailValidatorSetup";
export declare class EmailValidator<TModel, K extends keyof TModel> extends Validator<TModel, K, EmailValidatorSetup<TModel, K>> {
    private localAtom;
    private domainLabel;
    constructor(setup?: EmailValidatorSetup<TModel, K>);
    isValidInternal(value: TModel[K]): Promise<ValidationPropertyResult>;
    private isEmailAsciiStrict;
}
