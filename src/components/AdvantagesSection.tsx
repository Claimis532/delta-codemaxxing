import { containerClass } from "@/constants/content";

const advantages = [
    {
        id: "01",
        title: "Понимаем специфику объектов",
        description:
            "Работаем с театрами, школами, спортивными и общественными пространствами, где важны нормативы, сценарии использования и реальная эксплуатация."
    },
    {
        id: "02",
        title: "Ведем проект последовательно",
        description:
            "От первого брифа и расчета стоимости до выпуска документации и авторского надзора. Без разрывов между этапами и исполнителями."
    },
    {
        id: "03",
        title: "Большой опыт, работаем много лет",
        description:
            "Накопили практику на разных типах объектов и умеем находить рабочие решения там, где особенно важны сроки, бюджет и надежность эксплуатации."
    }
] as const;

export const AdvantagesSection = () => {
    return (
        <section
            id="advantages"
            className="scroll-mt-24 border-b border-black/10 bg-[linear-gradient(180deg,rgba(243,243,245,0.96)_0%,rgba(255,255,255,0.94)_100%)] py-12 md:py-16"
        >
            <div className={containerClass}>
                <div className="max-w-[720px]">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[rgba(38,38,116,0.5)]">
                        Почему с нами удобно работать
                    </span>
                    <h2 className="mt-3 font-[var(--font-raleway)] text-[42px] font-semibold leading-[0.92] tracking-[-0.04em] text-delta-ink md:text-[64px]">
                        Преимущества
                    </h2>
                    <p className="mt-4 max-w-[30ch] text-[17px] leading-relaxed text-black/62 md:text-[20px]">
                        Акцент на содержании, опыте и ясной логике работы. Без декоративного шума и без интерфейсной
                        метафоры карточек.
                    </p>
                </div>

                <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-3 md:gap-6">
                    {advantages.map((item) => (
                        <article key={item.id} className="relative min-w-0 pt-10 md:pt-12">
                            <span className="pointer-events-none absolute left-0 top-0 font-[var(--font-raleway)] text-[72px] font-semibold leading-none tracking-[-0.08em] text-black/[0.05] md:text-[112px]">
                                {item.id}
                            </span>

                            <div className="relative">
                                <h3 className="max-w-[11ch] font-[var(--font-raleway)] text-[24px] font-semibold leading-[0.98] tracking-[-0.03em] text-delta-ink md:text-[30px]">
                                    {item.title}
                                </h3>
                                <p className="mt-4 max-w-[28ch] text-[15px] leading-[1.7] text-black/68 md:text-[16px]">
                                    {item.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
