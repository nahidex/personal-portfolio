# Portfolio - Habibullah Nahid

A pixel-perfect, modern portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. This project showcases a clean, minimal design with smooth animations and a fully functional contact form.

## 🎨 Design

Built from the Figma design: [Personal Portfolio](https://www.figma.com/design/H9szh6xdct8jdQYSlDrntK/Personal-Portfolio?node-id=220-3)

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Theme:** next-themes for dark mode support
- **Email:** Resend + React Email
- **Form Validation:** Zod + React Hook Form
- **Icons & Images:** Next.js Image optimization

## ✨ Features

- 📱 Fully responsive design (mobile-first approach)
- 🎨 Pixel-perfect implementation of Figma design
- 🌙 Dark mode support with next-themes
- 📧 Contact form with server-side validation
- ✉️ Email integration using Resend
- 🎭 Smooth animations and transitions
- 🎯 SEO optimized
- ⚡ Performance optimized with Next.js 15

## 📂 Project Structure

```
portfolio-future/
├── app/
│   ├── actions/
│   │   └── sendEmail.ts          # Server action for email
│   ├── globals.css               # Global styles and design tokens
│   ├── layout.tsx                # Root layout with theme provider
│   └── page.tsx                  # Main landing page
├── components/
│   ├── sections/
│   │   ├── navigation.tsx        # Header/Navigation
│   │   ├── hero.tsx              # Hero section
│   │   ├── about.tsx             # About Me section
│   │   ├── selected-works.tsx    # Portfolio projects
│   │   ├── testimonials.tsx      # Client testimonials
│   │   ├── contact.tsx           # Contact form
│   │   └── footer.tsx            # Footer
│   ├── ui/
│   │   ├── button.tsx            # Button component
│   │   ├── input.tsx             # Input component
│   │   └── textarea.tsx          # Textarea component
│   └── theme-provider.tsx        # Theme provider wrapper
├── emails/
│   └── contact-email.tsx         # Email template
├── lib/
│   └── utils.ts                  # Utility functions
└── public/                       # Static assets
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 20.x or later
- npm or yarn
- Resend account for email functionality

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   RESEND_API_KEY=your_resend_api_key_here
   ```

   To get your Resend API key:
   - Go to [https://resend.com](https://resend.com)
   - Sign up for a free account
   - Navigate to API Keys
   - Create a new API key
   - Copy and paste it into `.env.local`

3. **Update email configuration**

   Edit `app/actions/sendEmail.ts`:

   ```typescript
   from: "Portfolio Contact <onboarding@resend.dev>", // Replace with your verified domain
   to: ["hi@nahid.design"], // Replace with your email
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Tokens

The design uses a carefully crafted color palette and typography system defined in `app/globals.css`:

### Colors

- **Primary Green:** `#01c45e`
- **Accent Green:** `#32ff32`
- **Black:** `#000000`
- **White:** `#ffffff`
- **Gray Variations:** `#8b8b8b`, `#d9d9d9`, `#eef1ea`

### Typography

- **Font Family:** Plus Jakarta Sans
- **Weights:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

### Spacing & Borders

- **Border Radius:** 16px (rounded-xl), 320px (rounded-full)

## 📧 Email Configuration

The contact form uses Resend for sending emails. Here's how it works:

1. User fills out the contact form
2. Form is validated using Zod schema
3. Server Action (`sendEmail`) is triggered
4. Email is sent via Resend API
5. User receives confirmation

### Email Template

The email template is built with React Email and includes:

- Sender's name
- Sender's email
- Message content
- Clean, professional design

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables (`RESEND_API_KEY`)
   - Deploy

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- AWS Amplify
- Digital Ocean

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Performance

- ✅ Server-side rendering with Next.js 15
- ✅ Image optimization with Next.js Image
- ✅ Font optimization with next/font
- ✅ CSS optimization with Tailwind CSS v4
- ✅ Code splitting and lazy loading

## 📝 Customization

### Update Content

1. **Personal Information:** Edit `components/sections/hero.tsx`
2. **About Text:** Edit `components/sections/about.tsx`
3. **Projects:** Edit `components/sections/selected-works.tsx`
4. **Testimonials:** Edit `components/sections/testimonials.tsx`

### Update Styling

- **Colors:** Modify CSS variables in `app/globals.css`
- **Fonts:** Change font imports in `app/layout.tsx`
- **Components:** Update individual component styles

### Add Dark Mode

Dark mode is already configured! The theme provider is set up, you just need to:

1. Add dark mode color values in `app/globals.css`
2. Use `dark:` prefix in Tailwind classes

## 🐛 Troubleshooting

### Email not sending

1. Verify your `RESEND_API_KEY` is correct
2. Check that you've verified your domain in Resend
3. Check server logs for errors

### Styles not loading

1. Clear `.next` folder: `rm -rf .next`
2. Restart dev server: `npm run dev`

### Build errors

1. Check for TypeScript errors: `npm run lint`
2. Verify all dependencies are installed: `npm install`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Habibullah Nahid**

- Portfolio: [nahid.design](https://nahid.design)
- Email: hi@nahid.design

---

Built with ❤️ using Next.js 15 and Tailwind CSS
