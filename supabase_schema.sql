-- SQL Schema for Digital Marketer Portfolio (Supabase)

-- 1. Create Posts Table
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    category TEXT DEFAULT 'SEO',
    published BOOLEAN DEFAULT FALSE,
    author_id UUID REFERENCES auth.users(id),
    author_name TEXT,
    cover_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Case Studies Table
CREATE TABLE IF NOT EXISTS case_studies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    results TEXT NOT NULL,
    description TEXT,
    image TEXT,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- 4. Policies for Posts
-- Allow public to read published posts
CREATE POLICY "Public can read published posts" ON posts
    FOR SELECT USING (published = TRUE);

-- Allow admins to do everything
-- Note: Replace 'trantrungthanh.digital2021@gmail.com' with your actual admin email
CREATE POLICY "Admins have full access to posts" ON posts
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'trantrungthanh.digital2021@gmail.com'
    );

-- 5. Policies for Case Studies
-- Allow public to read all case studies
CREATE POLICY "Public can read case studies" ON case_studies
    FOR SELECT USING (TRUE);

-- Allow admins to do everything
CREATE POLICY "Admins have full access to case_studies" ON case_studies
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'trantrungthanh.digital2021@gmail.com'
    );

-- 6. Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
