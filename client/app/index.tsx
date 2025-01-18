import React from "react";
import { ThemedView } from "@/components/themed/ThemedView";
import { ThemedText } from "@/components/themed/ThemedText";
import { Link } from "expo-router";

const LoginPage = () => {
  return (
    <ThemedView className="h-full flex-1 justify-center items-center p-6 gap-2">
      <ThemedText type="title">Welcome Back</ThemedText>

      <Link
        href="/manage"
        className="bg-teal-400 w-full justify-center items-center p-4 rounded-xl"
      >
        <ThemedText type="subtitle" className="text-center">
          Login
        </ThemedText>
      </Link>
    </ThemedView>
  );
};

export default LoginPage;
