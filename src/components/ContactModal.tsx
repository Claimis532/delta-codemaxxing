"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { motion, Variants } from "framer-motion";
import { sendProjectRequest } from "@/app/actions"; // Убедись, что путь верный

interface ContactModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ContactModal({ isOpen, closeModal }: ContactModalProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("loading");

        const formData = new FormData(event.currentTarget);

        try {
            const result = await sendProjectRequest(formData);
            if (result.success) {
                setStatus("success");
                // Закрываем через 2 секунды после успеха
                setTimeout(() => {
                    closeModal();
                    setStatus("idle");
                }, 2000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
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
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[32px] bg-delta-paper p-8 shadow-2xl border border-black/5">
                                <div className="flex justify-between items-center mb-6">
                                    <Dialog.Title className="text-2xl font-semibold font-[var(--font-raleway)] text-delta-ink">
                                        Обсудить проект
                                    </Dialog.Title>
                                    <button
                                        onClick={closeModal}
                                        className="h-10 w-10 flex items-center justify-center rounded-full bg-black/[0.03] text-black/40 hover:text-black transition"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {status === "success" ? (
                                    <div className="py-12 text-center animate-in fade-in zoom-in duration-300">
                                        <div className="text-5xl mb-4">🚀</div>
                                        <h3 className="text-xl font-bold text-delta-blue">Заявка отправлена!</h3>
                                        <p className="text-black/40 mt-2">Мы скоро свяжемся с вами.</p>
                                    </div>
                                ) : (
                                    <form className="space-y-4" onSubmit={handleSubmit}>
                                        <div className="space-y-1">
                                            <input
                                                name="name" // Добавлено
                                                required
                                                type="text"
                                                placeholder="Ваше имя"
                                                className="w-full rounded-2xl border border-black/10 bg-white p-4 outline-none focus:ring-2 focus:ring-delta-blue transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <input
                                                name="contact" // Добавлено
                                                required
                                                type="text"
                                                placeholder="Телефон или Email"
                                                className="w-full rounded-2xl border border-black/10 bg-white p-4 outline-none focus:ring-2 focus:ring-delta-blue transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <textarea
                                                name="message" // Добавлено
                                                required
                                                placeholder="Расскажите немного о проекте"
                                                rows={4}
                                                className="w-full rounded-2xl border border-black/10 bg-white p-4 outline-none focus:ring-2 focus:ring-delta-blue transition-all resize-none"
                                            />
                                        </div>

                                        {status === "error" && (
                                            <p className="text-red-500 text-sm text-center">Произошла ошибка. Попробуйте снова.</p>
                                        )}

                                        <button
                                            type="submit" // Убедись, что тип submit
                                            disabled={status === "loading"}
                                            className="w-full bg-delta-blue text-white py-4 rounded-2xl font-bold hover:bg-delta-violet transition-all shadow-lg shadow-delta-blue/20 active:scale-[0.98] disabled:opacity-50"
                                        >
                                            {status === "loading" ? "Отправка..." : "Отправить запрос"}
                                        </button>

                                        <p className="text-[10px] text-center text-black/40 px-4">
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