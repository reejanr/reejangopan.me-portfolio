// Obfuscate email from bots/scrapers while keeping it usable for humans
const emailParts = ["Reejanr90", "gmail", "com"];

export const getEmail = () => `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}`;
export const getMailtoHref = () => `mailto:${getEmail()}`;
export const getEmailDisplay = () => `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}`;

