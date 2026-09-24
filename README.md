# 🧵 Tiny Art Studio - Handmade Crafts E-Commerce Web App

A modern, high-aesthetic web application for **Tiny Art Studio** (`@tinyyartstudio_`), designed for selling handmade embroidery hoops, crochet stitches, clay creations, and custom craft orders. Built with React, Vite, Tailwind CSS, Lucide Icons, and Leaflet Maps.

---

## ✨ Key Features

1. **Artisanal Brand Design**:
   - Palette & typography styled directly after Tiny Art Studio branding (*"a little corner for handmade things, made slowly and with care. hoops, stitches, tiny details — this page is where it all comes together. excited to share what we create, one thread at a time."*).

2. **Customer Storefront**:
   - **Product Showcase & Search**: Live keyword search across titles, tags, and descriptions. Filter by craft categories & sort by price or customer rating.
   - **Quick View Modal & Wishlist**: Interactive product preview modal and persistent saved favorites.
   - **Shopping Cart Drawer**: Real-time total calculation with free shipping thresholds.

3. **User & Admin Authentication**:
   - Separate **Customer Role** and **Admin Role** credentials.
   - 1-Click Demo Login presets for fast testing (`Customer Demo` & `Admin Demo`).

4. **Delivery Location GPS Map Picker**:
   - Interactive **Leaflet Map** allowing customers to click and drop a delivery pin on the map during checkout.
   - Exact latitude & longitude coordinates recorded for delivery precision.

5. **Online Payment API Integration**:
   - Integrated online payment simulation (Credit/Debit Card via Stripe, Instant UPI / GPay VPA).
   - **Cash on Delivery (COD) disabled** with explicit user notice banners as requested.

6. **Admin Dashboard**:
   - **Metrics Overview**: Total sales revenue, order counts, pending shipments, live store listings count.
   - **Product Management**: Form to add new craft products (Title, Price, Stock, Category, Image URL, Description), and remove/delete existing listings.
   - **Order Tracking & Location Viewer**: View customer orders, payment status, and open an interactive **Delivery Location Map** to inspect the customer's pinned coordinates.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 How to Push to GitHub & Deploy on Vercel

### Step 1: Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new) named `tiny-art-studio`.
2. Run the following commands in your project terminal:

```bash
git init
git add .
git commit -m "Initial commit - Tiny Art Studio e-commerce web app"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/tiny-art-studio.git
git push -u origin main
```

---

### Step 2: Deploy to Vercel (1-Click)

1. Go to [vercel.com](https://vercel.com/) and sign in.
2. Click **"Add New..."** &rarr; **"Project"**.
3. Select your imported **tiny-art-studio** GitHub repository.
4. Vercel will automatically detect **Vite** as the framework preset.
5. Click **Deploy**. Your site will be live on a `https://tiny-art-studio.vercel.app` URL!

---

### Step 3: Payment API Environment Setup (Optional)

In your Vercel Project Settings &rarr; **Environment Variables**, you can add your production Stripe or Razorpay keys:

- `VITE_STRIPE_PUBLIC_KEY` = `pk_live_...`
- `VITE_RAZORPAY_KEY_ID` = `rzp_live_...`

---

## 🎨 Tech Stack

- **Frontend**: React 19, Vite 6
- **Styling**: Tailwind CSS v4, Custom CSS Design System
- **Icons**: Lucide React
- **Maps**: Leaflet & OpenStreetMap
- **Animations**: Canvas Confetti
