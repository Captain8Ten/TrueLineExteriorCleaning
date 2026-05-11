/** Public business contact — single source for phone/email across the site. */
export const BUSINESS_PHONE_DISPLAY = '810-429-8752'
/** E.164 for tel: links (US). */
export const BUSINESS_PHONE_TEL = '+18104298752'
export const BUSINESS_EMAIL = 'contact@truelineexteriorcleaning.com'

/** Public profile URLs — update if your handles differ. */
export const SOCIAL_FACEBOOK_URL = 'https://www.facebook.com/truelineexteriorcleaning'
export const SOCIAL_INSTAGRAM_URL = 'https://www.instagram.com/truelineexteriorcleaning/'

/** Max 10 digits; formats as XXX-XXX-XXXX as the user types. */
export function formatPhoneInput(value) {
  const d = String(value).replace(/\D/g, '').slice(0, 10)
  if (d.length === 0) return ''
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`
}
