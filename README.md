# Sousanne

Sousanne is a budget-oriented meal planning app intended to help a user plan meals with the money they have to spend at top of mind by providing a price book, price comparisons, and cost-per-meal calculations. It's currently a React web application using domain-driven-design in order to facilitate migrating it to a mobile app later and it uses another repo of mine for the component library (el-cuc-ui).

# Features

## Available Now

- **Pantry Auto-Updating:** When you tell Sousanne you've cooked a recipe, it'll deduct the ingredients cited in the recipe from your pantry if they're recorded as present.
- **Add Products And Prices:** Save the price of a specific offering (e.g. a half gallon of milk by Clover Sonoma) to a price book to record how much a given item costs from store to store.
- **Search for Ingredients:** Handy for various contexts with planned features.
- **Shelf-life estimation:** When items are added to your pantry, their expiration dates are estimated conservatively and account for sealed and unsealed freezer, room temp, and refrigerator states (see `src/server/domains/pantries/outbound/pantryFunctions.sql`).
- **Seasonality Filtering:** For produce with data, a user can check and filter for whether an item is in season.

## Planned Features

- **User Account Management:** Users will be able to manage their profiles with information such as dietary preferences and allergies to exclude certain ingredients from view and a maximum budget to inform suggestions.
- **Recipe browsing, search and creation:** Users will be able to upload their own recipes.
- **Meal scheduling and shopping list auto-generation:** When you add items to a meal plan for a given period of time, that which is not in your pantry gets added to a shopping list.
- **Price Comparisons:** Shopping lists will compare prices on products for which it has pricing data.
- **Shopping list C.R.U.D.:** Users can manually build and track shopping lists.

# Installation

- Sousanne is a Next.js project bootstrapped with create-next-app because I'm an old fogey who isn't on the Vite train. The backend uses PostgreSQL and raw SQL queries (no Prisma, no Sequelize, no knex just yet - the queries haven't gotten sufficiently complicated).

NPM install your way to glory for your frontend needs.

- Don't forget to check out .env.example and copy over the variables into your own .env while providing appropriate data.

- For the backend, you'll need to set up a running postgres server.
- Check out `src/server/postgres/schema.sql` to set up a database schema.
- Do a folder-wide search for `.sql` files in `src/server/domains` and install the functions that turn up in the outbound folders.
  - `pantryFunctions.sql` in specific particular is important for the feature that tracks pantry ingredients in terms of how much of a given item is in stock and pending expiration dates.

# Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
