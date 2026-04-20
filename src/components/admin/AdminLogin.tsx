"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loginAdminAction } from "@/app/admin/actions";

export function AdminLogin() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        startTransition(() => {
            void (async () => {
                const result = await loginAdminAction(formData);
                setMessage(result.message);
                setIsError(!result.success);

                if (result.success) {
                    router.refresh();
                }
            })();
        });
    };

    return (
        <main className="min-h-screen bg-[linear-gradient(135deg,#111827_0%,#1f275f_50%,#6b21a8_100%)] px-4 py-10 text-white">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-[36px] border border-white/10 bg-white/10 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl md:grid-cols-[1.2fr_0.9fr]">
                    <section className="relative overflow-hidden p-8 md:p-12">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.18),transparent_30%)]" />
                        <div className="relative">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/62">
                                Delta Admin
                            </p>
                            <h1 className="mt-6 max-w-[12ch] font-[var(--font-raleway)] text-4xl font-semibold leading-[0.92] md:text-[56px]">
                                Панель управления сайтом
                            </h1>
                            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/72 md:text-lg">
                                Здесь редактируются главный экран, карусель «Мы проектируем», контакты в футере и SMTP для формы обратной связи.
                            </p>
                        </div>
                    </section>

                    <section className="bg-white px-6 py-8 text-delta-ink md:px-8 md:py-12">
                        <h2 className="font-[var(--font-raleway)] text-3xl font-semibold">Вход</h2>
                        <p className="mt-3 text-sm leading-relaxed text-black/60">
                            Авторизация включается через `ADMIN_LOGIN` и `ADMIN_PASSWORD`.
                        </p>

                        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-black/70">Логин</span>
                                <input
                                    name="username"
                                    type="text"
                                    required
                                    autoComplete="username"
                                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-delta-blue focus:ring-2 focus:ring-delta-blue/20"
                                />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-black/70">Пароль</span>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-delta-blue focus:ring-2 focus:ring-delta-blue/20"
                                />
                            </label>

                            {message ? (
                                <p className={`text-sm ${isError ? "text-red-600" : "text-emerald-600"}`}>{message}</p>
                            ) : null}

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full rounded-2xl bg-delta-blue px-4 py-3 font-semibold text-white transition hover:bg-delta-violet disabled:opacity-60"
                            >
                                {isPending ? "Проверяем..." : "Войти"}
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
}
