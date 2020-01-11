import { IValidationPropertyResult } from "./validation-property-result";
export interface IValidationResult<TModel> {
    isValid: boolean;
    properties: {
        [K in keyof TModel]: IValidationPropertyResult;
    };
    errors: string[];
}
