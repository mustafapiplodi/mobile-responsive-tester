# Mobile Responsive Tester

A comprehensive, in-browser responsive design testing tool built with Next.js, TypeScript, and shadcn/ui. Test your website's mobile responsiveness across 50+ device viewports simultaneously with advanced features like screenshots, device sets, and performance insights.

![Mobile Responsive Tester](https://img.shields.io/badge/version-2.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Core Functionality (Phase 1 & 2) ✅

- **50+ Device Profiles**: Pre-configured devices including latest iPhones, Samsung Galaxy, Google Pixel, iPads, tablets, and desktop screens
- **Side-by-Side Testing**: Display multiple device viewports simultaneously with responsive grid layout
- **URL Input with Validation**: Test any website with automatic protocol detection
- **Device Search & Filter**: Easily find devices by name or filter by category (phone, tablet, desktop)
- **Portrait/Landscape Rotation**: Toggle device orientation with one click
- **Add/Remove Viewports**: Dynamically manage which devices you're testing
- **Dark Mode Support**: Full dark/light theme implementation with system preference detection

### Advanced Features (Phase 2 & 3) ✅

#### 🎨 Custom Devices
- Create custom device profiles with specific dimensions
- Set custom Device Pixel Ratio (DPR)
- Choose device category
- Form validation for accurate configurations

#### 💾 Device Sets
- Save your favorite device combinations
- Quick load saved device sets
- Persistent storage using localStorage
- Manage multiple device set configurations

#### 📸 Screenshot Capture
- Capture screenshots of all viewports at once
- Individual screenshot preview
- Batch download functionality
- Screenshot gallery with management
- High-quality PNG export

#### 🔗 Shareable Configurations
- Generate shareable links with URL and device selection
- Encoded configuration in URL parameters
- One-click copy to clipboard
- Automatic configuration loading from shared links

#### ⚡ Performance Insights
- Mobile-friendly analysis
- Responsive design checks
- Viewport meta tag validation
- Image optimization recommendations
- Font size legibility checks

#### 🎯 Sync Controls
- Scroll synchronization options (with CORS limitations)
- Click mirroring controls
- Note: Limited support for cross-origin iframes due to browser security

### UI/UX Enhancements (Phase 4) ✅

#### ⌨️ Keyboard Shortcuts
- `Ctrl/Cmd + D`: Toggle dark mode
- `?`: Show help dialog
- Intuitive keyboard navigation

#### 📚 Help & Documentation
- Comprehensive help dialog
- Feature explanations
- Keyboard shortcut reference
- Tips and best practices
- Browser compatibility information

#### 🎯 Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast support
- Focus indicators

#### 🔍 SEO Optimization
- Comprehensive meta tags
- Open Graph tags for social sharing
- Twitter Card support
- Structured data (Schema.org)
- Optimized for search engines

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Theme**: next-themes
- **Screenshots**: html2canvas
- **State Management**: React Hooks

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

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

## 📖 Usage Guide

### Quick Start

1. **Enter a URL**: Type the website URL you want to test
2. **Click "Load URL"**: The website loads into all selected viewports
3. **Select Devices**: Browse or search for devices and click to add them
4. **Test & Analyze**: Use various tools to test responsiveness

### Advanced Features

#### Custom Devices
1. Click "Custom Device" button
2. Fill in device name, dimensions, DPR, and category
3. Click "Add Device" to create and use immediately

#### Device Sets
1. Select your desired devices
2. Click "Save Set" and name your configuration
3. Use "Load Set" to quickly restore saved configurations

#### Screenshots
1. Click "Screenshot All" to capture all viewports
2. View screenshots in the gallery
3. Download individually or all at once

#### Share Configuration
1. Set up your URL and device selection
2. Click "Share" to generate a shareable link
3. Copy and share with team members

#### Performance Analysis
1. Load a URL
2. Click "Performance" button
3. View mobile-friendly insights and recommendations

## 🏗️ Project Structure

```
mobile-responsive-tester/
├── app/
│   ├── layout.tsx              # Root layout with SEO & theme
│   ├── page.tsx                # Main application page
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── badge.tsx
│   │   ├── select.tsx
│   │   ├── label.tsx
│   │   └── switch.tsx
│   ├── header.tsx              # App header with branding
│   ├── url-input.tsx           # URL input with validation
│   ├── device-selector.tsx     # Device selection interface
│   ├── viewport-container.tsx  # Viewport grid with iframes
│   ├── custom-device-dialog.tsx # Custom device creator
│   ├── device-sets-manager.tsx # Save/load device sets
│   ├── screenshot-manager.tsx  # Screenshot capture & gallery
│   ├── share-config.tsx        # Shareable link generator
│   ├── sync-controls.tsx       # Sync options panel
│   ├── performance-panel.tsx   # Performance insights
│   ├── help-dialog.tsx         # Help documentation
│   ├── theme-provider.tsx      # Theme context provider
│   └── theme-toggle.tsx        # Dark mode toggle
├── data/
│   └── devices.json            # Device profiles database (52 devices)
├── lib/
│   └── utils.ts                # Utility functions
└── public/                     # Static assets
```

## 🎨 Device Database

The app includes 52 pre-configured devices:

### Phones (27 devices)
- iPhone 15 Pro Max, 15 Pro, 15, 14 Pro Max, 14 Pro, 14, 13 Pro Max, 13 Pro, 13, 13 Mini, SE
- Samsung Galaxy S24 Ultra, S24, S23, S22, S21, Z Fold5, Z Flip5
- Google Pixel 8 Pro, 8, 7 Pro, 7, 6
- OnePlus 12, 11
- Xiaomi 14 Pro, 13 Pro

### Tablets (9 devices)
- iPad Pro 13", Pro 11", Air, Mini, 10th Gen
- Samsung Galaxy Tab S9, S8
- Microsoft Surface Pro 9, Surface Go
- Kindle Fire HD

### Desktops (16 devices)
- Standard: 1920x1080, 2560x1440, 4K
- Laptops: 1366x768, 1536x864, 1600x900
- MacBook Air 13", Pro 14", Pro 16"
- iMac 24"
- Dell XPS 13, 15
- Ultrawide: 2560x1080, 3440x1440

Each device profile includes:
- Accurate viewport dimensions
- Device Pixel Ratio (DPR)
- Device category classification
- Unique identifier

## 🎯 Key Features Breakdown

### URL Input & Validation
- Automatic HTTPS protocol addition
- URL validation
- Error messaging
- Quick load functionality

### Device Selection
- Search across all devices
- Filter by category (phone/tablet/desktop)
- Visual indicators for active devices
- Prevent duplicate selection

### Viewport Management
- Dynamic add/remove
- Orientation toggle (portrait/landscape)
- Scaled preview for optimal viewing
- Responsive grid layout (1-3 columns)
- Device information display

### Custom Devices
- Name validation
- Dimension constraints (1-10000px)
- DPR selection (0.5-5x)
- Category selection
- Immediate testing capability

### Device Sets
- Save unlimited configurations
- Name your sets
- View device count
- Creation date tracking
- Quick load functionality
- Delete unwanted sets

### Screenshots
- Batch capture all viewports
- Individual viewport capture
- PNG format export
- Automatic filename generation
- Gallery view
- One-click download

### Share & Collaborate
- URL parameter encoding
- Automatic configuration loading
- Copy to clipboard
- Share with team members

### Performance Insights
- Responsive design check
- Viewport meta tag validation
- Image optimization recommendations
- Font legibility analysis
- Mobile-friendly tips

### Sync Controls
- Optional scroll synchronization
- Click mirroring toggle
- CORS limitation warnings
- Best for same-origin testing

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Toggle Dark Mode | `Ctrl/Cmd + D` |
| Show Help | `?` |

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for custom configurations:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Customizing Device Database

Edit `data/devices.json` to add or modify device profiles:

```json
{
  "id": "unique-id",
  "name": "Device Name",
  "width": 375,
  "height": 667,
  "dpr": 2,
  "category": "phone"
}
```

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## ⚠️ Known Limitations

### Cross-Origin Restrictions
- Some websites block iframe embedding (X-Frame-Options header)
- Scroll/click sync has limited support for cross-origin iframes
- This is a browser security feature and cannot be bypassed

### Best Practices
- Test websites with HTTPS for better compatibility
- Use same-origin URLs for full sync functionality
- Check website's iframe policy before testing

## 🚀 Performance Optimization

- Code splitting with Next.js
- Lazy loading of components
- Optimized bundle size
- Tree-shaking unused code
- Image optimization
- CSS purging with Tailwind

## 📝 Development

### Adding New Features

1. Create component in `components/`
2. Import and integrate in `app/page.tsx`
3. Update types if needed
4. Test thoroughly
5. Update documentation

### Running Tests

```bash
npm run lint
npm run type-check
```

### Building for Production

```bash
npm run build
npm run start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Inspired by tools like LambdaTest LT Browser and Responsively App

## 📊 Roadmap

### Future Enhancements

- [ ] Real device cloud testing integration
- [ ] Network throttling simulation
- [ ] Accessibility score integration
- [ ] Browser extension version
- [ ] Export reports as PDF
- [ ] Compare screenshots side-by-side
- [ ] Annotation tools for screenshots
- [ ] Team collaboration features
- [ ] Historical snapshot comparison
- [ ] Mobile app version

## 💡 Use Cases

- **Web Developers**: Test responsive designs during development
- **QA Teams**: Verify cross-device compatibility
- **Designers**: Preview designs on actual device dimensions
- **Marketers**: Check landing page responsiveness
- **Agencies**: Demonstrate responsive capabilities to clients

## 📞 Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/mustafapiplodi/mobile-responsive-tester/issues) page.

## ⭐ Show Your Support

If you find this tool useful, please give it a ⭐️ on GitHub!

---

**Made with ❤️ using Next.js, TypeScript, and shadcn/ui**
