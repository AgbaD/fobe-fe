## Overview
This application is a fintech platform that allows users to register, log in, view their transactions, and manage their wallet. Users can transfer funds to other users and fund their accounts through an integration with Paystack.


## Features
1. User Registration:  
   - Users can create an account by providing their email, password, and other necessary details.

2. User Login:  
   - Secure login functionality with form validation.

3. Dashboard:  
   - Displays a list of all transactions associated with the user's account.

4. Wallet Management:  
   - View wallet balance.  
   - Transfer funds to other registered users by providing their id and the amount.  
   - Fund the account via Paystack integration.

5. Paystack Integration:  
   - Users are redirected to Paystack for secure payment processing.


## Technologies Used
- Frontend Framework: React.js  
- State Management: React's built-in `useState` and `useEffect` hooks.  
- CSS Framework: SCSS for responsive styling.  
- Payment Integration: Paystack.


## Setup and Installation

### Prerequisites
1. Node.js installed on your system.
2. A package manager like `npm` or `yarn`.
3. Clone the backend repository and ensure the backend service is running.

### Steps to Run the Application
1. Clone the Repository:  
   ```bash
   git clone <frontend-repo-url>
   cd <project-folder>
   ```

2. Install Dependencies:  
   Run the following command to install required packages:  
   ```bash
   npm install
   # or
   yarn install
   ```

4. Run the Application:  
   Start the development server:  
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Access the Application:  
   Open your browser and navigate to `http://localhost:5173`.

---

## Project Structure
```plaintext
src/
├── components/       # Reusable React components
    ├── context/      # App contexts
    ├── hooks/        # React hooks
    ├── modules/      # Main App pages
├── api/              # API integration logic
├── assets/styles/    # SCSS styles
├── utils/            # Utility functions
├── App.tsx           # Application entry point
└── main.jsx          # React DOM rendering
```

---

## How to Use the Application
1. Registration:  
   - Visit the `/register` page and fill in the required details.  
   - Submit the form to create your account.

2. Login:  
   - Visit the `/login` page.  
   - Enter your registered email and password to log in.

3. Dashboard:  
   - After logging in, you will be redirected to the dashboard.  
   - View your recent transactions here.

4. Wallet Page:  
   - View your current wallet balance.  
   - To fund your wallet, click the "Fund Account" button.  
   - You will be redirected to Paystack for payment.  
   - To transfer funds, provide the recipient's email and the amount, then confirm the transaction.


## Troubleshooting
- If the application fails to load, ensure your backend is running 
- Clear browser cache if styling or functionality seems off.

## Future Enhancements
- Add a feature for users to view detailed transaction history.
- Include user profile management.
- Currency converter
- Websockets for real time notifications
