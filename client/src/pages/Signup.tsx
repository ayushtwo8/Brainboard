// src/pages/SignupPage.tsx

import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

// Schema for strong password validation
const passwordValidation = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Must contain at least one number' })
  .regex(/[@$!%*?&]/, { message: 'Must contain at least one special character' });

// **CHANGED**: The schema now uses `name` instead of `username` to match the backend.
const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: passwordValidation,
});

function Signup() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    const toastId = toast.loading('Creating account...');
    try {
      // The endpoint matches your routes: `/user/signup`
      const response = await axios.post(`${API_BASE}/user/signup`, values);

      if (response.status === 201) {
        toast.success('Account created successfully! Please log in.', { id: toastId });
        navigate("/login");
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage, { id: toastId });
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
          <p className="text-white/70 mt-2">Start your journey with us today.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* **CHANGED**: This field is now `name` */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} className="bg-black/20 text-white placeholder:text-white/50 border-white/30 focus:ring-2 focus:ring-white/80 focus:outline-none transition-all" />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} className="bg-black/20 text-white placeholder:text-white/50 border-white/30 focus:ring-2 focus:ring-white/80 focus:outline-none transition-all" />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} className="bg-black/20 text-white placeholder:text-white/50 border-white/30 focus:ring-2 focus:ring-white/80 focus:outline-none transition-all" />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-white/90 disabled:bg-white/50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 shadow-lg">
              {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : "Create Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-white/60 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-white hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;