"use client";

import Image from "next/image";
import {
    useState,
    useTransition,
    type InputHTMLAttributes,
    type ReactNode,
    type TextareaHTMLAttributes
} from "react";
import {
    logoutAdminAction,
    saveFooterSettingsAction,
    saveHeroSettingsAction,
    saveMailSettingsAction,
    saveProjectsSettingsAction
} from "@/app/admin/actions";
import type {
    AdminActionResult,
    FooterSection,
    HeroPhoto,
    HeroSection,
    MailSettingsForAdmin,
    ProjectCard,
    ProjectGalleryItem,
    ProjectsSectionContent,
    SiteContent
} from "@/types/site-content";

type EditableHeroPhoto = HeroPhoto & {
    pendingFile: File | null;
};

type EditableHeroSection = Omit<HeroSection, "photos"> & {
    photos: EditableHeroPhoto[];
};

type EditableGalleryItem = ProjectGalleryItem & {
    pendingFile: File | null;
};

type EditableProjectCard = Omit<ProjectCard, "gallery"> & {
    pendingCoverFile: File | null;
    gallery: EditableGalleryItem[];
};

type EditableProjectsSection = Omit<ProjectsSectionContent, "cards"> & {
    cards: EditableProjectCard[];
};

type AdminSectionId = "footer" | "mail" | "hero" | "projects";

const adminSections: Array<{
    id: AdminSectionId;
    label: string;
    description: string;
}> = [
    {
        id: "footer",
        label: "Футер",
        description: "Контакты, реквизиты и служебные ссылки"
    },
    {
        id: "mail",
        label: "SMTP",
        description: "Почта и форма обратной связи"
    },
    {
        id: "hero",
        label: "Главный экран",
        description: "Тексты и фотографии первого экрана"
    },
    {
        id: "projects",
        label: "Мы проектируем",
        description: "Карточки, обложки и галереи"
    }
];

function createLocalId(prefix: string) {
    const suffix = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    return `${prefix}-${suffix}`;
}

function moveItem<T>(items: T[], fromIndex: number, toIndex: number) {
    if (toIndex < 0 || toIndex >= items.length) {
        return items;
    }

    const nextItems = [...items];
    const [movedItem] = nextItems.splice(fromIndex, 1);
    nextItems.splice(toIndex, 0, movedItem);
    return nextItems;
}

function splitLines(value: string) {
    return value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
}

function isRenderableImageSrc(src: string) {
    const candidate = src.trim();

    if (!candidate) {
        return false;
    }

    if (candidate.startsWith("/")) {
        return true;
    }

    try {
        const url = new URL(candidate);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
}

function getRenderableImageSrc(src: string) {
    return isRenderableImageSrc(src) ? src.trim() : "";
}

function getCardPreviewSrc(card: EditableProjectCard) {
    return (
        getRenderableImageSrc(card.coverImage) ||
        card.gallery.map((item) => getRenderableImageSrc(item.src)).find(Boolean) ||
        ""
    );
}

function hydrateHero(hero: HeroSection): EditableHeroSection {
    return {
        ...hero,
        photos: hero.photos.map((photo) => ({
            ...photo,
            pendingFile: null
        }))
    };
}

function hydrateProjects(projects: ProjectsSectionContent): EditableProjectsSection {
    return {
        ...projects,
        cards: projects.cards.map((card) => ({
            ...card,
            pendingCoverFile: null,
            gallery: card.gallery.map((item) => ({
                ...item,
                pendingFile: null
            }))
        }))
    };
}

function StatusMessage({
    result
}: {
    result: AdminActionResult<unknown> | null;
}) {
    if (!result) {
        return null;
    }

    return (
        <p
            className={`rounded-2xl border px-4 py-3 text-sm ${
                result.success
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
            }`}
        >
            {result.message}
        </p>
    );
}

function Field({
    label,
    hint,
    children
}: {
    label: string;
    hint?: string;
    children: ReactNode;
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-black/70">{label}</span>
            {children}
            {hint ? <span className="mt-2 block text-xs leading-relaxed text-black/45">{hint}</span> : null}
        </label>
    );
}

function TextInput(
    props: InputHTMLAttributes<HTMLInputElement> & {
        label: string;
        hint?: string;
    }
) {
    const { label, hint, className, ...rest } = props;

    return (
        <Field label={label} hint={hint}>
            <input
                {...rest}
                className={`w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-delta-blue focus:ring-2 focus:ring-delta-blue/20 ${className ?? ""}`}
            />
        </Field>
    );
}

function TextArea(
    props: TextareaHTMLAttributes<HTMLTextAreaElement> & {
        label: string;
        hint?: string;
    }
) {
    const { label, hint, className, ...rest } = props;

    return (
        <Field label={label} hint={hint}>
            <textarea
                {...rest}
                className={`w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-delta-blue focus:ring-2 focus:ring-delta-blue/20 ${className ?? ""}`}
            />
        </Field>
    );
}

function CheckboxField({
    label,
    checked,
    onChange
}: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <label className="inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black/72">
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                className="h-4 w-4 rounded border-black/20 text-delta-blue focus:ring-delta-blue"
            />
            {label}
        </label>
    );
}

