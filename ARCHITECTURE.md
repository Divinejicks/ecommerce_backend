# Overview
This project is a NestJS-based backend for an e-commerce admin dashboard. It handles user management, product catalog, orders, authentication, and admin features with role-based access control.

# Technological stack
- Framework used => Nestjs with Typesripts
- ORM used => Prisma
- Database used => Postgress
- Authentication => JWT + Passport
- API Documentation => Swagger

# Modules Overview
1. Auth Module

    Handles login, register, JWT token issuance.

    Uses Passport strategies for guards.

    Protects routes using @UseGuards(AuthGuard) and RolesGuard.

2. User Module

    CRUD for users (admin only).

    Supports roles: USER, ADMIN.

    Provides endpoints for user info and role checks.

3. Product Module

    Full CRUD for products.

    Includes product publishing/unpublishing.

    Linked to Category.

4. Category Module

    Simple module for managing product categories.

    Used during product creation.

5. Order Module

    Handles placing and managing orders.

    Links to OrderItem, calculates total.

# Authentication & Authorization

    JWT Auth with accessToken sent in Authorization: Bearer <token>.

    @Roles('ADMIN') decorator used to restrict admin-only routes.

    Guards check both auth status and role.


# Seed data
  Seed data can be found in src/seed/seed.ts. Seed data runs just once and you need to set SEED_DB=true in your .env file.

# .env information needed to create a .env file
can be found in .env.template