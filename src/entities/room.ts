/* eslint-disable */

export interface RoomI {
  id: string;
  roomCode: string;
  description: string;
}
export class Room implements RoomI {
  id: string;
  roomCode: string;
  description: string;
}
export const roomFromDto = {
  id: "id",
  roomCode: "room_code",
  description: "description"
}
export const roomToDto = {
  id: "id",
  room_code: "roomCode",
  description: "description"
}
