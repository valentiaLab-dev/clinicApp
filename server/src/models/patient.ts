import config from '../config/config';
import logger from '../utils/logger';
import mongoose from 'mongoose'

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

interface SubModel {
  description: string;
  start_date?: Date;
  end_date?: Date;
}

interface Model {
  person: object;
  medications?: Array<SubModel>;
  allergies?: Array<SubModel>;
  medical_history?: Array<SubModel>;
  family_history?: Array<SubModel>;
  appointments: Array<object>
  id?: string;
  _id?: string;
  __v?: string;
}
const medicationsSchema = new mongoose.Schema<SubModel>({
  description: { type: String, required: true },
  start_date: { type: Date},
  end_date: { type: Date},
});

const allergiesSchema = new mongoose.Schema<SubModel>({
  description: { type: String, required: true },
  start_date: { type: Date},
  end_date: { type: Date},
});

const medicalHistorySchema = new mongoose.Schema<SubModel>({
  description: { type: String, required: true },
  start_date: { type: Date},
  end_date: { type: Date},
});

const familyHistorySchema = new mongoose.Schema<SubModel>({
  description: { type: String, required: true },
  start_date: { type: Date},
  end_date: { type: Date},
});

const schema = new mongoose.Schema<Model>({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  medications: [medicationsSchema],
  allergies: [allergiesSchema],
  medical_history: [medicalHistorySchema],
  family_history: [familyHistorySchema],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as any)._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Patient", schema);
