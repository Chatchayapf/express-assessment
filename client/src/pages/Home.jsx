import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/products";

export default function Home() {
  // ค่าเริ่มต้นเป็น Home - User Section เพื่อให้ตารางโชว์ทันทีตั้งแต่เปิดหน้าเว็บ
  const [header, setHeader] = useState("안녕 NCTzen");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State สำหรับคำค้นหา
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postProduct, setPostProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [editId, setEditId] = useState(null);

  // ค้นหาแบบเรียลไทม์โดยส่ง Query string (?name=...) ไปที่ Backend
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(searchTerm);
    }, 250); // debounce 250ms

    return () => clearTimeout(timer);
  }, [searchTerm]);

  async function fetchProducts(search = "") {
    setLoading(true);
    setError(null);
    try {
      const url = search.trim()
        ? `${API_URL}?name=${encodeURIComponent(search.trim())}`
        : API_URL;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch albums (Status: ${response.status})`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Cannot connect to server");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitProduct(e) {
    e.preventDefault();
    try {
      const payload = {
        name: postProduct.name.trim(),
        price: Number(postProduct.price),
        quantity: Number(postProduct.quantity),
      };

      const url = editId ? `${API_URL}/${editId}` : API_URL;
      const method = editId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`❌ Error: ${errorData.error || response.statusText}`);
        return;
      }

      alert(editId ? "💚 อัปเดตข้อมูลสำเร็จ (Updated!)" : "💚 เพิ่มอัลบั้มสำเร็จ (Added!)");
      setEditId(null);
      setPostProduct({ name: "", price: "", quantity: "" });
      fetchProducts(searchTerm);
    } catch (err) {
      console.error(err);
      alert("❌ ไม่สามารถเชื่อมต่อกับ Server ได้ กรุณาตรวจสอบว่า Backend รันอยู่หรือไม่");
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setPostProduct((item) => ({
      ...item,
      [name]: value,
    }));
  }

  function handleEdit(item) {
    setEditId(item.id);
    setPostProduct({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    });
    window.scrollTo({ top: 180, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditId(null);
    setPostProduct({ name: "", price: "", quantity: "" });
  }

  async function deleteProduct(id) {
    const confirmDelete = window.confirm("ต้องการลบอัลบั้มนี้ออกจากระบบใช่หรือไม่?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      alert("🗑️ ลบอัลบั้มเรียบร้อย");
      fetchProducts(searchTerm);
    } catch (err) {
      console.error(err);
      alert("❌ เกิดข้อผิดพลาดในการลบ");
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-8 py-6">
      {/* NCT 127 Hero Banner */}
      <div className="text-center flex flex-col items-center gap-3">
        <div className="inline-flex items-center gap-2 bg-[#A6FF00]/10 border border-[#A6FF00]/40 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(166,255,0,0.25)]">
          <span className="w-2 h-2 rounded-full bg-[#A6FF00] animate-ping"></span>
          <span className="text-[#A6FF00] font-mono text-xs tracking-widest uppercase font-bold">
            NEO CULTURE TECHNOLOGY • SEOUL 127
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-[0_0_20px_rgba(166,255,0,0.3)]">
          TO THE WORLD, <span className="text-[#A6FF00]">여긴 NCT!</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base tracking-wide max-w-xl">
          Generation Thailand x NCT 127 Album & Merch Management Database
        </p>

        {/* Current Mode Badge */}
        <div className="mt-1 text-xs font-mono font-semibold tracking-wider text-gray-400 bg-[#121722] border border-gray-800 px-3 py-1 rounded-md">
          STATUS: <span className="text-[#A6FF00]">{header}</span>
        </div>
      </div>

      {/* Navigation Mode Buttons */}
      <div className="flex flex-wrap justify-center gap-6">
        <button
          type="button"
          onClick={() => setHeader("NCTzen")}
          className={`px-6 py-2.5 rounded-xl font-bold tracking-wider transition-all duration-300 cursor-pointer ${
            header.includes("User")
              ? "bg-[#A6FF00] text-black shadow-[0_0_20px_rgba(166,255,0,0.5)] scale-105"
              : "bg-[#111622] text-gray-300 border border-gray-800 hover:border-[#A6FF00]/50 hover:text-white"
          }`}
        >
          👤 USER
        </button>

        <button
          type="button"
          onClick={() => setHeader("Admin")}
          className={`px-6 py-2.5 rounded-xl font-bold tracking-wider transition-all duration-300 cursor-pointer ${
            header.includes("Admin")
              ? "bg-[#A6FF00] text-black shadow-[0_0_20px_rgba(166,255,0,0.5)] scale-105"
              : "bg-[#111622] text-gray-300 border border-gray-800 hover:border-[#A6FF00]/50 hover:text-white"
          }`}
        >
          ⚡ ADMIN
        </button>
      </div>

      {/* Create / Edit Form (Admin Mode Only) */}
      {header.toLowerCase().includes("admin") && (
        <div className="w-full max-w-4xl bg-[#101522]/90 border border-[#A6FF00]/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.7)] backdrop-blur-md">
          <div className="flex items-center justify-between mb-5 border-b border-gray-800 pb-3">
            <h2 className="text-xl font-black tracking-wide text-white flex items-center gap-2">
              <span className="text-[#A6FF00]">⚡</span>
              {editId ? "EDIT ALBUM DETAILS" : "RELEASE NEW ALBUM"}
            </h2>
            {editId && (
              <span className="text-xs font-mono bg-[#A6FF00]/20 text-[#A6FF00] px-2.5 py-0.5 rounded border border-[#A6FF00]/30">
                EDITING ID: {editId}
              </span>
            )}
          </div>

          <form className="flex flex-col sm:flex-row gap-3 items-center" onSubmit={handleSubmitProduct}>
            <input
              type="text"
              placeholder="Album Title (e.g. WALK)"
              value={postProduct.name}
              name="name"
              onChange={handleInputChange}
              required
              className="w-full sm:flex-1 bg-[#090C13] border border-gray-700 text-white placeholder-gray-500 focus:border-[#A6FF00] focus:ring-1 focus:ring-[#A6FF00] rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
            />
            <input
              type="number"
              placeholder="Price (฿)"
              value={postProduct.price}
              name="price"
              onChange={handleInputChange}
              required
              className="w-full sm:w-28 bg-[#090C13] border border-gray-700 text-white placeholder-gray-500 focus:border-[#A6FF00] focus:ring-1 focus:ring-[#A6FF00] rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
            />
            <input
              type="number"
              placeholder="Qty"
              value={postProduct.quantity}
              name="quantity"
              onChange={handleInputChange}
              required
              className="w-full sm:w-24 bg-[#090C13] border border-gray-700 text-white placeholder-gray-500 focus:border-[#A6FF00] focus:ring-1 focus:ring-[#A6FF00] rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
            />

            <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <button
                className="flex-1 sm:flex-none bg-[#A6FF00] hover:bg-[#b8ff33] text-black font-black px-6 py-2.5 rounded-xl cursor-pointer shadow-[0_0_15px_rgba(166,255,0,0.4)] transition-all"
                type="submit"
              >
                {editId ? "UPDATE" : "SAVE"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
                  onClick={handleCancelEdit}
                >
                  CANCEL
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* 🔍 แทบค้นหา Search Bar (NCT 127 Cyber Theme) */}
      <div className="w-full max-w-4xl bg-[#101522]/90 border border-[#A6FF00]/30 rounded-2xl p-4 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search album title (e.g. WALK, Fact Check)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#090C13] border border-gray-700 text-white placeholder-gray-500 focus:border-[#A6FF00] focus:ring-1 focus:ring-[#A6FF00] rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs bg-gray-800 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
          <span>RESULTS:</span>
          <span className="text-[#A6FF00] bg-[#A6FF00]/10 border border-[#A6FF00]/30 px-3 py-1 rounded-full font-bold">
            {products.length} ALBUMS
          </span>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex items-center gap-3 bg-[#111622] border border-[#A6FF00]/30 px-6 py-3.5 rounded-xl shadow-[0_0_20px_rgba(166,255,0,0.15)]">
          <div className="w-4 h-4 border-2 border-[#A6FF00] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[#A6FF00] font-mono text-xs font-bold tracking-widest">
            FILTERING NEO DATABASE...
          </span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-950/40 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl max-w-lg text-center shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <p className="font-bold text-red-400">⚠️ CONNECTION ERROR</p>
          <p className="text-xs text-red-300 mt-1">{error}</p>
          <button
            type="button"
            onClick={() => fetchProducts(searchTerm)}
            className="mt-3 px-4 py-1.5 bg-red-900/60 hover:bg-red-800 text-white rounded-lg text-xs font-mono font-bold cursor-pointer transition-colors"
          >
            RETRY CONNECTION
          </button>
        </div>
      )}

      {/* ตารางข้อมูลสินค้า (โชว์ตลอดเวลา) */}
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-[#A6FF00]/25 shadow-[0_0_30px_rgba(0,0,0,0.6)] bg-[#0C1018]">
        <div className="bg-[#121824] px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <h3 className="font-black text-sm tracking-widest text-[#A6FF00] flex items-center gap-2">
            <span>💿</span> NCT 127 OFFICIAL DISCOGRAPHY
          </h3>
          <span className="text-xs font-mono text-gray-400 bg-black/40 px-2.5 py-1 rounded border border-gray-800">
            {header.includes("Admin") ? "⚡ ADMIN VIEW (EDITABLE)" : "👁️ USER VIEW (READ-ONLY)"}
          </span>
        </div>

        <table className="w-full table-fixed text-left text-sm">
          <thead className="bg-[#151D2C] text-[#A6FF00] font-mono text-xs tracking-wider uppercase border-b border-gray-800">
            <tr>
              <th className="p-4 w-1/2">ALBUM TITLE</th>
              <th className="p-4 text-center">PRICE</th>
              <th className="p-4 text-center">STOCK</th>
              {header.toLowerCase().includes("admin") && (
                <th className="p-4 text-center">ACTION</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 font-medium">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={header.toLowerCase().includes("admin") ? 4 : 3}
                  className="text-center py-12 text-gray-500 font-mono"
                >
                  {searchTerm ? `NO ALBUMS MATCHING "${searchTerm}"` : "NO ALBUMS FOUND IN DATABASE"}
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#151D2C]/60 transition-colors group"
                >
                  <td className="p-4 font-bold text-white flex items-center gap-3">
                    <span className="text-base text-[#A6FF00]/70 group-hover:text-[#A6FF00] transition-colors">
                      ♪
                    </span>
                    <span className="truncate">{item.name}</span>
                  </td>
                  <td className="p-4 text-center text-[#A6FF00] font-mono font-bold">
                    ฿{Number(item.price).toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <span className="bg-[#1E2638] text-gray-300 border border-gray-700 px-3 py-1 rounded-full text-xs font-mono">
                      {item.quantity} pcs
                    </span>
                  </td>
                  {header.toLowerCase().includes("admin") && (
                    <td className="p-4 text-center">
                      <div className="flex justify-center items-center gap-4">
                        <button
                          type="button"
                          className="text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer transition-colors text-xs font-mono tracking-wider hover:underline"
                          onClick={() => handleEdit(item)}
                        >
                          [EDIT]
                        </button>
                        <button
                          type="button"
                          className="text-rose-500 hover:text-rose-400 font-bold cursor-pointer transition-colors text-xs font-mono tracking-wider hover:underline"
                          onClick={() => deleteProduct(item.id)}
                        >
                          [DELETE]
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}