import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
  language: "ko" | "en";
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    const { name, email, company, projectType, budget, message, language } =
      data;

    // 필수 필드 검증
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Gmail SMTP 설정
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 이메일 제목
    const subject =
      language === "ko"
        ? `[RED BRIDGE DEV 문의] ${name}님의 프로젝트 문의`
        : `[RED BRIDGE DEV Inquiry] Project inquiry from ${name}`;

    // 이메일 본문 (HTML)
    const htmlContent =
      language === "ko"
        ? `
      <div style="font-family: 'Noto Sans KR', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">RED BRIDGE DEV</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">새로운 프로젝트 문의가 도착했습니다</p>
        </div>

        <div style="padding: 30px; background: #f9fafb;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 120px;">이름</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">이메일</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">
                <a href="mailto:${email}" style="color: #dc2626; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">회사명</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${company || "미입력"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">프로젝트 유형</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${projectType}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">예상 예산</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${budget || "미정"}</td>
            </tr>
          </table>

          <div style="margin-top: 24px;">
            <h3 style="color: #374151; font-size: 14px; margin: 0 0 12px;">프로젝트 설명</h3>
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="color: #374151; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        </div>

        <div style="padding: 20px; text-align: center; background: #111827;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            이 이메일은 RED BRIDGE DEV 웹사이트에서 자동 발송되었습니다.
          </p>
        </div>
      </div>
    `
        : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">RED BRIDGE DEV</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">New project inquiry received</p>
        </div>

        <div style="padding: 30px; background: #f9fafb;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">
                <a href="mailto:${email}" style="color: #dc2626; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Company</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${company || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Project Type</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${projectType}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Budget</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${budget || "TBD"}</td>
            </tr>
          </table>

          <div style="margin-top: 24px;">
            <h3 style="color: #374151; font-size: 14px; margin: 0 0 12px;">Project Description</h3>
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="color: #374151; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        </div>

        <div style="padding: 20px; text-align: center; background: #111827;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            This email was automatically sent from RED BRIDGE DEV website.
          </p>
        </div>
      </div>
    `;

    // 이메일 발송
    await transporter.sendMail({
      from: `"RED BRIDGE DEV" <${process.env.GMAIL_USER}>`,
      to: "red.bridge.kim.dev@gmail.com",
      replyTo: email,
      subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
