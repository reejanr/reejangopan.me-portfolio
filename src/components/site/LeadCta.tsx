import { profile } from "@/data/site";
import { ArrowUpRight } from "./Icons";

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
  </svg>
);

/**
 * Lead capture block: email (with a pre-filled subject), WhatsApp (pre-filled message) and phone.
 * `topic` tailors the messages, e.g. "Microsoft 365 & IT infrastructure".
 */
export function LeadCta({
  topic,
  title = "Let's talk about your project",
  text = "Tell Reejan what you're planning or what's slowing your business down — you'll get a clear, practical next step.",
}: { topic?: string; title?: string; text?: string }) {
  const subject = encodeURIComponent(topic ? `Enquiry: ${topic}` : "Project enquiry from reejangopan.me");
  const wa = encodeURIComponent(topic ? `Hi Reejan, I'm interested in ${topic}.` : "Hi Reejan, I found your website and would like to discuss a project.");
  return (
    <aside className="lead-box rv" aria-label="Contact Reejan">
      <div>
        <p className="mono acc" style={{ margin: 0 }}>Free consultation</p>
        <h2 className="disp h3" style={{ marginTop: 12 }}>{title}</h2>
        <p className="body" style={{ margin: "10px 0 0", maxWidth: 560 }}>{text}</p>
      </div>
      <div className="lead-actions">
        <a className="btn btn-acc" href={`mailto:${profile.email}?subject=${subject}`}>Email Reejan <ArrowUpRight /></a>
        <a className="btn btn-ghost" href={`${profile.whatsapp}?text=${wa}`} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp</a>
        <a className="btn btn-ghost" href={profile.phoneHref}>Call {profile.phone}</a>
      </div>
    </aside>
  );
}
