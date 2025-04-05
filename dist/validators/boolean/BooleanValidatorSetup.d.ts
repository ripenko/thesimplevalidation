import { ValidatorSetup } from "../../ValidatorSetup";
export type BooleanValidatorSetup<TModel, K extends keyof TModel> = ValidatorSetup<TModel, K> & {
    target: () => boolean;
};
