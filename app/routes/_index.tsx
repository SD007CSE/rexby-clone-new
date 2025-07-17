import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Index() {
  const [Map, setMap] = useState<React.FC | null>(null);
  // For fixed Get Access button
  const heroAccessBtnRef = useRef<HTMLButtonElement>(null);
  const [showFixedAccess, setShowFixedAccess] = useState(false);
  // Interactive Map interactivity state
  const [mapInteractive, setMapInteractive] = useState(false);

  useEffect(() => {
    // Only import on client
    import("../components/InteractiveMap").then((mod) => setMap(() => mod.default));
    // Scroll listener for fixed Get Access button
    const handleScroll = () => {
      if (!heroAccessBtnRef.current) return;
      const rect = heroAccessBtnRef.current.getBoundingClientRect();
      // If the button is out of view (below the viewport), show fixed button
      setShowFixedAccess(rect.bottom < 0 || rect.top > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const locations = [
    { position: [60.3913, 5.3221], name: 'Bergen', description: 'A beautiful city surrounded by mountains and fjords.' },
    { position: [68.2093, 14.2294], name: 'Lofoten', description: 'Stunning islands above the Arctic Circle.' },
    { position: [59.9139, 10.7522], name: 'Oslo', description: 'The capital of Norway, known for its museums and green spaces.' },
  ];
  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center px-2 sm:px-4 pt-8 sm:pt-12 pb-24 bg-[#fafbfc]">
      {/* Hero Card Section */}
      <div className="w-full max-w-7xl mx-auto px-0 pt-0">
        <div className="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-14 md:max-w-6xl mx-auto">
          {/* Left: Image */}
          <div className="w-full md:w-[480px] flex-shrink-0 flex justify-center md:justify-start">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Norway" className="w-full h-[220px] sm:h-[320px] md:w-[480px] md:h-[500px] object-cover sm:rounded-2xl" />
          </div>
          {/* Right: Content */}
          <div className="w-full md:flex-1 mt-6 md:mt-0 md:ml-14 text-left px-4 sm:px-8 md:px-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 md:mb-6 text-[#23233c] text-left">Norway Guide</h1>
            {/* Guide Info Row - Desktop */}
            <div className="hidden sm:flex items-center gap-4 mb-4">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Ása Steinars" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow" />
              <span className="text-lg text-[#23233c]">Guide by <span className="font-semibold">Ása Steinars</span></span>
              <span className="text-lg text-[#23233c]">Norway</span>
              <span className="flex items-center gap-1 text-base font-semibold text-[#23233c] bg-[#f3f4f6] px-2 py-1 rounded">
                <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20' className='w-4 h-4 text-yellow-400'><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z' /></svg>
                New
              </span>
            </div>
            {/* Description */}
            {(() => {
              const fullDesc = `Norway is my second home. I was born in Norway and I lived there until I was 7 years old. I often come back and I love this country almost as much as Iceland. Last summer I spent 3 months on the road with my van exploring everything from the south tip up to Lofoten.\n\nThis guide is my best tips for Norway to make sure you get the most out of your trip. It's focused around the fjords in the west and Lofoten in the north. In my opinion, it's the best areas to explore in Norway.`;
              const shortDesc = `Norway is my second home. I was born in Norway and I lived there until I was 7 years old. I often come back and I love this country almost as much as Iceland. Last summer I spent 3 months on the road with my van exploring everything from the south tip up to Lofoten.`;
              const [showMoreMobile, setShowMoreMobile] = useState(false);
              // Only show 'more' link and toggle on mobile
              useEffect(() => {
                const handleResize = () => {
                  if (window.innerWidth >= 640) setShowMoreMobile(true);
                  else setShowMoreMobile(false);
                };
                if (typeof window !== 'undefined') {
                  handleResize();
                  window.addEventListener('resize', handleResize);
                  return () => window.removeEventListener('resize', handleResize);
                }
              }, []);
              return (
                <div className="text-[#23233c] text-sm sm:text-base leading-relaxed mb-6 md:mb-8 text-left">
                  {showMoreMobile || typeof window === 'undefined' || (typeof window !== 'undefined' && window.innerWidth >= 640) ? (
                    <>
                      {fullDesc.split('\n').map((p, i) => <p key={i} className="mb-2 last:mb-0">{p}</p>)}
                      {/* Less link for mobile, left-aligned, new line */}
                      <span
                        className="block sm:hidden mt-2 text-[#bfc2d9] underline cursor-pointer text-left"
                        onClick={() => setShowMoreMobile(false)}
                      >
                        less
                      </span>
                    </>
                  ) : (
                    <>
                      {shortDesc}
                      <span
                        className="text-[#bfc2d9] underline cursor-pointer block sm:hidden ml-1"
                        onClick={() => setShowMoreMobile(true)}
                      >
                        more
                      </span>
                    </>
                  )}
                </div>
              );
            })()}
            {/* Mobile: Guide Info Row at bottom */}
            <div className="flex sm:hidden items-center mt-6 mb-6 justify-between w-full">
              <div className="flex flex-col">
                <span className="text-base text-[#23233c]">Guide by <span className="font-semibold">Ása Steinars</span></span>
                <span className="text-xs text-[#23233c]">Made in English</span>

              </div>
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Ása Steinars" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow ml-auto" />
            </div>
            {/* Buttons */}
            <div className="flex flex-row">
              <div className="flex  sm:flex-row gap-3 sm:gap-4 mb-0 max-w-xl w-full">
                <div className="flex-1 flex flex-col items-center">
                  <button className="w-full py-2 sm:py-2 px-0 sm:px-8 rounded-xl border border-[#23233c] text-[#23233c] font-bold text-base bg-white transition text-center focus:outline-none">Preview</button>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <button ref={heroAccessBtnRef} className="w-full px-0 sm:px-20 py-[0.75rem] rounded-xl bg-gradient-to-r from-[#1791b8] to-[#1ec9e0] text-white font-bold text-base transition text-center whitespace-nowrap flex items-center justify-center gap-2">
                    Get Access
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#fff" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                  <div className="text-[#bfc2d9] text-smf sm:text-base mt-2 text-center">Used for <span className="font-bold text-[#818589]"> 100+</span> trips</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Travel Planner Section */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8 md:gap-12 mt-8 pt-8 md:pt-12 border-t border-[#e4e6f2] mb-16 md:mb-24">
        {/* Left Side */}
        <div className="flex-1 min-w-[0] md:min-w-[280px] w-full">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-[#23233c]">Your Personal Travel Planner</h2>
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-2xl font-bold text-[#23233c] mb-1 sm:mb-2">Ask me Anything</h3>
            <p className="text-sm sm:text-base text-[#bfc2d9] mb-2 sm:mb-4 max-w-md">Rexby is trained on Ása Steinars local knowledge, enabling it to answer questions just like Ása Steinars, but faster</p>
            <a href="#" className="font-bold underline text-[#23233c]">Preview</a>
          </div>
        </div>
        {/* Right Side - Chat Card */}
        <div className="flex-1 max-w-xl w-full">
          <div className="bg-white rounded-xl border border-[#e4e6f2] shadow p-4 sm:p-8 flex flex-col gap-4">
            <div className="flex items-center gap-4 mb-2">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="AI" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover" />
              <div>
                <div className="font-bold text-base sm:text-lg text-[#23233c]">Ása Steinars</div>
                <div className="text-[#bfc2d9] text-xs sm:text-sm">Digital version</div>
              </div>
            </div>
            <div className="text-[#23233c] text-xs sm:text-sm mb-2 sm:mb-4">Hi there, I am Ása Steinars AI. I have been trained to answer travel questions just like Ása Steinars would do in person, but faster.</div>
            <div className="border-t border-[#e4e6f2] pt-2 sm:pt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#f3f4f6] rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#bfc2d9" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0v10.5A2.25 2.25 0 0113.5 21h-3a2.25 2.25 0 01-2.25-2.25V9m7.5 0H6.75" />
                  </svg>
                </span>
                <span className="font-bold text-[#23233c] text-xs sm:text-base">What is the best season to visit?</span>
              </div>
              <div className="text-[#bfc2d9] mb-2 sm:mb-4 text-xs sm:text-base">Thinking...</div>
              <div className="relative">
                <input type="text" disabled placeholder="Message..." className="w-full rounded-full border border-[#e4e6f2] px-4 sm:px-5 py-2 sm:py-3 pr-10 sm:pr-14 text-[#23233c] bg-[#fafbfc] focus:outline-none text-xs sm:text-base" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#23233c] rounded-full p-2 shadow-md" disabled>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#fff" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5l7.5-7.5m0 0l-7.5-7.5m7.5 7.5H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="w-full max-w-6xl mx-auto mt-8 mb-16 md:mb-24">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-[#23233c]">Interactive Map</h2>
        <p className="text-base sm:text-lg text-[#bfc2d9] mb-4 sm:mb-6">Get an Interactive, playful and visually appealing map that helps you navigate the noise</p>
        <div
          className="relative rounded-3xl overflow-hidden border border-[#e4e6f2] shadow-lg cursor-pointer flex items-center justify-center bg-[#e6f7fb] hover:bg-[#d0f0fa] transition"
          style={{ height: '320px', maxHeight: '480px' }}
          onClick={() => window.location.href = '/map'}
        >
          <img
            src="/map-preview.png"
            alt="Map preview"
            className="object-cover w-full h-full"
            style={{ display: 'block' }}
          />
        </div>
      </div>

      {/* Build Itinerary Section */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8 md:gap-12 mt-8 mb-16 md:mb-24">
        {/* Left Side */}
        <div className="flex-1 min-w-[0] md:min-w-[280px] w-full">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 sm:mb-4 text-[#23233c]">Build Itinerary with my Spots</h2>
          <p className="text-sm sm:text-base text-[#bfc2d9] mb-2 sm:mb-4 max-w-md">Start with a pre-made itinerary as a template, or build your own from scratch by using all the listed things to do and adding your own</p>
          <a href="#" className="font-bold underline text-[#23233c]">Preview</a>
        </div>
        {/* Right Side - Itinerary Card */}
        <div className="flex-1 max-w-full md:max-w-3xl w-full">
          <div className="bg-white rounded-xl border border-[#e4e6f2] shadow p-3 sm:p-8 flex flex-col gap-4 sm:w-max">
            {/* Days Header */}
            <div className="flex flex-row overflow-x-auto flex-nowrap gap-2 sm:gap-4 mb-4 pb-2 hide-scrollbar">
              <div className="flex-1 min-w-[120px] text-[#bfc2d9] font-semibold bg-[#f3f4f6] rounded-xl px-4 py-2 text-center">Tue 11 apr</div>
              <div className="flex-1 min-w-[120px] text-[#bfc2d9] font-semibold bg-[#f3f4f6] rounded-xl px-4 py-2 text-center">Wed 12 apr</div>
              <div className="flex-1 min-w-[120px] text-[#bfc2d9] font-semibold bg-[#f3f4f6] rounded-xl px-4 py-2 text-center">Thu 13 apr</div>
              <button className="min-w-[48px] bg-[#f3f4f6] rounded-xl px-4 py-2 text-[#bfc2d9] font-bold text-xl">+</button>
            </div>
            {/* Activities Grid - Mobile: stack, Desktop: grid */}
            <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-4">
              {/* Col 1 - Day 1 */}
              <div className="flex flex-col gap-2 sm:gap-4 w-full">
                <div className="flex items-center bg-[#f3f4f6] rounded-xl px-3 py-2 gap-2 relative w-max">
                  <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=40&q=80" alt="Hot Spring" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="font-semibold text-[#23233c]">Hot Spring</span>
                  <div className="ml-auto relative">
                    <button className="p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-6 h-6"><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" /></svg></button>
                    {/* Dropdown menu (static for demo) */}
                  </div>
                </div>
                <div className="flex items-center bg-[#f3f4f6] rounded-xl px-3 py-2 gap-2 w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  <span className="text-[#bfc2d9]">Text</span>
                  <button className="ml-auto p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-6 h-6"><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" /></svg></button>
                </div>
                <div className="flex items-center bg-[#f3f4f6] rounded-xl px-3 py-2 gap-2 w-full">
                  <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=40&q=80" alt="Photospot" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="font-semibold text-[#23233c]">Photospot</span>
                  <button className="ml-auto p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-6 h-6"><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" /></svg></button>
                </div>
                {/* Add menu */}
                <div className="mt-2 w-full">
                  <button className="flex items-center gap-2 text-[#23233c] font-semibold w-full justify-start"><span className="text-xl">+</span> Add</button>
                  <div className="mt-2 bg-white border border-[#e4e6f2] rounded-xl shadow p-3 w-full max-w-xs">
                    <div className="flex items-center gap-2 py-1 cursor-pointer hover:bg-[#f3f4f6] rounded px-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-5 h-5"><circle cx="12" cy="12" r="10" /></svg> Thing to do</div>
                    <div className="flex items-center gap-2 py-1 cursor-pointer hover:bg-[#f3f4f6] rounded px-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg> Text</div>
                    <div className="flex items-center gap-2 py-1 cursor-pointer hover:bg-[#f3f4f6] rounded px-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg> New pin</div>
                  </div>
                </div>
              </div>
              {/* Col 2 - Day 2 */}
              <div className="flex flex-col gap-2 sm:gap-4 w-full">
                <div className="flex items-center bg-[#f3f4f6] rounded-xl px-3 py-2 gap-2 w-full">
                  <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=40&q=80" alt="Hike" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="font-semibold text-[#23233c]">Hike</span>
                  <button className="ml-auto p-1 relative group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-6 h-6"><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" /></svg>
                    {/* Dropdown menu: bottom right */}
                    <div className="hidden group-hover:block absolute right-0 bottom-0 mt-2 bg-white border border-[#e4e6f2] rounded-xl shadow p-4 w-64 z-10 flex flex-col gap-3">
                      <div className="flex items-center gap-3 py-1 cursor-pointer hover:bg-[#f7f8fa] rounded px-2">
                        <span className="w-6 h-6 flex items-center justify-center text-[#bfc2d9]">➕</span>
                        <span className="text-[#23233c] text-base">Add option</span>
                      </div>
                      <div className="flex items-center gap-3 py-1 cursor-pointer hover:bg-[#f7f8fa] rounded px-2">
                        <span className="w-6 h-6 flex items-center justify-center text-[#bfc2d9]">❓</span>
                        <span className="text-[#23233c] text-base">Make optional</span>
                      </div>
                      <div className="flex items-center gap-3 py-1 cursor-pointer hover:bg-[#f7f8fa] rounded px-2">
                        <span className="w-6 h-6 flex items-center justify-center text-[#bfc2d9]">👁️</span>
                        <span className="text-[#23233c] text-base">More info</span>
                      </div>
                      <div className="flex items-center gap-3 py-1 cursor-pointer hover:bg-[#f7f8fa] rounded px-2">
                        <span className="w-6 h-6 flex items-center justify-center text-[#bfc2d9]">🗑️</span>
                        <span className="text-[#23233c] text-base">Remove</span>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="flex items-center bg-[#f3f4f6] rounded-xl px-3 py-2 gap-2 w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  <span className="text-[#bfc2d9]">Text</span>
                  <button className="ml-auto p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-6 h-6"><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" /></svg></button>
                </div>
                <div className="flex items-center bg-[#f3f4f6] rounded-xl px-3 py-2 gap-2 w-full">
                  <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=40&q=80" alt="Sightseeing" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="font-semibold text-[#23233c]">Sightseeing</span>
                  <button className="ml-auto p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-6 h-6"><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" /></svg></button>
                </div>
              </div>
              {/* Col 3 - Day 3 */}
              <div className="flex flex-col gap-2 sm:gap-4 w-full">
                <div className="flex items-center bg-[#f3f4f6] rounded-xl px-3 py-2 gap-2 w-full">
                  <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=40&q=80" alt="Waterfall" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="font-semibold text-[#23233c]">Waterfall</span>
                  <button className="ml-auto p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-6 h-6"><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" /></svg></button>
                </div>
                <div className="flex items-center bg-[#f3f4f6] rounded-xl px-3 py-2 gap-2 w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  <span className="text-[#bfc2d9]">Text</span>
                  <button className="ml-auto p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-6 h-6"><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" /></svg></button>
                </div>
                <div className="flex items-center bg-[#f3f4f6] rounded-xl px-3 py-2 gap-2 w-full">
                  <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=40&q=80" alt="Stay" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="font-semibold text-[#23233c]">Stay</span>
                  <button className="ml-auto p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-6 h-6"><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" /></svg></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Access My Local Secrets Section */}
      <div className="w-full max-w-6xl mx-auto mt-8 pt-8 border-t border-[#e4e6f2] mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Left: Heading and description */}
          <div className="max-w-full md:max-w-[320px] flex-shrink-0">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-8 text-[#23233c]">Access My Local Secrets</h2>
            <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 text-[#23233c]">161 things to do</h3>
            <p className="text-[#bfc2d9] mb-2 sm:mb-4 text-sm sm:text-base leading-relaxed">Get a curated list of all the best things to do with exact location, detailed info and inspiring content</p>
            <a href="#" className="font-bold underline text-[#23233c] text-base sm:text-lg">Preview</a>
          </div>
          {/* Right: Cards with arrows */}
          {(() => {
            const scrollRef = React.useRef<HTMLDivElement>(null);
            const [atStart, setAtStart] = React.useState(true);
            const [atEnd, setAtEnd] = React.useState(false);
            const scrollBy = 220; // px, matches min-w of card

            const updateScrollButtons = () => {
              const el = scrollRef.current;
              if (!el) return;
              setAtStart(el.scrollLeft <= 0);
              setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 30);
            };

            React.useEffect(() => {
              updateScrollButtons();
              const el = scrollRef.current;
              if (!el) return;
              el.addEventListener('scroll', updateScrollButtons);
              window.addEventListener('resize', updateScrollButtons);
              return () => {
                el.removeEventListener('scroll', updateScrollButtons);
                window.removeEventListener('resize', updateScrollButtons);
              };
            }, []);

            const scrollLeft = () => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: -scrollBy, behavior: 'smooth' });
              }
            };
            const scrollRight = () => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: scrollBy, behavior: 'smooth' });
              }
            };

            return (
              <div className="relative max-w-full overflow-x-hidden">
                {/* Left Arrow */}
                {!atStart && (
                  <button
                    className="hidden sm:flex absolute left-0 top-[47.5%] -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-3 border border-[#e4e6f2] hover:bg-[#f4f4fb] transition"
                    onClick={scrollLeft}
                    aria-label="Scroll left"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#23233c"
                      className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                {/* Cards Row */}
                <div
                  ref={scrollRef}
                  className="flex flex-row overflow-x-auto flex-nowrap gap-x-6 sm:gap-8 max-w-full hide-scrollbar pr-12"
                  onScroll={updateScrollButtons}
                >
                  {/* Card 1 */}
                  <div className="min-w-[200px] sm:min-w-[260px] sm:w-[320px] overflow-hidden flex flex-col mb-4 sm:mb-0">
                    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Spot 1" className="h-[220px] sm:h-[400px] sm:w-full object-cover rounded-3xl" onLoad={updateScrollButtons} />
                    <div className="flex items-center gap-2 px-4 pt-4 text-[#bfc2d9] text-sm sm:text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg> Sightseeing
                    </div>
                    <div className="px-4 pb-4 sm:pb-6 pt-1 font-extrabold text-[#23233c] text-base">One of my favourite spots</div>
                  </div>
                  {/* Card 2 */}
                  <div className="min-w-[200px] sm:min-w-[260px] sm:w-[320px] overflow-hidden flex flex-col mb-4 sm:mb-0">
                    <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" alt="Spot 2" className="h-[220px] sm:h-[400px] w-full object-cover rounded-3xl" onLoad={updateScrollButtons} />
                    <div className="flex items-center gap-2 px-4 pt-4 text-[#bfc2d9] text-sm sm:text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg> Sightseeing
                    </div>
                    <div className="px-4 pb-4 sm:pb-6 pt-1 font-extrabold text-[#23233c] text-base sm:text-base">Swing with amazing views</div>
                  </div>
                  {/* Card 3 */}
                  <div className="min-w-[200px] sm:min-w-[260px] sm:w-[320px] overflow-hidden flex flex-col">
                    <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80" alt="Spot 3" className="h-[220px] sm:h-[400px] w-full object-cover rounded-3xl" onLoad={updateScrollButtons} />
                    <div className="flex items-center gap-2 px-4 pt-4 text-[#bfc2d9] text-sm sm:text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg> Hike
                    </div>
                    <div className="px-4 pb-4 sm:pb-6 pt-1 font-extrabold text-[#23233c] text-base sm:text-base">Beautiful view point</div>
                  </div>
                  {/* Card 4 */}
                  <div className="min-w-[200px] sm:min-w-[260px] sm:w-[320px] overflow-hidden flex flex-col mb-4 sm:mb-0">
                    <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80" alt="Spot 4" className="h-[220px] sm:h-[400px] w-full object-cover rounded-3xl" onLoad={updateScrollButtons} />
                    <div className="flex items-center gap-2 px-4 pt-4 text-[#bfc2d9] text-sm sm:text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg> Waterfall
                    </div>
                    <div className="px-4 pb-4 sm:pb-6 pt-1 font-extrabold text-[#23233c] text-base sm:text-base">Hidden Waterfall</div>
                  </div>
                  {/* Card 5 */}
                  <div className="min-w-[200px] sm:min-w-[260px] sm:w-[320px] overflow-hidden flex flex-col mb-4 sm:mb-0">
                    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" alt="Spot 5" className="h-[220px] sm:h-[400px] w-full object-cover rounded-3xl" onLoad={updateScrollButtons} />
                    <div className="flex items-center gap-2 px-4 pt-4 text-[#bfc2d9] text-sm sm:text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg> Beach
                    </div>
                    <div className="px-4 pb-4 sm:pb-6 pt-1 font-extrabold text-[#23233c] text-base sm:text-base">Secluded Beach</div>
                  </div>
                  <div className="min-w-[200px] sm:min-w-[260px] sm:w-[320px] overflow-hidden flex flex-col mb-4 sm:mb-0">
                    <div className="relative h-[220px] sm:h-[400px] w-full border rounded-lg">
                      <div className="absolute inset-0 flex items-center justify-center px-6 py-5">
                        <div className="text-black text-sm font-medium">Preview</div>
                      </div>
                    </div>
                  </div>
                  {/* Card 6 */}
                  {/* <div className="min-w-[200px] sm:min-w-[260px] sm:w-[320px] overflow-hidden flex flex-col">
                    <img src="https://images.unsplash.com/photo-1519817650390-64a93db511ed?auto=format&fit=crop&w=600&q=80" alt="Spot 6" className="h-[220px] sm:h-[400px] w-full object-cover rounded-3xl" />
                    <div className="flex items-center gap-2 px-4 pt-4 text-[#bfc2d9] text-sm sm:text-base">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg> Lake
                    </div>
                    <div className="px-4 pb-4 sm:pb-6 pt-1 font-extrabold text-[#23233c] text-lg sm:text-xl">Crystal Lake</div>
                  </div> */}
                </div>
                {/* Right Arrow */}
                {!atEnd && (
                  <button
                    className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-3 border border-[#e4e6f2] hover:bg-[#f4f4fb] transition"
                    onClick={scrollRight}
                    aria-label="Scroll right"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#23233c"
                      className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })()}
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Left: Heading and description */}
          <div className="max-w-full md:max-w-[320px] flex-shrink-0">
            <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 text-[#23233c]">1 itinerary</h3>
            <p className="text-[#bfc2d9] mb-2 sm:mb-4 text-sm sm:text-base leading-relaxed">Get expertly curated itineraries that help you organise all the 'things to do' in an ideal time order</p>
            <a href="#" className="font-bold underline text-[#23233c] text-base sm:text-lg">Preview</a>
          </div>
          {/* Right: Cards with arrows */}
          {(() => {
            const scrollRef = React.useRef<HTMLDivElement>(null);
            const [atStart, setAtStart] = React.useState(true);
            const [atEnd, setAtEnd] = React.useState(false);
            const scrollBy = 220; // px, matches min-w of card

            const updateScrollButtons = () => {
              const el = scrollRef.current;
              if (!el) return;
              setAtStart(el.scrollLeft <= 0);
              setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 30);
            };

            React.useEffect(() => {
              updateScrollButtons();
              const el = scrollRef.current;
              if (!el) return;
              el.addEventListener('scroll', updateScrollButtons);
              window.addEventListener('resize', updateScrollButtons);
              return () => {
                el.removeEventListener('scroll', updateScrollButtons);
                window.removeEventListener('resize', updateScrollButtons);
              };
            }, []);

            const scrollLeft = () => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: -scrollBy, behavior: 'smooth' });
              }
            };
            const scrollRight = () => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: scrollBy, behavior: 'smooth' });
              }
            };

            return (
              <div className="relative max-w-full overflow-x-hidden">
                {/* Left Arrow */}
                {!atStart && (
                  <button
                    className="hidden sm:flex absolute left-0 top-[47.5%] -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-3 border border-[#e4e6f2] hover:bg-[#f4f4fb] transition"
                    onClick={scrollLeft}
                    aria-label="Scroll left"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#23233c"
                      className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                {/* Cards Row */}
                <div
                  ref={scrollRef}
                  className="flex flex-row overflow-x-auto flex-nowrap gap-x-6 sm:gap-8 max-w-full hide-scrollbar pr-12"
                  onScroll={updateScrollButtons}
                >
                  {/* Card 1 */}
                  <div className="min-w-[200px] sm:min-w-[260px] sm:w-[320px] overflow-hidden flex flex-col mb-4 sm:mb-0">
                    <div className="relative h-[220px] sm:h-[400px] w-full">
                      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Spot 1" className="object-cover w-full h-full rounded-3xl" onLoad={updateScrollButtons} />
                      <div className="absolute bottom-0 left-0 w-full  to-transparent px-6 py-5">
                        <div className="text-white text-lg font-semibold mb-1">Day 8</div>
                        <div className="text-white text-2xl font-extrabold">Lofoten Road Trip</div>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-[200px] sm:min-w-[260px] sm:w-[320px] overflow-hidden flex flex-col mb-4 sm:mb-0">
                    <div className="relative h-[220px] sm:h-[400px] w-full border rounded-lg">
                      <div className="absolute inset-0 flex items-center justify-center px-6 py-5">
                        <div className="text-black text-sm font-medium">Preview</div>
                      </div>
                    </div>
                  </div>

                  {/* Card 6 */}
                  {/* <div className="min-w-[200px] sm:min-w-[260px] sm:w-[320px] overflow-hidden flex flex-col">
                    <img src="https://images.unsplash.com/photo-1519817650390-64a93db511ed?auto=format&fit=crop&w=600&q=80" alt="Spot 6" className="h-[220px] sm:h-[400px] w-full object-cover rounded-3xl" />
                    <div className="flex items-center gap-2 px-4 pt-4 text-[#bfc2d9] text-sm sm:text-base">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg> Sightseeing
                    </div>
                    <div className="px-4 pb-4 sm:pb-6 pt-1 font-extrabold text-[#23233c] text-base">One of my favourite spots</div>
                  </div> */}
                </div>
                {/* Right Arrow */}
                {!atEnd && (
                  <button
                    className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-3 border border-[#e4e6f2] hover:bg-[#f4f4fb] transition"
                    onClick={scrollRight}
                    aria-label="Scroll right"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#23233c"
                      className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Guide Profile & Recommendations Section */}
      <div className="w-full max-w-6xl mx-auto mt-8 pt-8 border-t border-[#e4e6f2]">
        {/* Mobile Guide Profile (sm:hidden) */}
        <div className="sm:hidden w-full bg-white rounded-2xl border border-[#e4e6f2] shadow p-4 flex flex-col mb-6">
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="font-bold text-lg text-[#23233c]">Guide by Ása Steinars</div>
              <div className="text-[#bfc2d9] text-xs mb-1">Joined in April 2022</div>
            </div>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Ása Steinars" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow ml-2" />
          </div>
          <div className="flex flex-row gap-2 mb-2">
            <a href="#" className="text-[#23233c] bg-[#f3f4f6] rounded p-1 border border-[#e4e6f2]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#23233c" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg></a>
            <a href="#" className="text-[#23233c] bg-[#f3f4f6] rounded p-1 border border-[#e4e6f2]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#23233c" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></svg></a>
            <a href="#" className="text-[#23233c] bg-[#f3f4f6] rounded p-1 border border-[#e4e6f2]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#23233c" className="w-5 h-5"><path d="M9 17a4 4 0 104 4v-7a4 4 0 00-4 4z" /><path d="M15 3v4a4 4 0 004 4h2" /></svg></a>
            <a href="#" className="text-[#23233c] bg-[#f3f4f6] rounded p-1 border border-[#e4e6f2]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#23233c" className="w-5 h-5"><rect x="3" y="7" width="18" height="10" rx="3" /><path d="M10 9l5 3-5 3V9z" /></svg></a>
          </div>
          {/* Description with more/less toggle */}
          {(() => {
            const fullDesc = `Ása Steinars is an adventure photographer and videographer from Iceland. Growing up in the north, surrounded by extreme landscapes and forever changing weather has given her a tight bond to nature and its forces. This you can clearly see in her photography. She works as a full time content creator, helping people to travel Iceland like she does. She has a total following of almost 2 million across her social media platforms.`;
            const shortDesc = `Ása Steinars is an adventure photographer and videographer from Iceland. Growing up in the north, surrounded by extreme landscapes and forever changing weather has given her a tight bond to nature and its forces. This you can clearly see in her photography. She works as a full time content creator, helping people to travel Iceland like she does.`;
            const [showMore, setShowMore] = React.useState(false);
            return (
              <div className="text-[#23233c] text-sm leading-relaxed mb-4">
                {showMore ? (
                  <>
                    {fullDesc}
                    <span className="text-[#bfc2d9] underline cursor-pointer ml-1" onClick={() => setShowMore(false)}>less</span>
                  </>
                ) : (
                  <>
                    {shortDesc}
                    <span className="text-[#bfc2d9] underline cursor-pointer ml-1" onClick={() => setShowMore(true)}>more</span>
                  </>
                )}
              </div>
            );
          })()}
          <button className="w-full border border-[#23233c] text-[#23233c] font-semibold rounded-lg py-1 mb-3 text-sm">Message</button>
          <button className="w-full border border-[#23233c] text-[#23233c] font-semibold rounded-lg py-1 text-sm">Storefront</button>
        </div>
        {/* Desktop/Tablet Guide Profile (hidden on mobile) */}
        <div className="hidden sm:flex flex-col md:flex-row gap-8 mb-12 md:mb-16">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-[#e4e6f2] shadow p-6 sm:p-8 flex flex-col items-center min-w-0 md:min-w-[280px] max-w-xs w-full mb-6 md:mb-0">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Ása Steinars" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-4" />
            <div className="font-bold text-lg sm:text-xl text-[#23233c] mb-1">Ása Steinars</div>
            <div className="text-[#bfc2d9] text-xs sm:text-sm mb-4">Travel Business</div>
            <div className="flex gap-3 mb-4">
              <a href="#" className="hover:text-[#1da1f2]">{/* Instagram */}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#23233c" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></svg></a>
              <a href="#" className="hover:text-[#1da1f2]">{/* TikTok */}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#23233c" className="w-5 h-5"><path d="M9 17a4 4 0 104 4v-7a4 4 0 00-4 4z" /><path d="M15 3v4a4 4 0 004 4h2" /></svg></a>
              <a href="#" className="hover:text-[#1da1f2]">{/* Globe */}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#23233c" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg></a>
              <a href="#" className="hover:text-[#1da1f2]">{/* YouTube */}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#23233c" className="w-5 h-5"><rect x="3" y="7" width="18" height="10" rx="3" /><path d="M10 9l5 3-5 3V9z" /></svg></a>
            </div>
            <div className="flex gap-2 mb-4 sm:mb-6">
              <span className="bg-[#f3f4f6] text-[#23233c] rounded-full px-3 py-1 text-xs font-semibold">Iceland</span>
              <span className="bg-[#f3f4f6] text-[#23233c] rounded-full px-3 py-1 text-xs font-semibold">Norway</span>
            </div>
            <button className="w-full bg-[#23233c] text-white font-semibold rounded-xl py-2 mt-auto">Storefront</button>
          </div>
          {/* Guide Description */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="font-bold text-xl sm:text-2xl text-[#23233c] mb-1">Guide by Ása Steinars</div>
            <div className="text-[#bfc2d9] text-xs sm:text-sm mb-2 sm:mb-4">Joined in April 2022</div>
            <div className="text-[#23233c] text-sm sm:text-base mb-4 sm:mb-6">Ása Steinars is an adventure photographer and videographer from Iceland. Growing up in the north, surrounded by extreme landscapes and forever changing weather has given her a tight bond to nature and its forces. This you can clearly see in her photography. She works as a full time content creator, helping people to travel Iceland like she does. She has a total following of almost 2 million across her social media platforms.</div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button className="px-4 sm:px-6 py-2 rounded-xl border-2 border-[#23233c] text-[#23233c] font-semibold bg-white hover:bg-gray-100 transition">Message</button>
              <button className="px-4 sm:px-6 py-2 rounded-xl bg-[#23233c] text-white font-semibold hover:bg-[#1a1a2e] transition">Storefront</button>
            </div>
          </div>
        </div>
        {/* You may also like */}
        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-[#23233c]">You may also like</h3>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-2">
            {/* Card 1 */}
            <div className="min-w-[180px] sm:min-w-[220px] bg-white rounded-2xl shadow border border-[#e4e6f2] overflow-hidden flex flex-col">
              <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" alt="Iceland Guide" className="h-32 sm:h-48 w-full object-cover" />
              <div className="px-4 pt-2 sm:pt-3 text-[#23233c] font-semibold text-sm sm:text-base">Iceland Guide</div>
              <div className="px-4 pb-2 sm:pb-4 text-[#bfc2d9] text-xs sm:text-sm">Iceland · by asasteinars</div>
            </div>
            {/* Card 2 */}
            <div className="min-w-[180px] sm:min-w-[220px] bg-white rounded-2xl shadow border border-[#e4e6f2] overflow-hidden flex flex-col">
              <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Explore Lithuania" className="h-32 sm:h-48 w-full object-cover" />
              <div className="px-4 pt-2 sm:pt-3 text-[#23233c] font-semibold text-sm sm:text-base">Explore Lithuania</div>
              <div className="px-4 pb-2 sm:pb-4 text-[#bfc2d9] text-xs sm:text-sm">Lithuania · by laumeieva</div>
            </div>
            {/* Card 3 */}
            <div className="min-w-[180px] sm:min-w-[220px] bg-white rounded-2xl shadow border border-[#e4e6f2] overflow-hidden flex flex-col">
              <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" alt="Ultimate Guide to New Zealand" className="h-32 sm:h-48 w-full object-cover" />
              <div className="px-4 pt-2 sm:pt-3 text-[#23233c] font-semibold text-sm sm:text-base">Ultimate Guide to New Zealand</div>
              <div className="px-4 pb-2 sm:pb-4 text-[#bfc2d9] text-xs sm:text-sm">New Zealand · by rachtsewartz</div>
            </div>
            {/* Card 4 */}
            <div className="min-w-[180px] sm:min-w-[220px] bg-white rounded-2xl shadow border border-[#e4e6f2] overflow-hidden flex flex-col">
              <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80" alt="Exploring Ireland's Hidden Gems" className="h-32 sm:h-48 w-full object-cover" />
              <div className="px-4 pt-2 sm:pt-3 text-[#23233c] font-semibold text-sm sm:text-base">Exploring Ireland's Hidden Gems</div>
              <div className="px-4 pb-2 sm:pb-4 text-[#bfc2d9] text-xs sm:text-sm">Ireland · by furstonetravels</div>
            </div>
            {/* Right arrow button */}
            <button className="self-center ml-2 bg-white border border-[#e4e6f2] rounded-full p-2 shadow hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#bfc2d9" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      {/** Interactive FAQ Accordion **/}
      <div className="w-full max-w-6xl mx-auto mt-8 pt-8 border-t border-[#e4e6f2] pb-16 sm:pb-24">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Left: Heading */}
          <div className="min-w-0 md:min-w-[260px] flex items-start justify-start md:justify-end mb-4 md:mb-0">
            <h2 className="text-xl sm:text-2xl font-bold text-[#23233c]">Your questions,<br />answered</h2>
          </div>
          {/* Right: FAQ List */}
          <div className="flex-1 flex flex-col gap-2">
            {/** FAQ Accordion Implementation **/}
            {(() => {
              const faqs = [
                {
                  question: "How do I access the Guide and Map?",
                  answer: "You can sign in using your email address, Facebook, or Google account. The guide page, including the map, is accessible through your mobile or computer browser. Additionally, offline access is available via the Rexby app!"
                },
                {
                  question: "Do I need internet connection?",
                  answer: "When you download the Rexby app and purchase my guide, you can access it offline. If you're using a web browser, an internet connection is required."
                },
                {
                  question: "How long will I have access?",
                  answer: "Once you buy access, it is forever."
                },
                {
                  question: "Can I share it with my travel buddy?",
                  answer: "Yes, you can invite one travel buddy."
                }
              ];
              const [openIndex, setOpenIndex] = React.useState(-1);
              return faqs.map((faq, i) => (
                <div key={i} className="border-b border-[#e4e6f2]">
                  <button
                    className="w-full flex items-center justify-between py-4 sm:py-5 px-1 sm:px-2 hover:bg-[#f3f4f6] cursor-pointer focus:outline-none"
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    aria-expanded={openIndex === i}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="text-[#23233c] text-sm sm:text-base text-left">{faq.question}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="#23233c"
                      className={`w-6 h-6 transform transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === i && (
                    <div
                      id={`faq-answer-${i}`}
                      className="px-1 sm:px-2 pb-4 sm:pb-5 text-[#bfc2d9] text-sm animate-fadeIn"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
      {/* Fixed Get Access Button (all screens) */}
      {showFixedAccess && (
        <div className="sm:hidden fixed left-0 right-0 bottom-16 flex justify-center z-50 pointer-events-none">
          <button
            className="pointer-events-auto w-[95vw] max-w-xl mx-auto py-3 rounded-2xl bg-gradient-to-r from-[#1791b8] to-[#1ec9e0] text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg z-50"
          >
            Get Access
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#fff" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}

      {showFixedAccess && (
        <div className="hidden sm:fixed sm:left-0 sm:right-0 sm:top-0 sm:flex sm:justify-center sm:z-50 sm:pointer-events-none">
          <header className="bg-[#FFFFFF] w-full relative top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
              {/* Left: Link */}
              <div className="hidden xl:block">
                <a
                  href="#"
                  className="underline font-bold text-[#23233c] hover:text-[#1791b8] transition"
                >
                  Unclear? Ask me a question
                </a>
              </div>
              {/* Center: Preview & Get Access Buttons */}
              <div className="flex items-center gap-4">
                <button
                  className="border border-[#23233c] text-[#23233c] font-bold rounded-xl px-8 py-2 bg-white hover:bg-[#f3f4f6] transition"
                  type="button"
                >
                  Preview
                </button>
                <button
                  className="px-8 py-2 rounded-xl bg-gradient-to-r from-[#1791b8] to-[#1ec9e0] text-white font-bold transition flex items-center justify-center gap-2"
                >
                  Get Access
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#fff" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {/* Existing: Log in, Globe, Menu */}

              </div>
            </div>
          </header>
        </div>
      )}

      {/* Bottom Navigation - Mobile Only */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t border-[#e4e6f2] flex justify-between px-2 py-1 z-50">
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Rexby Icon */}
          <svg className="w-7 h-7 mb-0.5" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#1791b8" /><path d="M16 8a8 8 0 100 16 8 8 0 000-16zm0 2.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" fill="#fff" /></svg>
          <span className="text-xs text-[#23233c] font-medium">Rexby</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Explore Icon */}
          <svg className="w-7 h-7 mb-0.5" fill="none" stroke="#23233c" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#23233c" strokeWidth="1.5" /><path d="M12 8v4l3 2" stroke="#23233c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="text-xs text-[#23233c] font-medium">Explore</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Purchases Icon */}
          <svg className="w-7 h-7 mb-0.5" fill="none" stroke="#23233c" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 7V6a6 6 0 1112 0v1" stroke="#23233c" strokeWidth="1.5" /><rect x="4" y="7" width="16" height="13" rx="2" stroke="#23233c" strokeWidth="1.5" /></svg>
          <span className="text-xs text-[#23233c] font-medium">Purchases</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Messages Icon */}
          <svg className="w-7 h-7 mb-0.5" fill="none" stroke="#23233c" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#23233c" strokeWidth="1.5" /></svg>
          <span className="text-xs text-[#23233c] font-medium">Messages</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Log in Icon */}
          <svg className="w-7 h-7 mb-0.5" fill="none" stroke="#23233c" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#23233c" strokeWidth="1.5" /><path d="M4 20v-1a7 7 0 0114 0v1" stroke="#23233c" strokeWidth="1.5" /></svg>
          <span className="text-xs text-[#23233c] font-medium">Log in</span>
        </div>
      </div>
    </div>
  );
}
