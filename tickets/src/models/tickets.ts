import mongoose from "mongoose";

interface TicketProperties {
  title: string;
  price: number;
  userId: string;
}

interface TicketDocument extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

interface TicketModel extends mongoose.Model<TicketDocument> {
  title: string;
  price: number;
  userId: string;
}
