import config from '../config/config';
import logger from '../utils/logger';
import mongoose from 'mongoose'

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

interface Person {
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  address: string;
  contact: string;
  gender: string;
  birth_date: Date;
  email?: string;
  id?: string;
  _id?: string;
  __v?: string;
}

const schema = new mongoose.Schema<Person>({
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  suffix: {
    type: String,
    default: " ",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birth_date: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
  },
});

schema.index({ first_name: 1, middle_name: 1, last_name: 1, suffix: 1 }, { unique: true })

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as any)._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Person", schema);
