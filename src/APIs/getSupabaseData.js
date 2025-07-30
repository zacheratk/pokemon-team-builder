import { supabase } from "./supabaseClient";

export const getAllData = async () => {
  try {
    const { data, error } = await supabase
      .from("Pokemon")
      .select()
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching all data:", error);
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export const getDataById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("Pokemon")
      .select()
      .eq("id", id);

    if (error) {
      console.error("Error fetching data by ID:", error);
    }

    return data[0];
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export const removeDataById = async (id) => {
  try {
    const { error } = await supabase.from("Pokemon").delete().eq("id", id);
    if (error) {
      console.error("Error deleting data by ID:", error);
      return false;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return false;
  }
};
