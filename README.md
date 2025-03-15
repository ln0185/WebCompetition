# Charity Finder

**Charity Finder** is a charity website built with **Next.js** and **React** (using TypeScript). The platform allows users to explore and discover various nonprofits and fundraising projects by fetching data from the **Every.org API**. It aims to make charitable donations easier by providing a simple interface for users to find and support causes that matter to them.

## Features

- Search and discover nonprofit organizations and fundraising projects.
- View detailed information about charities, including their mission and current campaigns.
- Responsive and user-friendly design built with **Next.js** and **React** (with TypeScript).
- Fetches real-time data from the **Every.org API**.

## Technologies Used

- **Next.js** (React framework for server-side rendering)
- **React** (JavaScript library for building user interfaces)
- **TypeScript** (JavaScript superset for static typing)
- **Every.org API** (For fetching nonprofit and fundraiser data)
- **Tailwind CSS** (For styling the components)

## Setup and Installation

### Prerequisites

Before you begin, ensure that you have the following installed on your machine:

- **Node.js** (LTS version recommended)  
  [Download Node.js](https://nodejs.org/)
- **Yarn** (optional, but recommended as a package manager)  
  [Install Yarn](https://classic.yarnpkg.com/en/docs/install/)

### Clone the Repository

```bash
git clone https://github.com/yourusername/charity-finder.git
cd charity-finder

Install Dependencies

Run the following command to install all dependencies:

npm install

or if using Yarn:

yarn install

Environment Variables

Make sure to set up your environment variables:

    Create a .env.local file in the root directory of the project.
    Add your Every.org API key and any other necessary variables in the .env.local file:

NEXT_PUBLIC_EVERYORG_API_KEY=your_api_key_here

Note: Replace your_api_key_here with your actual Every.org API key.
Running the Application Locally

To run the app in development mode, use the following command:

npm run dev

or if using Yarn:

yarn dev

This will start the application at http://localhost:3000. You can open it in your browser and begin exploring the charity listings.
Building for Production

To build the project for production, run:

npm run build

or with Yarn:

yarn build

After building, you can start the production server:

npm start

or with Yarn:

yarn start

Deployment

This project is deployed on Vercel for seamless hosting and serverless deployment.
Deploying to Vercel

To deploy your app to Vercel, simply follow these steps:

    Connect your GitHub (or other VCS) repository to Vercel.
    Vercel will automatically detect the Next.js project and handle the deployment for you.
    Set up environment variables in Vercel’s dashboard (like the NEXT_PUBLIC_EVERYORG_API_KEY).

For more information on deploying Next.js apps with Vercel, refer to the Next.js documentation.
Contributing

We welcome contributions to this project! If you'd like to contribute:

    Fork the repository.
    Create a new branch.
    Make your changes.
    Submit a pull request with a description of your changes.

License

This project is licensed under the MIT License - see the LICENSE file for details.
```
