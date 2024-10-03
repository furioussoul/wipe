export const MobileMessage = () => {
  return (
    <section className="h-screen w-screen bg-gray-900 py-12 sm:py-16 lg:py-20 xl:hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <img
            src="https://fldwljgzcktqnysdkxnn.supabase.co/storage/v1/object/public/chaibuilder-blob-storage/175ac8d8-37fe-4707-bb4a-3c0cd6a6db75/gVH7O-Ir_400x400.png"
            alt="Chai Builder"
            className="mx-auto w-14 rounded-full"
          />
          <br />
          <h2 className="text-4xl font-bold text-white">Screen too small</h2>
          <p className="mt-6 text-sm font-medium leading-6 text-white text-opacity-70">
            Please view this page on greater than 1280px screen width.
          </p>
        </div>
      </div>
    </section>
  );
};
