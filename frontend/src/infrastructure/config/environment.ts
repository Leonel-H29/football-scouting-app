export const environment = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
  useMockApi: String(import.meta.env.VITE_USE_MOCK_API ?? 'false') === 'true',
};
