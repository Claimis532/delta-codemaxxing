export interface HeroPhoto {
    id: string;
    src: string;
    alt: string;
}

export interface HeroSection {
    eyebrow: string;
    headline: string;
    description: string;
    photos: HeroPhoto[];
}

export interface FooterSection {
    companyName: string;
    introText: string;
    phone: string;
    phoneHref: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    companyLegalName: string;
    legalDetails: string;
    workHours: string;
    privacyPolicyUrl: string;
    privacyPolicyLabel: string;
    copyrightLabel: string;
}

export interface ProjectGalleryItem {
    id: string;
    src: string;
    objectName: string;
}

export interface ProjectCard {
    id: string;
    title: string;
    description: string;
    badge: string;
    coverImage: string;
    objectNames: string[];
    gallery: ProjectGalleryItem[];
    isPlaceholder?: boolean;
}

export interface ProjectsSectionContent {
    title: string;
    description: string;
    cards: ProjectCard[];
}

export interface SiteContent {
    hero: HeroSection;
    footer: FooterSection;
    projects: ProjectsSectionContent;
}

export interface MailSettings {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
    mailFrom: string;
    mailTo: string;
}

export interface MailSettingsForAdmin {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    mailFrom: string;
    mailTo: string;
    hasPassword: boolean;
}

export interface AdminActionResult<T> {
    success: boolean;
    message: string;
    data?: T;
}
