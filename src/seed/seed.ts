import { PrismaClient, Role } from 'generated/prisma';

const prisma = new PrismaClient();

export async function runSeed() {
  const adminExists = await prisma.user.findFirst({
    where: { roles: { has: Role.ADMIN } },
  });

  if (adminExists) {
    console.log('✅ Seed already applied, skipping...');
  } else {
console.log('🌱 Seeding data...');
  // --- Create Categories ---
  const categoryNames = [
    'Electronics',
    'Books',
    'Fashion',
    'Home & Kitchen',
    'Toys',
    'Sports',
    'Automotive',
    'Health',
    'Beauty',
    'Music'
  ];

  const categories = await Promise.all(
    categoryNames.map((name) => prisma.category.create({ data: { name } }))
  );

  // --- Create Users ---
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      passwordHash: '$argon2id$v=19$m=65536,t=3,p=4$th8vcsCLc+boXEoJp+UUPA$j5j1z/UDippjuQOe0o15Vl5WKvRF5cCVxJ63hgGlAu0',
      firstName: 'Admin',
      lastName: 'User',
      roles: [Role.ADMIN, Role.USER],
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      email: 'user@example.com',
      passwordHash: '$argon2id$v=19$m=65536,t=3,p=4$th8vcsCLc+boXEoJp+UUPA$j5j1z/UDippjuQOe0o15Vl5WKvRF5cCVxJ63hgGlAu0',
      firstName: 'John',
      lastName: 'Doe',
      roles: [Role.USER],
    },
  });

  // --- Create Products ---
  const productsData = [
    { name: 'Smartphone', description: 'Latest model smartphone', price: 699.99, stock: 50 },
    { name: 'Laptop', description: 'Powerful laptop for professionals', price: 1299.99, stock: 30 },
    { name: 'Bluetooth Speaker', description: 'Portable speaker with high quality sound', price: 59.99, stock: 100 },
    { name: 'Wireless Earbuds', description: 'Noise-cancelling earbuds', price: 89.99, stock: 80 },
    { name: 'Blockchain Book', description: 'Understanding decentralized systems', price: 29.99, stock: 60 },
    { name: 'Running Shoes', description: 'Comfortable sports shoes', price: 99.99, stock: 70 },
    { name: 'Yoga Mat', description: 'Non-slip yoga mat', price: 25.99, stock: 90 },
    { name: 'Car Vacuum Cleaner', description: 'Portable car vacuum', price: 45.99, stock: 40 },
    { name: 'Kitchen Blender', description: 'High-speed blender', price: 120.00, stock: 35 },
    { name: 'Makeup Kit', description: 'All-in-one makeup kit', price: 75.50, stock: 45 },
    { name: 'Electric Guitar', description: 'Beginner electric guitar', price: 250.00, stock: 20 },
    { name: 'Gaming Mouse', description: 'Ergonomic gaming mouse', price: 49.99, stock: 85 },
    { name: 'LED Desk Lamp', description: 'Adjustable LED lamp', price: 39.99, stock: 100 },
    { name: 'Action Figure', description: 'Collectible toy figure', price: 19.99, stock: 120 },
    { name: 'Face Cream', description: 'Moisturizing cream', price: 22.50, stock: 75 },
  ];

  const products = await Promise.all(
    productsData.map((product) => {
      const category = categories[Math.floor(Math.random() * categories.length)];
      return prisma.product.create({
        data: { ...product, isPublished: true, categoryId: category.id },
      });
    })
  );

  // --- Create Orders ---
  for (let i = 0; i < 25; i++) {
    const orderItemsData = [];

    const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items per order
    let total = 0;

    for (let j = 0; j < numItems; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;
      total += product.price * quantity;

      orderItemsData.push({
        quantity,
        price: product.price,
        productId: product.id,
      });
    }

    await prisma.order.create({
      data: {
        totalAmount: Number(total.toFixed(2)),
        status: 'PAID',
        userId: regularUser.id,
        orderItems: { create: orderItemsData },
      },
    });
  }

  console.log('🌱 Seed data inserted successfully!');
  }
  
}

