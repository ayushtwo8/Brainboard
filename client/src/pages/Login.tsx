// src/pages/LoginPage.tsx

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

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api/v1";

// **CHANGED**: The schema now uses `email` for login, as expected by the backend.
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password cannot be empty." }),
});

function Login() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const toastId = toast.loading('Logging in...');
    try {
      // The endpoint matches your routes: `/user/login`
      const response = await axios.post(`${API_BASE}/user/login`, values);

      if (response.status === 200 && response.data.token) {
        toast.success('Login successful!', { id: toastId });
        localStorage.setItem('token', response.data.token);
        // You could also store user info if needed:
        // localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage, { id: toastId });
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-white/70 mt-2">Log in to access your dashboard.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* **CHANGED**: This field is now `email` */}
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
              {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : "Log In"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-white/60 mt-8">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-white hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;