# thesimplevalidation

The simple validation service

[![Build Status](https://travis-ci.org/ripenko/thesimplevalidation.svg?branch=master)](https://travis-ci.org/ripenko/thesimplevalidation)

## Installation

```
npm install --save thesimplevalidation
```

## Setup
There are paar steps to enable validation.

### 1. Create a model
```typescript
interface IModel {
    title: string;
    description: string;
}
```

### 2. Create or use state, or something similar where we store user model values
```typescript
this.model: IModel = {
    title: "",
    description: ""
};
```

### 3. Create validation model, validation errors model
```typescript
import { ValidationModel } from "thesimplevalidation";

this.validation: ValidationModel<IModel> = {
    title: false,
    description: true
};

this.validationErrors: ValidationErrorsModel<IModel> = {
    title: [];
    description: [];
};

this.allValidationErrors: string [] = [];

this.isValid: boolean = false;
```


### 4. Creating Validation Scope
```typescript
import { ValidationScope } from "thesimplevalidation";

const scope = new ValidationScope<IModel>({
    getModel: (): IModel => this.model
});

```

### 5. Add validators to model property(ies)
There are some built-in validators like `RequiredValidator`, `MinValidator`, `MaxValidator`, `SimpleValidator`, `BooleanValidator`. You can create own by yourself. It is easy.
So. To add validators we use validation scope method `useValidators`.
```typescript
import { RequiredValidator } from "thesimplevalidation";

this.scope.useValidators("title", new RequiredValidator());

```

### 6. Do validation
```typescript
const result: IValidationResult<IModel> = await this.scope.isValid();
console.log(result.isValid, result); 
// -> false, { isValid: false, properties: { title: { isValid: false, errors: [] }, description: { isValid: true, errors: [] } }, errors: [] }
```

## Usage

### ValidationScope
This class is main point to define validation. Possible to define more than one scope in the form. As you wish.
```typescript
const scope = new ValidationScope<IModel>({
    getModel: (): IModel => this.model
    onValidationChanged: async (result: IValidationResult<TModel>): Promise<void> => {
        const properties: Array<keyof TModel> = keys(result.properties) as Array<keyof TModel>;
        const validation: ValidationModel<TModel> = {} as ValidationModel<TModel>;
        const validationErrors: ValidationErrorsModel<TModel> = {} as ValidationErrorsModel<TModel>;

        for (const property of properties) {
            if (!result.properties.hasOwnProperty(property)) continue;
            
            validation[property] = result.properties[property].isValid;
            validationErrors[property] = result.properties[property].errors;
        }

        this.isValid = result.isValid;
        this.validation = validation;
        this.validationErrors = validationErrors;
        this.allValidationErrors = result.errors;
    }
});
```
`getModel` is invoked on validation by method `isValid`.
`onValidationChanged` Optional. To handle validation result. It is invoked before `isValid` method is completed.

### `isValid`
Validates the whole model.
```typescript
const result: IValidationResult<IModel> = await this.scope.isValid();
console.log(result.isValid); // -> false
```

#### `isPropertyValid`
Validates only a specific property.
```typescript
const propertyResult: IValidationPropertyResult = await this.scope.isPropertyValid("description");
console.log(propertyResult.isValid); // -> false
```

#### `useValidators`
Use this method to set validators for property.
```typescript
this.scope.useValidators(
    "title", // property
    new RequiredValidator(), 
    new MaxValidator({ maxValue: () => 10 }),
    // add more validators if you need
);
```

#### `useOriginal`
You have built-in ability to check if the property has been changed or not. `isDirty`. 
To do it scope save a deep cloned copy of the model on init. When we invoke `isDirty`, then `isDirty` method compares value to saved copy.
`useOriginal` resets saved cloned copy of model.
```typescript
this.scope.useOriginal(newModel);
```

#### `isPropertyDirty`
The method of the validation scope allows to check if property has been changed (dirty).
```typescript
this.model.title = "New Title";
let isTitleDirty: boolean = this.scope.isPropertyDirty("title");
console.log(isTitleDirty); // -> true

this.scope.useOriginal(this.model);
isTitleDirty = this.scope.isPropertyDirty("title");
console.log(isTitleDirty); // -> false
```

This method has optional `key` parameter. It uses to use nested value if property is object with nested object-properties. Example `someProperty.someNestedProperty.key`, `arrayProperty.key`.


#### `getOriginalProperty`
Gets property from saved cloned model.
```typescript
const originalTitle = this.scope.getOriginalProperty("title");
```

#### `isDirty`
Checks if model or model properties have been changed (dirty).

Checks the whole model
```typescript
this.scope.isDirty();
```
or checks only `title` property
```typescript
this.scope.isDirty("title");
```
or checks multiple properties
```typescript
this.scope.isDirty("title", "description");
```

### Validators
You can create own validator using the followed template:
```typescript
import { IValidationPropertyResult, IValidatorSetup, Validator } from "thesimplevalidation";

// if you need to pass extra data you can put here.
export interface IMyValidatorSetup<TModel, K extends keyof TModel> extends IValidatorSetup<TModel, K> {
    extraParam: () => number;
}

export class MyValidator<TModel, K extends keyof TModel> extends Validator<TModel, K, IMyValidatorSetup<TModel, K>> {
    constructor(setup: IMyValidatorSetup<TModel, K>) {
        super(setup);
    }

    public async isValidInternal(_value: TModel[K]): Promise<IValidationPropertyResult> {
        let isValid: boolean = true;

        //... add validation core here to set isValid

        return {
            isValid: isValid,
            errors: [] // You can add errors here, or use `setup.getErrors` method
        };
    }
}

```

#### `IMyValidatorSetup<TModel, K>`
The base options of validators.

`isDisabled?: (value: TModel[K]) => boolean;` is used to disable validator based on some logic-function.
Could be nice if validation logic is depended on some values, logic, etc...

`getErrors?: (value: TModel[K]) => string[];` is used to define error messages.

#### RequiredValidator
Validates property against `""`, `null`, `undefined`, `0`, array.`length`.

#### MinValidator
Validates the minimum value of property. 

Property value is a string then the validator checks the string length. 
If an array then the validator checks the array length.
If a number then the validator validate against min value.

```typescript
new MinValidator({
    minValue: () => 10
});
```

#### MaxValidator
Validates the maximum value of property. 

Property value is a string then the validator checks the string length. 
If an array then the validator checks the array length.
If a number then the validator validate against max value.

```typescript
new MaxValidator({
    maxValue: () => 255
});
```

#### BooleanValidator
Validates if the model boolean property value is the same if some boolean value
```typescript
new MaxValidator({
    target: () => true
});
```

#### SimpleValidator
The simpliest validator that option `getValidation` boolean value will be used as isValid of validation. The model property value is not used.
See implementation:
```typescript
export interface ISimpleValidatorSetup<TModel, K extends keyof TModel> extends IValidatorSetup<TModel, K> {
    getValidation: () => boolean;
}

export class SimpleValidator<TModel, K extends keyof TModel> extends Validator<TModel, K, ISimpleValidatorSetup<TModel, K>> {
    constructor(setup: ISimpleValidatorSetup<TModel, K>) {
        super(setup);
    }

    public async isValidInternal(_value: TModel[K]): Promise<IValidationPropertyResult> {
        const isValid: boolean = this.setup.getValidation();

        return {
            isValid: isValid,
            errors: []
        };
    }
}
```

Example:
```typescript
new SimpleValidator({
    getValidation: () => true
});
// -> isValid = true
```
or
```typescript
new SimpleValidator({
    getValidation: () => false
});
// -> isValid = false
```


## Credits
[Alexey Ripenko](http://ripenko.ru/), [GitHub](https://github.com/ripenko/)

## License

MIT
