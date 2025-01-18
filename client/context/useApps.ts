import { create } from "zustand";

interface App {
  name: string;
  image_url: string;
}

interface I_UseApps {
  apps: App[] | null;
  updateApp: (val: App) => void;
  resetApps: () => void;
}

export const useApps = create<I_UseApps>((set) => ({
  apps: null,
  resetApps: () => {
    set({
      apps: null,
    });
  },
  updateApp: (val) =>
    set((state) => {
      if (state.apps) {
        const appExists = state.apps.some((app) => app.name === val.name); // Check if the app already exists
        if (appExists) {
          // Remove app if it exists
          return {
            apps: state.apps.filter((app) => app.name !== val.name),
          };
        } else {
          // Add app if it doesn't exist
          return {
            apps: [...state.apps, val],
          };
        }
      } else {
        // If no apps exist, initialize the list with the new app
        return {
          apps: [val],
        };
      }
    }),
}));
