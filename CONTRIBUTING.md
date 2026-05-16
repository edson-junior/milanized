# Contributing

Contributions are welcome! To get started:

1. Fork the repository and create a new branch (`git checkout -b feature/your-feature`)
2. Make your changes (keep commits atomic and use [Conventional Commits](https://www.conventionalcommits.org/))
3. Run `pnpm lint` and `pnpm test` to ensure code quality and passing tests. For significant UI or routing changes, also run `pnpm build && pnpm start` then `pnpm test:e2e` — not required for every PR, but recommended for features that touch navigation, forms, or page rendering
4. Open a pull request describing your changes

**Code style:**
- Linting/formatting: [Biome](https://biomejs.dev/)
- Commit messages: [Conventional Commits](https://www.conventionalcommits.org/)

For major changes, please open an issue first to discuss what you’d like to change.
