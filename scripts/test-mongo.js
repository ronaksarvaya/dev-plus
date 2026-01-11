const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

function parseEnvLine(line) {
    line = line.trim();
    if (!line || line.startsWith('#')) return null;
    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) return null;

    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();

    // simple quote removal
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
    }
    return { key, val };
}

function loadEnv() {
    const files = ['.env.local', '.env'];
    files.forEach(f => {
        const p = path.join(process.cwd(), f);
        if (fs.existsSync(p)) {
            console.log(`Reading ${f}...`);
            try {
                const content = fs.readFileSync(p, 'utf8');
                content.split(/\r?\n/).forEach(line => {
                    const res = parseEnvLine(line);
                    if (res && !process.env[res.key]) {
                        process.env[res.key] = res.val;
                        console.log(`Loaded ${res.key}`);
                    }
                });
            } catch (e) {
                console.error(`Error reading ${f}:`, e);
            }
        }
    });
}

loadEnv();

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('FATAL: MONGODB_URI not found in environment variables.');
    process.exit(1);
}

// Log masked URI for verification
console.log('URI found:', uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

const client = new MongoClient(uri);

async function run() {
    try {
        console.log('Connecting...');
        await client.connect();
        const db = client.db();
        const res = await db.command({ ping: 1 });
        console.log('SUCCESS: Connected to MongoDB!');
        console.log('Ping result:', res);
    } catch (err) {
        console.error('CONNECTION FAILED:', err);
    } finally {
        await client.close();
    }
}

run();
