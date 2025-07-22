const express = require('express');
const router = express.Router();
const formController = require('../controller/form.controller');

router.post('/form', formController.createForm);
router.put('/form/:id', formController.updateForm);
router.get('/forms', formController.getForms);

module.exports = router;