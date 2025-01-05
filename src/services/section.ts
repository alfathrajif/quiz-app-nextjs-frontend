import instance from "@/lib/axios/instance";
import { CreateSection } from "@/types/section";

const sectionService = {
  createSection: (section: CreateSection) =>
    instance
      .post("/sections", section)
      .then((response) => response)
      .catch((err) => err.response),
  editSection: (section: CreateSection, uuid: string) =>
    instance
      .patch(`/sections/${uuid}`, section)
      .then((response) => response)
      .catch((err) => err.response),
  softDeleteSection: (uuid: string) =>
    instance
      .put(`/sections/${uuid}`)
      .then((response) => response)
      .catch((err) => err.response),
};

export default sectionService;
