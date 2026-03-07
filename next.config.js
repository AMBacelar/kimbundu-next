module.exports = {
  i18n: {
    locales: ['en', 'fr', 'pt'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [
      { source: '/tags', destination: '/classes', permanent: false },
      { source: '/tags/:path*', destination: '/classes', permanent: false },
    ];
  },
};
