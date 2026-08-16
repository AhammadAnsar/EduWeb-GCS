import React from 'react';
import { useSchoolData } from '../../hooks/useSchoolData';
import { useRouter } from '../../context/RouterContext';
import { Bell, ChevronRight } from 'lucide-react';
import { toBengaliNumber } from '../../utils/bengaliUtils';

export const MarqueeNotice: React.FC = () => {
  const { notices, settings } = useSchoolData();
  const { navigate } = useRouter();

  const activeNotices = notices.slice(0, 5);

  return (
    <div className="bg-amber-50 border-y border-amber-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center h-10">
        {/* Label Badge */}
        <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-l-sm flex items-center gap-1.5 shrink-0 uppercase tracking-wider animate-pulse">
          <Bell className="w-3.5 h-3.5" />
          <span>জরুরি নোটিশ</span>
        </div>

        {/* Scrolling text */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center px-3 bg-amber-50">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-8 text-xs sm:text-sm font-medium text-slate-800">
            {activeNotices.map((n, i) => (
              <span
                key={n.id}
                onClick={() => navigate(`/notices`)}
                className="inline-flex items-center gap-2 hover:text-emerald-700 hover:underline cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <strong className="text-emerald-900 font-semibold">[{toBengaliNumber(n.publishDate)}]:</strong> {n.title}
              </span>
            ))}
            <span className="text-slate-600">
              | {settings.marqueeText} |
            </span>
          </div>
        </div>

        {/* All Notices button */}
        <button
          onClick={() => navigate('/notices')}
          className="shrink-0 text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-0.5 px-2 py-1 bg-amber-200/80 hover:bg-amber-200 rounded transition cursor-pointer"
        >
          <span>সকল নোটিশ</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
