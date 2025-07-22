import React, { useState, useEffect } from 'react';

const Form1 = () => {
    const [formData, setFormData] = useState({
        reName: '',
        reNo: ''
    });
    const [file, setFile] = useState(null);
    const [forms, setForms] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/recruiter/forms');
            if (response.ok) {
                const data = await response.json();
                setForms(data);
            }
        } catch (error) {
            console.error('Error fetching forms:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataWithFile = new FormData();
        formDataWithFile.append('reName', formData.reName);
        formDataWithFile.append('reNo', formData.reNo);
        if (file) {
            formDataWithFile.append('file', file);
        }

        try {
            const url = editingId
                ? `http://localhost:4000/api/recruiter/form/${editingId}`
                : 'http://localhost:4000/api/recruiter/form';

            const response = await fetch(url, {
                method: editingId ? 'PUT' : 'POST',
                body: formDataWithFile
            });

            if (response.ok) {
                alert(editingId ? 'Form updated successfully!' : 'Form submitted successfully!');
                setFormData({ reName: '', reNo: '' });
                setFile(null);
                setEditingId(null);
                document.getElementById('fileInput').value = '';
                fetchForms();
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit form');
        }
    };

    const handleEdit = (form) => {
        setFormData({
            reName: form.reName,
            reNo: form.reNo
        });
        setEditingId(form._id);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
            <h2>{editingId ? 'Edit Form' : 'Submit Form'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Recruiter Name:
                    </label>
                    <input
                        type="text"
                        name="reName"
                        value={formData.reName}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Recruiter Number:
                    </label>
                    <input
                        type="text"
                        name="reNo"
                        value={formData.reNo}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Upload File:
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        onChange={handleFileChange}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        background: '#4A90E2',
                        color: 'white',
                        padding: '10px 15px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '10px'
                    }}
                >
                    {editingId ? 'Update' : 'Submit'}
                </button>
                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingId(null);
                            setFormData({ reName: '', reNo: '' });
                            setFile(null);
                            document.getElementById('fileInput').value = '';
                        }}
                        style={{
                            background: '#6c757d',
                            color: 'white',
                            padding: '10px 15px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <div style={{ marginTop: '40px' }}>
                <h3>Submitted Forms</h3>
                <div style={{ marginTop: '20px' }}>
                    {forms.map((form) => (
                        <div
                            key={form._id}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                padding: '15px',
                                marginBottom: '15px'
                            }}
                        >
                            <p>Name: {form.reName}</p>
                            <p>Number: {form.reNo}</p>
                            {form.filePath && (
                                <p>
                                    File: <a href={`http://localhost:4000/${form.filePath}`} target="_blank" rel="noopener noreferrer">View File</a>
                                </p>
                            )}
                            <button
                                onClick={() => handleEdit(form)}
                                style={{
                                    background: '#28a745',
                                    color: 'white',
                                    padding: '5px 10px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Form1;