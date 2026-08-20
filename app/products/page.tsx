import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import Icon from '@/components/Icon';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Our Products — Apps & Games by Praxis Innovations',
  description:
    'Explore the apps and games built by Praxis Innovations — from expense splitting with EvenX to classic board and dice games online.',
  path: '/products',
  keywords: [
    'praxis innovations apps',
    'praxis innovations games',
    'evenx app',
    'liars dice online',
    'alignfive online',
  ],
});

const products = [
  {
    title: "Liar's Dice",
    category: 'Online Strategy Game',
    description:
      "A free browser-based Liar's Dice game where you bluff, bid, and challenge AI opponents. Features multiple rule variants including Dudo and Perudo, comprehensive strategy guides, and no sign-up required.",
    href: 'https://liars-dice.app/',
    logo: '/products/liarsdice-logo.png',
    gradient: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
  },
  {
    title: 'AlignFive',
    category: 'Real-Time Multiplayer Game',
    description:
      'A cross-platform Sequence card game with real-time multiplayer, private rooms, bot practice, leaderboards, and coin rewards. Play online with friends from any device.',
    href: 'https://alignfive.app',
    logo: '/products/sequence-logo.png',
    gradient: 'from-teal-500 to-emerald-600',
    bgLight: 'bg-teal-50',
  },
  {
    title: 'Praxis Innovations',
    category: 'Software Studio',
    description:
      'The team behind EvenX, AlignFive, and more. We build mobile apps and online games that are simple, polished, and fun to use.',
    href: 'https://praxisinnovations.ca/',
    logo: '/products/praxis-logo.png',
    gradient: 'from-blue-500 to-cyan-600',
    bgLight: 'bg-blue-50',
  },
] as const;

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 via-white to-violet-50">
          <div className="site-container text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-100 bg-primary-50 text-primary-600 text-sm font-semibold mb-6">
              <Icon name="star" size={16} />
              Our Products
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Built by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                Praxis Innovations
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From splitting expenses to playing classic games online — discover the apps and
              games our team has built.
            </p>
          </div>
        </section>

        {/* Product cards */}
        <AnimateOnScroll variant="fade-up">
          <section className="py-16 lg:py-20">
            <div className="site-container">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <a
                    key={product.title}
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border border-slate-100 rounded-2xl bg-white shadow-card p-0 overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:border-primary-100 hover:-translate-y-1.5 flex flex-col"
                  >
                    {/* Logo area */}
                    <div className={`${product.bgLight} p-8 flex items-center justify-center border-b border-slate-100`}>
                      <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden">
                        <Image
                          src={product.logo}
                          alt={`${product.title} logo`}
                          width={56}
                          height={56}
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold w-fit mb-3 bg-gradient-to-r ${product.gradient} text-white`}>
                        {product.category}
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {product.title}
                      </h2>
                      <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">
                        {product.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 group-hover:text-primary-600 group-hover:gap-2.5 transition-all">
                        Visit {product.title}
                        <Icon name="arrow-right" size={14} />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* Back to EvenX CTA */}
        <AnimateOnScroll variant="fade-in">
          <section className="py-16 bg-gradient-to-br from-primary-50 to-violet-50">
            <div className="site-container text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Looking for EvenX?
              </h2>
              <p className="text-slate-600 mb-6 max-w-xl mx-auto">
                Split expenses with friends, roommates, and groups — the easy way.
              </p>
              <Link href="/" className="btn-primary inline-flex items-center gap-2">
                Back to EvenX
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </section>
        </AnimateOnScroll>
      </main>
      <Footer />
    </>
  );
}
