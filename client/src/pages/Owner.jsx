export default function Owner() {
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <div className="bg-[#101522]/90 border border-[#A6FF00]/30 rounded-2xl p-8 max-w-lg w-full flex flex-col items-center text-center shadow-[0_0_30px_rgba(0,0,0,0.7)] backdrop-blur-md">
        <div className="inline-flex items-center gap-2 bg-[#A6FF00]/10 border border-[#A6FF00]/30 px-3 py-1 rounded-full mb-4">
          <span className="text-[#A6FF00] font-mono text-xs tracking-widest uppercase font-bold">
            NEO CREATOR • JSD13
          </span>
        </div>

        <h2 className="text-2xl font-black text-white tracking-wide">
          10 Paifon (ปายฝน) - JSD13
        </h2>

        <div className="relative my-6 group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#A6FF00] to-emerald-500 opacity-50 blur-sm group-hover:opacity-100 transition duration-500"></div>
          <img
            className="relative w-56 h-56 rounded-2xl object-cover border border-[#A6FF00]/40 shadow-xl"
            alt="Jane Doe"
            src="https://bokksu.com/cdn/shop/articles/pp1_ca04f54f-efc2-45c6-9063-5bbc0246b0e6.png?v=1773945848"
          />
        </div>

        <div className="w-full bg-[#090C13] border border-gray-800 rounded-xl p-4 text-left">
          <span className="text-xs font-mono font-bold text-[#A6FF00] uppercase tracking-wider block mb-2">
            // SHORT BIOGRAPHY:
          </span>
          <p className="text-gray-300 text-sm leading-relaxed">
            Hey! nice to meet you naka 👋
          </p>
          <p className="text-gray-500 text-xs mt-2 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus veniam accusantium rerum cum neque numquam a exercitationem distinctio. Quam accusamus similique ea quas fuga mollitia totam veniam inventore quia tenetur.
          </p>
        </div>
      </div>
    </div>
  );
}
