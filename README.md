# Portfolio 3.0 - Next.js Migration

A modern, full-stack portfolio website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This project represents a complete migration from the previous React-based portfolio, featuring enhanced performance, SEO optimization, and improved developer experience.

## 🌟 Features

### ✅ **Fully Migrated Pages**
- **🏠 Landing/Explore Page** - Dynamic hero section with animations
- **👨‍💻 About Page** - Personal introduction with interactive elements
- **🚀 Projects Portfolio** - Categorized project showcase with filtering
- **💼 Experience Timeline** - Professional experience with animations
- **🛠️ Tech Stack** - Skills and technologies with interactive cards
- **💭 Thoughts Blog** - Personal insights and articles
- **🎯 Services** - Service offerings with pricing and features
- **🛒 Store/Shop** - Digital products with cart functionality
- **📞 Contact** - Contact form with email integration
- **💳 Checkout** - Complete e-commerce checkout flow

### ✅ **Core Features**
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **⚡ Performance Optimized** - Next.js 15 with static generation
- **🎨 Modern Animations** - Framer Motion for smooth interactions
- **📧 Email Integration** - Resend API for contact forms and orders
- **🛒 Cart Management** - Local storage-based shopping cart
- **🔍 Category Filtering** - Dynamic content filtering
- **💾 TypeScript** - Full type safety throughout the application
- **🎯 SEO Ready** - Meta tags and optimized structure

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio3.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   RESEND_FROM_EMAIL=your-email@domain.com
   RESEND_TO_EMAIL=your-email@domain.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio3.0/
├── app/                        # Next.js 15 App Router
│   ├── about/page.tsx          # About page
│   ├── api/                    # API routes
│   │   ├── send/route.ts       # Contact form API
│   │   └── send-order/route.ts # Order processing API
│   ├── checkout/page.tsx       # Checkout page
│   ├── contact/page.tsx        # Contact page
│   ├── experience/page.tsx     # Experience timeline
│   ├── explore/page.tsx        # Landing page
│   ├── projects/page.tsx       # Projects portfolio
│   ├── services/page.tsx       # Services offerings
│   ├── stack/page.tsx          # Tech stack
│   ├── store/page.tsx          # E-commerce store
│   ├── thoughts/page.tsx       # Blog/thoughts
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home redirect
├── components/                 # Reusable components
│   ├── EmailTemplate.tsx       # Email template
│   ├── Navbar.tsx              # Navigation component
│   └── PortfolioLayout.tsx     # Main layout wrapper
├── public/                     # Static assets
│   └── assets/                 # Images and media
├── types/                      # TypeScript definitions
│   └── index.ts                # Global type definitions
├── .env.example                # Environment variables template
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🎨 Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### **Backend & APIs**
- **Next.js API Routes** - Serverless functions
- **Resend** - Email delivery service
- **React Email** - Email template components

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript Compiler** - Type checking

## 📧 Email Configuration

The project uses **Resend** for email functionality. To set up email services:

1. **Sign up for Resend** at [resend.com](https://resend.com)
2. **Generate an API key** in your dashboard
3. **Add your domain** (for production)
4. **Update environment variables**:
   ```env
   RESEND_API_KEY=re_xxxxxxxxx
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   RESEND_TO_EMAIL=your-email@example.com
   ```

### Email Features
- **Contact Form** - General inquiries and project discussions
- **Service Requests** - Service-specific contact forms
- **Order Processing** - E-commerce order confirmations
- **Responsive Templates** - Beautiful email designs

## 🛒 Store Features

The integrated store includes:
- **Product Catalog** - Digital products and services
- **Shopping Cart** - Local storage-based cart management
- **Checkout Process** - Complete order flow
- **Order Processing** - Email notifications for orders
- **Payment Integration** - Ready for payment gateway integration

## 🔧 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 📈 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: Optimized with Next.js code splitting
- **Loading Speed**: Static generation for instant page loads
- **Core Web Vitals**: Optimized for modern web standards

## 🚀 Deployment

### **Recommended Platforms**
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **DigitalOcean App Platform**

### **Deploy to Vercel**
1. Connect your GitHub repository
2. Add environment variables in dashboard
3. Deploy with zero configuration

### **Environment Variables for Production**
```env
RESEND_API_KEY=your_production_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_TO_EMAIL=your-email@yourdomain.com
```

## 🔄 Migration Summary

This project represents a **complete migration** from the previous React-based portfolio (`portfolio2.0`) to a modern Next.js architecture:

### **What Was Migrated**
- ✅ All 10 main pages with full functionality
- ✅ Responsive design and animations
- ✅ Contact forms and email integration
- ✅ E-commerce store and checkout
- ✅ Project portfolio with filtering
- ✅ All static assets and images
- ✅ TypeScript conversion for type safety
- ✅ Modern component architecture

### **Improvements Made**
- 🚀 **Performance**: Static generation and optimized bundles
- 📱 **Mobile Experience**: Enhanced responsive design
- 🔧 **Developer Experience**: TypeScript, better tooling
- 🎯 **SEO**: Meta tags, structured data, better URLs
- 📧 **Email**: More reliable email service (Resend)
- 🛒 **E-commerce**: Enhanced store functionality
- 🎨 **UI/UX**: Refined animations and interactions

## 📞 Contact & Support

For questions about this project:
- **Email**: benjaminbelloeil@outlook.com
- **LinkedIn**: [Benjamin Belloeil](https://www.linkedin.com/in/benjamin-belloeil-15396b254/)
- **GitHub**: [benjaminbelloeil](https://github.com/benjaminbelloeil)

## 📄 License

This project is for portfolio purposes. Please respect the code and assets.

---

**Built with ❤️ by Benjamin Belloeil**
