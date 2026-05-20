import config from "../config/config";
import logger from "../utils/logger";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

interface Model {
  name: string;
  details?: string;
  price?: number;
  category?: Array<string>;
  products?: string;
  id?: string;
  _id?: string;
  __v?: string;
}

const schema = new mongoose.Schema<Model>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  details: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: [String],
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
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

export default mongoose.model("Service", schema);
