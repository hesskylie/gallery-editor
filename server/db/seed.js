const db = require('./db');
const { User, Gallery } = require('./models');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      email: 'gru@email.com',
      password: 'unicorn',
      username: 'Gru'
    }),
    User.create({
      email: 'dogs@email.com',
      password: 'ruffruff',
      username: 'Doge'
    })
  ]);

  const galleries = await Promise.all([
    Gallery.create({
      title: 'Vacations',
      userId: 1
    }),
    Gallery.create({
      title: 'Beach Days',
      userId: 1
    })
  ])

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${galleries.length} galleries`)
  console.log('seeded successfully');
}


async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}
