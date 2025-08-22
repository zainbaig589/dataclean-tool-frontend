import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://datacleaning-tool-2.onrender.com", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setPreview(data.preview);
    setLoading(false);
  };

  const handleExport = async () => {
    const res = await fetch("https://datacleaning-tool-2.onrender.com");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaned_data.csv";
    a.click();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">CleanDataNow</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        {loading ? "Cleaning..." : "Upload & Clean"}
      </button>

      {preview && (
        <div className="mt-4 w-full max-w-4xl bg-white p-4 shadow rounded">
          <h2 className="text-xl mb-2">Preview</h2>
          <table className="table-auto border-collapse border border-gray-400 w-full">
            <thead>
              <tr>
                {Object.keys(preview[0]).map((col) => (
                  <th key={col} className="border px-2 py-1">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.slice(0, 10).map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="border px-2 py-1">{String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleExport}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Export Cleaned Data
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
