export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className="container mx-auto justify-center items-center min-h-screen py-6">
      <div className="mx-auto">{children}</div>
    </main>
  )
}
