"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const words_1 = require("@src/data/words");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    const randomWord = words_1.wordList[Math.round(Math.random() * words_1.wordList.length)];
    res.status(200).send({
        message: 'Data fetched successfully!',
        data: randomWord,
    });
});
exports.default = router;
