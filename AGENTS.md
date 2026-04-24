Project Overview

This project is a mobile-first e-commerce web application built for demo purposes using Next.js (App Router), Tailwind CSS, Zustand, and Supabase.

The application mimics a modern mobile e-commerce experience (similar to Tokopedia), focusing on clean UI and full user flow from authentication to checkout.

Tech Stack
Next.js (App Router ONLY)
Tailwind CSS
Zustand (state management)
Supabase (authentication + database)
Core Features

The application must support the following features:

User authentication (login & register using Supabase)
Product listing (from database)
Product detail page
Add to cart
Favorites system
User profile page (edit profile)
Checkout flow (demo only, no payment gateway)
Routing Structure

The application must follow this routing structure:

/welcome → landing page (login/register options)
/login
/register
/home → main product listing
/product/[id] → product detail
/search → search page
/favorites → favorite products
/cart → shopping cart
/checkout → checkout page
/profile → user profile
UI/UX Guidelines
Mobile-first ONLY
Maximum width: 430px
Use max-w-md mx-auto for layout
Use Tailwind CSS for all styling
Clean, modern UI similar to mobile e-commerce apps
Home Page Layout Requirements
Top left: project logo
Top right: cart icon
Next to cart: search bar
Product list displayed in a clean grid/list
Navigation

Use a bottom navigation bar with:

Home
Search
Favorites
Profile

Navigation must be reusable and consistent across pages.

Folder Structure Rules

The project must follow this structure:

/app → routing (App Router)
/components → reusable UI components
/lib → Supabase client and API logic
/store → Zustand state (cart, user)
Coding Standards
Use async/await for all data fetching
Separate UI and business logic
Keep components small and reusable
Avoid hardcoding data (use database)
Use environment variables for keys
Write clean and readable code
Supabase Integration Rules
Use Supabase client from /lib/supabaseClient.js
Use Supabase Auth for login and register
Fetch product data from database
Do not expose service role key
Use publishable key only
State Management Rules

Use Zustand for:

Cart state
Optional user state

Do not overcomplicate global state.

Component Guidelines

Reusable components that must exist:

Navbar (bottom navigation)
ProductCard
Button (optional reusable)
Input field component (optional)
Output Expectations for AI

When generating code:

Follow folder structure strictly
Prioritize modular code
Ensure code is mobile responsive
Avoid unnecessary complexity
Focus on working features first, then polish UI
Important Notes
This is a demo project but must follow real-world best practices
Focus on functionality (auth, cart, product flow)
UI should be clean but not over-engineered
Do not switch to Pages Router under any circumstances
