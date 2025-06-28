# Firebase Setup for Google Authentication

To enable Google authentication in your Dad Jokes Generator, follow these steps:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "dad-jokes-generator")
4. Follow the setup wizard (you can disable Google Analytics if you don't need it)

## 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Click on "Google" provider
5. Enable it and configure:
   - Project support email: your email
   - Project public-facing name: "Dad Jokes Generator"
6. Click "Save"

## 3. Get Your Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "Dad Jokes Web App")
6. Copy the configuration object

## 4. Set Environment Variables

Create a `.env` file in your project root with the following variables:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Replace the values with your actual Firebase configuration.

## 5. Configure Authorized Domains

1. In Firebase Authentication, go to "Settings" tab
2. Under "Authorized domains", add:
   - `localhost` (for development)
   - Your Vercel domain (e.g., `dad-jokes-generator.vercel.app`)

## 6. Deploy to Vercel

1. Add your environment variables to Vercel:
   - Go to your Vercel project dashboard
   - Go to "Settings" → "Environment Variables"
   - Add each variable from your `.env` file

2. Deploy your project:
   ```bash
   vercel --prod
   ```

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Environment variables prefixed with `VITE_` are exposed to the client (this is safe for Firebase config)
- Firebase handles the actual authentication securely

## Testing

1. Run locally: `npm run dev`
2. Visit your app and try signing in with Google
3. You should be redirected to Google's OAuth consent screen
4. After successful authentication, you'll see the main app with your user info

## Troubleshooting

- If you get "popup_closed_by_user" error, make sure your domain is authorized in Firebase
- If authentication fails, check that your Firebase config is correct
- Make sure you're using HTTPS in production (Vercel provides this automatically) 