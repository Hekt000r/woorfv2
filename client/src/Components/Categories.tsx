import axios from "axios";
import { useEffect, useState, useRef } from "react";

interface Category { name: string; }
interface Program {
  _id: string;
  name: string;
  displayName: string;
  photoURL: string;
  downloadLinks: Record<string, string>;
  author: string;
  category: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, progRes] = await Promise.all([
          axios.get<Category[]>("http://localhost:5174/api/categories"),
          axios.get<Program[]>("http://localhost:5174/api/programs"),
        ]);
        setCategories(catRes.data);
        setPrograms(progRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  const programsByCategory = categories.reduce<Record<string, Program[]>>((acc, category) => {
    acc[category.name] = programs.filter((p) => p.category === category.name);
    return acc;
  }, {} as Record<string, Program[]>);

  return (
    <div className="p-6">
      <div className="shadow-2xl w-full p-6 rounded-xl">
        <h1 className="text-2xl font-semibold mb-4">Programs by Category</h1>
        {categories.map((category) => (
          <div key={category.name} className="mb-8">
            <h2 className="mt-2 font-semibold text-3xl mb-4">{category.name}</h2>
            <div
              className="flex gap-4 overflow-x-hidden"
            >
              {programsByCategory[category.name]?.length ? (
                programsByCategory[category.name].map((program) => (
                  <div
                    key={program._id}
                    className="flex-shrink-0 border max-w-46 hover:bg-base-300 rounded-2xl flex flex-col items-center cursor-pointer p-4 shadow hover:shadow-lg transition"
                    style={{ width: '12rem' }}
                  >
                    <img
                      src={program.photoURL}
                      alt={program.displayName}
                      className="w-24 h-24 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-medium mb-1 text-center break-words">
                      {program.displayName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">By {program.author}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {Object.entries(program.downloadLinks).map(([label, url]) => (
                        <a
                          key={label}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-sm"
                        >
                          {label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No programs in this category.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
