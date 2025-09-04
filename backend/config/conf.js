const conf = {
  apiUrl: String(process.env.VITE_BACKEND_URL),
  mongoUri: String(process.env.MONGO_URI),

  discordWebhookUrl: String(process.env.VITE_DISCORD_WEBHOOK_URL),
  discordBotToken: String(process.env.VITE_DISCORD_BOT_TOKEN),
  webpushPublicKey: String(process.env.VITE_WEBPUSH_PUBLIC_KEY),
  webpushPrivateKey: String(process.env.VITE_WEBPUSH_PRIVATE_KEY),
  webpushEmail: String(process.env.VITE_WEBPUSH_EMAIL),
  onlineDevicesTailscale: String(process.env.ONLINE_DEVICES_TAILSCALE),
  jathedarDiscordBotToken: String(process.env.JATHEDAR_DISCORD_BOT_TOKEN),

  openWeatherApiKey: String(process.env.VITE_OPENWEATHER_API_KEY),
  openWeatherLatitude: String(process.env.VITE_OPENWEATHER_LATITUDE),
  openWeatherLongitude: String(process.env.VITE_OPENWEATHER_LONGITUDE),

  notificationAnnoucerXiLabs: String(
    process.env.VITE_NOTIFICATION_ANNOUCER_XI_LABS
  ),

  strapiFullAccessToken: String(process.env.VITE_STRAPI_FULL_ACCESS_TOKEN),

  prismicPermanentAccessTokensMaster: String(
    process.env.VITE_PRISMIC_PERMANENT_ACCESS_TOKENS_MASTER
  ),
  prismicClientId: String(process.env.VITE_PRISMIC_CLIENT_ID),
  prismicClientSecret: String(process.env.VITE_PRISMIC_CLIENT_SECRET),
};

export default conf;
