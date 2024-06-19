import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ikchegbicnagaaktgytd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrY2hlZ2JpY25hZ2Fha3RneXRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc5NDQxMjQsImV4cCI6MjAzMzUyMDEyNH0.cr2CMOecyAov33vow_Z0EUE31kVgYwZErLlgSfqVOvY";

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
