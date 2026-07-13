const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(__dirname)); // برای سرو کردن فایل‌های HTML

// دیتابیس موقت (در حافظه)
let students = [
    { id: 1, name: "علی علوی", weekly: { quiz: 15, assignment: 18, participation: 20 }, term: { midTerm: 17, finalExam: 19 } }
];

// دریافت همه نمرات
app.get('/api/scores', (req, res) => {
    res.json(students);
});

// افزودن دانش‌آموز
app.post('/api/scores/add', (req, res) => {
    students.push(req.body);
    res.status(201).json({ message: 'Added' });
});

// بروزرسانی نمره
app.post('/api/scores/update', (req, res) => {
    const { studentId, type, field, value } = req.body;
    const student = students.find(s => s.id === studentId);
    if (student) {
        student[type][field] = value;
        res.json({ message: 'Updated' });
    } else {
        res.status(404).send('Not found');
    }
});

// حذف دانش‌آموز
app.delete('/api/scores/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    students = students.filter(s => s.id !== id);
    res.json({ message: 'Deleted' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
