import "../styles/globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>SHRM HR Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Manage your HR operations efficiently" />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
