import { createClient } from "@supabase/supabase-js";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltandrand4dnRyY2l6emxvb2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzODM1OTksImV4cCI6MTk4Mzk1OTU5OX0.YgR4HTtt6hM0mRigBGeYt-bn5mR1Z3_IM1_XoCyl3fI"
const PROJECT_URL = "https://ymjwkjwxvtrcizzloojs.supabase.co";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        }
    }
}