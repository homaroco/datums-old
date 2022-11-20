import datums from "../stubs/datums.ts";
import Datum from "../interfaces/Datum.ts";

export default {
  getAllDatums: ({ response }: { response: any }) => {
    response.status = 200;
    response.body = {
      success: true,
      data: datums,
    };
  },
  getDatumById: ({
    params,
    response,
  }: {
    params: { id: string },
    response: any,
  }) => {
    const datum: Datum | undefined = datums.find(
      (d: any) => d.id === params.id
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
    const newDatum: Datum = {
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
  deleteDatumById: () => {},
};
