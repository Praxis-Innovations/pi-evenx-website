import Link from 'next/link';
import PhoneFrame from '@/components/PhoneFrame';
import Icon from '@/components/Icon';
import { store_urls } from '@/lib/constants';
import SeoJsonLd from '@/components/SeoJsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo';

type IntentLandingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  screenshot: {
    src: string;
    alt: string;
  };
  benefits: string[];
  useCases: string[];
  relatedLinks: Array<{ href: string; label: string }>;
  breadcrumbName: string;
  breadcrumbPath: string;
};

export default function IntentLandingPage({
  eyebrow,
  title,
  description,
  intro,
  screenshot,
  benefits,
  useCases,
  relatedLinks,
  breadcrumbName,
  breadcrumbPath,
}: IntentLandingPageProps) {
  return (
    <main className="pt-24 pb-16">
      <SeoJsonLd
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: breadcrumbName, path: breadcrumbPath },
        ])}
      />
      <div className="site-container space-y-12">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-primary-500/20 bg-primary-500/10 text-primary-600 text-xs font-bold uppercase tracking-wider mb-5">
              <Icon name="bolt" size={14} />
              {eyebrow}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
              {title}
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              {description}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={store_urls.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="store-button"
              >
                <Icon name="apple" size={24} />
                <span className="flex flex-col items-start leading-tight">
                  <small className="text-xs text-slate-400 font-medium">Download on the</small>
                  <strong className="text-base">App Store</strong>
                </span>
              </a>
              <a
                href={store_urls.android}
                target="_blank"
                rel="noopener noreferrer"
                className="store-button"
              >
                <Icon name="google-play" size={24} />
                <span className="flex flex-col items-start leading-tight">
                  <small className="text-xs text-slate-400 font-medium">Get it on</small>
                  <strong className="text-base">Google Play</strong>
                </span>
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <PhoneFrame
              src={screenshot.src}
              alt={screenshot.alt}
              width={235}
              height={470}
            />
          </div>
        </section>

        <section className="p-6 md:p-8 border border-slate-100 rounded-2xl bg-white shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Why EvenX fits this use case
          </h2>
          <p className="text-slate-500 leading-relaxed mb-4">{intro}</p>
          <ul className="space-y-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-slate-600">
                <Icon name="check" size={18} className="text-green-500 mt-0.5 shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </section>

        <section className="p-6 md:p-8 border border-slate-100 rounded-2xl bg-white shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Common use cases
          </h2>
          <ul className="space-y-2">
            {useCases.map((useCase) => (
              <li key={useCase} className="flex items-start gap-3 text-slate-600">
                <Icon name="bolt" size={16} className="text-primary-500 mt-0.5 shrink-0" />
                {useCase}
              </li>
            ))}
          </ul>
        </section>

        <section className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-violet-50 border border-primary-100">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Explore related EvenX pages
          </h2>
          <p className="text-slate-600 text-sm mb-4">
            These internal pages cover closely related bill-splitting searches and help you
            compare how EvenX handles each scenario.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="text-primary-600 font-bold hover:text-primary-700 transition-colors"
            >
              Homepage
            </Link>
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary-600 font-bold hover:text-primary-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="text-primary-600 font-bold hover:text-primary-700 transition-colors"
            >
              Contact EvenX
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
