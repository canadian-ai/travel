# Canadian Travel Deals Aggregator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

**Find Your Next Adventure.** Real-time flight deals from 13+ Canadian cities, all in one place.

🌐 **Live Site:** [travel.canadian-ai.ca](https://travel.canadian-ai.ca)  
🔗 **GitHub:** [canadian-ai/travel](https://github.com/canadian-ai/travel)

---

## About This Project

Canadian Travel Deals is an **open source** travel deal aggregation hub that collects and displays flight deals from trusted Canadian deal-hunting websites. We aggregate RSS/Atom feeds from 13+ cities including Toronto (YYZ), Vancouver (YVR), Montreal (YUL), Calgary (YYC), and more, providing Canadians with a single destination to discover the best flight deals.

### Key Features

- 🛫 **13+ Canadian Cities** — YYZ, YVR, YUL, YYC, YHZ, YLW, YXU, YOW, YQR, YXE, YYT, YQT, YWG
- ⚡ **Real-Time Updates** — Feeds refreshed every 15 minutes with SWR caching
- 🔍 **Smart Filtering** — Filter by city, province, or search keywords
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- 🎨 **Modern UI** — Built with Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui
- 🔗 **Proper Attribution** — Every deal links to and credits its original source
- 🔒 **SEO Optimized** — Comprehensive metadata, structured data (JSON-LD), sitemap, robots.txt
- 📡 **RSS Output** — The site itself generates an RSS feed at `/feed.xml`

---

## Technology Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, React Server Components)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **Fonts:** [Inter](https://fonts.google.com/specimen/Inter) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- **Data Fetching:** [SWR](https://swr.vercel.app/) for client-side caching
- **Date Handling:** [date-fns](https://date-fns.org/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/canadian-ai/travel.git
cd travel

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Building for Production

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
travel/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Homepage
│   ├── api/feeds/          # RSS/Atom feed aggregation API
│   ├── sitemap.ts          # Dynamic sitemap generation
│   ├── robots.ts           # SEO robots.txt
│   └── feed.xml/           # RSS output feed
├── components/
│   ├── site-header.tsx     # Navigation header
│   ├── hero-section.tsx    # Hero banner
│   ├── deal-card.tsx       # Individual deal card component
│   ├── deal-grid.tsx       # Deal grid with filtering/search
│   ├── city-filter.tsx     # City filtering chips
│   ├── search-bar.tsx      # Search input
│   ├── stats-bar.tsx       # Stats display
│   ├── city-showcase.tsx   # Featured cities grid
│   ├── site-footer.tsx     # Footer with attribution
│   └── structured-data.tsx # JSON-LD structured data
├── lib/
│   ├── feed-sources.ts     # Feed source configuration
│   └── feed-parser.ts      # RSS/Atom XML parser
├── public/
│   ├── og-image.jpg        # Open Graph social card
│   ├── favicon.jpg         # Site favicon
│   └── images/             # Static images
└── scripts/                # Utility scripts
```

---

## Data Sources & Attribution

This project aggregates travel deals from the following independent Canadian deal-hunting websites. **All credit goes to the original content creators.** Each deal card links back to its source and displays the provider name.

### Aggregated Sources

| City | Airport Code | Source Website |
|------|-------------|----------------|
| Montreal | YUL | [YULdeals.com](https://www.yuldeals.com) |
| Calgary | YYC | [YYCdeals.com](https://www.yycdeals.com) |
| Halifax | YHZ | [YHZdeals.com](https://www.yhzdeals.com) |
| Kelowna | YLW | [YLWdeals.com](https://www.ylwdeals.com) |
| London | YXU | [YXUdeals.com](https://www.yxudeals.com) |
| Ottawa | YOW | [YOWdeals.com](https://www.yowdeals.com) |
| Regina | YQR | [YQRdeals.com](https://www.yqrdeals.com) |
| Saskatoon | YXE | [YXEdeals.com](https://www.yxedeals.com) |
| St. John's | YYT | [YYTdeals.com](https://www.yytdeals.com) |
| Thunder Bay | YQT | [YQTdeals.com](https://www.yqtdeals.com) |
| Toronto | YYZ | [YYZdeals.com](https://www.yyzdeals.com) |
| Vancouver | YVR | [YVRdeals.com](https://www.yvrdeals.com) |
| Winnipeg | YWG | [YWGdeals.com](https://www.ywgdeals.com) |

**Note:** We do not claim ownership of any deal content. All deals, images, and descriptions are property of their respective sources. This aggregator exists solely to provide a convenient hub for Canadian travelers.

---

## Open Source Project

This project is **100% open source** under the MIT License. The codebase is freely available for learning, forking, and modification.

### Contribution Policy

**Pull requests are not accepted for this repository.** However, we welcome community engagement through:

- **Issues** — Report bugs, suggest features, or ask questions by opening GitHub issues
- **Forks** — Feel free to fork this repository and create your own version with modifications
- **Discussions** — Share ideas and engage with the community in GitHub Discussions

### Making Modifications

If you'd like to propose changes or enhancements:

1. **Fork the repository** to your own GitHub account
2. **Make your changes** in your fork
3. **Open an issue** in the original repository describing your modifications and linking to your fork
4. The maintainers will review your fork and may incorporate ideas in future updates

This approach allows the community to experiment and innovate while keeping the main repository focused and maintainable.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

### Third-Party Licenses

- RSS/Atom feed content is owned by the respective source websites
- Design assets and branding by [Canadian AI](https://canadian-ai.ca)
- Open source dependencies listed in [package.json](./package.json) retain their original licenses

---

## Credits & Acknowledgments

This project was built with ❤️ by the **Canadian AI** team and the open source community.

### Special Thanks

- All the deal-hunting websites that provide RSS/Atom feeds
- [Vercel](https://vercel.com) for hosting and deployment infrastructure
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- The Next.js and React communities for amazing tools and documentation

### Repository

**GitHub:** [https://github.com/canadian-ai/travel](https://github.com/canadian-ai/travel)  
**Maintainer:** Canadian AI ([canadian-ai.ca](https://canadian-ai.ca))

---

## Support & Contact

- 🐛 **Issues:** [GitHub Issues](https://github.com/canadian-ai/travel/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/canadian-ai/travel/discussions)
- 🌐 **Website:** [travel.canadian-ai.ca](https://travel.canadian-ai.ca)

---

## Disclaimer

This aggregator is provided "as is" without warranty. Flight deal accuracy, availability, and pricing are subject to change and should be verified on the original source websites. We are not responsible for booking errors, price changes, or deal expiration.

Happy travels! ✈️🌍
