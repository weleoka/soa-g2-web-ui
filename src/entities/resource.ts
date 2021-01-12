/* eslint-disable */

export interface ResourceI {
  id: string;
  type: string
  description: string;
}
export class Resource implements ResourceI {
  id: string;
  type: string;
  description: string;
}
export const resourceFromDto = {
  id: "id",
  type: "type",
  description: "description"
}
export const resourceToDto = {
  id: "id",
  type: "type",
  description: "description"
}

/*
"uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "start_at": "2021-01-10T20:44:52.518Z",
    "end_at": "2021-01-10T20:44:52.518Z",
    "contact": "string",
    "room": {
  "id": 0,
      "room_code": "string",
      "description": "string"
},
"resource": {
  "id": 0,
      "type": "PROJECTOR",
      "description": "string"
}
}
*/
