"use client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface SignupModalProps {
  onClose: () => void;
  onSwitchToSignin: () => void;
}

export default function SignupModal({ onClose, onSwitchToSignin }: SignupModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/api/v1/user/signup", {
        name,
        email,
        password,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully! Please log in.");
      setTimeout(() => {
        onSwitchToSignin();
      }, 3000);
    },
    onError: () => {
      toast.error("Signup failed. Email might already be used.");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signupMutation.mutate();
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
          <h2 className="text-3xl font-bold font-satoshi">Create Your BrainBoard</h2>
          <p className="text-white/70 text-sm mt-1 font-inter">
            Sign up to save links, organize knowledge, and grow your second brain.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm text-white font-inter">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              className="bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-white focus:ring-white"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-white/50 mt-1">Minimum 6 characters</p>
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-purple-600 hover:bg-white/90 font-satoshi py-3 rounded-full"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-sm text-center text-white/70 font-inter">
          Already have an account?{" "}
          <button
            onClick={() => {
              onSwitchToSignin();
              onClose();
            }}
            className="text-white underline hover:text-white/90 font-semibold"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
