export async function GET() {
    return new Response("Hello from Vercel!", {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*", // Allow all origins for now
      },
    });
  }