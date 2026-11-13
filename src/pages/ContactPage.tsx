import React, { useId, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeEuro,
  Building2,
  Check,
  CircleHelp,
  HandCoins,
  Info,
  Mail,
  MailCheck,
  Plug,
  Send,
  type LucideIcon,
} from 'lucide-react';
import { useModal } from '../context/ModalContext.tsx';
import { useT, useTx } from '../i18n/index.tsx';
import HomeLink from '../components/home/HomeLink.tsx';
import { CONTAINER, PRODUCT_ICONS, PRODUCT_PHOTOS } from '../components/product/ProductKit.tsx';
import { PRODUCT_META, PRODUCT_ORDER, isHiddenProduct } from '../data/productPages.ts';

/** Subject values stay stable across languages; only labels are translated. */
const SUBJECTS = ['general', 'platform', 'membership', 'sponsorship', 'waterwell', 'qurbani', 'moneypool', 'support', 'partnership', 'other'] as const;

/** Visible products only: unlaunched ones (HIDDEN_PRODUCTS) are left out. */
const PRODUCTS = PRODUCT_ORDER.filter((s) => !isHiddenProduct(s));

/** Self-service pages for common questions. */
const RESOURCES: { key: string; to: string; icon: LucideIcon }[] = [
  { key: 'pricing', to: '/pricing', icon: BadgeEuro },
  { key: 'integrations', to: '/integrations', icon: Plug },
  { key: 'faqs', to: '/faqs', icon: CircleHelp },
  { key: 'about', to: '/about', icon: Building2 },
];

const fieldClass =
  'mt-1.5 block w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-[15px] text-navy-950 placeholder:text-neutral-400 transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/25';
const labelClass = 'block text-sm font-semibold text-navy-950';
const textLink =
  'rounded font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-800 hover:decoration-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600';
const H2 = 'text-3xl font-extrabold leading-[1.08] text-navy-950 sm:text-[2.5rem]';

type Form = { name: string; org: string; email: string; phone: string; subject: string; message: string };
type Step = { title: string; text: string };

