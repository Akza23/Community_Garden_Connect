const Form = require('../model/form.model');
const fs = require('fs');
const path = require('path');

exports.createForm = async (req, res) => {
    try {
        const { reName, reNo } = req.body;

        // Validate input
        if (!reName || !reNo) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let filePath = null;
        let fileName = null;

        // Handle file upload
        if (req.files && req.files.file) {
            const file = req.files.file;
            fileName = file.name;
            filePath = 'uploads/forms/' + Date.now() + '-' + file.name;
            
            // Ensure directory exists
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            // Move file to the designated folder
            await file.mv(filePath);
        }

        // Create new form entry
        const newForm = new Form({
            reName,
            reNo,
            filePath,
            fileName
        });

        // Save to database
        await newForm.save();

        res.status(201).json({
            message: 'Form submitted successfully',
            data: newForm
        });
    } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({
            message: 'Error submitting form',
            error: error.message
        });
    }
};

exports.getForms = async (req, res) => {
    try {
        const forms = await Form.find().sort({ createdAt: -1 });
        res.status(200).json(forms);
    } catch (error) {
        console.error('Error fetching forms:', error);
        res.status(500).json({
            message: 'Error fetching forms',
            error: error.message
        });
    }
};

exports.updateForm = async (req, res) => {
    try {
        const { id } = req.params;
        const { reName, reNo } = req.body;
        const form = await Form.findById(id);

        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        // Handle file upload if new file is provided
        if (req.files && req.files.file) {
            // Delete old file if exists
            if (form.filePath && fs.existsSync(form.filePath)) {
                fs.unlinkSync(form.filePath);
            }

            const file = req.files.file;
            form.fileName = file.name;
            form.filePath = 'uploads/forms/' + Date.now() + '-' + file.name;
            
            // Ensure directory exists
            const dir = path.dirname(form.filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            // Move new file to the designated folder
            await file.mv(form.filePath);
        }

        // Update form fields
        form.reName = reName;
        form.reNo = reNo;

        await form.save();
        res.json({
            message: 'Form updated successfully',
            data: form
        });
    } catch (error) {
        console.error('Form update error:', error);
        res.status(500).json({
            message: 'Error updating form',
            error: error.message
        });
    }
};