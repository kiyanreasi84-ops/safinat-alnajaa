// دریافت لیست نمرات
app.get('/api/scores', (req, res) => {
  res.json(dataBase); // دیتابیس یا فایل JSON شما
});

// ذخیره تغییرات
app.post('/api/scores/update', (req, res) => {
  const { studentId, field, newScore } = req.body;
  // پیدا کردن دانش‌آموز در دیتابیس و آپدیت کردن فیلد او
  updateDatabase(studentId, field, newScore); 
  res.sendStatus(200);
});
