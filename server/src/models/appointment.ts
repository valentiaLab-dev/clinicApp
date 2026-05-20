import config from '../config/config';
import logger from '../utils/logger';
import mongoose from 'mongoose'

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

interface Model {
  patient: object;
  appointment_date: Date;
  details:string;
  physician?: string;
  type: string;
  status:string;
  referral_details?: string;
  created_at: Date;
  created_by: object;
  id?: string;
  _id?: string;
  __v?: string;
}

const schema = new mongoose.Schema<Model>({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  appointment_date:{
    type: Date,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  physician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  referral_details: {
    type: String,
  },
  created_at: {
    type: Date,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  }
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as any)._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Appointment", schema);
