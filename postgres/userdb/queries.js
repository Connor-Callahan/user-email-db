const tracer = require("dd-trace").init();
const Pool = require("pg").Pool;

const logger = require("./logservice.js");

const pool = new Pool({
  user: "docker",
  host: "postgresql",
  database: "api",
  password: "docker",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
      logger.error(error);
    }
    response.status(200).json(results.rows);
    logger.info(`Users retreived from ${request.route.path}`)
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  logger.info(`Request received at ${request.route.path}`, request.route);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      logger.error(error);
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  logger.info(`Request received at ${request.route.path}`, request.route);

  if (name == null || name == "") {
    logger.error("Name field is empty");
  }

  if (email == null || email == "") {
    logger.error("Email field is empty");
  }

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error, results) => {
      if (error) {
        logger.error(error);
        throw error;
      }
      logger.info(`User added with ID: ${results.insertId}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  logger.info(`Request received at ${request.route.path}`, request.route);

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {  
        logger.error(error);
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
      logger.info("info");
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  logger.info(`Request received at ${request.route.path}`, request.route);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      logger.error(error);
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
    logger.info(info)
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};