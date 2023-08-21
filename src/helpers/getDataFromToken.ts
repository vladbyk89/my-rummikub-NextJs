import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface UserType {
  id: string;
  username: string;
  email: string;
  password: string;
}

export default async function getDataFromToken(req: NextRequest) {
  try {
    const getToken = req.cookies.get("token");

    if (!getToken) return
    const encodedToken = getToken.value;

    const decodedToken = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET!
    ) as UserType;

    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
