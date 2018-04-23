"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const cors = require('cors')({ origin: true });
const alpha = require('alphavantage')({ key: 'EMD6WLAH1PXMDQ2A' });
exports.getStockPrice = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        return alpha.data.intraday(req.body.tickerSymbol)
            .then(data => res.json(data));
    });
});
//# sourceMappingURL=index.js.map