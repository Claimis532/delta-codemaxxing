"use client";

import dynamic from "next/dynamic";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode
} from "react";
import { type ProjectCategory } from "@/constants/content";

const ContactModal = dynamic(
    () => import("@/components/ContactModal").then((module) => module.ContactModal),
    { ssr: false }
);

const ProjectCategoryModal = dynamic(
    () => import("@/components/ProjectCategoryModal").then((module) => module.ProjectCategoryModal),
    { ssr: false }
);

type ModalActions = {
    openContactModal: () => void;
    openCategoryModal: (category: ProjectCategory) => void;
};

const ModalActionsContext = createContext<ModalActions | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(null);
    const [actions] = useState<ModalActions>(() => ({
        openContactModal: () => setIsContactOpen(true),
        openCategoryModal: (category) => setActiveCategory(category)
    }));

    const isAnyModalOpen = isContactOpen || activeCategory !== null;

    useEffect(() => {
        document.body.classList.toggle("modal-open", isAnyModalOpen);

        return () => {
            document.body.classList.remove("modal-open");
        };
    }, [isAnyModalOpen]);

    return (
        <ModalActionsContext.Provider value={actions}>
            {children}
            <ContactModal isOpen={isContactOpen} closeModal={() => setIsContactOpen(false)} />
            {activeCategory ? (
                <ProjectCategoryModal
                    key={activeCategory.id}
                    isOpen
                    category={activeCategory}
                    closeModal={() => setActiveCategory(null)}
                />
            ) : null}
        </ModalActionsContext.Provider>
    );
}

export function useModalActions() {
    const context = useContext(ModalActionsContext);

    if (!context) {
        throw new Error("useModalActions must be used within ModalProvider");
    }

    return context;
}
