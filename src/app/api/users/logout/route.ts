import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    req.cookies.delete("token");
    return NextResponse.json({ ok: true, message: "token cookie deleted" });
  } catch (error: any) {
    return NextResponse.json({ Error: error.message }, { status: 400 });
  }
}
