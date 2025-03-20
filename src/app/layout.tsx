import "@/styles/globals.scss";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Video Streaming App</title>
      </head>
      <body>
        <main className='container'>{children}</main>
      </body>
    </html>
  );
}
