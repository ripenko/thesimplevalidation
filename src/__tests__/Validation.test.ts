import { Validation } from "../Validation";
import { describe, expect, test } from "vitest";

describe("[validation].[Validation] checking", () => {
  test("[validation].[Validation].[Dirty]: string field. The same value", async () => {
    const model = {
      field: "Test",
    };
    const validation = new Validation(model);
    expect(
      validation.isDirty({
        field: "Test",
      }),
    ).toEqual(false);
  });
  test("[validation].[Validation].[Dirty]: string field. Not the same value", async () => {
    const model = {
      field: "Test",
    };
    const validation = new Validation(model);
    expect(
      validation.isDirty({
        field: "Test1",
      }),
    ).toEqual(true);
  });
  test("[validation].[Validation].[Dirty]: string field. Empty string", async () => {
    const model = {
      field: "",
    };
    const validation = new Validation(model);
    expect(
      validation.isDirty({
        field: "1",
      }),
    ).toEqual(true);
  });
  test("[validation].[Validation].[Dirty]: number field. The same value", async () => {
    const model = {
      field: 1,
    };
    const validation = new Validation(model);
    expect(
      validation.isDirty({
        field: 1,
      }),
    ).toEqual(false);
  });
  test("[validation].[Validation].[Dirty]: number field. Not the same value", async () => {
    const model = {
      field: 1,
    };
    const validation = new Validation(model);
    expect(
      validation.isDirty({
        field: 0,
      }),
    ).toEqual(true);
  });
  test("[validation].[Validation].[Dirty]: object field. The same object", async () => {
    const model = {
      field: {
        id: "1",
        boolField: false,
      },
    };
    const validation = new Validation(model);
    expect(validation.isDirty(model)).toEqual(false);
  });
  test("[validation].[Validation].[Dirty]: object field. Not the same object. Same field", async () => {
    const model = {
      field: {
        id: "1",
        boolField: false,
      },
    };
    const validation = new Validation(model);
    expect(
      validation.isDirty({
        field: model.field,
      }),
    ).toEqual(false);
  });
  test("[validation].[Validation].[Dirty]: object field. Not the same object. Not the same field. The same value", async () => {
    const model = {
      field: {
        id: "1",
        boolField: false,
      },
    };
    const validation = new Validation(model);
    expect(
      validation.isDirty({
        field: {
          id: "1",
          boolField: false,
        },
      }),
    ).toEqual(false);
  });
  test("[validation].[Validation].[Dirty]: object field. Not the same object. Not the same field. NOT the same value", async () => {
    const model = {
      field: {
        id: "1",
        boolField: false,
      },
    };
    const validation = new Validation(model);
    expect(
      validation.isDirty({
        field: {
          id: "2",
          boolField: false,
        },
      }),
    ).toEqual(true);
  });
  test("[validation].[Validation].[Dirty]: Object. Deep hierarchy. Not the same", async () => {
    const model = {
      field: {
        id: "1",
        child: {
          id: "1.1",
          child: {
            id: "1.1.1",
            child: {
              id: "1.1.1.1",
            },
          },
        },
      },
    };
    const validation = new Validation(model);
    expect(
      validation.isDirty({
        field: {
          id: "1",
          child: {
            id: "1.1",
            child: {
              id: "1.1.1",
              child: {
                id: "1.1.1.1-test",
              },
            },
          },
        },
      }),
    ).toEqual(true);
  });
  test("[validation].[Validation].[Dirty]: Object. Deep hierarchy. The same", async () => {
    const model = {
      field: {
        id: "1",
        child: {
          id: "1.1",
          child: {
            id: "1.1.1",
            child: {
              id: "1.1.1.1",
            },
          },
        },
      },
    };
    const validation = new Validation(model);
    expect(
      validation.isDirty({
        field: {
          id: "1",
          child: {
            id: "1.1",
            child: {
              id: "1.1.1",
              child: {
                id: "1.1.1.1",
              },
            },
          },
        },
      }),
    ).toEqual(false);
  });
  test("[validation].[Validation].[Dirty]: Array. The same reference", async () => {
    const model = {
      field: [
        {
          id: "1",
          childField: false,
        },
        {
          id: "2",
          childField: false,
        },
      ],
    };
    const validation = new Validation(model);
    expect(validation.isDirty(model)).toEqual(false);
  });
  test("[validation].[Validation].[Dirty]: Array. The same", async () => {
    const model = {
      field: [
        {
          id: "1",
          childField: false,
        },
        {
          id: "2",
          childField: false,
        },
      ],
    };
    const validation = new Validation(model);
    expect(
      validation.isDirty({
        field: [
          {
            id: "1",
            childField: false,
          },
          {
            id: "2",
            childField: false,
          },
        ],
      }),
    ).toEqual(false);
  });
  test("[validation].[Validation].[Dirty]: Array. Size is not the same", async () => {
    const model = {
      field: [
        {
          id: "1",
          childField: false,
        },
        {
          id: "2",
          childField: false,
        },
      ],
    };
    const validation = new Validation(model);
    expect(
      validation.isDirty({
        field: [
          {
            id: "1",
            childField: false,
          },
        ],
      }),
    ).toEqual(true);
  });
  test("[validation].[Validation].[Dirty]: Array. Not the same", async () => {
    const model = {
      field: [
        {
          id: "1",
          childField: false,
        },
        {
          id: "2",
          childField: false,
        },
      ],
    };
    const validation = new Validation(model);
    expect(
      validation.isDirty({
        field: [
          {
            id: "1",
            childField: false,
          },
          {
            id: "2",
            childField: true,
          },
        ],
      }),
    ).toEqual(true);
  });
});
