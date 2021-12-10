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
        throw error;
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
        throw error;
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










// Create restaurant
app.post("/api/v1/createRestaurant", (req, res) => {
  const { studentid, stdname, registered, region, staffno } = req.body;
  pool.query(
    "INSERT INTO studentstbl (studentid, stdname, registered, region, staffno) VALUES ($1, $2, $3, $4, $5)",
    [studentid, stdname, registered, region, staffno],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.sendStatus(201);
    }
  );
});

// Get all students
app.get("/api/v1/students", (req, res) => {
  pool.query(
    "SELECT * FROM student",
    [],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    }
  );
});

// Get all staff
app.get("/api/v1/staff", (req, res) => {
  pool.query(
    "SELECT * FROM stafftbl",
    [],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// Get all courses
app.get("/api/v1/courses", (req, res) => {
  pool.query(
    "SELECT * FROM course",
    [],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// Delete a student
app.delete("/api/v1/deleteStudent/:studentid", (req, res) => {
  const { studentid } = req.params;

  pool.query("DELETE FROM studentstbl WHERE studentid = $1", [studentid], (error, results) => {
    if (error) {
      throw error;
    }
    res.sendStatus(200);
  });
});

// Update student 
app.put("/api/v1/updateStudent/:studentid", (req, res) => {
  const { studentid } = req.params;
  const { stdname, registered, region, staffno } = req.body;

  pool.query(
    "UPDATE studentstbl SET stdname = $1, registered = $2, region = $3, staffno = $4 WHERE studentid = $5",
    [stdname, registered, region, staffno, studentid],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.sendStatus(200);
    }
  );
});




































app.get("/api/v1/issues/:id", (req, res) => {
  const { id } = req.params;

  pool.query(
    "SELECT id, label, status, priority FROM issues WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    }
  );
});

app.put("/api/v1/issues/:id", (req, res) => {
  const { id } = req.params;
  const { label, status, priority } = req.body;

  pool.query(
    "UPDATE issues SET label = $1, status = $2, priority = $3 WHERE id = $4",
    [label, status, priority, id],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.sendStatus(200);
    }
  );
});

app.delete("/api/v1/issues/:id", (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM issues WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }

    res.sendStatus(200);
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`)
});