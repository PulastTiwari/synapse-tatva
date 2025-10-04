import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { templateId, sampleData, mockMode } = body

  // Simulate execution
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const runResult = {
    id: `run-${Date.now()}`,
    templateId,
    status: "success",
    duration: 1200,
    timestamp: new Date().toISOString(),
    sampleData,
    mockMode,
    actions: [
      {
        name: "Action 1",
        status: "success",
        duration: 500,
      },
      {
        name: "Action 2",
        status: "success",
        duration: 700,
      },
    ],
  }

  return NextResponse.json({ run: runResult })
}
