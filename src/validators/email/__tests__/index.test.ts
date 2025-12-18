import { describe, expect, test } from "vitest";
import { EmailValidator } from "../EmailValidator";

describe("[validation].[EmailValidator] checking", () => {
  test("[validation].[EmailValidator]: null", async () => {
    const validator = new EmailValidator<{ value: string | null }, "value">();
    const result = await validator.isValidInternal(null);
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: function", async () => {
    const validator = new EmailValidator<{ value: () => void }, "value">();
    const result = await validator.isValidInternal(() => {
      return;
    });
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Empty String", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("");
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Non-email String", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("fdsfsdfs");
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Email String. Simple", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("max@mustermann.com");
    expect(result.isValid).toEqual(true);
  });

  test("[validation].[EmailValidator]: Email String. 3rd level domain", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal(
      "max@mustermann.contoso.com"
    );
    expect(result.isValid).toEqual(true);
  });

  test("[validation].[EmailValidator]: Email String. Dot in local part", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal(
      "max.john@mustermann.contoso.com"
    );
    expect(result.isValid).toEqual(true);
  });

  test("[validation].[EmailValidator]: Email String. + in local part", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal(
      "max+john@mustermann.contoso.com"
    );
    expect(result.isValid).toEqual(true);
  });

  test("[validation].[EmailValidator]: Email String. _ in local part", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal(
      "max_john@mustermann.contoso.com"
    );
    expect(result.isValid).toEqual(true);
  });

  test("[validation].[EmailValidator]: Email String. - in local part", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal(
      "max-john@mustermann.contoso.com"
    );
    expect(result.isValid).toEqual(true);
  });

  test("[validation].[EmailValidator]: Whitespace. Leading space", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal(" max@mustermann.com");
    expect(result.isValid).toEqual(false); // change to true if you trim
  });

  test("[validation].[EmailValidator]: Whitespace. Trailing space", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("max@mustermann.com ");
    expect(result.isValid).toEqual(false); // change to true if you trim
  });

  test("[validation].[EmailValidator]: Whitespace. Inner space", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("max @mustermann.com");
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Missing local-part", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("@mustermann.com");
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Missing domain", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("max@");
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Missing @ delimiter", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("max.mustermann.com");
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Multiple @", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("max@@mustermann.com");
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Local-part. Double dot", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("max..john@mustermann.com");
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Local-part. Starts with dot", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal(".max@mustermann.com");
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Local-part. Ends with dot", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("max.@mustermann.com");
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Domain. Double dot", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("max@mustermann..com");
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Domain. Starts with hyphen", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("max@-mustermann.com");
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Domain. Ends with hyphen in label", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("max@mustermann-.com");
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Minimal valid email", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("a@b.co");
    expect(result.isValid).toEqual(true);
  });

  test("[validation].[EmailValidator]: Case in domain", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("max@Mustermann.COM");
    expect(result.isValid).toEqual(true);
  });

  test("[validation].[EmailValidator]: Plus addressing. Complex tag", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal(
      "max+promo.news@mustermann.com"
    );
    expect(result.isValid).toEqual(true);
  });

  test("[validation].[EmailValidator]: Unicode local-part (depending on policy)", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("müller@mustermann.com");
    expect(result.isValid).toEqual(false);
  });

  test("[validation].[EmailValidator]: Unicode domain (IDN) (depending on policy)", async () => {
    const validator = new EmailValidator<{ value: string }, "value">();
    const result = await validator.isValidInternal("max@bücher.de");
    expect(result.isValid).toEqual(false);
  });
});
