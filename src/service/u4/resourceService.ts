/*
EA & SOA Group 2 HT2020
 */
import { morphism } from "morphism";
import requests from "@/service/requests";
import { MappingError } from "@/service/errors";
import { Resource, resourceFromDto } from "@/entities/resource";

const apiCall = `resources`;

export default {
  /* get a list */
  async getResourceList() {
    console.debug(`resourceService->getResourceList()`);
    const res = await requests.getMany(apiCall);
    return this.mapper(res);
  },

  /* mapping from array of dto to domain objects */
  mapper(dtoArr: []) {
    try {
      return dtoArr.map(dto => morphism(resourceFromDto, dto, Resource));
    } catch (e) {
      throw new MappingError(`Bad JSON array: ${dtoArr}`);
    }
  },

  /* mapping from single dto to domain object */
  singleMapper(dto) {
    try {
      return morphism(resourceFromDto, dto, Resource);
    } catch (e) {
      throw new MappingError(`Bad dto: ${dto}`);
    }
  }
};
