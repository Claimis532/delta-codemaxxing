import { containerClass } from "@/constants/content";
import type { FooterSection } from "@/types/site-content";

export const Footer = ({ footer }: { footer: FooterSection }) => {
    const footerGroups = [
        {
            title: "Контакты",
            items: [
                <a key="phone" href={`tel:${footer.phoneHref}`} className="transition hover:text-white">
                    {footer.phone}
                </a>,
                <a key="email" href={`mailto:${footer.email}`} className="transition hover:text-white">
                    {footer.email}
                </a>
            ]
        },
        {
            title: "Адрес",
            items: [footer.addressLine1, footer.addressLine2]
        },
        {
            title: "Реквизиты",
            items: [footer.companyLegalName, footer.legalDetails]
        }
    ] as const;

    return (
        <footer id="footer" className="text-white">
            <div className={`${containerClass} border-t border-white/10 py-8 md:py-10`}>
                <div className="grid gap-5 md:grid-cols-[1.1fr_2fr_auto] md:items-start md:gap-6">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Контакты</p>
                        <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-white/62">
                            {footer.introText}
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {footerGroups.map((group) => (
                            <section key={group.title}>
                                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                                    {group.title}
                                </h3>
                                <div className="mt-3 space-y-2 text-sm text-white/74">
                                    {group.items.map((item, index) => (
                                        <p key={`${group.title}-${index}`}>{item}</p>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="text-sm text-white/58 md:text-right">
                        <p>{footer.workHours}</p>
                        <a href={footer.privacyPolicyUrl} className="mt-2 inline-block transition hover:text-white">
                            {footer.privacyPolicyLabel}
                        </a>
                    </div>
                </div>

                <div className="mt-5 flex flex-col gap-2 border-t border-white/8 pt-4 text-xs text-white/34 md:flex-row md:items-center md:justify-between">
                    <p>{`© ${new Date().getFullYear()} ${footer.companyName}`}</p>
                    <p>{footer.copyrightLabel}</p>
                </div>
            </div>
        </footer>
    );
};
