import users from "../stubs/users.ts";
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
    const { time, tags } = await body.value
    const newUser: User = {
      id: crypto.randomUUID(),
      time,
      tags,
    }
    response.status = 200
    response.body = {
      success: true,
      data: newUser,
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
