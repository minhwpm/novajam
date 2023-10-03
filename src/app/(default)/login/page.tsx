import Button from "@/components/elements/Button/Button";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <div className="m-auto my-10 max-w-full md:w-96">
        <h2 className="text-4xl font-semibold text-center mb-10">
          Login
        </h2>
        <div className="grid gap-3 mb-5">
          <button className="bg-slate-100 p-3 rounded">
            Continue with Facebook
          </button>
          <button className="bg-slate-100 p-3 rounded">
            Continue with Twitter
          </button>
          <button className="bg-slate-100 p-3 rounded">
            Continue with Google
          </button>
        </div>
        <div className="relative text-center">
          <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white text-slate-500">
            or
          </span>
          <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100" />
        </div>
        <form className="flex flex-col gap-3 mt-5">
          <fieldset>
            <input
              className="block w-full border rounded px-4 py-5 mt-2"
              placeholder="Email"
              id="email"
              type="email"
            />
          </fieldset>
          <fieldset>
            <input 
              className="block w-full border rounded px-4 py-5 mt-2"
              placeholder="Password"
              id="password" 
              type="password"
            />
          </fieldset>
          <Button
            type="submit"
            variant="standard"
            size="lg"
          >
            Continue
          </Button>
          <p className="mt-4 text-center">
            <Link className="text-blue-600 hover:underline" href="/forgot-password">
              Forgot password?
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}