function ImagePreview({
    src,
    alt
}: {
    src: string;
    alt: string;
}) {
    const imageSrc = getRenderableImageSrc(src);

    return (
        <div className="relative h-40 overflow-hidden rounded-2xl border border-black/10 bg-[rgba(38,38,116,0.04)]">
            {imageSrc ? (
                <Image src={imageSrc} alt={alt} fill sizes="320px" className="object-cover" />
            ) : (
                <div className="flex h-full items-center justify-center text-sm text-black/40">Изображение не выбрано</div>
            )}
        </div>
    );
}

function SectionCard({
    title,
    description,
    children,
    actions
}: {
    title: string;
    description: string;
    children: ReactNode;
    actions?: ReactNode;
}) {
    return (
        <section className="rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(17,24,39,0.06)] md:p-8">
            <div className="flex flex-col gap-4 border-b border-black/8 pb-5 md:flex-row md:items-start md:justify-between">
                <div className="max-w-3xl">
                    <h2 className="font-[var(--font-raleway)] text-3xl font-semibold text-delta-ink md:text-[38px]">
                        {title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-black/60 md:text-base">{description}</p>
                </div>
                {actions ? <div className="shrink-0">{actions}</div> : null}
            </div>

            <div className="mt-6">{children}</div>
        </section>
    );
}

function AdminSectionNavigation({
    activeSection,
    onSelect
}: {
    activeSection: AdminSectionId;
    onSelect: (sectionId: AdminSectionId) => void;
}) {
    const orderedSections = ["hero", "projects", "footer", "mail"].flatMap((sectionId) =>
        adminSections.filter((section) => section.id === sectionId)
    );

    return (
        <aside className="rounded-[32px] border border-black/10 bg-white p-5 shadow-[0_18px_50px_rgba(17,24,39,0.06)] md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-delta-blue/68">
                Навигация
            </p>
            <h2 className="mt-3 font-[var(--font-raleway)] text-2xl font-semibold text-delta-ink">
                Разделы админки
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-black/56">
                Переключение не сбрасывает несохранённые изменения в формах.
            </p>

            <div className="mt-5 flex gap-3 overflow-x-auto pb-1 xl:flex-col xl:overflow-visible xl:pb-0">
                {orderedSections.map((section, index) => {
                    const isActive = section.id === activeSection;

                    return (
                        <button
                            key={section.id}
                            type="button"
                            onClick={() => onSelect(section.id)}
                            className={`min-w-[230px] rounded-[24px] border px-4 py-4 text-left transition xl:min-w-0 ${
                                isActive
                                    ? "border-delta-blue bg-[rgba(38,38,116,0.06)] shadow-[0_10px_30px_rgba(38,38,116,0.08)]"
                                    : "border-black/8 bg-[rgba(38,38,116,0.02)] hover:border-delta-blue/40 hover:bg-[rgba(38,38,116,0.04)]"
                            }`}
                        >
                            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${isActive ? "text-delta-blue" : "text-black/42"}`}>
                                {String(index + 1).padStart(2, "0")}
                            </p>
                            <p className={`mt-2 text-base font-semibold ${isActive ? "text-delta-ink" : "text-black/76"}`}>
                                {section.label}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-black/54">
                                {section.description}
                            </p>
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}

function FooterSettingsForm({ initialFooter }: { initialFooter: FooterSection }) {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<AdminActionResult<FooterSection> | null>(null);
    const [form, setForm] = useState(initialFooter);

    const updateField = (key: keyof FooterSection, value: string) => {
        setForm((current) => ({
            ...current,
            [key]: value
        }));
    };

    const handleSave = () => {
        startTransition(() => {
            void (async () => {
                const formData = new FormData();

                Object.entries(form).forEach(([key, value]) => {
                    formData.set(key, value);
                });

                const response = await saveFooterSettingsAction(formData);
                setResult(response);

                if (response.success && response.data) {
                    setForm(response.data);
                }
            })();
        });
    };

    return (
        <SectionCard
            title="Футер и контакты"
            description="Управление контактной информацией, реквизитами и служебными ссылками в нижней части сайта."
            actions={
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={isPending}
                    className="rounded-2xl bg-delta-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-delta-violet disabled:opacity-60"
                >
                    {isPending ? "Сохраняем..." : "Сохранить футер"}
                </button>
            }
        >
            <div className="grid gap-4 md:grid-cols-2">
                <TextInput
                    label="Название компании"
                    value={form.companyName}
                    onChange={(event) => updateField("companyName", event.target.value)}
                />
                <TextInput
                    label="Телефон"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                />
                <TextInput
                    label="Ссылка для телефона"
                    value={form.phoneHref}
                    onChange={(event) => updateField("phoneHref", event.target.value)}
                    hint="Можно оставить пустым: ссылка будет собрана из номера автоматически."
                />
                <TextInput
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                />
                <TextInput
                    label="Адрес, строка 1"
                    value={form.addressLine1}
                    onChange={(event) => updateField("addressLine1", event.target.value)}
                />
                <TextInput
                    label="Адрес, строка 2"
                    value={form.addressLine2}
                    onChange={(event) => updateField("addressLine2", event.target.value)}
                />
                <TextInput
                    label="Юридическое название"
                    value={form.companyLegalName}
                    onChange={(event) => updateField("companyLegalName", event.target.value)}
                />
                <TextInput
                    label="Реквизиты"
                    value={form.legalDetails}
                    onChange={(event) => updateField("legalDetails", event.target.value)}
                />
                <TextInput
                    label="Режим работы"
                    value={form.workHours}
                    onChange={(event) => updateField("workHours", event.target.value)}
                />
                <TextInput
                    label="Ссылка на политику"
                    value={form.privacyPolicyUrl}
                    onChange={(event) => updateField("privacyPolicyUrl", event.target.value)}
                />
                <TextInput
                    label="Название ссылки"
                    value={form.privacyPolicyLabel}
                    onChange={(event) => updateField("privacyPolicyLabel", event.target.value)}
                />
                <TextInput
                    label="Подпись в копирайте"
                    value={form.copyrightLabel}
                    onChange={(event) => updateField("copyrightLabel", event.target.value)}
                />
                <div className="md:col-span-2">
                    <TextArea
                        label="Вводный текст"
                        rows={4}
                        value={form.introText}
                        onChange={(event) => updateField("introText", event.target.value)}
                    />
                </div>
            </div>

            <div className="mt-4">
                <StatusMessage result={result} />
            </div>
        </SectionCard>
    );
}

function MailSettingsForm({ initialMailSettings }: { initialMailSettings: MailSettingsForAdmin }) {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<AdminActionResult<MailSettingsForAdmin> | null>(null);
    const [form, setForm] = useState({
        host: initialMailSettings.host,
        port: String(initialMailSettings.port),
        secure: initialMailSettings.secure,
        user: initialMailSettings.user,
        pass: "",
        mailFrom: initialMailSettings.mailFrom,
        mailTo: initialMailSettings.mailTo,
        hasPassword: initialMailSettings.hasPassword
    });

    const handleSave = () => {
        startTransition(() => {
            void (async () => {
                const formData = new FormData();
                formData.set("host", form.host);
                formData.set("port", form.port);
                formData.set("secure", String(form.secure));
                formData.set("user", form.user);
                formData.set("pass", form.pass);
                formData.set("mailFrom", form.mailFrom);
                formData.set("mailTo", form.mailTo);

                const response = await saveMailSettingsAction(formData);
                setResult(response);

                if (response.success && response.data) {
                    setForm({
                        host: response.data.host,
                        port: String(response.data.port),
                        secure: response.data.secure,
                        user: response.data.user,
                        pass: "",
                        mailFrom: response.data.mailFrom,
                        mailTo: response.data.mailTo,
                        hasPassword: response.data.hasPassword
                    });
                }
            })();
        });
    };

    return (
        <SectionCard
            title="SMTP и обратная связь"
            description="Эти данные используются серверной формой обратной связи. Получатели указываются через запятую."
            actions={
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={isPending}
                    className="rounded-2xl bg-delta-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-delta-violet disabled:opacity-60"
                >
                    {isPending ? "Сохраняем..." : "Сохранить SMTP"}
                </button>
            }
        >
            <div className="grid gap-4 md:grid-cols-2">
                <TextInput
                    label="SMTP host"
                    value={form.host}
                    onChange={(event) => setForm((current) => ({ ...current, host: event.target.value }))}
                />
                <TextInput
                    label="SMTP port"
                    type="number"
                    value={form.port}
                    onChange={(event) => setForm((current) => ({ ...current, port: event.target.value }))}
                />
                <TextInput
                    label="Пользователь"
                    value={form.user}
                    onChange={(event) => setForm((current) => ({ ...current, user: event.target.value }))}
                />
                <TextInput
                    label="Пароль"
                    type="password"
                    value={form.pass}
                    onChange={(event) => setForm((current) => ({ ...current, pass: event.target.value }))}
                    hint={form.hasPassword ? "Пароль уже сохранён. Оставьте поле пустым, чтобы не менять его." : undefined}
                />
                <TextInput
                    label="От кого отправлять"
                    value={form.mailFrom}
                    onChange={(event) => setForm((current) => ({ ...current, mailFrom: event.target.value }))}
                />
                <TextInput
                    label="Кому отправлять"
                    value={form.mailTo}
                    onChange={(event) => setForm((current) => ({ ...current, mailTo: event.target.value }))}
                    hint="Например: sales@example.com, owner@example.com"
                />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
                <CheckboxField
                    label="Использовать secure-соединение"
                    checked={form.secure}
                    onChange={(checked) => setForm((current) => ({ ...current, secure: checked }))}
                />
            </div>

            <div className="mt-4">
                <StatusMessage result={result} />
            </div>
        </SectionCard>
    );
}

function HeroSettingsEditor({ initialHero }: { initialHero: HeroSection }) {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<AdminActionResult<HeroSection> | null>(null);
    const [hero, setHero] = useState(() => hydrateHero(initialHero));

    const updatePhoto = (photoId: string, updater: (photo: EditableHeroPhoto) => EditableHeroPhoto) => {
        setHero((current) => ({
            ...current,
            photos: current.photos.map((photo) => (photo.id === photoId ? updater(photo) : photo))
        }));
    };

    const handleSave = () => {
        startTransition(() => {
            void (async () => {
                const formData = new FormData();
                formData.set(
                    "hero",
                    JSON.stringify({
                        ...hero,
                        photos: hero.photos.map((photo) => ({
                            id: photo.id,
                            src: photo.src,
                            alt: photo.alt
                        }))
                    })
                );

                hero.photos.forEach((photo) => {
                    if (photo.pendingFile) {
                        formData.set(`hero-file:${photo.id}`, photo.pendingFile);
                    }
                });

                const response = await saveHeroSettingsAction(formData);
                setResult(response);

                if (response.success && response.data) {
                    setHero(hydrateHero(response.data));
                }
            })();
        });
    };

    return (
        <SectionCard
            title="Главный экран"
            description="Редактирование вступительного экрана: тексты и фотографии фоновой сетки."
            actions={
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={isPending}
                    className="rounded-2xl bg-delta-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-delta-violet disabled:opacity-60"
                >
                    {isPending ? "Сохраняем..." : "Сохранить главный экран"}
                </button>
            }
        >
            <div className="grid gap-4 md:grid-cols-2">
                <TextInput
                    label="Надзаголовок"
                    value={hero.eyebrow}
                    onChange={(event) => setHero((current) => ({ ...current, eyebrow: event.target.value }))}
                />
                <div className="md:col-span-2">
                    <TextArea
                        label="Заголовок"
                        rows={3}
                        value={hero.headline}
                        onChange={(event) => setHero((current) => ({ ...current, headline: event.target.value }))}
                        hint="Новая строка создаёт перенос на отдельную линию."
                    />
                </div>
                <div className="md:col-span-2">
                    <TextArea
                        label="Описание"
                        rows={4}
                        value={hero.description}
                        onChange={(event) => setHero((current) => ({ ...current, description: event.target.value }))}
                    />
                </div>
            </div>

            <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-delta-ink">Фотографии главного экрана</h3>
                    <button
                        type="button"
                        onClick={() =>
                            setHero((current) => ({
                                ...current,
                                photos: [
                                    ...current.photos,
                                    {
                                        id: createLocalId("hero-photo"),
                                        src: "",
                                        alt: "",
                                        pendingFile: null
                                    }
                                ]
                            }))
                        }
                        className="rounded-2xl border border-black/10 px-4 py-2 text-sm font-medium text-black/70 transition hover:border-delta-blue hover:text-delta-blue"
                    >
                        Добавить фото
                    </button>
                </div>

                {hero.photos.map((photo, index) => (
                    <div key={photo.id} className="rounded-[28px] border border-black/10 bg-[rgba(38,38,116,0.03)] p-4 md:p-5">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold text-delta-ink">Фото {index + 1}</p>
                                <p className="text-xs text-black/45">
                                    Можно указать путь к уже существующему файлу или загрузить новое изображение.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setHero((current) => ({
                                            ...current,
                                            photos: moveItem(current.photos, index, index - 1)
                                        }))
                                    }
                                    className="rounded-xl border border-black/10 px-3 py-2 text-xs font-medium text-black/60 transition hover:border-delta-blue hover:text-delta-blue"
                                >
                                    Вверх
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setHero((current) => ({
                                            ...current,
                                            photos: moveItem(current.photos, index, index + 1)
                                        }))
                                    }
                                    className="rounded-xl border border-black/10 px-3 py-2 text-xs font-medium text-black/60 transition hover:border-delta-blue hover:text-delta-blue"
                                >
                                    Вниз
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setHero((current) => ({
                                            ...current,
                                            photos: current.photos.filter((item) => item.id !== photo.id)
                                        }))
                                    }
                                    className="rounded-xl border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
                            <ImagePreview src={photo.src} alt={photo.alt || `Фото ${index + 1}`} />

                            <div className="grid gap-4">
                                <TextInput
                                    label="Путь к изображению"
                                    value={photo.src}
                                    onChange={(event) =>
                                        updatePhoto(photo.id, (current) => ({
                                            ...current,
                                            src: event.target.value
                                        }))
                                    }
                                />
                                <TextInput
                                    label="Alt-текст"
                                    value={photo.alt}
                                    onChange={(event) =>
                                        updatePhoto(photo.id, (current) => ({
                                            ...current,
                                            alt: event.target.value
                                        }))
                                    }
                                />
                                <Field
                                    label="Загрузить новое изображение"
                                    hint={photo.pendingFile ? `Выбрано: ${photo.pendingFile.name}` : undefined}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) =>
                                            updatePhoto(photo.id, (current) => ({
                                                ...current,
                                                pendingFile: event.target.files?.[0] ?? null
                                            }))
                                        }
                                        className="block w-full text-sm text-black/60 file:mr-4 file:rounded-xl file:border-0 file:bg-delta-blue file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-delta-violet"
                                    />
                                </Field>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <StatusMessage result={result} />
            </div>
        </SectionCard>
    );
}

function ProjectsSettingsEditor({ initialProjects }: { initialProjects: ProjectsSectionContent }) {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<AdminActionResult<ProjectsSectionContent> | null>(null);
    const [projects, setProjects] = useState(() => hydrateProjects(initialProjects));
    const [expandedCardId, setExpandedCardId] = useState<string | null>(() => initialProjects.cards[0]?.id ?? null);

    const updateCard = (cardId: string, updater: (card: EditableProjectCard) => EditableProjectCard) => {
        setProjects((current) => ({
            ...current,
            cards: current.cards.map((card) => (card.id === cardId ? updater(card) : card))
        }));
    };

    const updateGalleryItem = (
        cardId: string,
        galleryId: string,
        updater: (item: EditableGalleryItem) => EditableGalleryItem
    ) => {
        updateCard(cardId, (card) => ({
            ...card,
            gallery: card.gallery.map((item) => (item.id === galleryId ? updater(item) : item))
        }));
    };

    const handleSave = () => {
        startTransition(() => {
            void (async () => {
                const formData = new FormData();
                formData.set(
                    "projects",
                    JSON.stringify({
                        ...projects,
                        cards: projects.cards.map((card) => ({
                            id: card.id,
                            title: card.title,
                            description: card.description,
                            badge: card.badge,
                            coverImage: card.coverImage,
                            objectNames: card.objectNames,
                            isPlaceholder: card.isPlaceholder,
                            gallery: card.gallery.map((item) => ({
                                id: item.id,
                                src: item.src,
                                objectName: item.objectName
                            }))
                        }))
                    })
                );

                projects.cards.forEach((card) => {
                    if (card.pendingCoverFile) {
                        formData.set(`project-cover:${card.id}`, card.pendingCoverFile);
                    }

                    card.gallery.forEach((item) => {
                        if (item.pendingFile) {
                            formData.set(`project-gallery:${card.id}:${item.id}`, item.pendingFile);
                        }
                    });
                });

                const response = await saveProjectsSettingsAction(formData);
                setResult(response);

                if (response.success && response.data) {
                    const savedProjects = response.data;

                    setProjects(hydrateProjects(savedProjects));
                    setExpandedCardId((current) =>
                        savedProjects.cards.some((card) => card.id === current) ? current : savedProjects.cards[0]?.id ?? null
                    );
                }
            })();
        });
    };

    return (
        <SectionCard
            title="Карусель «Мы проектируем»"
            description="Добавление новых разделов, настройка карточек, обложек и вложенных галерей."
            actions={
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={isPending}
                    className="rounded-2xl bg-delta-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-delta-violet disabled:opacity-60"
                >
                    {isPending ? "Сохраняем..." : "Сохранить карусель"}
                </button>
            }
        >
            <div className="grid gap-4 md:grid-cols-2">
                <TextInput
                    label="Заголовок секции"
                    value={projects.title}
                    onChange={(event) => setProjects((current) => ({ ...current, title: event.target.value }))}
                />
                <div className="md:col-span-2">
                    <TextArea
                        label="Описание секции"
                        rows={3}
                        value={projects.description}
                        onChange={(event) => setProjects((current) => ({ ...current, description: event.target.value }))}
                    />
                </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-delta-ink">Карточки разделов</h3>
                <button
                    type="button"
                    onClick={() => {
                        const newCardId = createLocalId("project-card");

                        setProjects((current) => ({
                            ...current,
                            cards: [
                                ...current.cards,
                                {
                                    id: newCardId,
                                    title: "Новый раздел",
                                    description: "",
                                    badge: "Раздел",
                                    coverImage: "",
                                    objectNames: [],
                                    gallery: [],
                                    isPlaceholder: false,
                                    pendingCoverFile: null
                                }
                            ]
                        }));
                        setExpandedCardId(newCardId);
                    }}
                    className="rounded-2xl border border-black/10 px-4 py-2 text-sm font-medium text-black/70 transition hover:border-delta-blue hover:text-delta-blue"
                >
                    Добавить раздел
                </button>
            </div>

            <div className="mt-4 space-y-5">
                {projects.cards.map((card, index) => {
                    const isExpanded = expandedCardId === card.id;
                    const previewSrc = getCardPreviewSrc(card);

                    return (
                        <div key={card.id} className="rounded-[28px] border border-black/10 bg-[rgba(38,38,116,0.03)] p-4 md:p-5">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <button
                                    type="button"
                                    onClick={() => setExpandedCardId((current) => (current === card.id ? null : card.id))}
                                    className="flex min-w-0 flex-1 items-center gap-4 text-left"
                                >
                                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white/70">
                                        {previewSrc ? (
                                            <Image
                                                src={previewSrc}
                                                alt={card.title}
                                                fill
                                                sizes="112px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-center text-xs text-black/40">
                                                Без обложки
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-delta-ink">Карточка {index + 1}</p>
                                        <p className="mt-1 truncate text-lg font-semibold text-delta-ink">
                                            {card.title || "Новый раздел"}
                                        </p>
                                        <p className="mt-1 text-xs text-black/50">
                                            {card.gallery.length} фото в галерее · {card.objectNames.length} объектов
                                            {card.isPlaceholder ? " · Заглушка" : ""}
                                        </p>
                                    </div>
                                </button>

                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setProjects((current) => ({
                                                ...current,
                                                cards: moveItem(current.cards, index, index - 1)
                                            }))
                                        }
                                        className="rounded-xl border border-black/10 px-3 py-2 text-xs font-medium text-black/60 transition hover:border-delta-blue hover:text-delta-blue"
                                    >
                                        Вверх
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setProjects((current) => ({
                                                ...current,
                                                cards: moveItem(current.cards, index, index + 1)
                                            }))
                                        }
                                        className="rounded-xl border border-black/10 px-3 py-2 text-xs font-medium text-black/60 transition hover:border-delta-blue hover:text-delta-blue"
                                    >
                                        Вниз
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setExpandedCardId((current) => (current === card.id ? null : card.id))}
                                        className="rounded-xl border border-black/10 px-3 py-2 text-xs font-medium text-black/60 transition hover:border-delta-blue hover:text-delta-blue"
                                    >
                                        {isExpanded ? "Свернуть" : "Открыть"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const nextCards = projects.cards.filter((item) => item.id !== card.id);

                                            setProjects((current) => ({
                                                ...current,
                                                cards: current.cards.filter((item) => item.id !== card.id)
                                            }));
                                            setExpandedCardId((current) =>
                                                current === card.id ? nextCards[Math.min(index, nextCards.length - 1)]?.id ?? null : current
                                            );
                                        }}
                                        className="rounded-xl border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>

                            {isExpanded ? (
                                <div className="mt-5 border-t border-black/8 pt-5">
                                    <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
                                        <ImagePreview src={card.coverImage} alt={card.title} />

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <TextInput
                                                label="Название"
                                                value={card.title}
                                                onChange={(event) =>
                                                    updateCard(card.id, (current) => ({
                                                        ...current,
                                                        title: event.target.value
                                                    }))
                                                }
                                            />
                                            <TextInput
                                                label="Бейдж"
                                                value={card.badge}
                                                onChange={(event) =>
                                                    updateCard(card.id, (current) => ({
                                                        ...current,
                                                        badge: event.target.value
                                                    }))
                                                }
                                            />
                                            <div className="md:col-span-2">
                                                <TextArea
                                                    label="Описание"
                                                    rows={3}
                                                    value={card.description}
                                                    onChange={(event) =>
                                                        updateCard(card.id, (current) => ({
                                                            ...current,
                                                            description: event.target.value
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <Field
                                                    label="Загрузить новую обложку"
                                                    hint={
                                                        card.pendingCoverFile
                                                            ? `Выбрано: ${card.pendingCoverFile.name}`
                                                            : "Если отдельную обложку не загружать, будет использовано первое фото из галереи."
                                                    }
                                                >
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(event) =>
                                                            updateCard(card.id, (current) => ({
                                                                ...current,
                                                                pendingCoverFile: event.target.files?.[0] ?? null
                                                            }))
                                                        }
                                                        className="block w-full text-sm text-black/60 file:mr-4 file:rounded-xl file:border-0 file:bg-delta-blue file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-delta-violet"
                                                    />
                                                </Field>
                                            </div>
                                            <div className="md:col-span-2">
                                                <CheckboxField
                                                    label="Показывать как заглушку без открытия модального окна"
                                                    checked={Boolean(card.isPlaceholder)}
                                                    onChange={(checked) =>
                                                        updateCard(card.id, (current) => ({
                                                            ...current,
                                                            isPlaceholder: checked
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <TextArea
                                                    label="Список объектов"
                                                    rows={5}
                                                    value={card.objectNames.join("\n")}
                                                    onChange={(event) =>
                                                        updateCard(card.id, (current) => ({
                                                            ...current,
                                                            objectNames: splitLines(event.target.value)
                                                        }))
                                                    }
                                                    hint="Каждый объект с новой строки."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-base font-semibold text-delta-ink">Галерея карточки</h4>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateCard(card.id, (current) => ({
                                                        ...current,
                                                        gallery: [
                                                            ...current.gallery,
                                                            {
                                                                id: createLocalId("gallery"),
                                                                src: "",
                                                                objectName: "",
                                                                pendingFile: null
                                                            }
                                                        ]
                                                    }))
                                                }
                                                className="rounded-2xl border border-black/10 px-4 py-2 text-sm font-medium text-black/70 transition hover:border-delta-blue hover:text-delta-blue"
                                            >
                                                Добавить фото
                                            </button>
                                        </div>

                                        {card.gallery.length ? (
                                            <div className="space-y-4">
                                                {card.gallery.map((item, galleryIndex) => (
                                                    <div
                                                        key={item.id}
                                                        className="grid gap-4 rounded-[24px] border border-black/8 bg-white/70 p-4 md:grid-cols-[180px_minmax(0,1fr)]"
                                                    >
                                                        <ImagePreview src={item.src} alt={item.objectName || `Фото ${galleryIndex + 1}`} />

                                                        <div className="grid gap-4">
                                                            <div className="flex flex-wrap justify-end gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        updateCard(card.id, (current) => ({
                                                                            ...current,
                                                                            gallery: moveItem(current.gallery, galleryIndex, galleryIndex - 1)
                                                                        }))
                                                                    }
                                                                    className="rounded-xl border border-black/10 px-3 py-2 text-xs font-medium text-black/60 transition hover:border-delta-blue hover:text-delta-blue"
                                                                >
                                                                    Вверх
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        updateCard(card.id, (current) => ({
                                                                            ...current,
                                                                            gallery: moveItem(current.gallery, galleryIndex, galleryIndex + 1)
                                                                        }))
                                                                    }
                                                                    className="rounded-xl border border-black/10 px-3 py-2 text-xs font-medium text-black/60 transition hover:border-delta-blue hover:text-delta-blue"
                                                                >
                                                                    Вниз
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        updateCard(card.id, (current) => ({
                                                                            ...current,
                                                                            gallery: current.gallery.filter((galleryItem) => galleryItem.id !== item.id)
                                                                        }))
                                                                    }
                                                                    className="rounded-xl border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                                                                >
                                                                    Удалить
                                                                </button>
                                                            </div>

                                                            <TextInput
                                                                label="Путь к изображению"
                                                                value={item.src}
                                                                onChange={(event) =>
                                                                    updateGalleryItem(card.id, item.id, (current) => ({
                                                                        ...current,
                                                                        src: event.target.value
                                                                    }))
                                                                }
                                                            />
                                                            <TextInput
                                                                label="Подпись / объект"
                                                                value={item.objectName}
                                                                onChange={(event) =>
                                                                    updateGalleryItem(card.id, item.id, (current) => ({
                                                                        ...current,
                                                                        objectName: event.target.value
                                                                    }))
                                                                }
                                                            />
                                                            <Field
                                                                label="Загрузить новое изображение"
                                                                hint={item.pendingFile ? `Выбрано: ${item.pendingFile.name}` : undefined}
                                                            >
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(event) =>
                                                                        updateGalleryItem(card.id, item.id, (current) => ({
                                                                            ...current,
                                                                            pendingFile: event.target.files?.[0] ?? null
                                                                        }))
                                                                    }
                                                                    className="block w-full text-sm text-black/60 file:mr-4 file:rounded-xl file:border-0 file:bg-delta-blue file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-delta-violet"
                                                                />
                                                            </Field>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="rounded-2xl border border-dashed border-black/10 bg-white/60 px-4 py-4 text-sm text-black/45">
                                                У карточки пока нет фотографий в модальном окне.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>

            <div className="mt-4">
                <StatusMessage result={result} />
            </div>
        </SectionCard>
    );
}

export function AdminDashboard({
    initialContent,
    initialMailSettings,
    authConfigured
}: {
    initialContent: SiteContent;
    initialMailSettings: MailSettingsForAdmin;
    authConfigured: boolean;
}) {
    const [activeSection, setActiveSection] = useState<AdminSectionId>("hero");

    return (
        <main className="min-h-screen bg-[linear-gradient(180deg,#f5f7fb_0%,#eef2ff_100%)] px-4 py-6 text-delta-ink md:px-6 md:py-8">
            <div className="mx-auto max-w-7xl">
                <div className="rounded-[36px] border border-black/8 bg-white px-6 py-6 shadow-[0_24px_70px_rgba(17,24,39,0.08)] md:px-8">
                    <div className="flex flex-col gap-4 border-b border-black/8 pb-6 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-delta-blue/70">
                                Delta Admin
                            </p>
                            <h1 className="mt-4 font-[var(--font-raleway)] text-4xl font-semibold leading-[0.92] md:text-[56px]">
                                Панель управления контентом
                            </h1>
                            <p className="mt-4 text-sm leading-relaxed text-black/62 md:text-base">
                                Настройки сохраняются в файлы проекта. Здесь можно редактировать главный экран, карусель разделов,
                                контакты в футере и SMTP для обратной связи.
                            </p>
                        </div>

                        {authConfigured ? (
                            <form action={logoutAdminAction}>
                                <button
                                    type="submit"
                                    className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-medium text-black/70 transition hover:border-delta-blue hover:text-delta-blue"
                                >
                                    Выйти
                                </button>
                            </form>
                        ) : null}
                    </div>

                    {!authConfigured ? (
                        <div className="mt-6 rounded-[28px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-800">
                            Авторизация для админ-панели не включена. Для защиты доступа задайте переменные окружения `ADMIN_LOGIN`
                            и `ADMIN_PASSWORD`.
                        </div>
                    ) : null}
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)] xl:items-start">
                    <div className="xl:sticky xl:top-6">
                        <AdminSectionNavigation
                            activeSection={activeSection}
                            onSelect={setActiveSection}
                        />
                    </div>

                    <div className="grid gap-6">
                        <div className={activeSection === "footer" ? "block" : "hidden"}>
                            <FooterSettingsForm initialFooter={initialContent.footer} />
                        </div>

                        <div className={activeSection === "mail" ? "block" : "hidden"}>
                            <MailSettingsForm initialMailSettings={initialMailSettings} />
                        </div>

                        <div className={activeSection === "hero" ? "block" : "hidden"}>
                            <HeroSettingsEditor initialHero={initialContent.hero} />
                        </div>

                        <div className={activeSection === "projects" ? "block" : "hidden"}>
                            <ProjectsSettingsEditor initialProjects={initialContent.projects} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
