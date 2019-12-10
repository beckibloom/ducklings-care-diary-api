module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://becki_pg:password@localhost/ducklings_care_diary',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://becki_pg:password@localhost/ducklings_test',
    JWT_SECRET: process.env.JWT_SECRET || 'BeAmbitiousLittleDucklings',
    JWT_EXPIRY: '900000'
}