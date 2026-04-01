/**
 * PocketBase Setup Script
 * Creates the 'posts' collection with all required fields
 * Run this after starting PocketBase for the first time
 * 
 * Usage: node scripts/setup-pocketbase.js
 */

const PocketBase = require('pocketbase/cjs');

const PB_URL = process.env.POCKETBASE_URL || 'http://localhost:8090';
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD || 'adminadmin';

async function setup() {
  const pb = new PocketBase(PB_URL);

  console.log('🔧 Setting up PocketBase...');

  try {
    // Authenticate as admin
    console.log('Authenticating...');
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✓ Authenticated');
  } catch (error) {
    console.error('❌ Authentication failed. Create admin first:');
    console.error(`  ./pocketbase superuser upsert "${ADMIN_EMAIL}" "${ADMIN_PASSWORD}"`);
    process.exit(1);
  }

  try {
    // Create posts collection
    console.log('Creating posts collection...');
    
    const postsSchema = {
      name: 'posts',
      type: 'base',
      schema: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'content',
          type: 'text',
          required: true,
        },
        {
          name: 'excerpt',
          type: 'text',
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          options: {
            values: ['draft', 'published', 'archived'],
            maxSelect: 1,
          },
        },
        {
          name: 'published_at',
          type: 'date',
        },
        {
          name: 'author',
          type: 'text',
          required: true,
        },
        {
          name: 'tags',
          type: 'text',
        },
        {
          name: 'keywords',
          type: 'text',
        },
        {
          name: 'meta_title',
          type: 'text',
        },
        {
          name: 'meta_description',
          type: 'text',
        },
        {
          name: 'featured_image',
          type: 'text',
        },
        {
          name: 'featured',
          type: 'bool',
          default: false,
        },
        {
          name: 'source_url',
          type: 'url',
        },
        {
          name: 'viral_hook',
          type: 'text',
        },
        {
          name: 'trending_source',
          type: 'text',
        },
      ],
      indexes: [
        {
          name: 'idx_slug',
          fields: ['slug'],
          unique: true,
        },
        {
          name: 'idx_status',
          fields: ['status'],
        },
        {
          name: 'idx_published_at',
          fields: ['published_at'],
        },
      ],
      listRule: 'status = "published"',
      viewRule: 'status = "published"',
      createRule: null, // Only admins via API
      updateRule: null,
      deleteRule: null,
    };

    // Check if collection exists
    try {
      await pb.collections.getOne('posts');
      console.log('✓ Posts collection already exists');
    } catch {
      // Create collection
      await pb.collections.create(postsSchema);
      console.log('✓ Posts collection created');
    }

    // Set up API rules for authenticated admin access
    console.log('Configuring API permissions...');
    
    // Create API key user if needed
    const apiKeyEmail = 'api@internal.local';
    try {
      await pb.collection('users').getFirstListItem(`email = "${apiKeyEmail}"`);
      console.log('✓ API user exists');
    } catch {
      await pb.collection('users').create({
        email: apiKeyEmail,
        password: process.env.POCKETBASE_API_PASSWORD || 'api-key-password-change-me',
        passwordConfirm: process.env.POCKETBASE_API_PASSWORD || 'api-key-password-change-me',
        verified: true,
      });
      console.log('✓ API user created');
    }

    console.log('\n✅ PocketBase setup complete!');
    console.log(`\n📍 Admin UI: ${PB_URL}/_/`);
    console.log(`📍 API: ${PB_URL}/api/collections/posts/records`);
    
    console.log('\n🔑 Next steps:');
    console.log('1. Update .env.local with POCKETBASE_URL');
    console.log('2. Set POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD');
    console.log('3. Test: curl ' + PB_URL + '/api/collections/posts/records');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setup();
