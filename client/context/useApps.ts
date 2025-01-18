import { create } from "zustand";

interface Plan {
  amount?: number; // Optional
  currency: string; // Required
  interval?: string; // Optional
  paymentFrequency?: "monthly" | "yearly"; // Optional
  renewalDate?: string; // Optional
}

interface App {
  name: string;
  image_url: string;
  availablePlans?: Plan[]; // Derived from the JSON's `plans` array
  plan?: Plan; // Selected plan for the app
  renewalDate?: string; // Renewal date for the app
}

interface I_UseApps {
  apps: App[]; // Selected apps array
  toggleApp: (app: App) => void; // Add or remove app
  updateAppPlan: (name: string, plan: Plan) => void; // Update app's plan
  updateRenewalDate: (name: string, renewalDate: string) => void; // Update renewal date for an app
  resetApps: () => void; // Clear all selected apps
}

export const useApps = create<I_UseApps>((set) => ({
  apps: [],
  toggleApp: (app) =>
    set((state) => {
      const appExists = state.apps.some((a) => a.name === app.name);
      if (appExists) {
        // Remove the app if it already exists
        return { apps: state.apps.filter((a) => a.name !== app.name) };
      } else {
        // Add the app with its available plans if provided
        return {
          apps: [...state.apps, { ...app, plan: app.plan ?? undefined }],
        };
      }
    }),
  updateAppPlan: (name, plan) =>
    set((state) => ({
      apps: state.apps.map((app) =>
        app.name === name
          ? { ...app, plan, renewalDate: plan.renewalDate }
          : app
      ),
    })),
  updateRenewalDate: (name, renewalDate) =>
    set((state) => ({
      apps: state.apps.map((app) =>
        app.name === name ? { ...app, renewalDate } : app
      ),
    })),
  resetApps: () => set({ apps: [] }),
}));
