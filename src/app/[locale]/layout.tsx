import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ConceptProvider } from '@/context/ConceptContext';
import "../globals.css";

export const metadata: Metadata = {
  title: "STUPID - The AI that starts with nothing",
  description: "An experimental AI that learns only from what you teach it. Make it less dumb by explaining concepts step by step.",
};

// Add this to specify which locales are supported
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <ConceptProvider>
            {children}
          </ConceptProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
