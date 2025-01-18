import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { subscriptions } from "@/constants";
import { Link } from "expo-router";
import { useApps } from "@/context/useApps";
import { Check } from "lucide-react-native";

const SelectApps = () => {
  const { apps, toggleApp } = useApps();

  return (
    <ThemedView className="flex-1">
      <ScrollView contentContainerClassName="p-2">
        <View className="flex-row flex-wrap justify-between">
          {subscriptions.map((subscription, index) => (
            <TouchableOpacity
              onPress={() => toggleApp(subscription)} // Use toggleApp here
              key={index}
              className="w-1/3 p-4 items-center gap-2"
            >
              <View className="relative">
                <Image
                  resizeMode="cover"
                  source={{ uri: subscription.image_url }}
                  className="w-full rounded-[8px] aspect-square"
                />
                {apps.some((app) => app.name === subscription.name) && (
                  <View className="absolute rounded-[8px] bg-[#00000080] h-full aspect-square flex justify-center items-center z-50">
                    <Check color="white" strokeWidth={2} size={50} />
                  </View>
                )}
              </View>
              <ThemedText type="default" className="text-center">
                {subscription.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Link
        disabled={!apps.length}
        href="/select-plan"
        className="mx-6 my-4 disabled:opacity-50 bg-teal-400 justify-center items-center p-4 rounded-xl"
      >
        <ThemedText type="subtitle" className="text-center">
          Continue ({apps.length})
        </ThemedText>
      </Link>
    </ThemedView>
  );
};

export default SelectApps;
