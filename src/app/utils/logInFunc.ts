import connectDB from "@/lib/mongodb";
import Users from "@/models/Users";
import bcrypt from "bcrypt";

export async function loginFunction(email: string, password: string) {
  try {
    await connectDB();
    const user = await Users.findOne({ email });

    if (!user || !user.passwordHash) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      events: user.events,
      admin: user.admin,
    };
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}
