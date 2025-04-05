import { ValidatorSetup } from "../../ValidatorSetup";
export interface SimpleValidatorSetup<TModel, K extends keyof TModel> extends ValidatorSetup<TModel, K> {
    getValidation: () => boolean;
}
