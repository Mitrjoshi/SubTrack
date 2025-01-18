import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { subscriptions } from "@/constants";
import { Link } from "expo-router";
import { useApps } from "@/context/useApps";
import { Check } from "lucide-react-native";

const ManageSubscriptions = () => {
  const { apps, updateApp, resetApps } = useApps();

  return (
    <ThemedView className="flex-1">
      <ScrollView contentContainerClassName="p-2">
        <View className="flex-row flex-wrap justify-between">
          {subscriptions.map((subscription, index) => (
            <TouchableOpacity
              onPress={() => updateApp(subscription)}
              key={index}
              className="w-1/3 p-4 items-center  gap-2"
            >
              <View className="relative">
                <Image
                  resizeMode="cover"
                  source={{ uri: subscription.image_url }}
                  className="w-full rounded-[8px] aspect-square"
                />
                {apps?.includes(subscription) && (
                  <View className="absolute bg-[#00000080] h-full aspect-square flex justify-center items-center z-50">
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
        onPress={resetApps}
        replace
        disabled={!apps?.length}
        href="/home"
        className="mx-6 my-4 disabled:opacity-50 bg-teal-400 justify-center items-center p-4 rounded-xl"
      >
        <ThemedText type="subtitle" className="text-center">
          Continue ({apps?.length ?? 0})
        </ThemedText>
      </Link>
    </ThemedView>
  );
};

export default ManageSubscriptions;
