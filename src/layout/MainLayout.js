import Header from '@components/Header';

export default function MainLayout({ children }) {
  return (
    <>
      <div className="min-h-full">
        <Header />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6">{children}</div>
        </main>
      </div>
    </>
  );
}
