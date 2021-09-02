const express = require("express");
const cors = require("cors");

const {Router} = require('express');

const router = Router();

router.use(express.json());
router.use(cors());

module.exports = router;