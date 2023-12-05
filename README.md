# SolidStart

Everything you need to build a Solid project, powered by [`solid-start`](https://start.solidjs.com);

## Creating a project

```bash
# create a new project in the current directory
npm init solid@latest

# create a new project in my-app
npm init solid@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different adapter, add it to the `devDependencies` in `package.json` and specify in your `vite.config.js`.

## Running with Pocketbase as backend

# Get your own instance

- `git clone https://github.com/martinalbrnz/expense-divider-web.git`
- Download a Pocketbase executable
- Copy the repository's `pb_migrations` folder into your pocketbase instance folder
- Point your app .env to the served instance of pocketbase's server

Here you have 2 options:
1 - Either you:
- Run `<path>/pocketbase.exe serve`
- Create an admin Account
- Run `npm/yarn/pnpm/whatever run dev`

2 - Or:
- Run `npm/yarn/pnpm/whatever run build`
- Copy dist folter into pocketbase's pb_public folder (create if it didn't exist)
- Run `<path>/pocketbase.exe serve`

## Guest credentials
username: invitado

password: invitado123
