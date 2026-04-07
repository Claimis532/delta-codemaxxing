function getPublicValue(name: string, fallback: string) {
    const value = process.env[name]?.trim();
    return value || fallback;
}

export const siteConfig = {
    companyName: getPublicValue("NEXT_PUBLIC_COMPANY_NAME", "Центр проектирования Дельта"),
    companyLegalName: getPublicValue("NEXT_PUBLIC_COMPANY_LEGAL_NAME", 'ООО "Название компании"'),
    companyPhone: getPublicValue("NEXT_PUBLIC_COMPANY_PHONE", "+7 (900) 000-00-00"),
    companyPhoneHref: getPublicValue("NEXT_PUBLIC_COMPANY_PHONE_HREF", "+79000000000"),
    companyEmail: getPublicValue("NEXT_PUBLIC_COMPANY_EMAIL", "hello@example.com"),
    addressLine1: getPublicValue("NEXT_PUBLIC_COMPANY_ADDRESS_LINE1", "Город, улица"),
    addressLine2: getPublicValue("NEXT_PUBLIC_COMPANY_ADDRESS_LINE2", "Офис / этаж"),
    legalDetails: getPublicValue("NEXT_PUBLIC_COMPANY_LEGAL_DETAILS", "ИНН / ОГРН"),
    workHours: getPublicValue("NEXT_PUBLIC_COMPANY_WORK_HOURS", "Пн-Пт: 09:00-18:00"),
    privacyPolicyUrl: getPublicValue("NEXT_PUBLIC_PRIVACY_POLICY_URL", "#"),
    copyrightLabel: getPublicValue("NEXT_PUBLIC_COMPANY_COPYRIGHT", "Все права защищены")
} as const;
