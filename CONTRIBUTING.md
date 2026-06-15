# Contribution Policy

Thank you for your interest in Canadian Travel Deals! This document outlines how you can engage with this open source project.

---

## Pull Requests Are Not Accepted

**This repository does not accept pull requests.** The project is open source for transparency, learning, and forking purposes, but direct contributions via pull requests are disabled at this time.

---

## How to Engage with This Project

While we don't accept pull requests, we value community engagement and welcome the following:

### 1. Report Issues

If you encounter bugs, problems, or have questions:

- Open a **GitHub Issue** with:
  - A clear, descriptive title
  - Steps to reproduce (for bugs)
  - Expected vs actual behavior
  - Screenshots or error messages (if applicable)
  - Your environment (browser, OS, Node version)

[Open an Issue](https://github.com/canadian-ai/travel/issues)

### 2. Suggest Features

Have an idea for improvement?

- Open a **GitHub Issue** with the `enhancement` label
- Describe the feature and why it would be valuable
- Share any implementation thoughts you have

### 3. Fork and Modify

The best way to experiment or make your own version:

1. **Fork this repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/travel.git
   cd travel
   ```
3. **Make your modifications** in your fork
4. **Share your fork** — if you've made something interesting, open an issue linking to your fork so others can discover it

### 4. Share Your Work

If you've created an enhanced version or added features in your fork:

- Open a **GitHub Issue** describing your modifications
- Link to your forked repository
- The maintainers may review and incorporate ideas in future updates

---

## Running the Project Locally

Want to experiment with the code?

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Project Structure

```
travel/
├── app/              # Next.js pages and API routes
├── components/       # React components
├── lib/              # Utilities and feed parsing
├── public/           # Static assets
└── scripts/          # Build scripts
```

---

## Development Guidelines

If you're forking and modifying this project, here are some guidelines to maintain code quality:

### TypeScript & Code Quality

- Use TypeScript for all new code
- Avoid `any` types when possible
- Write clean, readable code with meaningful names

### React Patterns

- Use functional components with hooks
- Prefer server components unless interactivity is needed
- Keep components small and focused

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design tokens in `app/globals.css`
- Ensure responsive design with Tailwind breakpoints

### Commit Conventions

Use conventional commit messages:
- `feat:` — New feature
- `fix:` — Bug fix  
- `docs:` — Documentation changes
- `refactor:` — Code refactoring
- `style:` — Formatting changes

---

## License

This project is licensed under the **MIT License**. You are free to:

- Use the code commercially
- Modify the code
- Distribute copies
- Use it privately

See [LICENSE](./LICENSE) for full terms.

---

## Why No Pull Requests?

This project is maintained by a small team focused on specific goals. By not accepting pull requests, we can:

- Maintain a consistent codebase and vision
- Reduce maintenance overhead
- Focus on core features and stability
- Keep the project simple and manageable

However, we **strongly encourage forking** and experimentation. The open source nature means you can create your own versions, and we're happy to hear about interesting forks through GitHub issues.

---

## Questions?

- **Issues:** [GitHub Issues](https://github.com/canadian-ai/travel/issues)
- **Discussions:** [GitHub Discussions](https://github.com/canadian-ai/travel/discussions)
- **Website:** [travel.canadian-ai.ca](https://travel.canadian-ai.ca)

Thank you for understanding and for your interest in this project!
