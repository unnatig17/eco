import Card from "./card";

function Home() {
  return (
    <div className="home">
      {/* Header */}
      <header className="bg-emerald-600/95 backdrop-blur text-white sticky top-0 z-10 shadow">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold tracking-wide">EcoTrack</div>
          <nav className="hidden sm:flex gap-4 text-emerald-50/90 text-sm">
            <a href="#" className="hover:text-white">Docs</a>
            <a href="#" className="hover:text-white">Support</a>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
        <section className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-slate-600">
            Quick access to areas, dumps, collections, and more.
          </p>
        </section>

        
        <section className="card-grid">
  <Card icon="🏙️" to="./municipality" title="Municipalities" desc="Manage areas and dump locations."/>
  <Card icon="🚛" to="./user" title="Collections" desc="Log daily waste collections." />
  <Card icon="👨‍🌾" to="/farmer" title="Farmers" desc="Farmer directory and contacts." />
  <Card icon="🏭" to="/facility" title="Facilities" desc="Processing facilities overview." />
  <Card icon="📊" to="/reports" title="Reports" desc="Trends and summaries." />
  <Card icon="⚙️" to="/settings" title="Settings" desc="Configure users and roles." />
</section>


      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-slate-500">
        Made with <span className="text-emerald-600">♥</span> for cleaner cities
      </footer>
    </div>
  );
}

export default Home;