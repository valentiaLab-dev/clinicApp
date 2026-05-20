import config from '../config/config';
import logger from '../utils/logger';
import mongoose from 'mongoose'

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

interface Discount {
  id: number;
  name: string;
}

interface Model {
  appointment: object;
  patient: object;
  discount: Discount;
  print_request: Array<Discount>;
  id?: string;
  _id?: string;
  __v?: string;
}


const schema = new mongoose.Schema<Model>({
  appointment:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  patient:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  discount: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
    }],
  print_request: [
    { type: Date }
  ]
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as any)._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Invoice", schema);
