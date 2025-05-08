# TrackSpend - Personal Finance Management Application

TrackSpend is a modern web application designed to help users manage their personal finances effectively. This application allows users to track expenses, set budgets, and visualize spending patterns to achieve financial goals.

![TrackSpend Logo](src/assets/images/TrackSpendLogo.png)

## Features

### User Management

- **User Authentication**: Secure login and registration system
- **User Profiles**: Manage personal information and account settings
- **Role-Based Access Control**: Different access levels for regular users and administrators

### Expense Tracking

- **Add Expenses**: Record expenses with descriptions, amounts, dates, and categories
- **Expense Management**: Edit, delete, and categorize expenses
- **Expense History**: View complete spending history with filtering options

### Budget Management

- **Create Budgets**: Set spending limits for different categories
- **Budget Tracking**: Monitor spending against budget limits
- **Visual Progress**: Track budget progress with visual indicators

### Dashboard & Analytics

- **Spending Patterns**: Visual reports to understand spending habits
- **Category Breakdown**: See where your money is going
- **Budget vs. Actual**: Compare planned spending with actual expenses

## Technology Stack

- **Frontend**: Vue.js 3, Bootstrap 5, Font Awesome
- **Backend**: Django REST Framework (separate repository)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS/SCSS with responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Yarn package manager
- Backend API (Django REST Framework)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/trackspend-fe.git
   cd trackspend-fe
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a local environment file:
   Create a file named `.env.local` in the root directory with the following content:

   ```bash
   VUE_APP_API_URL=http://localhost:8000
   ```

   Note: Adjust the API URL to match your backend server address.

4. Start the development server:

   ```bash
   yarn serve
   ```

5. The application will be available at `http://localhost:8080`

### Environment Configuration

TrackSpend supports different environment configurations:

- **Development**: `.env.development`
- **Production**: `.env.production`
- **Local Override**: `.env.local` (not committed to the repository)

Available environment variables:

- `VUE_APP_API_URL`: URL of the backend API server

### Building for Production

To build the application for production deployment:

```bash
yarn build
```

The compiled files will be generated in the `dist` directory.

## Project Structure

```bash
trackspend-fe/
├── public/             # Static files
├── src/                # Source files
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Vue components
│   ├── http/           # API service layer
│   ├── router/         # Vue Router configuration
│   ├── store/          # Vuex store
│   ├── App.vue         # Root component
│   └── main.js         # Application entry point
├── .env.*              # Environment configuration files
└── package.json        # Project metadata and dependencies
```

## Available Scripts

- `yarn serve`: Start the development server
- `yarn build`: Build for production
- `yarn lint`: Run the linter
