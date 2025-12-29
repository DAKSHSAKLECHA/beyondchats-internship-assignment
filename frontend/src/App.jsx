import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState({});

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/api/articles")
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          BeyondChats Blog Articles
        </h1>
        <p className="text-gray-600 mt-2">
          Original vs AI-Enhanced Content Comparison
        </p>
      </header>

      {/* Articles */}
      <div className="max-w-6xl mx-auto space-y-8">
        {articles.map(article => (
          <div
            key={article._id}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
          >
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {article.title}
            </h2>

            {/* Tabs */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() =>
                  setActiveTab({ ...activeTab, [article._id]: "original" })
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition
                  ${
                    activeTab[article._id] !== "updated"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                Original Article
              </button>

              <button
                onClick={() =>
                  setActiveTab({ ...activeTab, [article._id]: "updated" })
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition
                  ${
                    activeTab[article._id] === "updated"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                AI-Enhanced Article
              </button>
            </div>

            {/* Content */}
            <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {activeTab[article._id] === "updated"
                ? article.updatedContent || "AI-updated version not available yet."
                : article.content}
            </div>

            {/* References */}
            {article.references && article.references.length > 0 && (
              <div className="mt-8 border-t pt-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                  References
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {article.references.map((ref, i) => (
                    <li key={i}>
                      <a
                        href={ref}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {ref}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-12">
        Built with MERN Stack • BeyondChats Internship Assignment
      </footer>
    </div>
  );
}

export default App;
