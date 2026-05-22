-- Initialize PostGIS extension and any seed data
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Log successful initialization
DO $$
BEGIN
    RAISE NOTICE 'Homiq database initialized with PostGIS support';
END $$;
