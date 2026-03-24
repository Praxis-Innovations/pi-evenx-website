import { faqItems } from '@/lib/seo';

export default function Faq() {
  return (
    <section id="faq" className="section-pad">
      <div className="site-container">
        <div className="section-heading">
          <h2 className="section-title">Questions people ask before choosing a split bills app</h2>
          <p className="section-description">
            Clear answers for roommates, travelers, couples, and groups comparing expense
            splitting apps.
          </p>
        </div>

        <div className="faq-list">
          {faqItems.map((item) => (
            <article key={item.question} className="faq-card">
              <details>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
