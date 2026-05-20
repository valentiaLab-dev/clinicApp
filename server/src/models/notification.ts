import config from "../config/config";
import logger from "../utils/logger";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

interface Model {
  appointment: object;
  subject?: string;
  to?: string;
  text?: string;
  html?: string;
  status?: string;
  type: string;
  scheduled_date: Date;
  sent_date: Date;
  created_at: Date;
  created_by: object;
  id?: string;
  _id?: string;
  __v?: string;
}

const schema = new mongoose.Schema<Model>({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  subject: {
    type: String,
  },
  to: {
    type: String,
  },
  text: {
    type: String,
  },
  html: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "sent", "failed"],
    default: "pending",
  },
  type: {
    type: String,
    enum: ["email", "sms"],
    default: "email",
    required: true,
  },
  scheduled_date: {
    type: Date,
    default: Date.now,
  },
  sent_date: {
    type: Date,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

schema.pre("save", function (next) {
  // TODO: trigger notification here

  next();
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as any)._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Notification", schema);
