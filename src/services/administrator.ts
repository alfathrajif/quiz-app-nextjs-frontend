import instance from "@/lib/axios/instance";
import { CreateUser } from "@/types/user";

const administratorService = {
  createAdministrator: (data: CreateUser) =>
    instance
      .post("/admin/administrators", data)
      .then((response) => response)
      .catch((err) => err.response),
  softDeleteAdministrator: (uuid: string) =>
    instance
      .put(`/admin/administrators/${uuid}`)
      .then((response) => response)
      .catch((err) => err.response),
};

export default administratorService;
