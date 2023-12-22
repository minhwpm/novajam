import { Button } from "@/components/elements/Button/Button";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <div className="m-auto my-10 max-w-full md:w-96">
        <h2 className="text-4xl font-semibold text-center mb-10">
          Forgot password
        </h2>
        <form className="flex flex-col gap-3 mt-5">
          <fieldset>
            <input
              className="block w-full border rounded px-4 py-5 mt-2"
              placeholder="Email"
              id="email"
              type="email"
            />
          </fieldset>
          
          <Button
            type="submit"
            variant="standard"
            size="lg"
          >
            Send me reset instructions
          </Button>
          <div className="mt-4 flex justify-center gap-5">
            <Link className="text-blue-600 hover:underline" href="/signup">
              Create Account
            </Link>
            <Link className="text-blue-600 hover:underline" href="/login">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}