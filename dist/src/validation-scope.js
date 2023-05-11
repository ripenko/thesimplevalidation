"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationScope = void 0;
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var lodash_get_1 = __importDefault(require("lodash.get"));
var lodash_isequal_1 = __importDefault(require("lodash.isequal"));
var lodash_keys_1 = __importDefault(require("lodash.keys"));
var ValidationScope = /** @class */ (function () {
    function ValidationScope(setup) {
        var _this = this;
        this.setup = setup;
        this.useOriginal = function (model) {
            _this.originalModel = (0, lodash_clonedeep_1.default)(model);
            return _this;
        };
        this.useValidators = function (key) {
            var validators = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                validators[_i - 1] = arguments[_i];
            }
            _this.modelInfo[key] = {
                validators: validators
            };
            return _this;
        };
        this.isPropertyDirty = function (field, key) {
            if (key === void 0) { key = null; }
            var model = _this.setup.getModel();
            var originalField = _this.originalModel[field];
            var modelField = model[field];
            if (Array.isArray(originalField) && Array.isArray(modelField)) {
                if (originalField.length !== modelField.length)
                    return true;
                for (var index = 0; index < originalField.length; index++) {
                    if (originalField[index] === modelField[index])
                        continue;
                    if (key == null)
                        return true;
                    if ((0, lodash_get_1.default)(originalField[index], key) !== (0, lodash_get_1.default)(modelField[index], key))
                        return true;
                }
                return false;
            }
            if (key == null)
                return !(0, lodash_isequal_1.default)(_this.originalModel[field], model[field]);
            return (0, lodash_get_1.default)(_this.originalModel[field], key) !== (0, lodash_get_1.default)(model[field], key);
        };
        this.getOriginalProperty = function (field) {
            return _this.originalModel[field];
        };
        this.isDirty = function () {
            var fields = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fields[_i] = arguments[_i];
            }
            var _loop_1 = function (property) {
                if (!_this.originalModel.hasOwnProperty(property))
                    return "continue";
                if (fields && fields.length > 0) {
                    if (!fields.some(function (x) { return x === property; }))
                        return "continue";
                }
                if (_this.isPropertyDirty(property))
                    return { value: true };
            };
            for (var property in _this.originalModel) {
                var state_1 = _loop_1(property);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return false;
        };
        this.isPropertyValid = function (field) { return __awaiter(_this, void 0, void 0, function () {
            var isValid, errors, model, value, _i, _a, validator, validatorResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.modelInfo[field] && this.modelInfo[field].validators && this.modelInfo[field].validators)) return [3 /*break*/, 5];
                        isValid = true;
                        errors = [];
                        model = this.setup.getModel();
                        value = model[field];
                        _i = 0, _a = this.modelInfo[field].validators;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        validator = _a[_i];
                        return [4 /*yield*/, validator.isValid(value, model, field)];
                    case 2:
                        validatorResult = _b.sent();
                        isValid = isValid && validatorResult.isValid;
                        if (!validatorResult.isValid)
                            errors = __spreadArray(__spreadArray([], errors, true), validatorResult.errors, true);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, {
                            isValid: isValid,
                            errors: errors
                        }];
                    case 5: return [2 /*return*/, {
                            isValid: true,
                            errors: []
                        }];
                }
            });
        }); };
        this.isValid = function () { return __awaiter(_this, void 0, void 0, function () {
            var properties, result, _i, properties_1, property, propertyValidationResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        properties = (0, lodash_keys_1.default)(this.setup.getModel());
                        result = {
                            isValid: true,
                            errors: [],
                            properties: {}
                        };
                        _i = 0, properties_1 = properties;
                        _a.label = 1;
                    case 1:
                        if (!(_i < properties_1.length)) return [3 /*break*/, 4];
                        property = properties_1[_i];
                        return [4 /*yield*/, this.isPropertyValid(property)];
                    case 2:
                        propertyValidationResult = _a.sent();
                        result.isValid = result.isValid && propertyValidationResult.isValid;
                        result.properties[property] = propertyValidationResult;
                        if (!propertyValidationResult.isValid)
                            result.errors = __spreadArray(__spreadArray([], result.errors, true), propertyValidationResult.errors, true);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!(this.setup.onValidationChanged != null)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.setup.onValidationChanged(result)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, result];
                }
            });
        }); };
        this.originalModel = (0, lodash_clonedeep_1.default)(setup.getModel());
        this.modelInfo = {};
    }
    return ValidationScope;
}());
exports.ValidationScope = ValidationScope;
//# sourceMappingURL=validation-scope.js.map