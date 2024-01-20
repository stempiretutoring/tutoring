export interface tutorGET {
  _id: string;
  name: string;
  occupation: string;
  email: string;
  subjects: string[];
  picture: string;
  bio: string;
  startTime: string[];
  endTime: string[];
  active: boolean;
  booked: string[];
}

export type timeGET = {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  metadata: {
    description: string,
    tutor: string,
    subject: string,
    date: string,
    time: string,
  };
};

export type purchase = {
  tutorName: string,
  subject: string,
  date: string,
  time: string,
  description: string,
}

export interface sendMailProps {
  email: string;
  child: string;
  about: string;
  meeting: string;
  name: string;
  subject: string;
  parentEmail: string;
  date: string;
  time: string;
}
