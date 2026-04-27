# Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Email (Optional for development)

```bash
# Copy the environment example
cp .env.example .env.local

# Add your Resend API key to .env.local
# RESEND_API_KEY=re_xxxxxxxxxx
```

> **Note:** The contact form will work without an API key in development, but emails won't be sent. Get a free API key at [resend.com](https://resend.com).

### Step 3: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio! 🎉

---

## 📋 Checklist Before Going Live

- [ ] Add your Resend API key to `.env.local`
- [ ] Update email addresses in `app/actions/sendEmail.ts`
- [ ] Verify your domain in Resend
- [ ] Customize content in section files
- [ ] Replace placeholder images with your own
- [ ] Test contact form functionality
- [ ] Update meta tags in `app/layout.tsx`
- [ ] Add your social media links in `components/sections/footer.tsx`
- [ ] Run `npm run build` to test production build
- [ ] Deploy to Vercel or your preferred platform

---

## 🎨 Customization Quick Reference

### Update Personal Info

📁 `components/sections/hero.tsx`

- Line 5: Profile image URL
- Lines 12-16: Main headline
- Lines 29-32: Stats

### Update About Section

📁 `components/sections/about.tsx`

- Lines 28-32: About headline
- Lines 35-51: About text

### Update Projects

📁 `components/sections/selected-works.tsx`

- Lines 3-17: Project data array
- Add more projects to the array

### Update Colors

📁 `app/globals.css`

- Lines 4-9: CSS color variables

### Update Email Recipient

📁 `app/actions/sendEmail.ts`

- Line 19: Replace with your email

---

## 🔧 Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter

# Clean & Reinstall
rm -rf .next node_modules package-lock.json
npm install
```

---

## 💡 Tips

1. **Images:** Place your images in the `public/` folder
2. **Fonts:** Already configured with Plus Jakarta Sans
3. **Colors:** Use Tailwind classes like `text-primary` and `bg-accent`
4. **Dark Mode:** Add `dark:` prefix to any Tailwind class
5. **Responsive:** Use `sm:`, `md:`, `lg:` prefixes for breakpoints

---

## 🆘 Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Search for common issues in the Troubleshooting section
- Open an issue on GitHub

Happy coding! 🚀
