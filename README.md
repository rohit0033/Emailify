# Email Service

This project is an Email Service that consists of a frontend built with Next.js and a backend server powered by Express.js. It integrates with various APIs including Google's Gmail API and OpenAI to fetch and classify emails.

## Table of Contents

1. [Email Service Frontend](#email-service-frontend)
    - [Features](#features)
    - [Getting Started](#getting-started)
    - [Project Structure](#project-structure)
    - [Deployment](#deployment)
    - [Contributing](#contributing)
    - [License](#license)
2. [Server (Backend) for Email Service](#server-backend-for-email-service)
    - [Getting Started](#getting-started-1)
    - [Features](#features-1)
    - [API Endpoints](#api-endpoints)
    - [Environment Variables](#environment-variables)
    - [Contributing](#contributing-1)
    - [License](#license-1)
    - [Acknowledgements](#acknowledgements)

## Email Service Frontend

This is the frontend part of the Email Service, built using [Next.js](https://nextjs.org/), a powerful React framework that enables functionality such as server-side rendering and generating static websites for React based web applications.

### Features

- **User Authentication**: Supports sign-in and sign-out functionalities.
- **Google Authentication**: Integrates with Google OAuth 2.0 for secure and convenient user authentication.
- **Protected Routes**: Access control for authenticated users.
- **Dynamic Routing**: Utilizes Next.js dynamic routing feature.
- **Tailwind CSS**: Styled with Tailwind CSS for rapid UI development.
- **Gmail Classification using AI**: Leverages AI to classify and organize Gmail messages, enhancing user experience and productivity.

### Getting Started

To get the frontend running locally:

1. Clone this repo
2. Install all required dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the root directory and populate it with the necessary API keys and secrets. Refer to the `.env.example` for the required fields. Your `.env` file should include:

    ```plaintext
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your_google_client_secret
    NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
    ```

4. Start the local server:
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying files in the `app/` directory. The page auto-updates as you edit the file.

### Project Structure

- `app/`: Contains the Next.js pages and components.
- `components/`: Reusable components used across the application.
- `auth.config.ts`: Configuration for authentication.
- `middleware.ts`: Middleware for handling authentication and route protection.

### Deployment

To deploy the frontend, you can use Vercel, the creators of Next.js. Vercel simplifies the deployment process and offers many features such as automatic HTTPS, global CDN, and many more.

Refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Contributing

Contributions are welcome! Please feel free to submit a pull request.

### License

This project is open source and available under the [MIT License](LICENSE).

## Server (Backend) for Email Service

This is the backend server for the Email Service project, built with Express.js and integrating various APIs including Google's Gmail API and OpenAI.

### Getting Started

#### Prerequisites

- Node.js installed on your machine.
- An `.env` file in the `server` directory with the necessary environment variables set (refer to the provided `.env.example` in the project documentation).

#### Installation

1. Navigate to the `server` directory:
    ```sh
    cd server
    ```

2. Install the required dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    npm start
    ```

The server will start running on the port specified in your `.env` file or default to port 3002.

### Features

- **Integration with Google's Gmail API**: Reads inbox content.
- **Utilizes OpenAI's GPT models**: Classifies and organizes emails.
- **CORS enabled**: Allows cross-origin requests.
- **Environment variables for configuration**: Easily manage configuration settings.

### API Endpoints

- **`/extract-emails`**
    - **Method**: GET
    - **Description**: Extracts emails from a specified Gmail account and converts them into JSON format.
    - **Query Parameters**:
        - `openAiKey`: The API key for OpenAI.
        - `numEmails`: The number of emails to extract and convert.
    - **Response**: JSON formatted data of extracted emails.

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the server directory:

- `CLIENT_ID`: Your Google client ID.
- `CLIENT_SECRET`: Your Google client secret.
- `REFRESH_TOKEN`: A refresh token for accessing the Gmail API. You will need to generate your own using OAuth2.
- `GRANT_TYPE`: Should be set to `refresh_token`.
- `PORT`: (Optional) The port on which the server will run.

### Contributing

Contributions are always welcome! Please adhere to this project's code of conduct.

### License

Distributed under the ISC License. See [LICENSE](LICENSE) for more information.

### Acknowledgements

- [Express.js](https://expressjs.com/)
- [Google APIs](https://developers.google.com/apis-explorer)
- [OpenAI](https://www.openai.com/)
