import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gihwfbihxfsvksrjfkfy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpaHdmYmloeGZzdmtzcmpma2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxNDE4MzMsImV4cCI6MjAxNTcxNzgzM30.hfHYB97Yb0t1OfjC2Aq5NXM7YjfUwRPV6B9PQcZgtto";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
