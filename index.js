const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "restaurantsdb.ccygem20qzjo.us-east-2.rds.amazonaws.com",
  database: "restaurantsdb",
  password: "postgres",
  port: 5432
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

// USER Start --------------------
// Register user
app.post("/api/v1/registerUser", (req, res) => {
  const { username, password, address } = req.body;
  pool.query(
    "INSERT INTO users (username, password, address) VALUES ($1, $2, $3)",
    [username, password, address],
    (error, results) => {
      if (error) {
        console.log(error.message)
      }
      res.send(results);
    }
  );
});

// Login user
app.post("/api/v1/login", (req, res) => {
  const { username, password } = req.body;
  pool.query(
    "SELECT * FROM users WHERE username=$1 AND password=$2",
    [username, password],
    (error, results) => {
      if (error) {
        // throw error;
        console.log(error);
      }
      res.send(results.rows);
    }
  );
});
// USER End ----------------------




// Restaurants Start ----------------------
// Get all restaurants
app.get("/api/v1/restaurants", (req, res) => {
  pool.query(
    "SELECT * FROM restaurants",
    [],
    (error, results) => {
      if (error) {
        // throw error;
        console.log(error);
      }

      res.status(200).json(results.rows);
    }
  );
});

// Add Restaurant
app.post("/api/v1/addRestaurant", (req, res) => {
  const { res_name, res_city, res_surbub, res_type, user_id } = req.body;
  pool.query(
    "INSERT INTO restaurants (res_name, res_city, res_surbub, res_type, user_id) VALUES ($1, $2, $3, $4, $5)",
    [res_name, res_city, res_surbub, res_type, user_id],
    (error, results) => {
      if (error) {
        console.log(error.message)
      }
      res.send(results);
    }
  );
});


// Restaurants End ----------------------



// Reviews Start ----------------------
app.get("/api/v1/getResReviews/:res_id", (req, res) => {
  const { res_id } = req.params;

  pool.query(
    "SELECT * FROM reviews WHERE res_id = $1",
    [res_id],
    (error, results) => {
      if (error) {
        // throw error;
        console.log(error)
      }

      res.status(200).json(results.rows);
    }
  );
});

// Add Review
app.post("/api/v1/addReview", (req, res) => {
  const { meal_eaten, liked, disliked, stars, res_id,  user_id} = req.body;
  pool.query(
    "INSERT INTO reviews (meal_eaten, liked, disliked, stars, res_id,  user_id) VALUES ($1, $2, $3, $4, $5, $6)",
    [meal_eaten, liked, disliked, stars, res_id,  user_id],
    (error, results) => {
      if (error) {
        console.log(error.message)
      }
      res.send(results);
    }
  );
});

// Reviews End ------------------------

