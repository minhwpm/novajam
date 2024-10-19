'use server';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

export type FormState = {
  message: string;
};

export async function createFormSubmission(
  data: FormData,
): Promise<FormState | Error> {
  const formData = Object.fromEntries(data);
  const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE ?? 'en-US';
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

  const filePath = path.join(
    process.cwd(),
    'src/helpers/server-actions',
    `form-submissions.json`,
  );

  try {
    if (!fs.existsSync(filePath)) {
      await writeFileAsync(
        filePath,
        JSON.stringify([standardizedData], null, 2),
      );
      return {
        message: 'SUCCESSFULLY CREATED AN ENTRY OF FORM SUBMISSION',
      };
    }
    const fileData = await readFileAsync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileData);
    jsonData.push(standardizedData);
    writeFileAsync(filePath, JSON.stringify(jsonData, null, 2));
    return {
      message: 'SUCCESSFULLY CREATED AN ENTRY OF FORM SUBMISSION',
    };
  } catch (err) {
    console.error('Error writing file:', err);
    return new Error(`ERROR WHEN CREATING AN ENTRY OF FORM SUBMISSION: ${err}`);
  }
}
