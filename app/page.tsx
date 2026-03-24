import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AppShowcase from '@/components/AppShowcase';
import About from '@/components/About';
import HomeIntentLinks from '@/components/HomeIntentLinks';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SeoJsonLd from '@/components/SeoJsonLd';
import {
  buildFaqJsonLd,
  buildMetadata,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebsiteJsonLd,
} from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Split Bills App for Roommates, Trips, and Shared Expenses',
  description:
    'EvenX helps you split bills, track shared expenses, and settle up with roommates, friends, couples, and travel groups on iPhone and Android.',
  path: '/',
});

export default function Home() {
  return (
    <>
      <SeoJsonLd data={buildWebsiteJsonLd()} />
      <SeoJsonLd data={buildOrganizationJsonLd()} />
      <SeoJsonLd data={buildSoftwareApplicationJsonLd()} />
      <SeoJsonLd data={buildFaqJsonLd()} />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <AppShowcase />
        <About />
        <HomeIntentLinks />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
