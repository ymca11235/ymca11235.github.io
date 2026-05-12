import React, { useRef, useEffect } from 'react';
import HeroBackground from './components/HeroBackground';
import { tutors } from './data/tutors';

const App = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollContainerRef.current) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="relative h-[100dvh] md:h-screen w-full overflow-hidden bg-[#F9F6F0] text-[#3E2B23] font-serif flex flex-col justify-between items-center px-4 py-2 md:p-6 box-border">

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 背景動畫 */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <HeroBackground />
      </div>

      {/* 📱 手機版專屬：右上角聯絡按鈕 */}
      <div className="absolute top-4 right-4 z-50 flex flex-row gap-2 md:hidden">
        <a href="https://www.facebook.com/share/1B8JNbbRiV/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-[#3E2B23] text-[#F9F6F0] text-[9px] font-bold tracking-[0.2em] text-center shadow-sm whitespace-nowrap">
          揚名創思粉絲團
        </a>
        <a href="https://line.me/ti/p/5LzAgsgfsb" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 border border-[#8C6A4F] text-[#8C6A4F] text-[9px] font-bold tracking-[0.2em] text-center shadow-sm bg-[#F9F6F0]/80 backdrop-blur-sm whitespace-nowrap">
          LINE 官方聯繫
        </a>
      </div>

      {/* 上方：品牌與濃縮版標語 */}
      <div className="relative z-10 text-center mt-16 md:mt-10 shrink-0">
        <h1 className="text-xl md:text-4xl tracking-[0.3em] font-black mb-2 md:mb-4 text-[#3E2B23]">
          揚名創思專業個別指導
        </h1>
        <h2 className="text-xs md:text-3xl font-bold tracking-[0.1em] md:tracking-widest leading-relaxed md:leading-tight text-[#6B574B]">
          因材施教，從精準媒合開始。<br />
          <span className="text-[9px] md:text-lg text-[#8C6A4F] font-medium block mt-1 md:mt-3 tracking-[0.2em]">
            尋找契合的思維啟發者，重塑學習本質。
          </span>
        </h2>
      </div>

      {/* 中間：彈性壓縮區塊 */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-8 items-center justify-start flex-1 min-h-0 my-2 md:my-auto px-1 md:px-4">

        {/* 師資區塊 */}
        <div 
          ref={scrollContainerRef}
          className="md:col-span-2 flex overflow-x-auto snap-x snap-mandatory gap-3 pb-1 w-full hide-scrollbar items-stretch scroll-smooth cursor-ew-resize flex-1 min-h-0"
        >
          {tutors.map(tutor => (
            <div 
              key={tutor.id} 
              className="w-[260px] md:min-w-[320px] shrink-0 snap-center flex flex-col items-center justify-start p-4 md:p-8 bg-white/70 md:bg-white/60 backdrop-blur-md border border-[#E3DCD2] shadow-sm hover:shadow-md transition overflow-y-auto hide-scrollbar mx-auto md:mx-0"
            >
              <div className="border border-[#8C6A4F] rounded-md px-4 py-1.5 md:px-6 md:py-2 mb-2 md:mb-6 bg-[#FDFBF7] shadow-sm shrink-0">
                <h4 className="text-lg md:text-3xl font-bold tracking-[0.2em] text-[#3E2B23]">{tutor.name}</h4>
              </div>
              
              <p className="text-[11px] md:text-base text-[#8C6A4F] font-bold tracking-widest mb-2 md:mb-5 shrink-0">
                {tutor.subject}
              </p>
              
              <div className="w-full h-px bg-[#D4C8BE] mb-2 md:mb-6 shrink-0"></div>
              
              <div className="flex flex-col gap-1.5 md:gap-3 w-full text-left px-1 pb-1">
                {tutor.background?.map((item, index) => (
                  <p key={index} className="text-[10px] md:text-base text-[#6B574B] font-medium tracking-wide leading-relaxed flex items-start">
                    <span className="text-[#8C6A4F] mr-2 opacity-70 mt-[3px] md:mt-1 text-[8px] md:text-sm">◆</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 影片與聯絡區塊 (縮小 gap-8 為 gap-4) */}
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4 text-center bg-white/70 md:bg-white/60 backdrop-blur-md border border-[#E3DCD2] p-2.5 md:p-8 shadow-sm w-[220px] md:w-full shrink-0 mx-auto rounded-sm">
          <div className="w-full">
            <h3 className="text-[9px] md:text-base tracking-[0.3em] mb-1.5 md:mb-4 font-bold text-[#8C6A4F]">教學影片</h3>
            <div className="aspect-video w-full bg-[#E3DCD2] p-1">
              <iframe 
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                src="https://www.youtube.com/embed/TgEVkcxnSU8?si=cwHQ3JeJBERRRjh6" 
                title="揚名創思YT頻道"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* 💻 電腦版專屬：影片下方按鈕與 QR Code 區塊 (縮小 mt-2 為 mt-1) */}
          <div className="hidden md:flex w-full flex-col gap-3 mt-1">
            <a href="https://www.facebook.com/share/1B8JNbbRiV/" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-[#3E2B23] text-[#F9F6F0] text-sm md:text-lg font-bold tracking-[0.3em] hover:bg-[#8C6A4F] transition-colors">
              揚名創思粉絲團
            </a>
            
            {/* 🌟 LINE QR Code 放大版 */}
            <div className="w-full border-2 border-[#8C6A4F] flex items-center justify-center gap-5 p-2 bg-[#FDFBF7]/80 hover:bg-white transition-colors">
              {/* 圖片改為 w-20 h-20 並加上白底 */}
              <img src="/line-qr.png" alt="LINE QR Code" className="w-20 h-20 object-contain shadow-sm border border-[#E3DCD2] bg-white p-1" />
              <div className="flex flex-col text-left">
                {/* 文字稍微跟著放大一點點以平衡比例 */}
                <span className="text-[#3E2B23] text-sm md:text-lg font-bold tracking-[0.2em]">LINE 官方聯繫</span>
                <span className="text-[#8C6A4F] text-[10px] md:text-base tracking-widest mt-1">請使用手機掃描加入</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 下方：頁尾 */}
      <footer className="relative z-10 text-[9px] md:text-xs tracking-[0.4em] text-[#A39182] mb-1 md:mb-6 uppercase font-sans shrink-0">
        © 2025 創思文教機構. All rights reserved.
      </footer>

    </div>
  );
};

export default App;