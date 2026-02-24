# Contributing to Canadian Travel Deals

Thank you for your interest in contributing to Canadian Travel Deals! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Adding New Feed Sources](#adding-new-feed-sources)

---

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow:

- Be respectful and inclusive
- Welcome newcomers and provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

---

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/travel.git
   cd travel
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear, descriptive title
- Steps to reproduce the problem
- Expected behavior vs actual behavior
- Screenshots (if applicable)
- Your environment (browser, OS, Node version)

### Suggesting Enhancements

Feature requests are welcome! Please open an issue with:
- A clear description of the feature
- Why this feature would be useful
- Any implementation ideas you have

### Contributing Code

We welcome code contributions! Here are some areas you can help with:

- **Bug fixes** — Fix reported issues
- **New features** — Implement requested features
- **Performance improvements** — Optimize existing code
- **Documentation** — Improve README, comments, or add examples
- **Tests** — Add test coverage
- **UI/UX improvements** — Design enhancements
- **Accessibility** — Improve a11y compliance

---

## Development Workflow

### Running Locally

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start

# Lint code
pnpm lint

# Type check
pnpm type-check
```

### Project Structure

- `app/` — Next.js app router pages and API routes
- `components/` — React components
- `lib/` — Utility functions and data fetching logic
- `public/` — Static assets
- `scripts/` — Build and utility scripts

---

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Avoid `any` types — use proper typing
- Export types/interfaces when used across files

### React

- Use functional components with hooks
- Prefer server components unless interactivity is needed
- Use `"use client"` directive only when necessary
- Keep components small and focused

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system (see `app/globals.css`)
- Use semantic color tokens (e.g., `bg-primary`, `text-muted-foreground`)
- Ensure responsive design with Tailwind breakpoints

### Code Quality

- Write clean, readable code with meaningful variable names
- Add comments for complex logic
- Remove console.logs before committing (except intentional logging)
- Follow existing code patterns in the project

---

## Commit Guidelines

We follow conventional commit messages:

```
type(scope): subject

body (optional)
```

**Types:**
- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `style:` — Code style changes (formatting, no logic change)
- `refactor:` — Code refactoring
- `perf:` — Performance improvements
- `test:` — Adding or updating tests
- `chore:` — Maintenance tasks

**Examples:**
```
feat(feeds): add support for Edmonton (YEG) deals
fix(parser): handle missing image URLs gracefully
docs(readme): update installation instructions
style(deal-card): improve mobile spacing
```

---

## Pull Request Process

1. **Update your fork** with the latest changes from `main`:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run checks** before submitting:
   ```bash
   pnpm lint
   pnpm type-check
   pnpm build
   ```

3. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request** on GitHub with:
   - A clear title describing the change
   - A description of what changed and why
   - Screenshots (for UI changes)
   - Reference any related issues (e.g., "Fixes #123")

5. **Wait for review** — maintainers will review your PR and may request changes

6. **Make requested changes** and push updates to your branch

7. **Merge** — once approved, a maintainer will merge your PR

---

## Adding New Feed Sources

To add a new Canadian city feed source:

1. **Update `lib/feed-sources.ts`**:
   ```typescript
   {
     id: "yeg",
     name: "YEG Deals",
     airportCode: "YEG",
     city: "Edmonton",
     province: "Alberta",
     url: "https://www.yegdeals.com",
     feedUrl: "https://www.yegdeals.com/atom/1",
   }
   ```

2. **Test the feed** works correctly:
   ```bash
   pnpm dev
   # Navigate to http://localhost:3000 and check for YEG deals
   ```

3. **Update documentation**:
   - Add the source to the table in `README.md`
   - Update the count in descriptions (e.g., "13+ cities" → "14+ cities")

4. **Submit a PR** with your changes

### Feed Requirements

- Must be a Canadian city with an airport code
- Must provide an Atom or RSS feed
- Feed must be publicly accessible
- Content must be travel/flight deals

---

## Questions?

If you have questions about contributing:
- Open a [GitHub Discussion](https://github.com/canadian-ai/travel/discussions)
- Comment on an existing issue
- Reach out to the maintainers

Thank you for contributing! 🙏✈️
