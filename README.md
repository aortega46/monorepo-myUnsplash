# My Unsplash

This is the monorepo of my project “My Unsplash”.

This project is made with Angular, NestJS and MongoDB.

Users can upload images to a masonry grid on the home page. Images can be searched by name. On the other hand, they can also be deleted.

# For development

1. Run

```jsx
npm install
```

## Angular (Frontend)

The Angular files are located at:

>[!NOTE]
> apps/client

1. You must have the environment folder and the variables.
2. Run

```jsx
npm run start:ng
```

## NestJS (Backend)

The NestJS files are located at:

>[!NOTE]
> apps/api

1. You must copy and rename the file “.env.template” to “.env”
2. Fill the variables in “.env”
3. Run

```jsx
npm run start:api
```
