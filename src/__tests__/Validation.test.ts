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
  test("[validation].[Validation].[Dirty]: Complex object", async () => {
    const model = {
      name: "ZZZZZZ",
      displayName: "xxxxx",
      description: "cccccc",
      children: [
        {
          isNew: false,
          isRemoving: false,
          isTemplate: false,
          item: {
            id: "25c57b82-8f41-466c-b31b-8e2065772c3f",
            name: "1111",
            displayName: "2222",
            description: "4444",
            criticality: 2,
            riskType: null,
            riskOwner: "3333",
            meta: null,
            status: "deprecated",
            createdAt: "2026-01-20T19:08:49.428Z",
            updatedAt: "2026-01-20T19:09:01.451Z",
            finalizedAt: "2026-01-20T20:08:54.073Z",
            releasedAt: "2026-01-20T20:08:58.086Z",
            latestUpdateAt: "2026-01-20T20:08:58.086Z",
            trashedAt: null,
            deletedAt: null,
            author: {
              creatorUserId: "e216a07e-b77f-4da7-98fc-aad502b21e4e",
              creatorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
              latestEditorUserId: "349056a2-87d3-406f-a469-6ac9e7d1905b",
              latestEditorUsername: "superadmin",
              latestEditorFirstname: "Alexey",
              latestEditorLastname: "Ripenko",
              latestEditorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
              latestEditorCompanyName: "xiting",
              latestEditorCompanyDisplayName: "Xiting",
              trashedByUserId: null,
              trashedByCompanyId: null,
              deletedByUserId: null,
              deletedByCompanyId: null,
            },
            businessProcess: null,
            riskLevel: {
              id: "b559dd52-67dc-4ba9-8f39-7d7d9fd40b50",
              name: "2",
              criticality: 2,
              color: "#FFE396",
              createdAt: "2025-12-23T21:08:11.576Z",
              updatedAt: "2025-12-23T21:08:11.576Z",
              latestUpdateAt: "2025-12-23T22:08:11.590Z",
              author: {
                creatorUserId: "349056a2-87d3-406f-a469-6ac9e7d1905b",
                latestEditorUserId: "349056a2-87d3-406f-a469-6ac9e7d1905b",
                creatorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
                latestEditorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
              },
            },
          },
        },
        {
          isNew: false,
          isRemoving: false,
          isTemplate: false,
          item: {
            id: "fb00713c-a548-48a0-8a2d-959077de8ce9",
            name: "cccccc1111",
            displayName: "cccccccccccc222",
            description: "",
            criticality: 2,
            riskType: null,
            riskOwner: "",
            meta: null,
            status: "draft",
            createdAt: "2026-01-11T20:59:31.110Z",
            updatedAt: "2026-01-28T12:38:51.758Z",
            finalizedAt: null,
            releasedAt: null,
            latestUpdateAt: "2026-01-28T13:38:51.896Z",
            trashedAt: null,
            deletedAt: null,
            author: {
              creatorUserId: "b6ced2e9-d559-41c7-81f4-cf3a4080f377",
              creatorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
              latestEditorUserId: "349056a2-87d3-406f-a469-6ac9e7d1905b",
              latestEditorUsername: "superadmin",
              latestEditorFirstname: "Alexey",
              latestEditorLastname: "Ripenko",
              latestEditorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
              latestEditorCompanyName: "xiting",
              latestEditorCompanyDisplayName: "Xiting",
              trashedByUserId: "349056a2-87d3-406f-a469-6ac9e7d1905b",
              trashedByUsername: "superadmin",
              trashedByFirstname: "Alexey",
              trashedByLastname: "Ripenko",
              trashedByCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
              trashedByCompanyName: "xiting",
              trashedByCompanyDisplayName: "Xiting",
              deletedByUserId: null,
              deletedByCompanyId: null,
            },
            businessProcess: null,
            riskLevel: {
              id: "b559dd52-67dc-4ba9-8f39-7d7d9fd40b50",
              name: "2",
              criticality: 2,
              color: "#FFE396",
              createdAt: "2025-12-23T21:08:11.576Z",
              updatedAt: "2025-12-23T21:08:11.576Z",
              latestUpdateAt: "2025-12-23T22:08:11.590Z",
              author: {
                creatorUserId: "349056a2-87d3-406f-a469-6ac9e7d1905b",
                latestEditorUserId: "349056a2-87d3-406f-a469-6ac9e7d1905b",
                creatorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
                latestEditorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
              },
            },
          },
        },
      ],
    };
    const validation = new Validation(model);
    expect(
      validation.isDirty({
        name: "ZZZZZZ",
        displayName: "xxxxx",
        description: "cccccc",
        children: [
          {
            isNew: false,
            isRemoving: false,
            isTemplate: false,
            item: {
              id: "25c57b82-8f41-466c-b31b-8e2065772c3f",
              name: "1111",
              displayName: "2222",
              description: "4444",
              criticality: 2,
              riskType: null,
              riskOwner: "3333",
              meta: null,
              status: "deprecated",
              createdAt: "2026-01-20T19:08:49.428Z",
              updatedAt: "2026-01-20T19:09:01.451Z",
              finalizedAt: "2026-01-20T20:08:54.073Z",
              releasedAt: "2026-01-20T20:08:58.086Z",
              latestUpdateAt: "2026-01-20T20:08:58.086Z",
              trashedAt: null,
              deletedAt: null,
              author: {
                creatorUserId: "e216a07e-b77f-4da7-98fc-aad502b21e4e",
                creatorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
                latestEditorUserId: "349056a2-87d3-406f-a469-6ac9e7d1905b",
                latestEditorUsername: "superadmin",
                latestEditorFirstname: "Alexey",
                latestEditorLastname: "Ripenko",
                latestEditorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
                latestEditorCompanyName: "xiting",
                latestEditorCompanyDisplayName: "Xiting",
                trashedByUserId: null,
                trashedByCompanyId: null,
                deletedByUserId: null,
                deletedByCompanyId: null,
              },
              businessProcess: null,
              riskLevel: {
                id: "b559dd52-67dc-4ba9-8f39-7d7d9fd40b50",
                name: "2",
                criticality: 2,
                color: "#FFE396",
                createdAt: "2025-12-23T21:08:11.576Z",
                updatedAt: "2025-12-23T21:08:11.576Z",
                latestUpdateAt: "2025-12-23T22:08:11.590Z",
                author: {
                  creatorUserId: "349056a2-87d3-406f-a469-6ac9e7d1905b",
                  latestEditorUserId: "349056a2-87d3-406f-a469-6ac9e7d1905b",
                  creatorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
                  latestEditorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
                },
              },
            },
          },
          {
            isNew: false,
            isRemoving: true,
            isTemplate: false,
            item: {
              id: "fb00713c-a548-48a0-8a2d-959077de8ce9",
              name: "cccccc1111",
              displayName: "cccccccccccc222",
              description: "",
              criticality: 2,
              riskType: null,
              riskOwner: "",
              meta: null,
              status: "draft",
              createdAt: "2026-01-11T20:59:31.110Z",
              updatedAt: "2026-01-28T12:38:51.758Z",
              finalizedAt: null,
              releasedAt: null,
              latestUpdateAt: "2026-01-28T13:38:51.896Z",
              trashedAt: null,
              deletedAt: null,
              author: {
                creatorUserId: "b6ced2e9-d559-41c7-81f4-cf3a4080f377",
                creatorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
                latestEditorUserId: "349056a2-87d3-406f-a469-6ac9e7d1905b",
                latestEditorUsername: "superadmin",
                latestEditorFirstname: "Alexey",
                latestEditorLastname: "Ripenko",
                latestEditorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
                latestEditorCompanyName: "xiting",
                latestEditorCompanyDisplayName: "Xiting",
                trashedByUserId: "349056a2-87d3-406f-a469-6ac9e7d1905b",
                trashedByUsername: "superadmin",
                trashedByFirstname: "Alexey",
                trashedByLastname: "Ripenko",
                trashedByCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
                trashedByCompanyName: "xiting",
                trashedByCompanyDisplayName: "Xiting",
                deletedByUserId: null,
                deletedByCompanyId: null,
              },
              businessProcess: null,
              riskLevel: {
                id: "b559dd52-67dc-4ba9-8f39-7d7d9fd40b50",
                name: "2",
                criticality: 2,
                color: "#FFE396",
                createdAt: "2025-12-23T21:08:11.576Z",
                updatedAt: "2025-12-23T21:08:11.576Z",
                latestUpdateAt: "2025-12-23T22:08:11.590Z",
                author: {
                  creatorUserId: "349056a2-87d3-406f-a469-6ac9e7d1905b",
                  latestEditorUserId: "349056a2-87d3-406f-a469-6ac9e7d1905b",
                  creatorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
                  latestEditorCompanyId: "db98e8c7-ab9e-4658-856f-cff6638bd185",
                },
              },
            },
          },
        ],
      }),
    ).toEqual(true);
  });
});
