import config from '../config/config';
import logger from '../utils/logger';
import mongoose from 'mongoose'

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

interface SubModel {
  key: string;
  value: string;
}

interface Model {
  name: string;
  description?: string;
  price?: number;
  category?: Array<string>;
  attributes?: Array<SubModel>;
  id?: string;
  _id?: string;
  __v?: string;
}

const attributesSchema = new mongoose.Schema<SubModel>({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

const schema = new mongoose.Schema<Model>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: [String],
  },
  attributes: {
    type: [attributesSchema],
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as any)._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Product", schema);