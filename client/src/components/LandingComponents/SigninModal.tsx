"use client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface SigninModalProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export default function SigninModal({ onClose, onSwitchToSignup }: SigninModalProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signinMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/api/v1/user/login", { email, password });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Logged in successfully!");
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        navigate("/dashboard");
        onClose();
      }, 500);
    },
    onError: () => {
      toast.error("Invalid credentials!");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signinMutation.mutate();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <div className="w-full max-w-md mx-4 rounded-2xl border border-white/20 bg-white/20 p-6 text-white relative shadow-2xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/70 hover:text-white text-2xl"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold font-satoshi">Welcome Back</h2>
          <p className="text-white/70 text-sm mt-1 font-inter">
            Log in to access your Second Brain.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm text-white font-inter">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-white focus:ring-white"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm text-white font-inter">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-white focus:ring-white"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-purple-600 hover:bg-white/90 font-satoshi py-3 rounded-full"
            disabled={signinMutation.isPending}
          >
            {signinMutation.isPending ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-sm text-center text-white/70 font-inter">
          New here?{" "}
          <button
            onClick={() => {
              onSwitchToSignup();
              onClose();
            }}
            className="text-white underline hover:text-white/90 font-semibold"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
}
