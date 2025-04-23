import bcrypt from "bcrypt";
import Users from "@/models/Users";
import connectDB from "./mongodb";
export const createUserIfNotExists = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  await connectDB();

  let user = await Users.findOne({ email });

  if (!user) {
    const passwordHash = await bcrypt.hash("randomPassword", 10);

    user = await Users.create({
      name,
      email,
      admin: false,
      events: [],
      passwordHash,
    });
  }

  return user;
};
