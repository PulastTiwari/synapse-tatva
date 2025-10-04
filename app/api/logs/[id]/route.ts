import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const log = {
    id: params.id,
    template: "Order Notify",
    templateId: "order-notify",
    timestamp: "2025-01-04T14:32:15Z",
    status: "success",
    duration: 1200,
    sampleData: {
      orderId: "ORD-12345",
      customerEmail: "customer@example.com",
      amount: "$299.99",
      items: "2 items",
    },
    actions: [
      {
        name: "Send Slack Notification",
        status: "success",
        duration: 500,
        request: {
          channel: "#orders",
          message: "New order ORD-12345 received for $299.99",
        },
        response: {
          ok: true,
          ts: "1704376335.123456",
        },
      },
      {
        name: "Send Email Confirmation",
        status: "success",
        duration: 700,
        request: {
          to: "customer@example.com",
          subject: "Order Confirmation - ORD-12345",
          body: "Thank you for your order!",
        },
        response: {
          messageId: "msg-abc123",
          status: "sent",
        },
      },
    ],
  }
  return NextResponse.json({ log })
}
