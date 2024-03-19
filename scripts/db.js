const { db } = require('@vercel/postgres');
require('dotenv').config({ path: '.env.local' });


async function createUser(client) {
    try {
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            stack TEXT[],
            city VARCHAR(255) NOT NULL,
            birthday DATE,
            profession VARCHAR(255),
            jobs JSONB[],
            projects INT[],
            contacts JSONB[]
        );`

        console.log('Create table users successfuly!');

        return {
            createTable
        }
    } catch (error) {
        console.log('Error create table users', error);
    }
}

async function createTags(client) {
    try {
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS tags (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );`

        console.log('Create table tags successfuly!');

        return {
            createTable
        }
    } catch (error) {
        console.log('Error create table tags', error);
    }
}

async function createCategories(client) {
    try {
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );`

        console.log('Create table categories successfuly!');

        return {
            createTable
        }
    } catch (error) {
        console.log('Error create table categories', error);
    }
}

async function createProjects(client) {
    try {
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS projects (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            tag_id INT,
            category_id INT,
            url VARCHAR(255),
            preview_image_url VARCHAR(255),
            image_urls TEXT[],
            description TEXT,
            FOREIGN KEY (tag_id) REFERENCES tags (id),
            FOREIGN KEY (category_id) REFERENCES categories (id)
        );`
        
        console.log('Create table projects successfuly!');

        return {
            createTable
        }
    } catch (error) {
        console.log('Error create table projects', error);
    }
}

async function main() {
    console.log(process.env.POSTGRES_URL);
    const client = await db.connect();

    await createUser(client);
    await createTags(client);
    await createCategories(client);
    await createProjects(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});