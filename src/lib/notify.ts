import "server-only";
import { site, rooms } from "@/lib/site";
import type { Record_ } from "@/lib/store";

/**
 * Email confirmations.
 *
 * Ships in log mode: with no RESEND_API_KEY set, every email is written to the
 * server log instead of sent, so the flow is fully testable before the client's
 * domain is verified. Set RESEND_API_KEY + BOOKING_FROM in .env to go live.
 */

const KEY = process.env.RESEND_API_KEY;
const FROM = process.env.BOOKING_FROM ?? `Frederick's Kitchen <onboarding@resend.dev>`;

type Mail = { to: string; subject: string; html: string };

async function send(mail: Mail): Promise<void> {
  if (!KEY) {
    console.info(
      `[notify] (log mode — no RESEND_API_KEY) to=${mail.to} subject="${mail.subject}"`,
    );
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, ...mail }),
    });
    if (!res.ok) {
      console.error(`[notify] send failed (${res.status}): ${await res.text()}`);
    }
  } catch (err) {
    // A booking must never fail because the mail provider is down.
    console.error("[notify] send threw:", err);
  }
}

const shell = (title: string, body: string) => `
  <div style="background:#0e0d0b;padding:40px 24px;font-family:Georgia,serif;color:#f5efe4">
    <div style="max-width:560px;margin:0 auto;border:1px solid rgba(245,239,228,.12);border-radius:16px;padding:36px">
      <p style="margin:0;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#c8a45c">
        Frederick&rsquo;s Kitchen · Chikmagaluru
      </p>
      <h1 style="margin:20px 0 0;font-size:30px;font-weight:400;line-height:1.2">${title}</h1>
      ${body}
      <hr style="border:0;border-top:1px solid rgba(245,239,228,.12);margin:32px 0" />
      <p style="margin:0;font-size:13px;color:#a99f8d;font-family:Arial,sans-serif">
        ${site.address}<br />
        <a href="tel:${site.phone.replace(/\s/g, "")}" style="color:#c8a45c;text-decoration:none">${site.phone}</a>
        &nbsp;·&nbsp;
        <a href="mailto:${site.email}" style="color:#c8a45c;text-decoration:none">${site.email}</a>
      </p>
    </div>
  </div>`;

const row = (k: string, v: string) => `
  <tr>
    <td style="padding:9px 0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#a99f8d;font-family:Arial,sans-serif;width:140px">${k}</td>
    <td style="padding:9px 0;font-size:15px;color:#f5efe4;font-family:Arial,sans-serif">${escape(v)}</td>
  </tr>`;

const table = (rowsHtml: string) =>
  `<table style="width:100%;border-collapse:collapse;margin:24px 0">${rowsHtml}</table>`;

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

function detailRows(record: Record_): string {
  if (record.kind === "room") {
    const room = rooms.find((r) => r.slug === record.room);
    return (
      row("Room", room?.name ?? record.room) +
      row("Check-in", fmtDate(record.checkIn)) +
      row("Check-out", fmtDate(record.checkOut)) +
      row("Guests", String(record.guests)) +
      row("Name", record.name) +
      row("Phone", record.phone) +
      (record.notes ? row("Requests", record.notes) : "")
    );
  }
  if (record.kind === "table") {
    return (
      row("Date", fmtDate(record.date)) +
      row("Time", record.time) +
      row("Party size", String(record.partySize)) +
      row("Name", record.name) +
      row("Phone", record.phone) +
      (record.notes ? row("Requests", record.notes) : "")
    );
  }
  return (
    row("Subject", record.subject) +
    row("Name", record.name) +
    row("Phone", record.phone) +
    row("Message", record.message)
  );
}

function fmtDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Fires both the guest receipt and the house alert. Never throws. */
export async function notifyNew(record: Record_): Promise<void> {
  const noun =
    record.kind === "room"
      ? "room booking"
      : record.kind === "table"
        ? "table reservation"
        : "enquiry";

  const guestBody = `
    <p style="margin:18px 0 0;font-size:15px;line-height:1.65;color:#a99f8d;font-family:Arial,sans-serif">
      Thank you — we have your ${noun} and it is <strong style="color:#c8a45c">pending confirmation</strong>.
      A member of the house will call or email to confirm, ${
        record.kind === "inquiry" ? "usually within a few hours" : "normally within 24 hours"
      }. No payment is needed now.
    </p>
    ${table(detailRows(record))}
    <p style="margin:0;font-size:13px;color:#a99f8d;font-family:Arial,sans-serif">
      Reference: ${record.id.slice(0, 8).toUpperCase()}
    </p>`;

  await send({
    to: record.email,
    subject: `We have your ${noun} — Frederick's Kitchen`,
    html: shell("Received. We'll confirm shortly.", guestBody),
  });

  await send({
    to: site.email,
    subject: `New ${noun} — ${record.name}`,
    html: shell(
      `New ${noun}`,
      table(detailRows(record) + row("Email", record.email)),
    ),
  });
}

/** Guest-facing note when the house confirms or cancels from the admin panel. */
export async function notifyStatus(record: Record_): Promise<void> {
  if (record.status === "pending") return;

  const confirmed = record.status === "confirmed";
  const body = `
    <p style="margin:18px 0 0;font-size:15px;line-height:1.65;color:#a99f8d;font-family:Arial,sans-serif">
      ${
        confirmed
          ? "It's confirmed — we're looking forward to having you. Come hungry."
          : "This booking has been cancelled. If that's a surprise, call the house and we'll sort it out."
      }
    </p>
    ${table(detailRows(record))}
    <p style="margin:0;font-size:13px;color:#a99f8d;font-family:Arial,sans-serif">
      Reference: ${record.id.slice(0, 8).toUpperCase()}
    </p>`;

  await send({
    to: record.email,
    subject: confirmed
      ? "Confirmed — Frederick's Kitchen"
      : "Cancelled — Frederick's Kitchen",
    html: shell(confirmed ? "You're confirmed." : "Booking cancelled.", body),
  });
}
