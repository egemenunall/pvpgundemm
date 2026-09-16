import { Logo } from "@/components/layout/Logo";
import { LoginForm } from "@/app/admin/login/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-md border border-border bg-surface p-6">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-4 text-center text-lg font-semibold text-text-primary">
          Admin Girişi
        </h1>
        <p className="mt-1 text-center text-sm text-text-secondary">
          Panele erişmek için giriş yapın.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
