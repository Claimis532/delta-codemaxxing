import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { isAdminAuthConfigured, isAdminAuthenticated } from "@/lib/admin-auth";
import { getMailSettingsForAdmin } from "@/lib/mail-settings";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
    const authConfigured = isAdminAuthConfigured();
    const isAuthenticated = await isAdminAuthenticated();

    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    const [siteContent, mailSettings] = await Promise.all([
        getSiteContent(),
        getMailSettingsForAdmin()
    ]);

    return (
        <AdminDashboard
            initialContent={siteContent}
            initialMailSettings={mailSettings}
            authConfigured={authConfigured}
        />
    );
}
