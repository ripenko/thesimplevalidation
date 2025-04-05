# thesimplevalidation

The simple validation service

## Installation

```
npm install --save thesimplevalidation
```

## Setup

### create validation

Create a validation using model that is passed to contructor as original model. The original model will be used to identity dirty properties.

```typescript
import Validation from "thesimplevalidation";

const validation = new Validation({
  title: "",
  description: "",
});
```

### Add validators to model property(ies)

There are some built-in validators like `RequiredValidator`, `MinValidator`, `MaxValidator`, `SimpleValidator`, `BooleanValidator`. You can create own by yourself. It is easy.
So. To add validators we use validation scope method `useValidators`.

```typescript
import { RequiredValidator } from "thesimplevalidation";

this.validation.useValidators("title", new RequiredValidator());
```

### 6. Do validation

```typescript
const result = await this.scope.isValid({
  title: "",
  description: "",
});

console.log(result.isValid, result);
// -> false, { isValid: false, properties: { title: { isValid: false, errors: [] }, description: { isValid: true, errors: [] } }, errors: [] }
```

## Usage

### Validation

This class is main point to define validation. Possible to define more than one instance in the form. As you wish.

```typescript
const validation = new Validation<Model>({
  firstName: "",
  lastName: "",
})
  .useValidators("firstName", new RequiredValidator())
  .useValidators("lastName", new RequiredValidator());
```

The value that is passed to constructor is used as initial model or original model.

### `isValid`

Validates the whole model.

```typescript
const model = {
  firstName: "Alexey",
  lastName: "",
};

const result: ValidationResult<Model> = await this.validation.isValid(model);
console.log(result.isValid); // -> false
```

#### `isPropertyValid`

Validates only a specific property.

```typescript
const propertyResult: ValidationPropertyResult =
  await this.validation.isPropertyValid(model, "firstName");
console.log(propertyResult.isValid); // -> false
```

#### `useValidators`

Use this method to set validators for property.

```typescript
this.validation.useValidators(
  "title", // property
  new RequiredValidator(),
  new MaxValidator({ maxValue: () => 10 })
  // add more validators if you need
);
```

#### `useOriginal`

You have built-in ability to check if the property has been changed or not. `isDirty`.
To do it scope save a deep cloned copy of the model on init. When we invoke `isDirty`, then `isDirty` method compares value to saved copy.
`useOriginal` resets saved cloned copy of model.

```typescript
this.validation.useOriginal({
  firstName: "Alexey",
  lastName: "Ripenko",
});
```

#### `isPropertyDirty`

The method of the validation scope allows to check if property has been changed (dirty).

```typescript
this.model.firstName = "Mike";
let isFirstNameDirty: boolean = this.validation.isPropertyDirty(
  model,
  "firstName"
);
console.log(isFirstNameDirty); // -> true

this.validation.useOriginal(this.model);
isFirstNameDirty = this.validation.isPropertyDirty(model, "firstName");
console.log(isFirstNameDirty); // -> false
```

This method has optional `key` parameter. It uses to use nested value if property is object with nested object-properties. Example `someProperty.someNestedProperty.key`, `arrayProperty.key`.

#### `getOriginalProperty`

Gets property from saved cloned model.

```typescript
const originalFirstName = this.validation.getOriginalProperty("firstName");
```

#### `isDirty`

Checks if model or model properties have been changed (dirty).

Checks the whole model

```typescript
this.validation.isDirty(model);
```

or checks only `firstName` property

```typescript
this.validation.isDirty(model, "firstName");
```

or checks multiple properties

```typescript
this.scope.isDirty(model, "firstName", "lastName");
```

### Validators

You can create own validator using the followed template:

```typescript
import {
  ValidationPropertyResult,
  ValidatorSetup,
  Validator,
} from "thesimplevalidation";

// if you need to pass extra data you can put here.
export type MyValidatorSetup<TModel, K extends keyof TModel> = ValidatorSetup<
  TModel,
  K
> & { extraParam: () => number };

export class MyValidator<TModel, K extends keyof TModel> extends Validator<
  TModel,
  K,
  MyValidatorSetup<TModel, K>
> {
  constructor(setup: MyValidatorSetup<TModel, K>) {
    super(setup);
  }

  public async isValidInternal(
    _value: TModel[K]
  ): Promise<ValidationPropertyResult> {
    let isValid: boolean = true;

    //... add validation core here to set isValid

    return {
      isValid: isValid,
      errors: [], // You can add errors here, or use `setup.getErrors` method
    };
  }
}
```

#### `MyValidatorSetup<TModel, K>`

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
  minValue: () => 10,
});
```

#### MaxValidator

Validates the maximum value of property.

Property value is a string then the validator checks the string length.
If an array then the validator checks the array length.
If a number then the validator validate against max value.

```typescript
new MaxValidator({
  maxValue: () => 255,
});
```

#### BooleanValidator

Validates if the model boolean property value is the same if some boolean value

```typescript
new MaxValidator({
  target: () => true,
});
```

#### SimpleValidator

The simpliest validator that option `getValidation` boolean value will be used as isValid of validation. The model property value is not used.
See implementation:

```typescript
export interface SimpleValidatorSetup<TModel, K extends keyof TModel>
  extends ValidatorSetup<TModel, K> {
  getValidation: () => boolean;
}

export class SimpleValidator<TModel, K extends keyof TModel> extends Validator<
  TModel,
  K,
  SimpleValidatorSetup<TModel, K>
> {
  constructor(setup: SimpleValidatorSetup<TModel, K>) {
    super(setup);
  }

  public async isValidInternal(
    _value: TModel[K]
  ): Promise<ValidationPropertyResult> {
    const isValid: boolean = this.setup.getValidation();

    return {
      isValid: isValid,
      errors: [],
    };
  }
}
```

Example:

```typescript
new SimpleValidator({
  getValidation: () => true,
});
// -> isValid = true
```

or

```typescript
new SimpleValidator({
  getValidation: () => false,
});
// -> isValid = false
```

## Credits

[Alexey Ripenko](https://www.linkedin.com/in/ripenko/), [GitHub](https://github.com/ripenko/)

## License

MIT
