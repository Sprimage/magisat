"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logServerOperation = exports.constructUrl = void 0;
function constructUrl(base, params) {
    const query = Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== null) // Exclude parameters with undefined or null values.
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join("&");
    return `${base}?${query}`;
}
exports.constructUrl = constructUrl;
function logServerOperation(message, value) {
    const timestamp = new Date();
    const readableDate = timestamp.toLocaleString();
    console.log(`[${readableDate}] ${message}: ${value}`);
}
exports.logServerOperation = logServerOperation;
//# sourceMappingURL=utils.js.map