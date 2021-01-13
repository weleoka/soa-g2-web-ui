/*
EA & SOA Group 2 HT2020
 */
import requests from "@/service/requests";
import { Resource, resourceFromDto } from "@/entities/resource";
import { ApiTools } from "@/service/utils";

const apiCall = `resources`;

export default {
  /* get a list */
  async getResourceList() {
    console.debug(`resourceService->getResourceList()`);
    const res = await requests.getMany(apiCall);
    return ApiTools.mapper(resourceFromDto, res, Resource);
  }
};
