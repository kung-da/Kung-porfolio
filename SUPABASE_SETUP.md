# Hướng dẫn Setup Supabase

## Bước 1: Tạo tài khoản Supabase

1. Truy cập: https://supabase.com
2. Click "Start your project" và đăng ký (có thể dùng GitHub)
3. Tạo Organization và Project mới

## Bước 2: Tạo Database Table

1. Trong Supabase Dashboard, vào **SQL Editor**
2. Chạy SQL query sau:

```sql
-- Tạo bảng projects
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  github_url TEXT,
  demo_url TEXT,
  gradient TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo bảng admin_config để lưu mật khẩu
CREATE TABLE admin_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;

-- Tạo policy để cho phép đọc projects (public)
CREATE POLICY "Enable read access for all users" ON projects
FOR SELECT USING (true);

-- Tạo policy để cho phép insert/update/delete projects (public - sẽ verify password ở client)
CREATE POLICY "Enable all access for all users" ON projects
FOR ALL USING (true);

-- Tạo policy cho admin_config (public - sẽ verify password ở client)
CREATE POLICY "Enable all access for admin_config" ON admin_config
FOR ALL USING (true);

-- Insert mật khẩu mặc định (admin123)
INSERT INTO admin_config (password_hash) 
VALUES ('YWRtaW4xMjM='); -- base64 của "admin123"

-- Insert dữ liệu mẫu
INSERT INTO projects (title, description, tags, github_url, demo_url, gradient) VALUES
('Real-Time Data Pipeline', 'Built a scalable ETL pipeline using Apache Spark and Kafka to process streaming data from multiple sources, resulting in 40% faster data processing.', ARRAY['Python', 'Apache Spark', 'Kafka', 'PostgreSQL'], 'https://github.com', 'https://demo.com', 'from-blue-500 to-purple-600'),
('Student Performance Analytics', 'Developed a comprehensive dashboard to analyze student performance patterns and predict academic outcomes using machine learning algorithms.', ARRAY['Python', 'React', 'Machine Learning', 'MongoDB'], 'https://github.com', 'https://demo.com', 'from-green-500 to-blue-500'),
('IoT Sensor Data Platform', 'Created an IoT platform for collecting and analyzing sensor data from smart devices, featuring real-time monitoring and alerting systems.', ARRAY['IoT', 'Python', 'InfluxDB', 'Grafana'], 'https://github.com', 'https://demo.com', 'from-purple-500 to-pink-500'),
('Math Tutoring App', 'Designed and built a progressive web app to help students practice mathematics with personalized exercises and progress tracking.', ARRAY['React', 'TypeScript', 'Node.js', 'AI'], 'https://github.com', 'https://demo.com', 'from-orange-500 to-red-500'),
('E-commerce Analytics Suite', 'Developed a comprehensive analytics platform for e-commerce businesses to track KPIs, customer behavior, and sales performance.', ARRAY['Python', 'React', 'PostgreSQL', 'Docker'], 'https://github.com', 'https://demo.com', 'from-cyan-500 to-blue-500'),
('Automated Trading Bot', 'Built an intelligent trading bot using reinforcement learning algorithms to analyze market trends and execute trades automatically.', ARRAY['Python', 'AI', 'TensorFlow', 'API'], 'https://github.com', 'https://demo.com', 'from-indigo-500 to-purple-500');
```

## Bước 3: Lấy API Keys

1. Trong Supabase Dashboard, vào **Settings** → **API**
2. Copy 2 giá trị:
   - **Project URL** (ví dụ: `https://xxxxx.supabase.co`)
   - **anon public** key (một chuỗi dài)

## Bước 4: Cấu hình Local Development

1. Tạo file `.env` trong thư mục root project:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. Khởi động lại dev server:
```bash
npm run dev
```

## Bước 5: Deploy lên Vercel

1. Vào Vercel Dashboard của project
2. **Settings** → **Environment Variables**
3. Thêm 2 biến:
   - `VITE_SUPABASE_URL` = URL từ Supabase
   - `VITE_SUPABASE_ANON_KEY` = anon key từ Supabase
4. Redeploy project

## Bước 6: Kiểm tra

1. Mở website
2. Vào `/admin` và đăng nhập với mật khẩu `admin123`
3. Thử tạo/sửa/xóa dự án
4. Refresh trang hoặc mở ở thiết bị khác để kiểm tra data đã sync

## Đổi mật khẩu

Vào **SQL Editor** trong Supabase và chạy:

```sql
UPDATE admin_config 
SET password_hash = encode('mật_khẩu_mới'::bytea, 'base64'), 
    updated_at = NOW();
```

## Lưu ý

- ✅ Dữ liệu lưu trên cloud, sync mọi thiết bị
- ✅ Miễn phí 500MB database + 2GB bandwidth/tháng
- ✅ Tự động backup
- ✅ An toàn hơn localStorage
- ⚠️ Cần setup environment variables trên Vercel
