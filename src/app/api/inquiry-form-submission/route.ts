import  { createClient } from "contentful-management";
import { type NextRequest } from "next/server";

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_PERSONAL_ACCESS_TOKEN ?? ""
})

export async function POST(req: NextRequest) {
  const reqBody = await req.json()
  return client
    .getSpace(process.env.CONTENTFUL_SPACE_ID ?? "")
    .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT ?? ""))
    .then((environment) => {
      return environment.createEntry("inquiryFormSubmission", {
        fields: { ...reqBody }
      });
    })
    .then(() => {
      return new Response(null, {
        status: 200,
      })
    })
    .catch((error) => {
      console.error("ERROR", error)
      return error
    });
}