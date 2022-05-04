import mongoose from "mongoose";

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
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (props: UserProperties) => {
  return new User(props);
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
