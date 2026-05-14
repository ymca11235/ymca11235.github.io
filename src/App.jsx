import React, { useRef, useEffect, useState } from 'react';
import HeroBackground from './components/HeroBackground';
import { tutors } from './data/tutors';

const App = () => {
  const scrollContainerRef = useRef(null);
  const testimonialRef = useRef(null);
  const modalScrollRef = useRef(null);
  
  const [isHovered, setIsHovered] = useState(false);
  
  // 🌟 放大燈箱 (Lightbox) 的狀態管理 🌟
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  // 師資卡片手動滑動功能
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
    return () => { if (container) container.removeEventListener('wheel', handleWheel); };
  }, []);

  // 師資卡片絲滑自動輪動
  useEffect(() => {
    let animationId;
    const container = scrollContainerRef.current;
    let exactScrollLeft = container ? container.scrollLeft : 0;
    const scroll = () => {
      if (container && !isHovered) {
        exactScrollLeft += 0.5;
        if (exactScrollLeft >= container.scrollWidth / 2) exactScrollLeft -= container.scrollWidth / 2;
        container.scrollLeft = exactScrollLeft;
      } else if (container && isHovered) {
        exactScrollLeft = container.scrollLeft;
      }
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  // 家長感謝區自動輪動 (背景區)
  useEffect(() => {
    let animationId;
    const container = testimonialRef.current;
    let exactScrollLeft = container ? container.scrollLeft : 0;
    const scroll = () => {
      if (container && !isModalOpen) {
        exactScrollLeft += 0.4;
        if (exactScrollLeft >= container.scrollWidth / 2) exactScrollLeft -= container.scrollWidth / 2;
        container.scrollLeft = exactScrollLeft;
      } else if (container && isModalOpen) {
        exactScrollLeft = container.scrollLeft;
      }
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isModalOpen]);

  const displayTutors = [...tutors, ...tutors];
  
  const testimonials = [
    '/thanks-1.jpg', 
    '/thanks-2.jpg', 
    '/thanks-3.jpg'
  ];
  const displayTestimonials = [...testimonials, ...testimonials];

  const openModal = (index) => {
    setSelectedImgIndex(index % testimonials.length);
    setIsModalOpen(true);
    setTimeout(() => {
      if(modalScrollRef.current) {
        modalScrollRef.current.scrollLeft = (index % testimonials.length) * modalScrollRef.current.clientWidth;
      }
    }, 10);
  };

  const nextModalImage = (e) => {
    e.stopPropagation();
    if (!modalScrollRef.current) return;
    const nextIndex = (selectedImgIndex + 1) % testimonials.length;
    setSelectedImgIndex(nextIndex);
    modalScrollRef.current.scrollTo({ left: nextIndex * modalScrollRef.current.clientWidth, behavior: 'smooth' });
  };

  const prevModalImage = (e) => {
    e.stopPropagation();
    if (!modalScrollRef.current) return;
    const prevIndex = selectedImgIndex === 0 ? testimonials.length - 1 : selectedImgIndex - 1;
    setSelectedImgIndex(prevIndex);
    modalScrollRef.current.scrollTo({ left: prevIndex * modalScrollRef.current.clientWidth, behavior: 'smooth' });
  };

  const handleModalScroll = () => {
    if (!modalScrollRef.current) return;
    const index = Math.round(modalScrollRef.current.scrollLeft / modalScrollRef.current.clientWidth);
    setSelectedImgIndex(index);
  };

  return (
    <div className="relative min-h-[100dvh] md:h-screen w-full overflow-x-hidden overflow-y-auto md:overflow-hidden bg-[#F9F6F0] text-[#3E2B23] font-serif flex flex-col justify-between items-center px-4 pt-3 pb-2 md:py-3 box-border">

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 背景動畫 */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <HeroBackground />
      </div>

      {/* 1. 頂部標題區 */}
      <div className="relative z-10 text-center mt-1 md:mt-2 shrink-0 px-1 w-full max-w-4xl">
        <h1 className="text-[22px] md:text-4xl tracking-[0.15em] md:tracking-[0.25em] font-black mb-1 md:mb-2 text-[#3E2B23] leading-snug">
          揚名創思 一對一家教
        </h1>
        <h2 className="text-[13px] md:text-2xl font-bold tracking-widest md:tracking-[0.15em] leading-relaxed md:leading-tight text-[#6B574B]">
          高雄地區 國小/國中/高中到府/線上 免費諮詢<br />
          <span className="text-[10px] md:text-lg text-[#8C6A4F] font-bold block mt-1 md:mt-2 tracking-[0.2em]">
            因材施教 
            <span className="mx-1.5 md:mx-3 text-[#A39182] font-light font-sans scale-110 inline-block">×</span> 
            精準媒合 
            <span className="mx-1.5 md:mx-3 text-[#A39182] font-light font-sans scale-110 inline-block">×</span> 
            建立學習自信
          </span>
        </h2>
      </div>

      {/* 2. 中間：師資卡片區 */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center justify-start flex-1 min-h-0 my-2 md:my-3 px-1 md:px-4">
        <div 
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="flex overflow-x-auto gap-3 pb-1 w-full hide-scrollbar items-stretch cursor-ew-resize flex-1 min-h-0"
        >
          {displayTutors.map((tutor, index) => (
            <div key={`${tutor.id}-${index}`} className="w-[260px] md:min-w-[280px] shrink-0 flex flex-col items-center justify-start p-4 md:p-5 bg-white/70 md:bg-white/60 backdrop-blur-md border border-[#E3DCD2] shadow-sm hover:shadow-md transition overflow-y-auto hide-scrollbar mx-auto md:mx-0">
              <div className="border border-[#8C6A4F] rounded-md px-4 py-1.5 md:px-5 md:py-1.5 mb-2 md:mb-3 bg-[#FDFBF7] shadow-sm">
                <h4 className="text-lg md:text-2xl font-bold tracking-[0.15em] text-[#3E2B23] whitespace-nowrap">{tutor.name}</h4>
              </div>
              <p className="text-[11px] md:text-sm text-[#8C6A4F] font-bold tracking-widest mb-2 md:mb-3">{tutor.subject}</p>
              <div className="w-full h-px bg-[#D4C8BE] mb-2 md:mb-3"></div>
              <div className="flex flex-col gap-1.5 md:gap-2 w-full text-left px-1">
                {tutor.background?.map((item, i) => (
                  <p key={i} className="text-[10px] md:text-[13px] text-[#6B574B] font-medium tracking-wide leading-relaxed flex items-start">
                    <span className="text-[#8C6A4F] mr-2 opacity-70 mt-[3px] md:mt-1">◆</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================= */}
      {/* 3. 【手機版專屬】置中排列的聯絡樞紐 */}
      {/* ========================================= */}
      <div className="relative z-10 flex md:hidden justify-center items-center gap-3.5 my-1.5 shrink-0 w-full px-2">
        <a href="https://www.instagram.com/ymca11235?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 active:scale-90">
          <img src="/ig-icon.png" alt="Instagram" className="w-full h-full object-contain rounded-[9px]" />
        </a>
        <a href="https://www.youtube.com/@YMCALabTutor" target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 active:scale-90">
          <img src="/yt-icon.png" alt="YouTube" className="w-full h-full object-contain rounded-[9px]" />
        </a>
        <a href="https://line.me/ti/p/5LzAgsgfsb" target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 active:scale-90">
          <img src="/line-icon.png" alt="LINE" className="w-full h-full object-contain rounded-[9px]" />
        </a>
        <a href="https://www.facebook.com/share/1B8JNbbRiV/" target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 active:scale-90">
          <img src="/fb-icon.png" alt="FB" className="w-full h-full object-contain rounded-[9px]" />
        </a>
        <a href="tel:0900206910" className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 active:scale-90">
          <img src="/phone-icon.jpg" alt="Phone" className="w-full h-full object-contain rounded-[9px]" onError={(e) => { e.target.onerror = null; e.target.src = "/phone-icon.png"; }} />
        </a>
      </div>

      {/* ========================================= */}
      {/* 4. 底部：影片與家長感謝區 */}
      {/* ========================================= */}
      <div className="relative z-10 w-full flex flex-col md:flex-row gap-3 md:gap-5 items-center justify-center shrink-0 mb-2 md:mb-3">
        <div className="hidden md:flex w-[320px] lg:w-[360px] flex-col items-center bg-white/60 backdrop-blur-md border border-[#E3DCD2] p-2 shadow-sm rounded-sm shrink-0">
          <h3 className="text-[10px] md:text-xs tracking-[0.3em] mb-1.5 font-bold text-[#8C6A4F]">教學影片</h3>
          <div className="aspect-video w-full bg-[#E3DCD2] p-1">
            <iframe className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500" src="https://www.youtube.com/embed/TgEVkcxnSU8?si=cwHQ3JeJBERRRjh6" title="教學影片" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>

        <div className="flex w-full md:w-[320px] lg:w-[360px] flex-col items-center bg-white/70 md:bg-white/60 backdrop-blur-md border border-[#E3DCD2] p-2 shadow-sm rounded-sm overflow-hidden">
          <h3 className="text-[10px] md:text-xs tracking-[0.3em] mb-1.5 font-bold text-[#8C6A4F]">家長好評感謝區</h3>
          <div ref={testimonialRef} className="flex overflow-x-auto gap-2.5 w-full hide-scrollbar items-start px-1.5 pb-1">
             {displayTestimonials.map((img, i) => (
               <div 
                 key={i} 
                 onClick={() => openModal(i)} 
                 className="h-28 md:h-40 aspect-[3/4] w-auto shrink-0 rounded-md border border-[#E3DCD2] bg-[#FDFBF7] shadow-sm overflow-hidden relative flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity group"
               >
                 <img src={img} alt="感謝截圖" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                 <span className="hidden text-[10px] text-[#A39182] tracking-widest text-center px-2">照片準備中</span>
                 <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6 md:w-8 md:h-8">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                   </svg>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      <footer className="relative z-10 text-[9px] md:text-xs tracking-[0.4em] text-[#A39182] uppercase font-sans shrink-0">
        © 2025 創思文教機構. All rights reserved.
      </footer>

      {/* ========================================= */}
      {/* 🚀 【電腦版專屬】右下角懸浮聯絡列 (淨透無框版) 🚀 */}
      {/* ========================================= */}
      <div className="fixed bottom-8 right-6 z-50 hidden md:flex flex-col items-center gap-3">
        
        <a href="https://line.me/ti/p/5LzAgsgfsb" target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
          <span className="absolute right-14 px-3 py-1.5 bg-[#3E2B23] text-white text-[11px] tracking-widest rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-md pointer-events-none transition-opacity z-20">LINE 諮詢</span>
          <img src="/line-icon.png" alt="LINE" className="w-full h-full object-contain rounded-[9px]" />
        </a>
        
        <a href="https://www.facebook.com/share/1B8JNbbRiV/" target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
          <span className="absolute right-14 px-3 py-1.5 bg-[#3E2B23] text-white text-[11px] tracking-widest rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-md pointer-events-none transition-opacity z-20">粉絲專頁</span>
          <img src="/fb-icon.png" alt="FB" className="w-full h-full object-contain rounded-[9px]" />
        </a>

        <a href="https://www.instagram.com/ymca11235?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
          <span className="absolute right-14 px-3 py-1.5 bg-[#3E2B23] text-white text-[11px] tracking-widest rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-md pointer-events-none transition-opacity z-20">Instagram 諮詢</span>
          <img src="/ig-icon.png" alt="Instagram" className="w-full h-full object-contain rounded-[9px]" />
        </a>

        <a href="tel:0900206910" className="relative w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
          <span className="absolute right-14 px-3 py-1.5 bg-[#3E2B23] text-white text-[11px] tracking-widest rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-md pointer-events-none transition-opacity z-20">快速撥號</span>
          <img src="/phone-icon.jpg" alt="Phone" className="w-full h-full object-contain rounded-[9px]" onError={(e) => { e.target.onerror = null; e.target.src = "/phone-icon.png"; }} />
        </a>

      </div>

      {/* ========================================= */}
      {/* 🌟 沉浸式放大檢視 (Lightbox Modal) 🌟 */}
      {/* ========================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center">
          
          <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 md:top-10 md:right-10 text-white w-12 h-12 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/30 transition-all z-50 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button onClick={prevModalImage} className="absolute left-2 md:left-10 text-white p-3 hover:scale-110 transition-transform z-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 md:w-12 md:h-12 drop-shadow-md">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button onClick={nextModalImage} className="absolute right-2 md:right-10 text-white p-3 hover:scale-110 transition-transform z-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 md:w-12 md:h-12 drop-shadow-md">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div ref={modalScrollRef} onScroll={handleModalScroll} className="w-full h-full max-w-3xl flex overflow-x-auto snap-x snap-mandatory hide-scrollbar items-center touch-pan-x">
            {testimonials.map((img, idx) => (
              <div key={idx} className="w-full h-full shrink-0 flex items-center justify-center snap-center p-4 md:p-12 relative" onClick={(e) => { if(e.target === e.currentTarget) setIsModalOpen(false); }}>
                <img src={img} alt={`家長感謝 ${idx + 1}`} className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-xl" />
              </div>
            ))}
          </div>

          <div className="absolute bottom-10 flex gap-3 z-50">
            {testimonials.map((_, idx) => (
              <div key={idx} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${selectedImgIndex === idx ? 'bg-white scale-125' : 'bg-white/30'}`} />
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

export default App;