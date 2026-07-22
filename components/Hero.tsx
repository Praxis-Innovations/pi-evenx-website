import Link from 'next/link';
import { store_urls } from '@/lib/constants';
import PhoneFrame from '@/components/PhoneFrame';
import Icon from '@/components/Icon';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-gradient-hero pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden
                 before:absolute before:inset-0 before:opacity-[0.04]
                 before:bg-[radial-gradient(circle,_rgba(255,255,255,0.8)_1px,_transparent_1px)]
                 before:bg-[length:24px_24px] before:pointer-events-none"
    >
      <div className="site-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text column */}
        <div className="flex flex-col gap-6">
          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full
                        text-xs font-bold uppercase tracking-widest
                        text-primary-200 border border-primary-400/30 bg-primary-500/10"
          >
            <Icon name="bolt" size={14} className="text-primary-300" />
            Split bills without the awkward math
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-tight text-white">
            Split bills, track shared expenses, and settle up
            <span
              className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300
                         bg-clip-text text-transparent"
            >
              {' '}with EvenX
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-primary-100/90 leading-relaxed max-w-xl">
            EvenX is a shared expense tracker built for roommates, trips, couples,
            and group events. Add expenses in seconds, split each bill fairly, and
            see who owes what without spreadsheets or group-chat confusion.
          </p>

          {/* Store buttons */}
          <div className="flex flex-wrap gap-3 mt-2">
            <a
              href={store_urls.ios}
              target="_blank"
              rel="noopener noreferrer"
              className="store-button"
            >
              <Icon name="apple" size={28} />
              <span className="flex flex-col leading-tight">
                <small className="text-[10px] font-medium text-slate-500">Download on the</small>
                <strong className="text-sm font-bold">App Store</strong>
              </span>
            </a>
            <a
              href={store_urls.android}
              target="_blank"
              rel="noopener noreferrer"
              className="store-button"
            >
              <Icon name="google-play" size={28} />
              <span className="flex flex-col leading-tight">
                <small className="text-[10px] font-medium text-slate-500">Get it on</small>
                <strong className="text-sm font-bold">Google Play</strong>
              </span>
            </a>
            <Link href="/split-expenses" className="store-button">
              <Icon name="calculator" size={24} />
              <span className="flex flex-col leading-tight">
                <small className="text-[10px] font-medium text-slate-500">Try the free</small>
                <strong className="text-sm font-bold">Expense Calculator</strong>
              </span>
            </Link>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-3 mt-2">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                          text-xs font-semibold text-white/90
                          bg-white/10 backdrop-blur-sm border border-white/10"
            >
              <Icon name="shield" size={16} className="text-blue-300" />
              Private by default
            </span>
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                          text-xs font-semibold text-white/90
                          bg-white/10 backdrop-blur-sm border border-white/10"
            >
              <Icon name="mobile" size={16} className="text-violet-300" />
              iPhone and Android
            </span>
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                          text-xs font-semibold text-white/90
                          bg-white/10 backdrop-blur-sm border border-white/10"
            >
              <Icon name="sync" size={16} className="text-purple-200" />
              Real-time shared balances
            </span>
          </div>
        </div>

        {/* Phone visual column */}
        <div className="relative flex items-center justify-center" aria-hidden="true">
          {/* Glow effect behind phone */}
          <div
            className="absolute w-80 h-80 rounded-full bg-primary-400/30 blur-[80px]
                        pointer-events-none"
          />

          {/* Floating card - left */}
          <div
            className="hidden lg:flex absolute -left-4 top-1/4 z-20 items-center gap-3
                        bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3
                        shadow-hero-card animate-float-slow"
          >
            <span
              className="flex items-center justify-center w-9 h-9 rounded-lg text-white
                          bg-gradient-to-br from-green-500 to-green-600"
            >
              <Icon name="check" size={16} />
            </span>
            <div>
              <div className="text-[0.72rem] font-bold text-slate-500">
                Settled in seconds
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                $550 dinner split
              </div>
            </div>
          </div>

          {/* Floating card - right */}
          <div
            className="hidden lg:flex absolute -right-4 top-[55%] z-20 items-center gap-3
                        bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3
                        shadow-hero-card animate-float-medium"
          >
            <span
              className="flex items-center justify-center w-9 h-9 rounded-lg text-white
                          bg-gradient-primary"
            >
              <Icon name="users" size={16} />
            </span>
            <div>
              <div className="text-[0.72rem] font-bold text-slate-500">
                Built for groups
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                Roommates, trips, events
              </div>
            </div>
          </div>

          <PhoneFrame
            src="/phone-screenshots/dashboard.png"
            alt="EvenX app dashboard for split bills and shared expense tracking"
            width={260}
            height={520}
            rotate_y={-8}
            rotate_x={5}
            rotate_z={-1}
            priority
          />
        </div>
      </div>
    </section>
  );
}
