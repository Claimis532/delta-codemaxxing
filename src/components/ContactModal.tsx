"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { sendProjectRequest } from "@/app/actions";

interface ContactModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

export function ContactModal({ isOpen, closeModal }: ContactModalProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [startedAt] = useState(() => Date.now());

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        const formData = new FormData(event.currentTarget);

        try {
            const result = await sendProjectRequest(formData);

            if (result.success) {
                setStatus("success");
                event.currentTarget.reset();

                setTimeout(() => {
                    closeModal();
                    setStatus("idle");
                    setErrorMessage("");
                }, 2000);
            } else {
                setStatus("error");
                setErrorMessage(result.error || "Не удалось отправить заявку. Попробуйте еще раз.");
            }
        } catch {
            setStatus("error");
            setErrorMessage("Не удалось отправить заявку. Попробуйте еще раз.");
        }
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/55" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[32px] border border-black/5 bg-delta-paper p-8 shadow-2xl">
                                <div className="mb-6 flex items-center justify-between">
                                    <Dialog.Title className="font-[var(--font-raleway)] text-2xl font-semibold text-delta-ink">
                                        Обсудить проект
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.03] text-black/40 transition hover:text-black"
                                    >
                                        ×
                                    </button>
                                </div>

                                {status === "success" ? (
                                    <div className="animate-in fade-in zoom-in py-12 text-center duration-300">
                                        <div className="mb-4 text-5xl">Спасибо!</div>
                                        <h3 className="text-xl font-bold text-delta-blue">Заявка отправлена</h3>
                                        <p className="mt-2 text-black/40">Мы скоро свяжемся с вами.</p>
                                    </div>
                                ) : (
                                    <form className="space-y-4" onSubmit={handleSubmit}>
                                        <input type="hidden" name="startedAt" value={startedAt} />
                                        <div className="hidden" aria-hidden="true">
                                            <label htmlFor="company">Company</label>
                                            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                                        </div>

                                        <div className="space-y-1">
                                            <input
                                                name="name"
                                                required
                                                type="text"
                                                maxLength={120}
                                                autoComplete="name"
                                                placeholder="Ваше имя"
                                                className="w-full rounded-2xl border border-black/10 bg-white p-4 outline-none transition-all focus:ring-2 focus:ring-delta-blue"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <input
                                                name="contact"
                                                required
                                                type="text"
                                                maxLength={160}
                                                autoComplete="email"
                                                placeholder="Телефон или Email"
                                                className="w-full rounded-2xl border border-black/10 bg-white p-4 outline-none transition-all focus:ring-2 focus:ring-delta-blue"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <textarea
                                                name="message"
                                                required
                                                rows={4}
                                                maxLength={4000}
                                                placeholder="Расскажите немного о проекте"
                                                className="w-full resize-none rounded-2xl border border-black/10 bg-white p-4 outline-none transition-all focus:ring-2 focus:ring-delta-blue"
                                            />
                                        </div>

                                        {status === "error" && <p className="text-center text-sm text-red-500">{errorMessage}</p>}

                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="w-full rounded-2xl bg-delta-blue py-4 font-bold text-white shadow-lg shadow-delta-blue/20 transition-all hover:bg-delta-violet active:scale-[0.98] disabled:opacity-50"
                                        >
                                            {status === "loading" ? "Отправка..." : "Отправить запрос"}
                                        </button>

                                        <p className="px-4 text-center text-[10px] text-black/40">
                                            Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                                        </p>
                                    </form>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
