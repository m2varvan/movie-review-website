import mysql from 'mysql';
import config from './config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
// import { restart } from 'nodemon';

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
  console.log('Incoming review data:', req.body); 

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

// Search api to gets a list of movies based on user input
app.get('/api/search', (req, res) => {
  const { title, actor, director } = req.query;

  const connection = mysql.createConnection(config);

  let sql = `
    SELECT m.name AS movieTitle, 
           AVG(r.reviewScore) AS averageRating, 
           GROUP_CONCAT(DISTINCT r.reviewContent SEPARATOR '||') AS reviewTexts,  
           GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ', d.last_name) SEPARATOR '||') AS directorList
    FROM movies m
    JOIN movies_directors md ON md.movie_id = m.id
    JOIN directors d ON d.id = md.director_id
    LEFT JOIN roles ro ON ro.movie_id = m.id
    LEFT JOIN actors a ON a.id = ro.actor_id
    LEFT JOIN Review r ON m.id = r.movieID
    WHERE 1=1
  `;

  const params = [];

  if (title) {
    sql += ` AND m.name = ?`;
    params.push(title);
  }

  if (actor) {
    const { firstName, lastName } = splitFullName(actor);
    sql += ` AND a.first_name = ? AND a.last_name = ?`;
    params.push(firstName, lastName);
  }

  if (director) {
  const { firstName, lastName } = splitFullName(director);
  sql += ` AND m.id IN (
              SELECT md2.movie_id
              FROM movies_directors md2
              JOIN directors d2 ON md2.director_id = d2.id
              WHERE d2.first_name = ? AND d2.last_name = ?
            )`;
  params.push(firstName, lastName);
  }

  sql += ` GROUP BY m.id, m.name`;

  connection.connect(err => {
    if (err) {
      console.error('Connection error:', err);
      return res.status(500).json({ error: 'Database connection failed' });
    }

    connection.query(sql, params, (err, rows) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).json({ error: 'Database query failed' });
      }

      const transformed = rows.map(row => ({
        movieTitle: row.movieTitle,
        director: row.directorList ? row.directorList.split('||') : [],
        averageRating: row.averageRating ? parseFloat(row.averageRating).toFixed(2) : "N/A",
        reviews: row.reviewTexts ? row.reviewTexts.split('||') : []
      }));

      connection.end();

      if (!title && !director && !actor) {
        return res.json([]);
      }

      res.json(transformed);

    });
  });
});
  

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
