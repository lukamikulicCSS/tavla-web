/**
 * English validation messages, API responses and the newsletter confirmation email.
 * Same keys as content/hr/messages.ts (type Messages).
 */
import type { Messages } from "../hr/messages";

export const messages: Messages = {
  venueTypes: {
    kafic: "Café",
    restoran: "Restaurant",
    bar: "Bar",
    "beach-bar": "Beach bar",
    "nocni-klub": "Nightclub",
    hotel: "Hotel",
    ostalo: "Other",
  },

  contact: {
    nameMin: "Enter your full name.",
    nameMax: "Name is too long.",
    businessMin: "Enter your venue name.",
    businessMax: "Venue name is too long.",
    email: "Enter a valid email address.",
    phoneMax: "Number is too long.",
    phoneChars: "Use only digits, spaces and +.",
    venueType: "Select a venue type.",
    messageMin: "Write at least a few words.",
    messageMax: "Message can be up to 2000 characters.",
    privacy: "Please confirm you have read the privacy notice.",
  },

  api: {
    forbidden: "Request not allowed.",
    badFormat: "Invalid request format.",
    tooLong: "Message is too long.",
    tooLarge: "Request is too large.",
    rateLimited: "You've sent too many requests in a short time. Please try again in a few minutes.",
    nlRateLimited: "Too many attempts. Please try again in a few minutes.",
    checkFields: "Please check the highlighted fields.",
    turnstile: "We couldn't verify you're not a robot. Refresh the page and try again.",
    unavailable: "Sending isn't possible right now. Please try later or email us directly.",
    sendFailed: "Sending failed. Please try again in a minute.",
    nlCheckInbox: "Check your inbox to confirm your signup.",
    nlCheckAddress: "Check the email address you entered.",
    nlUnavailable: "Signup isn't possible right now. Please try later.",
    methodNotAllowed: "Method not allowed.",
    unsubInvalid: "Invalid unsubscribe link.",
    unsubUnavailable: "Unsubscribing isn't possible right now.",
    unsubDone: "You're unsubscribed.",
  },

  newsletter: {
    consentText:
      "By signing up, you agree that Tavla may send you updates and offers by email, once a month at most. You can unsubscribe in every email.",
    email: {
      subject: "Confirm your signup for Tavla updates",
      htmlTitle: "Confirm your signup",
      heading: "Confirm your signup.",
      body: "Someone (hopefully you) signed up this address for Tavla updates. We send one email a month at most: what's new in Tavla and when new features reach venues.",
      button: "Confirm signup",
      expiry: "This link is valid for 48 hours. If you didn't sign up, just ignore this email and you won't hear from us.",
      unsubscribe: "Unsubscribe",
      textIntro: "Confirm your signup for Tavla updates",
      textBody: "We send one email a month at most. To confirm, open:",
      textExpiry: "This link is valid for 48 hours. If you didn't sign up, just ignore this email.",
    },
  },
};
