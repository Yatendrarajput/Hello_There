function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="card max-w-2xl w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            EventMeet 🎉
          </h1>
          <p className="text-gray-600 mb-6">
            Vite + React (JavaScript) + Tailwind CSS v3
          </p>
          
          <div className="space-y-4">
            <button className="btn-primary w-full">
              Primary Button
            </button>
            
            <button className="btn-secondary w-full">
              Secondary Button
            </button>
            
            <button className="btn-ghost w-full">
              Ghost Button
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              ✅ Setup Complete!
            </p>
            <p className="text-green-600 text-sm mt-1">
              React JavaScript + Tailwind v3 is working perfectly
            </p>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="avatar avatar-sm">
              <div className="avatar-initials">U</div>
            </div>
            <div className="avatar avatar-md">
              <div className="avatar-initials">U</div>
            </div>
            <div className="avatar avatar-lg">
              <div className="avatar-initials">U</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App