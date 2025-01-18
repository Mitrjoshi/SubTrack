import { View, Image, ScrollView, Button } from "react-native";
import React, { useState } from "react";
import { useApps } from "@/context/useApps";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { Link } from "expo-router";
import { subscriptions } from "@/constants";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker"; // Install this package

const SelectPlan = () => {
  const { apps, updateAppPlan } = useApps();

  // Filter the selected apps from the subscription data
  const selectedApps = subscriptions.filter((sub) =>
    apps.some((selected) => selected.name === sub.name)
  );

  const allPlansSelected = selectedApps.every(
    (app) => apps.find((selected) => selected.name === app.name)?.plan
  );

  return (
    <ThemedView className="flex-1 p-4">
      <ScrollView contentContainerClassName="gap-4">
        {selectedApps.map((app) => {
          const selectedApp = apps.find(
            (selected) => selected.name === app.name
          );
          const [renewalDate, setRenewalDate] = useState(
            selectedApp?.renewalDate || new Date().toISOString().split("T")[0]
          );
          const [showDatePicker, setShowDatePicker] = useState(false);

          const handleDateChange = (_event: any, date: Date | undefined) => {
            if (date) {
              const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              const updatedPlan = {
                ...selectedApp?.plan,
                renewalDate: formattedDate,
                currency: selectedApp?.plan?.currency ?? "INR",
                amount: selectedApp?.plan?.amount ?? 0, // Default to 0 if undefined
                paymentFrequency:
                  selectedApp?.plan?.paymentFrequency ?? "monthly", // Default to 'monthly' if undefined
              };

              // Ensure all required fields are present in the updated plan
              updateAppPlan(app.name, updatedPlan);
              setRenewalDate(formattedDate);
            }

            setShowDatePicker(false); // Close the picker after selection
          };

          return (
            <View
              key={app.name}
              className="gap-4 border rounded-lg p-2 border-gray-50/20"
            >
              <View className="flex-row items-center gap-2">
                <Image
                  resizeMode="cover"
                  source={{ uri: app.image_url }}
                  className="w-12 h-12 rounded-[4px] aspect-square"
                />
                <ThemedText type="subtitle">{app.name}</ThemedText>
              </View>
              {app.plans && app.plans.length > 0 && (
                <View className="mt-2">
                  {app.plans.map((plan) => (
                    <View
                      key={`${app.name}-${plan.amount}-${plan.currency}`}
                      className="flex-row h-10 items-center justify-between px-4"
                    >
                      <BouncyCheckbox
                        isChecked={
                          selectedApp?.plan?.amount === plan.amount &&
                          selectedApp?.plan?.currency === plan.currency
                        }
                        size={20}
                        fillColor="#2dd4bf"
                        text={`${plan.amount} ${plan.currency} (${plan.type})`}
                        iconStyle={{ borderColor: "#2dd4bf" }}
                        innerIconStyle={{ borderWidth: 1 }}
                        onPress={() => updateAppPlan(app.name, plan)}
                      />
                    </View>
                  ))}
                </View>
              )}

              {selectedApp?.plan && selectedApp.plan.amount && (
                <View className="mt-2">
                  <ThemedText type="default" className="text-gray-400 mb-2">
                    Renewal Date:
                  </ThemedText>

                  <Button
                    title={`Select Renewal Date (Current: ${renewalDate})`}
                    onPress={() => setShowDatePicker(true)}
                  />

                  {showDatePicker && (
                    <DateTimePicker
                      value={new Date(renewalDate)}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                    />
                  )}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <Link
        href="/home"
        className={`sticky bottom-0 my-4 justify-center items-center p-4 rounded-xl ${
          allPlansSelected ? "bg-teal-400" : "bg-gray-400 disabled:opacity-50"
        }`}
        disabled={!allPlansSelected}
      >
        <ThemedText type="subtitle" className="text-center">
          {allPlansSelected ? "Continue" : "Select all plans to continue"}
        </ThemedText>
      </Link>
    </ThemedView>
  );
};

export default SelectPlan;
