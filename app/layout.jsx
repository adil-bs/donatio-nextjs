import '/styles/globals.css'

export const metadata = {
  title: 'Donatio',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" bg-[url('/homeImage.jpg')] bg-cover bg-fixed bg-center">
        {children}
      </body>
    </html>
  )
}
