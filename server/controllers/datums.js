import datums from "../stubs/datums.js";

export default {
  getAllDatums: ({ res }) => {
    res.status = 200;
    res.send({
      success: true,
      data: datums,
    })
  },
  getDatumById: ({
    params,
    response,
  }) => {
    const datum = datums.find(
      d => d.id === params.id
    );
    if (!datum) {
      response.status = 404;
      response.body = {
        success: false,
        message: "No datum found",
      };
      return;
    }
    response.status = 200
    response.body = {
      success: true,
      data: datum,
    };
  },
  createDatum: async ({
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
    const { time, tags } = await body.value
    const newDatum = {
      id: crypto.randomUUID(),
      time,
      tags,
    }
    response.status = 200
    response.body = {
      success: true,
      data: newDatum,
    }
  },
  updateDatumById: () => {},
  deleteDatumById: ({ params, response }) => {
    const allDatums = datums.filter(d => d.id !== params.id)
    response.status = 200
    response.body = {
      success: true,
      data: allDatums,
    }
  },
};
