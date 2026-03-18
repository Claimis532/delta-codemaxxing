import { Variants } from "framer-motion";

const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const rise: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.72, delay, ease: easeCurve }
    })
};

export const roadmapPath: Variants = {
    hidden: { pathLength: 0, opacity: 0.2 },
    show: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 1.2, delay: 0.15, ease: [0.37, 0, 0.63, 1] }
    }
};

export const roadmapDot: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    show: (order: number = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.36, delay: 0.45 + order * 0.26, ease: easeCurve }
    })
};

export const roadmapStage: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    show: (order: number = 0) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.46, delay: 0.6 + order * 0.26, ease: easeCurve }
    })
};