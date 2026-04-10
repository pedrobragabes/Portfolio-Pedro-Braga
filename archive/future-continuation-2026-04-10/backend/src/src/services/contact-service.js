const crypto = require('crypto');

const { saveContactSubmission } = require('../repositories/file-contact-repository');

function toNullableString(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  return normalized === '' ? null : normalized;
}

async function persistContactMessage(payload, requestMeta) {
  const submission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    message: payload.message.trim(),
    serviceType: toNullableString(payload.service_type),
    budget: toNullableString(payload.budget),
    subject: toNullableString(payload._subject) || 'New contact message',
    ip: toNullableString(requestMeta.ip),
    userAgent: toNullableString(requestMeta.userAgent),
    referer: toNullableString(requestMeta.referer)
  };

  await saveContactSubmission(submission);

  return submission;
}

module.exports = {
  persistContactMessage
};
