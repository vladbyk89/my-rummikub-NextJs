import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    console.log(username, email, password);
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    console.log("check 2", salt, hashPassword);

    //Create and save new user to DB
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    console.log("check 3", newUser);

    //send email
    // await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

    return NextResponse.json({
      message: "User created succefully",
      success: true,
      newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
