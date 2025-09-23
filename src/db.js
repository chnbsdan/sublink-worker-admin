export async function initDatabase(db) {
    await db.batch([
      db.prepare(`
        CREATE TABLE IF NOT EXISTS settings (
          key TEXT PRIMARY KEY,
          value TEXT
        );
      `),
      db.prepare(`
        CREATE TABLE IF NOT EXISTS shortlinks (
          short_code TEXT PRIMARY KEY,
          original_query TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `),
      db.prepare(`
        CREATE TABLE IF NOT EXISTS whitelist (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          domain TEXT NOT NULL UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `),
    ]);

    const initialSettings = {
        'admin_password': null,
        'homepage_enabled': 'true',
        'api_enabled': 'true',
        'default_link_mode': 'short',
        'shorten_button_enabled': 'false',
        'whitelist_enabled': 'true',
        'ruleset_visible': 'true',
        'default_ruleset': 'minimal',
        'custom_rules_visible': 'false',
        'default_custom_rules': '[]',
        'base_config_visible': 'false',
        'default_base_config_singbox': '',
        'default_base_config_clash': '',
        'user_agent_visible': 'false',
        'default_user_agent': 'curl/7.74.0',
        'theme_config': JSON.stringify({
            theme: 'theme-aurora-glass',
            primaryColor: '#38bdf8',
            particleColor: '#FFFFFF',
            texts: {
                title: 'Sublink Worker'
            }
        }),
    };

    const stmt = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
    const inserts = Object.entries(initialSettings).map(([key, value]) => stmt.bind(key, value));
    await db.batch(inserts);
}

export async function getSettings(db) {
    const { results } = await db.prepare('SELECT key, value FROM settings').all();
    let settings = {};
    if (results) {
        for (const { key, value } of results) {
            settings[key] = value;
        }
    }
    
    const defaultTheme = { theme: 'theme-aurora-glass', primaryColor: '#38bdf8', particleColor: '#FFFFFF', texts: { title: 'Sublink Worker' } };
    try {
        settings.theme_config = settings.theme_config ? JSON.parse(settings.theme_config) : defaultTheme;
    } catch (e) {
        settings.theme_config = defaultTheme;
    }

    return settings;
}

export async function updateSettings(db, settings) {
    const updates = [];
    for (const [key, value] of Object.entries(settings)) {
        if (key === 'theme_config') {
            updates.push({ key, value: JSON.stringify(value) });
        } else {
            updates.push({ key, value });
        }
    }
    const stmt = db.prepare('REPLACE INTO settings (key, value) VALUES (?, ?)');
    const batch = updates.map(item => stmt.bind(item.key, item.value));
    await db.batch(batch);
}

export async function getAdminPassword(db) {
    const { results } = await db.prepare('SELECT value FROM settings WHERE key = ?').bind('admin_password').all();
    return results.length > 0 ? results[0].value : null;
}

export async function setAdminPassword(db, hashedPassword) {
    await db.prepare('UPDATE settings SET value = ? WHERE key = ?').bind(hashedPassword, 'admin_password').run();
}

export async function getWhitelistedDomains(db) {
    const { results } = await db.prepare('SELECT domain FROM whitelist ORDER BY created_at DESC').all();
    return results ? results.map(row => row.domain) : [];
}

export async function addWhitelistedDomain(db, domain) {
    return await db.prepare('INSERT INTO whitelist (domain) VALUES (?)').bind(domain).run();
}

export async function removeWhitelistedDomain(db, domain) {
    return await db.prepare('DELETE FROM whitelist WHERE domain = ?').bind(domain).run();
}

export async function isDomainWhitelisted(db, referer) {
    if (!referer) return false;
    try {
        const refererDomain = new URL(referer).hostname;
        const { results } = await db.prepare('SELECT 1 FROM whitelist WHERE domain = ?').bind(refererDomain).all();
        return results.length > 0;
    } catch (e) {
        return false;
    }
}

export async function createShortlink(db, shortCode, originalQuery) {
    return await db.prepare('INSERT INTO shortlinks (short_code, original_query) VALUES (?, ?)')
        .bind(shortCode, originalQuery)
        .run();
}

export async function getShortlink(db, shortCode) {
    const result = await db.prepare('SELECT original_query FROM shortlinks WHERE short_code = ?')
        .bind(shortCode)
        .first();
    return result ? result.original_query : null;
}
