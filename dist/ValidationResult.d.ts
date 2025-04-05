import { ValidationPropertyResult } from "./ValidationPropertyResult";
export type ValidationResult<TModel> = {
    isValid: boolean;
    properties: {
        [K in keyof TModel]: ValidationPropertyResult;
    };
    errors: string[];
};
