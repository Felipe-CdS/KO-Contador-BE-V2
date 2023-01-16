module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "ssl": process.env.DB_SSL_ENV === 'production' ? { rejectUnauthorized: false } : false,
    "entities": [process.env.ENTITIES_FOLDER],
    "migrations": [process.env.MIGRATIONS_FOLDER],    
    "cli": {
        "migrationsDir": "src/database/migrations",
        "entitiesDir": "src/Entities"
    }
}