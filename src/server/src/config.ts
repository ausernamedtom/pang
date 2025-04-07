export const config = {
  port: process.env.PORT || 3001,
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST']
  }
}; 