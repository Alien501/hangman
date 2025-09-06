"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const environment_1 = require("../config/environment");
exports.loggingMiddleware = (0, morgan_1.default)(environment_1.config.logging.morganFormat, {
    skip: req => {
        return environment_1.config.nodeEnv === 'production' && req.url === '/health';
    },
});
