import { ObjectId } from "mongodb";

export type tutorGET = {
  _id: ObjectId,
  name: string,
  occupation: string,
  subjects: string[],
  picture: string,
  bio: string
}
