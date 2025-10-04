import { NextResponse } from "next/server"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  return NextResponse.json({ schedule: { id: params.id, ...body } })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true })
}
