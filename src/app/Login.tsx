import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import {AdminURL, BusinessURL} from "@/constants/urls";

const getRedirectUrl = (searched: string) => {
    console.log("searched=", searched);
    if (searched === "")
        return AdminURL;
    return BusinessURL + "?name=" + searched;
}


export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessName = searchParams.get("business") ?? "";
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        phone,
        otp,
        callbackUrl: getRedirectUrl(businessName),
      });
      console.log("Res", res);
      if (!res?.error) {
        router.push(getRedirectUrl(businessName));
      } else {
        setError("Invalid phone or otp");
      }
    } catch (err: any) {}
  };

  return (
    <>
      <div className="flex justify-center items-center bg-slate-100">
        <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
          <h1 className="font-semibold text-2xl">Login</h1>
          <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                className="w-full"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
                type="tel"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="otp">otp</Label>
              <Input
                className="w-full"
                required
                type="text"
                autoComplete="one-time-code"
                inputMode="numeric"
                maxLength={4}
                pattern="\d{4}"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            {error && <Alert>{error}</Alert>}
            <div className="w-full">
              <Button className="w-full" size="lg">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
