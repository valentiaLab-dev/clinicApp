import config from '../config/config';
import logger from '../utils/logger';
import mongoose from 'mongoose'

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

interface Model {
  product:object;
  supplier: object;
  quantity: number;
  id?: string;
  _id?: string;
  __v?: string;
}

const schema = new mongoose.Schema<Model>({
  product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      require:true,
    },
  supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Suppliers",
      require:true,
    },
  quantity: {
    type: Number,
    default: 0,
    require:true,
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as any)._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Inventory", schema);