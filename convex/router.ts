import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

// Example API endpoint for webhooks or external integrations
http.route({
  path: "/api/webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Handle webhook data here
    const body = await request.text();
    console.log("Webhook received:", body);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
});

// Health check endpoint
http.route({
  path: "/api/health",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    return new Response(JSON.stringify({ 
      status: "healthy", 
      timestamp: new Date().toISOString() 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
});

export default http;
