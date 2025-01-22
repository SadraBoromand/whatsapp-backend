import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "enter name valid"],
    },
    email: {
      type: String,
      require: [true, "enter email valid"],
      unique: [true, "email most be unique"],
      lowercase: true,
      validate: [validator.isEmail, "enter valid email address"],
    },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },
    status: {
      type: String,
      default: "Hey there ! I am using whatsapp",
    },
    password: {
      type: String,
      require: [true, "Please provide your password"],
      minLength: [6, "Please make soure is atleast 6 charactures long"],
      maxLength: [128, "Please make soure is less than 128 charactures long"],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});
const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;
