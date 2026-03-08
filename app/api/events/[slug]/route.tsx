import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mongoose from "mongoose";
import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";

/**
 * Type for dynamic route parameters
 */
type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/events/[slug]
 * Fetch a single event by its slug
 */
export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Connect to MongoDB
    await connectDB();

    const { slug } = await params;

    // Validate slug presence
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Invalid or missing event slug." },
        { status: 400 }
      );
    }

    // Sanitize slug
    const sanitizedSlug = slug.trim().toLowerCase(); 
 
    // Query event by slug
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    // Event not found
    if (!event) {
      return NextResponse.json(
        { message: "Event not found." },
        { status: 404 }
      );
    }

    // Successful response
    return NextResponse.json({message: "Event fetched successfully" ,event }, { status: 200 });
  } catch (error: unknown) {
    // Handle Mongoose-specific errors
    if (error instanceof mongoose.Error) {
      return NextResponse.json(
        { message: "Database error occurred.", error: error.message },
        { status: 500 }
      );
    }

    // Catch unexpected errors
    return NextResponse.json(
      { message: "Unexpected server error." },
      { status: 500 }
    );
  }
}