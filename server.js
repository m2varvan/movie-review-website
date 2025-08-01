import mysql from 'mysql';
import config from './config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// Function to split the name
function splitFullName(fullName) {
  const tokens = fullName.trim().split(/\s+/);
  const firstName = tokens[0];
  const lastName = tokens.slice(1).join(' ');
  return { firstName, lastName };
}

// API Routes
// TODO: Implement the following endpoints:
// GET /api/movies - retrieve all movies from database
app.get('/api/movies', (req, res) => {
  const connection = mysql.createConnection(config);

  const sql = `
    SELECT 
      m.id,
      m.name, 
      m.year, 
      m.quality 
    FROM movies m
  `;

  console.log('Executing SQL:', sql);

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).json({ error: 'Failed to fetch movies' });
    }

    console.log('Query results:', results);

    const movies = results.map(movie => ({
      id: movie.id,
      name: movie.name,
      year: movie.year,
      quality: movie.quality,
    }));

    res.json(movies);
  });

  connection.end();
});

// POST /api/reviews - create a new movie review
app.post('/api/reviews', (req, res) => {
  const { movieID, userID, reviewTitle, reviewContent, reviewScore } = req.body;

  const connection = mysql.createConnection(config);

  const sql = `
    INSERT INTO Review (movieID, userID, reviewTitle, reviewContent, reviewScore)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [movieID, userID, reviewTitle, reviewContent, reviewScore];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).json({ error: 'Failed to submit review' });
    }

    res.status(201).json({ message: 'Review submitted successfully', reviewID: results.insertId });
  });

  connection.end();
});

app.get('/api/search', async (req, res) => {
  
  const { title, actor, director } = req.query;

  let sql = `
  SELECT m.name, d.first_name, d.last_name, a.first_name, a.last_name
  FROM movies m
  JOIN movies_directors md ON md.movie_id = m.id
  JOIN directors d ON d.id = md.director_id
  JOIN roles r ON r.movie_id = m.id
  JOIN actors a ON a.id = r.actor_id
  WHERE 1=1`;

  const params = []

  if (title) {
    sql+= ` AND m.title = ?`;
    params.push(title);
  }
  if (actor) {
    const { firstName, lastName } = splitFullName(actor);
    sql += ` AND a.first_name = ? AND a.last_name = ?`;
    params.push(firstName, lastName);
  }
  if (director) {
    const { firstName, lastName } = splitFullName(director);
    sql += ` AND d.first_name = ? AND d.last_name = ?`;
    params.push(firstName, lastName);
  }

  sql += `
  GROUP BY m.id, m.name, d.first_name, d.last_name, a.first_name, a.last_name
  `;

  try {
    const [rows] = await db.execute(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }

  });
  

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
