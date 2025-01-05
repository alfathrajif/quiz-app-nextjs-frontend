import instance from "@/lib/axios/instance";
import { CreateTryout } from "@/types/tryout";

const tryoutService = {
  createTryout: (tryout: CreateTryout) =>
    instance
      .post("/tryouts", tryout)
      .then((response) => response)
      .catch((err) => err.response),
  editTryout: (tryout: CreateTryout, uuid: string) =>
    instance
      .patch(`/tryouts/${uuid}`, tryout)
      .then((response) => response)
      .catch((err) => err.response),
  softDeleteTryout: (uuid: string) =>
    instance
      .put(`/tryouts/${uuid}`)
      .then((response) => response)
      .catch((err) => err.response),
};

export default tryoutService;
