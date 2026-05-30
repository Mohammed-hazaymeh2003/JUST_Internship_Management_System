const request = require('supertest');
const { app, db } = require('../server');

afterAll(async () => {
  if (db && db.end) {
    db.end();
  }
});

describe('FTMS Integration Tests', () => {

  describe('GET /categories', () => {
    it('should fetch internship categories successfully', async () => {
      const response = await request(app).get('/categories');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      const hasSE = response.body.some(cat => cat.category_name === 'Software Engineering');
      expect(hasSE).toBe(true);
    });
  });

  describe('POST /login', () => {
    it('should login successfully with valid company credentials', async () => {
      const response = await request(app).post('/login').send({
        email: 'test@company.com',
        password: 'TestCompanyPassword.123@'
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.role).toBe('company');
      expect(response.body.user_id).toBe('C1234567890');
    });

    it('should fail login with invalid password', async () => {
      const response = await request(app).post('/login').send({
        email: 'test@company.com',
        password: 'WrongPassword.123@'
      });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Wrong email or password');
    });
    
    it('should fail login with non-existent email', async () => {
      const response = await request(app).post('/login').send({
        email: 'nobody@company.com',
        password: 'TestCompanyPassword.123@'
      });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Wrong email or password');
    });
  });

  describe('POST /validate-session', () => {
    it('should validate session for existing user', async () => {
      const response = await request(app).post('/validate-session').send({
        user_id: 'C1234567890',
        role: 'company'
      });
      expect(response.status).toBe(200);
      expect(response.body.valid).toBe(true);
    });

    it('should invalidate session for non-existent user or wrong role', async () => {
      const response = await request(app).post('/validate-session').send({
        user_id: 'C1234567890',
        role: 'student'
      });
      expect(response.status).toBe(200);
      expect(response.body.valid).toBe(false);
    });
  });

  describe('POST /add-internship', () => {
    it('should post a new internship connected to the test database', async () => {
      const response = await request(app).post('/add-internship').send({
        internship_title: 'Software Developer Intern',
        internship_description: 'We are looking for a motivated software developer intern to join our dynamic team and work on real world projects that have an impact on the industry.',
        students_required: 2,
        training_duration_months: '3',
        training_start_date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
        training_end_date: new Date(Date.now() + 86400000 * 95).toISOString().split('T')[0],
        category: 'Software Engineering',
        location: 'Amman',
        user_id: 'C1234567890'
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Internship published successfully!');

      const dbResponse = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM internships WHERE internship_title = ?', ['Software Developer Intern'], (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });
      expect(dbResponse.length).toBe(1);
      expect(dbResponse[0].location).toBe('Amman');
    });

    it('should fail to post an internship if description is too short', async () => {
      const response = await request(app).post('/add-internship').send({
        internship_title: 'Software Developer Intern',
        internship_description: 'Short desc',
        students_required: 2,
        training_duration_months: '3',
        training_start_date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
        training_end_date: new Date(Date.now() + 86400000 * 95).toISOString().split('T')[0],
        category: 'Software Engineering',
        location: 'Amman',
        user_id: 'C1234567890'
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Internship Description must contain letters and be at least 50 characters long');
    });
  });

});
