# Mobile Responsive Tester

A comprehensive, in-browser responsive design testing tool built with Next.js, TypeScript, and shadcn/ui. Test your website's mobile responsiveness across 50+ device viewports simultaneously.

## Features

### ✨ Core Features (Phase 1 - Implemented)

- **50+ Device Profiles**: Pre-configured devices including iPhones, Samsung Galaxy, Google Pixel, iPads, tablets, and desktop screens
- **Side-by-Side Testing**: Display multiple device viewports simultaneously
- **URL Input with Validation**: Test any website with automatic protocol detection
- **Device Search & Filter**: Easily find devices by name or filter by category (phone, tablet, desktop)
- **Portrait/Landscape Rotation**: Toggle device orientation with one click
- **Add/Remove Viewports**: Dynamically manage which devices you're testing
- **Dark Mode Support**: Full dark mode implementation with theme persistence
- **Responsive Design**: The tool itself is fully responsive and mobile-friendly

### 🎨 UI/UX Highlights

- Built with **shadcn/ui** for beautiful, accessible components
- **Dark/Light mode** with smooth transitions
- Clean, modern interface with intuitive controls
- Real-time device dimension display
- Scaled viewports for optimal viewing
- Category-based device filtering (phones, tablets, desktops)
- Search functionality across all devices

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mustafapiplodi/mobile-responsive-tester.git
cd mobile-responsive-tester
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
```

## Usage

1. **Enter a URL**: Type the website URL you want to test in the input field
2. **Click "Load URL"**: The URL will be loaded into all selected viewports
3. **Select Devices**: Browse or search for devices and click to add them
4. **Toggle Orientation**: Use the rotate button to switch between portrait and landscape
5. **Remove Devices**: Click the X button to remove a viewport
6. **Toggle Dark Mode**: Use the theme toggle in the header

## Device Database

The app includes 52 pre-configured devices across three categories:

- **Phones** (27 devices): Latest iPhones, Samsung Galaxy, Google Pixel, OnePlus, Xiaomi
- **Tablets** (9 devices): iPads, Samsung Galaxy Tabs, Surface tablets, Kindle Fire
- **Desktops** (16 devices): Various screen resolutions, MacBooks, ultrawide monitors

Each device profile includes:
- Accurate viewport dimensions
- Device Pixel Ratio (DPR)
- Device category
- Unique identifier

## Project Structure

```
mobile-responsive-tester/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx             # Main page with state management
│   └── globals.css          # Global styles and CSS variables
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── select.tsx
│   ├── header.tsx           # App header with branding
│   ├── url-input.tsx        # URL input with validation
│   ├── device-selector.tsx  # Device selection with search/filter
│   ├── viewport-container.tsx # Viewport grid with iframes
│   ├── theme-provider.tsx   # Theme context provider
│   └── theme-toggle.tsx     # Dark mode toggle button
├── data/
│   └── devices.json         # Device profiles database
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## Roadmap

### Phase 2: Advanced Features
- [ ] Scroll synchronization across all viewports
- [ ] Click mirroring between devices
- [ ] Custom device creation
- [ ] Save/load device sets
- [ ] localStorage persistence for user preferences

### Phase 3: Tools & Enhancement
- [ ] Screenshot capture (single and batch)
- [ ] Google Lighthouse integration
- [ ] Performance reports
- [ ] Screenshot annotation editor
- [ ] Shareable configuration links

### Phase 4: Polish & Launch
- [ ] Comprehensive accessibility audit
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Documentation and tutorials
- [ ] Browser compatibility testing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Inspired by tools like LambdaTest LT Browser and Responsively App

## Support

If you find this tool useful, please give it a ⭐️ on GitHub!

For issues and feature requests, please use the [GitHub Issues](https://github.com/mustafapiplodi/mobile-responsive-tester/issues) page.
