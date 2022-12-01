import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts'

// import users from "../stubs/users.ts";
import User from "../interfaces/User.ts";

export default {
  getAllUsers: ({ response }: { response: any }) => {
    response.status = 200;
    response.body = {
      success: true,
      data: users,
    };
  },
  getUserById: ({
    params,
    response,
  }: {
    params: { id: string },
    response: any,
  }) => {
    const user: User | undefined = users.find(
      (d: any) => d.id === params.id
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
  }: {
    request: any,
    response: any,
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
    const newUser: User = {
      uuid: crypto.randomUUID(),
      username,
      password_hash: await bcrypt.hash(password),
      email,
      time_created: Date.now(),
      is_active: true,
    }
    response.status = 200
    response.body = {
      success: true,
      data: `User ${username} created`,
    }
  },
  updateUserById: () => {},
  deleteUserById: ({ params, response }: { params: { id: string }, response: any}) => {
    const allUsers = users.filter(d => d.id !== params.id)
    response.status = 200
    response.body = {
      success: true,
      data: allUsers,
    }
  },
};
