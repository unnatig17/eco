const Municipality =() =>{
  
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-emerald-700 mb-6">Municipality Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Dump Location Card */}
        <div className="rounded-xl bg-white shadow p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Dump Location</h2>
          <p className="text-gray-600">Manage or view dump locations in your municipality.</p>
        </div>
        {/* Waste Collection Card */}
        <div className="rounded-xl bg-white shadow p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Waste Collection</h2>
          <p className="text-gray-600">Track and add waste collection records.</p>
        </div>
        {/* Map Card */}
        <div className="rounded-xl bg-white shadow p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Map</h2>
          <p className="text-gray-600">View area and dump site locations on the map.</p>
        </div>
        {/* Reports Card */}
        <div className="rounded-xl bg-white shadow p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Reports</h2>
          <p className="text-gray-600">View collection stats, summaries and reports.</p>
        </div>
      </div>
    </div>
  );
}
export default Municipality;