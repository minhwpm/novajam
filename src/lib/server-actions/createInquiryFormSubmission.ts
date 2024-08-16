"use server";
import { createClient } from "contentful-management";

export type FormState = {
  message: string;
};

export async function createInquiryFormSubmission(
  data: FormData
): Promise<FormState | Error> {
  const formData = Object.fromEntries(data);
  const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE ?? "en-US";
  const { title, formType } = formData;
  delete formData.title;
  delete formData.formType;
  const standardizedData = {
    title: {
      [DEFAULT_LOCALE]: title,
    },
    formType: {
      [DEFAULT_LOCALE]: formType,
    },
    submittedContent: {
      [DEFAULT_LOCALE]: {
        ...formData,
      },
    },
  };

  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_PERSONAL_ACCESS_TOKEN ?? "",
  });

  return client
    .getSpace(process.env.CONTENTFUL_SPACE_ID ?? "")
    .then((space) =>
      space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT ?? "")
    )
    .then((environment) => {
      return environment.createEntry("inquiryFormSubmission", {
        fields: { ...standardizedData },
      });
    })
    .then(() => {
      return {
        message: "SUCCESSFULLY CREATED AN ENTRY OF INQUIRY FORM SUBMISSION",
      };
    })
    .catch((error) => {
      console.error("ERROR WHEN CREATING AN ENTRY OF INQUIRY FORM", error);
      return new Error("ERROR WHEN CREATING AN ENTRY OF INQUIRY FORM", error);
    });
}
