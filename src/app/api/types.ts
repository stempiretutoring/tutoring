export interface tutorGET {
  _id: string,
  name: string,
  occupation: string,
  email: string,
  subjects: string[],
  picture: string,
  bio: string,
  startTime: string[],
  endTime: string[],
  active: boolean,
}

export type timeGET = {
    monday: string[],
    tuesday: string[],
    wednesday: string[],
    thursday: string[],
    friday: string[],
    saturday: string[],
    sunday: string[],
  }
