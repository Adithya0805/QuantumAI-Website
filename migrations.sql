-- QuantumAI Database Repair & Update Migration

-- 1. Ensure updated_at columns exist in all tables
DO $$ 
BEGIN
    -- Waitlist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='waitlist' AND column_name='updated_at') THEN
        ALTER TABLE waitlist ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
    END IF;
    
    -- Contact Messages
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contact_messages' AND column_name='updated_at') THEN
        ALTER TABLE contact_messages ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
    END IF;
    
    -- Newsletter Subscribers
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='newsletter_subscribers' AND column_name='updated_at') THEN
        ALTER TABLE newsletter_subscribers ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
    END IF;
    
    -- Demo Requests
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='demo_requests' AND column_name='updated_at') THEN
        ALTER TABLE demo_requests ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
    END IF;
END $$;

-- 2. Tables Creation (Ensures they exist if they didn't before)
CREATE TABLE IF NOT EXISTS waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    company TEXT,
    use_case TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

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
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- 4. Reset and Apply Policies
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON waitlist;
CREATE POLICY "Enable insert for anonymous users" ON waitlist FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable insert for anonymous users" ON contact_messages;
CREATE POLICY "Enable insert for anonymous users" ON contact_messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable insert for anonymous users" ON newsletter_subscribers;
CREATE POLICY "Enable insert for anonymous users" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable insert for anonymous users" ON demo_requests;
CREATE POLICY "Enable insert for anonymous users" ON demo_requests FOR INSERT WITH CHECK (true);

-- 5. Trigger Function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Apply Triggers
DROP TRIGGER IF EXISTS set_updated_at_waitlist ON waitlist;
CREATE TRIGGER set_updated_at_waitlist BEFORE UPDATE ON waitlist FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_contact_messages ON contact_messages;
CREATE TRIGGER set_updated_at_contact_messages BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_newsletter_subscribers ON newsletter_subscribers;
CREATE TRIGGER set_updated_at_newsletter_subscribers BEFORE UPDATE ON newsletter_subscribers FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_demo_requests ON demo_requests;
CREATE TRIGGER set_updated_at_demo_requests BEFORE UPDATE ON demo_requests FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- 7. RLS SELECT Policies
DROP POLICY IF EXISTS "Admin read all" ON waitlist;
CREATE POLICY "Admin read all" ON waitlist FOR SELECT USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admin read all" ON contact_messages;
CREATE POLICY "Admin read all" ON contact_messages FOR SELECT USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admin read all" ON newsletter_subscribers;
CREATE POLICY "Admin read all" ON newsletter_subscribers FOR SELECT USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admin read all" ON demo_requests;
CREATE POLICY "Admin read all" ON demo_requests FOR SELECT USING (auth.role() = 'service_role');

-- 8. Performance Indexes
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS demo_requests_status_idx ON demo_requests(status);
CREATE INDEX IF NOT EXISTS newsletter_subscribers_active_idx ON newsletter_subscribers(is_active) WHERE is_active = true;
