import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wwivhebhegnvhmdorelb.supabase.co";
const supabaseKey = "sb_publishable_RBY7JZrxgwbiESiupKPYoA_w1nxxQ6d";

export const supabase = createClient(supabaseUrl, supabaseKey);
