import mongoose from "mongoose";
import { Password } from "../utils/password";

// An interface that describes the properties of a user
interface UserProperties {
  email: string;
  password: string;
}

// an interface that describes the properties of a User Model
interface UserModel extends mongoose.Model<UserDocument> {
  build(props: UserProperties): UserDocument;
}

// a interface that describes the properties a User Document has
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        // clean up the returned data
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  // check if the password is modified
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  next();
});

userSchema.statics.build = (props: UserProperties) => {
  return new User(props);
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
