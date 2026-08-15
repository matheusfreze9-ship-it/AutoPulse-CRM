/* AutoPulse — Configuração do cliente Supabase (front-end).
 * A anon key e publica por design (protegida por Row Level Security no banco).
 * NUNCA coloque a service_role key aqui. */
const SUPABASE_URL = 'https://mripjadlbqfzlmnszzem.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yaXBqYWRsYnFmemxtbnN6emVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3NDI3NTcsImV4cCI6MjEwMjMxODc1N30.m0IOm1x1SUuKCfHYtR_Lx6427UF9i5xZBz9_7yaUvO0';

window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
