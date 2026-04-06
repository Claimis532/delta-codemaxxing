import { containerClass } from "@/constants/content";

const footerGroups = [
    {
        title: "Контакты",
        items: ["Телефон", "Email"]
    },
    {
        title: "Адрес",
        items: ["Город, улица", "Офис / этаж"]
    },
    {
        title: "Реквизиты",
        items: ["ООО «Название компании»", "ИНН / ОГРН"]
    }
] as const;

export const Footer = () => (
    <footer id="footer" className="bg-delta-cta text-white">
        <div className={`${containerClass} border-t border-white/10 py-6 md:py-8`}>
            <div className="grid gap-5 md:grid-cols-[1.1fr_2fr_auto] md:items-start md:gap-6">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Контакты</p>
                    <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-white/62">
                        Короткий шаблонный подвал для сайта-визитки с базовой контактной и юридической информацией.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    {footerGroups.map((group) => (
                        <section key={group.title}>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{group.title}</h3>
                            <div className="mt-3 space-y-2 text-sm text-white/74">
                                {group.items.map((item) => (
                                    <p key={item}>{item}</p>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <div className="text-sm text-white/58 md:text-right">
                    <p>Пн-Пт: 09:00-18:00</p>
                    <p className="mt-2">Политика конфиденциальности</p>
                </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 border-t border-white/8 pt-4 text-xs text-white/34 md:flex-row md:items-center md:justify-between">
                <p>© 20__ Название компании</p>
                <p>Все права защищены</p>
            </div>
        </div>
    </footer>
);
