'use server';
import fs from 'fs';
import path from 'path';

export type FormState = {
  message: string;
};

type FormDataObject = Record<string, string | File | undefined>;

function handleStaticSubmission(
  formData: FormDataObject,
  internalName: string,
  formType: string,
): FormState {
  const filePath = path.join(
    process.cwd(),
    'src/helpers/query/static-data/',
    'formSubmissions.json',
  );

  let existingData: Array<Record<string, any>> = [];
  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      existingData = JSON.parse(fileContent);
    }
  } catch (readError) {
    console.error('Failed to read existing static data:', readError);
  }

  const newSubmission = {
    id: Date.now().toString(),
    internalName: internalName,
    formType: formType,
    submittedContent: {
      ...formData,
    },
    createdAt: new Date().toISOString(),
  };

  existingData.push(newSubmission);

  try {
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
    console.log('Saved new submission to static data.');
    return { message: 'SUCCESSFULLY CREATED A STATIC FORM SUBMISSION' };
  } catch (writeError) {
    console.error('Failed to write static data:', writeError);
    throw new Error('Failed to save the submission to static data.');
  }
}

export async function createFormSubmission(data: FormData): Promise<FormState> {
  const formData: FormDataObject = Object.fromEntries(data.entries());
  const internalName = formData.internalName as string;
  const formType = formData.formType as string;
  delete formData.internalName;
  delete formData.formType;
  return handleStaticSubmission(formData, internalName, formType);
}
