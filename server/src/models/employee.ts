import config from "../config/config";
import logger from "../utils/logger";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

interface Model {
  hire_date: Date;
  salary?: number;
  is_active: boolean;
  position: object;
  person: object;
  id?: string;
  _id?: string;
  __v?: string;
}

const schema = new mongoose.Schema<Model>({
  hire_date: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: false,
    default: 0,
  },
  is_active: {
    type: Boolean,
    required: false,
    default: true,
  },
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Position",
    required: true,
  },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
});

schema.index({ position: 1, person: 1 }, { unique: true });

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as any)._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Employee", schema);
