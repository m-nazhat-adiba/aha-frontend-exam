# Aha Frontend Developer Exam

I use faker.js to generate image. The reason is the image link from the API cannot be used (cdn fakercloud terminated its service)

### Framework and Libraries

- Next.js 14 App Router
- React 18
- Tailwind CSS
- Redux Toolkit
- Material UI

### How To Run in Development

Add .env file in the root. You can look at .env.example as an example.

# Install all packages

npm install

# Run in development

npm run dev

## Folder Structure

- src/app - web pages, layout, and also provider.
- src/components - reusable components
- src/containers - parts of the web pages
- src/lib - redux store, reducers and service
- src/hooks - reusable custom hooks
- src/utils - reusable utility functions
- src/helpers - reusable helper functions
- src/models - data structure and types
