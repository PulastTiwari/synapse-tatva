import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const template = {
    id: params.id,
    name: "Order Notify",
    description: "Send notifications when new orders are received",
    trigger: "webhook",
    mappings: [
      { source: "order_id", placeholder: "{{orderId}}" },
      { source: "customer_email", placeholder: "{{customerEmail}}" },
      { source: "amount", placeholder: "{{amount}}" },
    ],
    actions: [
      { name: "Send Slack Notification", type: "slack" },
      { name: "Send Email Confirmation", type: "email" },
    ],
  }
  return NextResponse.json({ template })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  return NextResponse.json({ template: { id: params.id, ...body } })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true })
}
