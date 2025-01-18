import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_PROJECT_URL as string;
const supabaseKey = process.env.EXPO_PUBLIC_API_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);
