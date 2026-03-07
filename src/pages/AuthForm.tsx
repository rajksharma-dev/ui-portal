import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";

type Tab = "signin" | "create";

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<Tab>("signin");
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  // ── Dynamic hooks ───────────────────────────────────────────────────────────
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  // ────────────────────────────────────────────────────────────────────────────

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.email.includes("@")) newErrors.email = "Enter a valid email address.";
    if (form.password.length < 4) newErrors.password = "Password must be at least 6 characters.";
    if (activeTab === "create" && form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── handleSubmit: uses form.email & form.password — no scope issues ─────────
  const handleSubmit = async () => {
    if (!validate()) return;

    if (activeTab === "signin") {
      try {
        const response = await api.post("/v1/auth/login", {
          email: form.email,
          password: form.password,
        });
        auth?.login(response.data.token);
        navigate("/users");
      } catch (error) {
        alert("Invalid credentials");
      }
    } else {
      // Handle create-account flow here if needed
      alert("Account created!");
    }
  };
  // ────────────────────────────────────────────────────────────────────────────

  const EyeIcon = ({ open }: { open: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      {open ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      )}
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab("signin")}
            className={[
              "flex-1 py-5 text-sm font-semibold tracking-wide transition-colors duration-200 focus:outline-none",
              activeTab === "signin"
                ? "text-teal-600 border-b-2 border-teal-600"
                : "text-gray-400 hover:text-gray-600",
            ].join(" ")}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={[
              "flex-1 py-5 text-sm font-semibold tracking-wide transition-colors duration-200 focus:outline-none",
              activeTab === "create"
                ? "text-teal-600 border-b-2 border-teal-600"
                : "text-gray-400 hover:text-gray-600",
            ].join(" ")}
          >
            Create Account
          </button>
        </div>

        {/* Form body */}
        <div className="px-8 py-8 space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your Email"
              className={[
                "w-full px-4 py-3 rounded-lg border text-sm text-gray-800 placeholder-gray-400",
                "focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-150",
                errors.email ? "border-red-400" : "border-teal-600",
              ].join(" ")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={form.showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter your Password"
                className={[
                  "w-full px-4 py-3 pr-12 rounded-lg border text-sm text-gray-800 placeholder-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-150",
                  errors.password ? "border-red-400" : "border-gray-200",
                ].join(" ")}
              />
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, showPassword: !p.showPassword }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <EyeIcon open={form.showPassword} />
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password — only shown on Create Account tab */}
          {activeTab === "create" && (
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={form.showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  placeholder="Please confirm your Password"
                  className={[
                    "w-full px-4 py-3 pr-12 rounded-lg border text-sm text-gray-800 placeholder-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-150",
                    errors.confirmPassword ? "border-red-400" : "border-gray-200",
                  ].join(" ")}
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((p) => ({ ...p, showConfirmPassword: !p.showConfirmPassword }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <EyeIcon open={form.showConfirmPassword} />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 mt-2 rounded-lg bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white text-sm font-semibold tracking-wide transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          >
            {activeTab === "signin" ? "Sign In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
