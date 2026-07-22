import { faqItems } from '@/lib/seo';
import Icon from '@/components/Icon';

export default function Faq() {
  return (
    <section id="faq" className="section-pad">
      <div className="site-container">
        {/* Section heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Questions people ask before choosing a split bills app
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Clear answers for roommates, travelers, couples, and groups comparing expense
            splitting apps.
          </p>
        </div>

        {/* FAQ list */}
        <div className="grid gap-4 max-w-3xl mx-auto">
          {faqItems.map((item) => (
            <article
              key={item.question}
              className="border border-slate-100 rounded-2xl bg-white shadow-sm p-5"
            >
              <details className="[&[open]>summary>.chevron-icon]:rotate-180">
                <summary className="flex justify-between items-center font-bold text-slate-900 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <Icon
                    name="chevron-down"
                    size={20}
                    className="chevron-icon text-slate-400 transition-transform duration-300 flex-shrink-0 ml-4"
                  />
                </summary>
                <p className="mt-3 text-slate-500 leading-relaxed">
                  {item.answer}
                </p>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
