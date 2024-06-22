# Currency Converter App

## Overview

Currency Converter is a web application built with Next.js that allows users to convert between different currencies in real-time. It features a clean and user-friendly interface where users can input amounts and select currencies to see live conversion rates.

## Features

- Real-time currency conversion
- Support for multiple currencies
- Clean and responsive design using Tailwind CSS

## Installation

To get started with the Currency Converter app, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/currency-converter.git
   cd currency-converter
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000` to view the app.

## Project Structure

- `public/`: Contains public assets including the logo and favicon.
- `styles/`: Contains global CSS styles.
- `app/`: Contains the main components and pages of the application.
- `app/page.tsx`: The main page component which includes the currency converter logic and UI.

## Usage

### Customizing the Application

You can customize the application by modifying the following files:

- `app/page.tsx`: Main logic and layout of the currency converter.
- `styles/globals.css`: Global styles for the application.

### Environment Variables

Make sure to have a `.env.local` file in your project root to manage any environment-specific variables. For example:

```
NEXT_PUBLIC_API_URL=https://open.er-api.com/v6/latest
```

## Deployment

To deploy the app, follow these steps:

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Start the application:**

   ```bash
   npm start
   ```

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for making API requests.

## Contributing

If you would like to contribute to this project, please open an issue or submit a pull request on GitHub.

## Contact

If you have any questions or need further assistance, feel free to contact:

- **Name**: Akshay Kumar Huliyar Prabhakara
- **Email**: ahuliyar@syr.edu