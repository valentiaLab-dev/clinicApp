import config from '../config/config';
import logger from '../utils/logger';
import mongoose from 'mongoose'

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

interface Model {
  title: string;
  head: object;
  id?: string;
  _id?: string;
  __v?: string;
}

const schema = new mongoose.Schema<Model>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as any)._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Department", schema);
