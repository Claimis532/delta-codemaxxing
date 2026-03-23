"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendProjectRequest(formData: FormData) {
    const name = formData.get("name") as string;
    const contact = formData.get("contact") as string;
    const message = formData.get("message") as string;

    if (!name || !contact || !message) {
        return { success: false, error: "Все поля обязательны для заполнения" };
    }

    try {
        const data = await resend.emails.send({
            from: "Delta Design <onboarding@resend.dev>", // Пока нет своего домена, оставляем этот адрес
            to: ["kkjj.ggggggg2017@yandex.ru"], // ПОЧТА ТВОЕЙ КОМПАНИИ
            subject: `Заявка с сайта от ${name}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #262674;">Новая заявка на проектирование</h2>
          <p><strong>Имя клиента:</strong> ${name}</p>
          <p><strong>Как связаться:</strong> ${contact}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Описание задачи:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
        });

        return { success: true };
    } catch (error) {
        console.error("Ошибка Resend:", error);
        return { success: false, error: "Не удалось отправить письмо" };
    }
}