export default function ContactPage() {
  const { openGetStarted } = useModal();
  const t = useT('company');
  const tx = useTx('company');
  const tc = useT('common');
  const tl = useTx('legal');
  const uid = useId();
  const email = t('contact.email');

  const [form, setForm] = useState<Form>({ name: '', org: '', email: '', phone: '', subject: '', message: '' });
  const [opened, setOpened] = useState(false);
  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  /**
   * This site has no form backend, so the form composes an email to the team address
   * in the visitor's email app (nothing is sent anywhere else). Replace with a real
   * form endpoint when one is available, and name it in the Privacy Policy.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subjectLabel = t(`contact.form.subjects.${form.subject}`);
    const details = [
      `${t('contact.mail.name')}: ${form.name}`,
      form.org ? `${t('contact.mail.organisation')}: ${form.org}` : '',
      `${t('contact.mail.email')}: ${form.email}`,
      form.phone ? `${t('contact.mail.phone')}: ${form.phone}` : '',
      `${t('contact.mail.subject')}: ${subjectLabel}`,
    ].filter(Boolean);
    const body = `${details.join('\n')}\n\n${t('contact.mail.message')}:\n${form.message}`;
    const subject = `${t('contact.mail.subjectPrefix')}: ${subjectLabel} – ${form.name}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  const optional = <span className="ml-1.5 text-xs font-normal text-neutral-500">({t('contact.form.optional')})</span>;
  const required = (
    <span className="ml-0.5 text-brand-700" aria-hidden="true">
      *
    </span>
  );

  return (
    <div className="home-v2 overflow-x-clip">
      {/* ------------------------------------------------------- Page header */}
      <section aria-labelledby="ct-title" className="pb-12 pt-14 sm:pb-16 sm:pt-20">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-800 ring-1 ring-brand-100">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {t('contact.header.badge')}
            </span>
            <h1 id="ct-title" className="mt-6 text-[2.4rem] font-extrabold leading-[1.05] text-navy-950 sm:text-[3.25rem]">
              {t('contact.header.title')}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-navy-900">{t('contact.header.intro')}</p>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">{t('contact.header.body')}</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Form + side panel */}
      <section aria-labelledby="ct-form" className="pb-20 sm:pb-24">
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-12 lg:gap-10`}>
          <div className="self-start rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-[0_30px_70px_-45px_rgb(0_24_64/0.45)] sm:p-10 lg:sticky lg:top-28 lg:col-span-7">
            {opened ? (
              <div className="py-6 text-center sm:py-10" role="status">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                  <MailCheck className="h-7 w-7" aria-hidden="true" />
                </span>
                <h2 id="ct-form" className="mt-5 text-2xl font-extrabold text-navy-950">
                  {t('contact.sent.title')}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-neutral-600">{t('contact.sent.text', { email })}</p>
                <p className="mt-4 text-[15px] text-neutral-600">
                  {t('contact.sent.fallback')}{' '}
                  <a href={`mailto:${email}`} className={textLink}>
                    {email}
                  </a>
                </p>
                <button type="button" onClick={() => setOpened(false)} className="hv-btn hv-btn-outline mt-7">
                  {t('contact.sent.again')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} aria-labelledby="ct-form">
                <h2 id="ct-form" className="text-2xl font-extrabold text-navy-950 sm:text-[1.75rem]">
                  {t('contact.form.title')}
                </h2>
                <p className="mt-2 text-[16px] leading-relaxed text-neutral-600">{t('contact.form.intro')}</p>
                <p className="mt-1 text-sm text-neutral-500">{t('contact.form.required')}</p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${uid}-name`} className={labelClass}>
                      {t('contact.form.nameLabel')}
                      {required}
                    </label>
                    <input id={`${uid}-name`} name="name" type="text" required autoComplete="name" value={form.name} onChange={set('name')} className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-org`} className={labelClass}>
                      {t('contact.form.orgLabel')}
                      {optional}
                    </label>
                    <input id={`${uid}-org`} name="organisation" type="text" autoComplete="organization" value={form.org} onChange={set('org')} className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-email`} className={labelClass}>
                      {t('contact.form.emailLabel')}
                      {required}
                    </label>
                    <input
                      id={`${uid}-email`}
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      spellCheck={false}
                      value={form.email}
                      onChange={set('email')}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-phone`} className={labelClass}>
                      {t('contact.form.phoneLabel')}
                      {optional}
                    </label>
                    <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={set('phone')} className={fieldClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`${uid}-subject`} className={labelClass}>
                      {t('contact.form.subjectLabel')}
                      {required}
                    </label>
                    <select id={`${uid}-subject`} name="subject" required value={form.subject} onChange={set('subject')} className={fieldClass}>
                      <option value="" disabled>
                        {t('contact.form.subjectPlaceholder')}
                      </option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {t(`contact.form.subjects.${s}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`${uid}-message`} className={labelClass}>
                      {t('contact.form.messageLabel')}
                      {required}
                    </label>
                    <textarea
                      id={`${uid}-message`}
                      name="message"
                      required
                      rows={6}
                      placeholder={t('contact.form.messagePlaceholder')}
                      value={form.message}
                      onChange={set('message')}
                      className={`${fieldClass} resize-y`}
                    />
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-neutral-600">
                  {t('contact.form.privacyBefore')}{' '}
                  <HomeLink to="/privacy-policy" className={textLink}>
                    {t('contact.form.privacyLink')}
                  </HomeLink>
                  {t('contact.form.privacyAfter').startsWith('.') ? '' : ' '}
                  {t('contact.form.privacyAfter')}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                  <button type="submit" className="hv-btn hv-btn-primary shrink-0 self-start whitespace-nowrap">
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {t('contact.form.submit')}
                  </button>
                  <p className="text-xs leading-relaxed text-neutral-500">{t('contact.form.howItWorks', { email })}</p>
                </div>
              </form>
            )}
          </div>

          {/* Side panel */}
          <aside aria-label={t('contact.other.title')} className="space-y-5 lg:col-span-5">
            <div className="rounded-[1.5rem] bg-navy-950 p-6 text-white sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-lg font-bold">{t('contact.other.emailTitle')}</h2>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/70">{t('contact.other.emailText')}</p>
              <a
                href={`mailto:${email}`}
                className="mt-3 inline-block break-all rounded text-lg font-semibold text-brand-300 underline decoration-brand-300/50 underline-offset-4 hover:text-brand-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {email}
              </a>
              <p className="mt-4 border-t border-white/10 pt-4 text-[14.5px] leading-relaxed text-white/70">{t('contact.other.helpText')}</p>
            </div>

            <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 sm:p-7">
              <h2 className="text-lg font-bold text-navy-950">{t('contact.next.title')}</h2>
              <ol className="mt-5 space-y-5">
                {tx<Step[]>('contact.next.steps').map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span>
                    <div>
                      <h3 className="font-bold text-navy-950">{s.title}</h3>
                      <p className="mt-0.5 text-[14.5px] leading-relaxed text-neutral-600">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[1.5rem] border border-neutral-200 bg-soft p-6 sm:p-7">
              <h2 className="text-lg font-bold text-navy-950">{t('contact.tips.title')}</h2>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-neutral-600">{t('contact.tips.intro')}</p>
              <ul className="mt-4 space-y-3">
                {tx<string[]>('contact.tips.items').map((item) => (
                  <li key={item} className="flex gap-3 text-[14.5px] leading-relaxed text-navy-900">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 sm:p-7">
              <h2 className="flex items-center gap-2 text-lg font-bold text-navy-950">
                <Building2 className="h-5 w-5 text-brand-700" aria-hidden="true" />
                {t('contact.company.title')}
              </h2>
              <p className="mt-2 text-[14.5px] text-neutral-600">{t('contact.company.note')}</p>
              <address className="mt-3 not-italic text-[15px] leading-relaxed text-navy-950">
                {tl<string[]>('impressum.provider.lines').map((line, i) => (
                  <span key={line} className={`block ${i === 0 ? 'font-semibold' : ''}`}>
                    {line}
                  </span>
                ))}
              </address>
              <HomeLink to="/impressum" className={`mt-4 inline-flex items-center gap-1.5 text-sm ${textLink}`}>
                {t('contact.company.imprint')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </HomeLink>
            </div>
          </aside>
        </div>

        {/* Donors: point to the organisation */}
        <div className={`${CONTAINER} mt-8`}>
          <div className="flex flex-col gap-4 rounded-[1.5rem] border border-brand-100 bg-brand-50 p-6 sm:flex-row sm:items-start sm:gap-5 sm:p-7">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 ring-1 ring-brand-100">
              <HandCoins className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-navy-950">{t('contact.donors.title')}</h2>
              <p className="mt-1.5 max-w-3xl text-[15px] leading-relaxed text-navy-900">{t('contact.donors.text')}</p>
              <HomeLink to="/refund-policy" className={`mt-3 inline-flex items-center gap-1.5 text-sm ${textLink}`}>
                {t('contact.donors.link')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </HomeLink>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Find answers faster */}
      <section aria-labelledby="ct-resources" className="bg-soft py-20 sm:py-24">
        <div className={CONTAINER}>
          <div className="max-w-2xl">
            <h2 id="ct-resources" className={H2}>
              {t('contact.resources.title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">{t('contact.resources.intro')}</p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RESOURCES.map(({ key, to, icon: Icon }) => (
              <li key={key}>
                <HomeLink
                  to={to}
                  className="hv-lift group flex h-full flex-col rounded-[1.5rem] border border-neutral-200 bg-white p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-4 flex items-center justify-between gap-3 text-lg font-bold text-navy-950">
                    {t(`contact.resources.items.${key}.title`)}
                    <ArrowRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-700 motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                  <span className="mt-1.5 text-[14.5px] leading-relaxed text-neutral-600">{t(`contact.resources.items.${key}.text`)}</span>
                </HomeLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------ Solutions */}
      <section aria-labelledby="ct-solutions" className="bg-white py-20 sm:py-24">
        <div className={CONTAINER}>
          <div className="max-w-2xl">
            <h2 id="ct-solutions" className={H2}>
              {t('contact.solutions.title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">{t('contact.solutions.intro')}</p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PRODUCTS.map((slug) => {
              const Icon = PRODUCT_ICONS[slug];
              const photo = PRODUCT_PHOTOS[slug];
              const name = tc(`products.${slug}`);
              return (
                <li key={slug}>
                  <HomeLink
                    to={PRODUCT_META[slug].route}
                    aria-label={t('contact.solutions.learnMore', { name })}
                    className="hv-lift group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={photo.src}
                        alt=""
                        width={600}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                        style={{ objectPosition: photo.pos }}
                      />
                      <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-brand-700 shadow-md">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold text-navy-950" translate="no">
                          {name}
                        </h3>
                        <ArrowUpRight className="h-4.5 w-4.5 shrink-0 text-neutral-400 transition-colors group-hover:text-brand-700" aria-hidden="true" />
                      </div>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-neutral-600">{t(`contact.solutions.items.${slug}`)}</p>
                    </div>
                  </HomeLink>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 flex max-w-3xl gap-3 text-[15px] leading-relaxed text-neutral-700">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
            <span>
              {t('contact.solutions.pricingNote')}{' '}
              <HomeLink to="/pricing" className={textLink}>
                {t('contact.solutions.pricingLink')}
              </HomeLink>
            </span>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------ Final CTA */}
      <section aria-labelledby="ct-cta" className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="hv-hero-bg relative mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] px-6 py-16 text-white sm:px-14 sm:py-20">
          <div aria-hidden="true" className="hv-grid-dark absolute inset-0" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 id="ct-cta" className="text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                {t('contact.cta.title')}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">{t('contact.cta.text')}</p>
              <p className="mt-4 text-lg font-semibold text-brand-200">{t('contact.cta.tagline')}</p>
            </div>
            <div className="lg:justify-self-end">
              <button type="button" onClick={() => openGetStarted()} className="hv-btn hv-btn-primary">
                {tc('actions.getStarted')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
