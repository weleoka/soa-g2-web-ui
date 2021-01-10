import { morphism } from "morphism";
import { Resource, resourceFromDto } from "@/entities/resource";
import { Room, roomFromDto } from "@/entities/room";

export interface BookingI {
  uuid: string;
  start: Date;
  end: Date;
  contact: string;
  room: Room;
  resource: Resource;
}
export class Booking implements BookingI {
  uuid: string;
  start: Date;
  end: Date;
  contact: string;
  room: Room;
  resource: Resource;
}
export const bookingFromDto = {
  uuid: "uuid",
  contact: "contact",
  start: {
    path: "start_at",
    fn: str => {
      return new Date(str);
    }
  },
  end: {
    path: "end_at",
    fn: str => {
      return new Date(str);
    }
  },
  room: {
    path: "room",
    fn: dto => {
      return morphism(roomFromDto, dto, Room);
    }
  },
  resource: {
    path: "resource",
    fn: dto => {
      return morphism(resourceFromDto, dto, Resource);
    }
  }
};
