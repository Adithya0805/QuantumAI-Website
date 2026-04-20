-- QuantumAI Database Schema Migration
-- Run this in the Supabase SQL Editor

-- 1. Waitlist Table
CREATE TABLE IF NOT EXISTS waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    company TEXT,
    use_case TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Demo Requests Table
CREATE TABLE IF NOT EXISTS demo_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    team_size TEXT,
    message TEXT,
    preferred_date DATE,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- Create Policies for Anonymous Insertion (Public access to POST only)
CREATE POLICY "Enable insert for anonymous users" ON waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for anonymous users" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for anonymous users" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for anonymous users" ON demo_requests FOR INSERT WITH CHECK (true);

-- Admin View Policies (Service Role only usually, but for dashboard we can restrict to authenticated if needed)
-- Note: Service role key bypasses RLS, which we will use for the admin dashboard.
