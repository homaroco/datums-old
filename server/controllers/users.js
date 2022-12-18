import bcrypt from 'bcrypt'
import mysql from 'mysql2'
import * as dotenv from 'dotenv'

dotenv.config()
console.log(process.env.MYSQL_USERNAME)

const db = mysql.createConnection({
  host: process.env.MYSQL_HOSTNAME,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
})
db.connect()

export default {
  getAllUsers: ({ res }) => {
    res.status = 200;
    res.body = {
      success: true,
      data: users,
    };
  },
  getUserById: ({
    params,
    response,
  }) => {
    const user = users.find(
      d => d.id === params.id
    );
    if (!user) {
      response.status = 404;
      response.body = {
        success: false,
        message: "No user found",
      };
      return;
    }
    response.status = 200
    response.body = {
      success: true,
      data: user,
    };
  },
  createUser: async ({
    request,
    response,
  }) => {
    const body = await request.body()
    if (!body) {
      response.status = 404
      response.body = {
        success: false,
        message: 'No data provided',
      }
      return
    }
    const { username, password, email } = await body.value
    const newUser = {
      username,
      password_hash: await bcrypt.hash(password),
      email,
      time_created: new Date().toJSON().slice(0, 19).replace('T', ' '),
      is_active: true,
    }
    let result = await db.execute(
      'insert into users (name, password_hash, email, time_created, is_active) values (?, ?, ?, ?, ?)',
      [newUser.username, newUser.password_hash, newUser.email, newUser.time_created, newUser.is_active],
    )
    response.status = 200
    response.body = {
      success: true,
      data: `User ${username} created`,
      result,
    }
  },
  updateUserById: () => {},
  deleteUserById: ({ params, response }) => {
    const allUsers = users.filter(d => d.id !== params.id)
    response.status = 200
    response.body = {
      success: true,
      data: allUsers,
    }
  },
};
