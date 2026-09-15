/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Apply security headers to every route.
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // Master Admin Portal for all clients QA reports: https://www.qaquad.com/QAQuad
      {
        source: "/QAQuad",
        destination: "/reports/qaquad/index.html",
      },
      // Serves the QA Tracker's static report snapshot at /QATestReport without
      // redirecting the browser — the URL bar keeps showing /QATestReport.
      // Regenerate the file from the QA Tracker project with:
      //   python manage.py export_static_report --project <KEY> --out ./public/reports/qatestreport
      // then commit and push this repo (Publish_Package) as usual.
      {
        source: "/QATestReport",
        destination: "/reports/qatestreport/index.html",
      },
    ];
  },
};

export default nextConfig;
