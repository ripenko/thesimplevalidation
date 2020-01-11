export type ValidationModel<TModel> = {
    [K in keyof TModel]: boolean;
};
