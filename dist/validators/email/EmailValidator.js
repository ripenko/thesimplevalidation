import { Validator } from "../../Validator";
export class EmailValidator extends Validator {
    constructor(setup) {
        super("EmailValidator", { ...setup });
        this.localAtom = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+$/;
        this.domainLabel = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/;
    }
    async isValidInternal(value) {
        const isValid = this.isEmailAsciiStrict(value);
        return {
            isValid: isValid,
            errors: [],
        };
    }
    isEmailAsciiStrict(value) {
        // Only strings can be validated as emails
        if (typeof value !== "string")
            return false;
        // Reject empty string
        if (value.length === 0)
            return false;
        // If you want to auto-trim user input, uncomment this.
        // NOTE: If you keep trimming, tests with leading/trailing spaces should expect `true`.
        // value = value.trim();
        // Reasonable maximum length for an email address (common practical limit)
        if (value.length > 254)
            return false;
        // Find exactly one '@'
        const at = value.indexOf("@");
        if (at <= 0)
            return false; // no local-part or '@' is the first character
        if (value.indexOf("@", at + 1) !== -1)
            return false; // multiple '@'
        const local = value.slice(0, at);
        const domain = value.slice(at + 1);
        // Domain part must not be empty
        if (domain.length === 0)
            return false;
        // Common practical max length for local-part
        if (local.length > 64)
            return false;
        // ---- local-part checks ----
        // local-part is "dot-atom": atoms separated by dots.
        // This forbids:
        // - leading dot (".max@...")
        // - trailing dot ("max.@...")
        // - double dots ("max..john@...")
        const localParts = local.split(".");
        if (localParts.some((p) => p.length === 0))
            return false;
        // Each atom must contain only allowed ASCII characters
        if (localParts.some((p) => !(this.setup.localAtom ?? this.localAtom).test(p)))
            return false;
        // ---- domain checks ----
        // Domain must have at least one dot -> requires TLD ("example.com")
        // This also forbids:
        // - double dots ("example..com")
        // - leading/trailing dot (".example.com", "example.com.")
        const labels = domain.split(".");
        if (labels.length < 2)
            return false;
        if (labels.some((l) => l.length === 0))
            return false;
        // Each label must be a valid hostname label:
        // - starts with alphanumeric
        // - ends with alphanumeric
        // - may contain hyphens in the middle
        // This forbids "-domain.com" and "domain-.com"
        if (labels.some((l) => !(this.setup.domainLabel ?? this.domainLabel).test(l)))
            return false;
        // TLD policy: letters only, 2..63 chars.
        // This rejects very short/odd TLDs like "x@y.z".
        const tld = labels[labels.length - 1];
        if (!/^[A-Za-z]{2,63}$/.test(tld))
            return false;
        return true;
    }
}
//# sourceMappingURL=EmailValidator.js.map