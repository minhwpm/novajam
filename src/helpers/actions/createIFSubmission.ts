"use server";

// IFSubmission stands for InquiryFormSubmission
import { createClient } from "contentful-management";

type FormValues = {
  [x: string]: string;
};

export async function createIFSubmission(formValues: FormValues) {
  console.log("FORM VALUES:", formValues);
  const data = {}
  for (const key in formValues) {
    data[key] = {
      "en-US": formValues[key], //@TODO get locale from CMS
    };
  }
  // @TODO format Datetime value sent to CMS
  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_PERSONAL_ACCESS_TOKEN ?? "",
  });

  try {
    const entry = await client
    .getSpace(process.env.CONTENTFUL_SPACE_ID ?? "")
    .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT ?? ""))
    .then((environment) => {
      return environment.createEntry("inquiryFormSubmission", {
        fields: { ...data }
      });
    })
    console.log("RESULT ENTRY", entry);
    return entry
  } catch(error) {
    console.error("ERROR", error);
  }
}
