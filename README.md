# Bank System - Modern React Banking Application

A beautiful, modern, and secure banking application built with React, TypeScript, Express, and PostgreSQL. Features a complete redesign with responsive navigation, multiple pages, and enhanced user experience.

## ✨ Features

### 🎨 **Modern Design**
- Beautiful, responsive React-based UI
- Smooth animations and transitions
- Mobile-first design approach
- Professional gradient themes
- Interactive components

### 📱 **Complete Navigation**
- Responsive navigation bar with dropdown menu
- Smooth page transitions
- Mobile hamburger menu
- Active page indicators

### 🏦 **Banking Features**
- User registration and authentication
- Account management dashboard
- Deposit and withdrawal transactions
- Real-time transaction history
- Account balance tracking
- Session-based security

### 📄 **Multiple Pages**
- **Dashboard**: Modern account overview with statistics
- **About Us**: Bank information, mission, vision, team
- **Contact Us**: Contact form, office locations, support info
- **FAQ**: Comprehensive frequently asked questions
- **Gallery**: Bank facilities and achievements showcase

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### 1. Database Setup
```bash
# Create database
psql -d bank_system -f database_init.sql
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your database credentials
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bank_system
DB_USER=your_username
DB_PASSWORD=your_password
SESSION=your_session_secret_here
PORT=3000
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Development Mode
```bash
# Start both backend and frontend
npm run dev:full

# Or start individually:
npm run dev          # Backend only
npm run dev:frontend # Frontend only
```

### 5. Production Build
```bash
npm run build        # Build backend
npm run build:frontend # Build frontend
npm start           # Start production server
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Navigation.tsx   # Main navigation component
│   └── Navigation.css
├── pages/              # Page components
│   ├── Dashboard.tsx   # Account dashboard
│   ├── About.tsx       # About us page
│   ├── Contact.tsx     # Contact form page
│   ├── FAQ.tsx         # FAQ page
│   ├── Gallery.tsx     # Image gallery
│   ├── Login.tsx       # Login page
│   └── Register.tsx    # Registration page
├── database/           # Database models
├── routes/             # API routes
├── services/           # Business logic
├── session_auth/       # Authentication
├── App.tsx            # Main app component
├── main.tsx           # React entry point
└── index.ts           # Express server

public/
├── index.html         # Main HTML template
├── images/            # Gallery images (add your images here)
└── dist/              # Built frontend files

database_init.sql      # Database schema
vite.config.ts         # Vite configuration
tsconfig.json          # TypeScript configuration
```

## 🎨 Design Features

### **Color Scheme**
- Primary: `#667eea` (Blue)
- Secondary: `#764ba2` (Purple)
- Success: `#28a745` (Green)
- Danger: `#dc3545` (Red)
- Background: Gradient from blue to purple

### **Typography**
- Font: Inter (Google Fonts)
- Clean, modern font stack
- Responsive font sizes

### **Components**
- Card-based layouts
- Smooth hover effects
- Loading states and animations
- Form validation
- Error handling
- Success notifications

## 📱 Responsive Design

- **Desktop**: Full navigation with dropdown menus
- **Tablet**: Optimized grid layouts
- **Mobile**: Hamburger menu, stacked layouts
- **Touch-friendly**: Large buttons and touch targets

## 🔧 Customization

### **Adding Images to Gallery**
1. Add your images to `public/images/` directory
2. Update the `galleryImages` array in `src/pages/Gallery.tsx`
3. Replace placeholder image paths with your actual image paths

### **Modifying Colors**
- Update CSS custom properties in `src/index.css`
- Modify gradient backgrounds in component CSS files
- Change brand colors in navigation and buttons

### **Adding New Pages**
1. Create new component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Navigation.tsx`

## 🔒 Security Features

- Password hashing with bcrypt
- Session-based authentication
- CSRF protection
- Input validation
- SQL injection protection
- Secure cookie settings

## 📊 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Accounts
- `GET /accounts/my-accounts` - Get user accounts
- `POST /accounts/deposit` - Make deposit
- `POST /accounts/withdraw` - Make withdrawal
- `GET /accounts/:id/transactions` - Get transactions

## 🚀 Deployment

### **Frontend Build**
```bash
npm run build:frontend
```

### **Backend Build**
```bash
npm run build
npm start
```

### **Environment Variables**
Ensure all environment variables are set in production:
- Database connection details
- Session secret
- Port configuration

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 License

ISC License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ using React, TypeScript, and modern web technologies**