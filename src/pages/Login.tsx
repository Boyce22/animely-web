import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, BookOpen, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('https://konachan.com/image/209798ddddff0258f48dbbff12eb68d3/Konachan.com%20-%20402239%20animal%20barefoot%20bloomers%20blue_eyes%20cat%20clouds%20garter%20gloves%20gray_hair%20group%20headband%20long_hair%20maid%20nurse%20sky%20stars%20stockings%20tail%20twintails%20wink.jpg')" }}
      />
      <div className="absolute inset-0 bg-background/70" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[420px] mx-4">
        <div className="relative rounded-lg overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-900 via-primary to-red-400" />

          <div className="bg-card px-8 pt-10 pb-8 rounded-lg">
            <div className="flex justify-center mb-6">
              <div className="w-[52px] h-[52px] rounded-full border border-primary/40 flex items-center justify-center bg-primary/10">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
            </div>

            <h1 className="text-[22px] font-bold text-center text-foreground mb-1">
              {t("login.title")}
            </h1>
            <p className="text-center text-muted-foreground text-sm mb-8">
              {t("login.subtitle")}
            </p>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/90">
                  {t("login.username")}
                </label>
                <input
                  type="text"
                  placeholder={t("login.username_placeholder")}
                  className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground/90">
                    {t("login.password")}
                  </label>
                  <a href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">
                    {t("login.forgot_password")}
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.password_placeholder")}
                    className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-md bg-primary text-primary-foreground font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 hover:brightness-110 active:scale-[0.99]"
              >
                <LogIn className="w-4 h-4" />
                {t("login.sign_in")}
              </button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {t("login.no_account")}{" "}
              <Link to="/register" className="text-primary hover:text-primary/80 transition-colors">
                {t("login.register")}
              </Link>
            </p>

            <p className="text-center text-[11px] text-muted-foreground/70 mt-4">
              {t("login.terms")}{" "}
              <a href="#" className="text-primary/80 hover:text-primary transition-colors">
                {t("login.terms_link")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
