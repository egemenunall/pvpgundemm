"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction, type LoginState } from "@/app/admin/login/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">E-posta</Label>
        <Input id="email" name="email" type="email" required placeholder="admin@pvpgundem.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Şifre</Label>
        <Input id="password" name="password" type="password" required placeholder="••••••••" />
      </div>

      {state.error && (
        <p className="rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={isPending} className="mt-1">
        {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
      </Button>
    </form>
  );
}
