/**
 * Willow River Counseling — sample practice configuration
 * ========================================================
 * THIS IS THE ONLY FILE YOU NEED TO EDIT for a new client.
 *
 * Every therapist-specific detail lives here: name, credentials, copy,
 * specialties, fees, photos, logo, colours, contact, crisis text, and
 * which optional sections to show. The layout files (HTML, CSS, JS)
 * read from `window.SITE` and should be left alone.
 *
 * All names, fees, addresses and biography details below are FICTIONAL
 * placeholders for the template preview. Replace every one of them.
 *
 * After editing, refresh the site. No build step is required.
 */
window.SITE = {
  /* ── Identity ─────────────────────────────────────────────────────── */
  practiceName: "Willow River Counseling",
  therapistName: "Dr. Jordan Rivers",
  credentials: "LCSW",
  pronouns: "they/them",
  professionalTitle: "Licensed Clinical Social Worker",
  tagline: "A calm place to land.",
  shortDescription:
    "Warm, collaborative therapy for adults navigating anxiety, life transitions, and the wish to feel more at home in yourself.",
  heroSubhead:
    "In person in Portland, and by video across Oregon and Washington. We will go at your pace.",
  acceptingClients: true,
  acceptingLabel: "Accepting new clients",
  waitlistLabel: "Waitlist open — you are welcome to reach out",

  /* ── Logo ───────────────────────────────────────────────────────────
   * Set `logo` to a path such as "images/logo.png" to show a logo in
   * the header and footer. Leave it as an empty string to use an
   * elegant wordmark made from the practice name. The small leaf mark
   * can be hidden with `showMark: false`.
   */
  logo: "",
  logoAlt: "",
  showMark: true,
  markSrc: "images/mark.svg",
  favicon: "images/favicon.svg",

  /* ── Colours (applied as CSS variables) ───────────────────────────── */
  colors: {
    cream: "#F6F2EB",
    creamDark: "#EBE4D8",
    paper: "#FDFCFA",
    sage: "#3A5447",
    sageMid: "#4F6F5E",
    sageSoft: "#DCE6DF",
    sageMist: "#EEF3F0",
    ink: "#2A332E",
    inkSoft: "#5A655E",
    gold: "#C4B08A",
    terracotta: "#8B5340"
  },

  /* ── Photos (all stored locally in /images; do not hotlink) ───────── */
  photos: {
    hero: {
      src: "images/hero.jpg",
      alt: "A calm, sunlit sitting room with plants, a leather sofa and two chairs — placeholder photo."
    },
    portrait: {
      src: "images/portrait.jpg",
      alt: "Placeholder portrait (stock photo). Replace with the therapist's own photograph.",
      caption: "Placeholder photo — replace with the therapist's portrait."
    },
    office: {
      src: "images/office.jpg",
      alt: "A bright living room with a grey sofa, wood floors and large plants — placeholder photo."
    },
    chair: {
      src: "images/chair.jpg",
      alt: "A mustard armchair in a quiet, modern room — placeholder photo."
    },
    nature: {
      src: "images/nature.jpg",
      alt: "A sunlit path through tall evergreen trees — placeholder photo."
    },
    landscape: {
      src: "images/forest-mist.jpg",
      alt: "Evergreen forest and distant mountains at dusk — placeholder photo."
    },
    plants: {
      src: "images/plants.jpg",
      alt: "A small succulent in a mint-green pot — placeholder photo."
    },
    books: {
      src: "images/books.jpg",
      alt: "Shelves of books in soft focus — placeholder photo."
    },
    window: {
      src: "images/window.jpg",
      alt: "A softly lit open-plan room with a sofa and staircase — placeholder photo."
    }
  },

  /* ── Location and session formats ─────────────────────────────────── */
  location: {
    city: "Portland",
    state: "Oregon",
    address: "214 Placeholder Street, Suite 4",
    postalCode: "Portland, OR 97205",
    addressNote: "This is a sample address. Exact office details are shared after a session is scheduled.",
    showAddress: true
  },
  telehealth: {
    available: true,
    states: ["Oregon", "Washington"],
    note: "Telehealth sessions are available for clients physically located in Oregon or Washington at the time of the session."
  },
  sessionFormats: ["In person", "Telehealth"],

  /* ── Contact ──────────────────────────────────────────────────────── */
  contact: {
    email: "hello@example.com",
    inquiryEmail: "hello@example.com",
    phone: "(555) 010-0142",
    phoneNote: "This is a placeholder number. Voicemail is returned within two business days.",
    hours: "Tuesday–Friday, 10am–6pm PT",
    responseTime: "I usually reply within two business days."
  },
  social: {
    instagram: "",
    psychologyToday: "",
    linkedin: "",
    facebook: ""
  },

  /* ── Site URL (used for SEO, the form thank-you redirect, and sitemap) */
  siteUrl: "https://averrylstudio.github.io/therapist-site-template",
  language: "en",

  /* ── About ────────────────────────────────────────────────────────── */
  aboutLead:
    "Hello — I'm Jordan. I offer a steady, unhurried space for adults who are tired of holding everything together on their own.",
  bioShort:
    "I am a licensed clinical social worker. My work is warm, collaborative and trauma-informed. You are the expert on your life; I am here to help you listen to it more closely.",
  bioLong: [
    "People often arrive at therapy feeling anxious, stretched thin, or unsure how they got so far from themselves. Some are moving through a big life change. Some are living with the after-effects of things that happened years ago. Many are simply ready to feel different, even if they cannot yet name what they need.",
    "In our work together I will not rush you, and I will not ask you to share more than you are ready for. Sessions are a conversation: curious, grounded, and at a pace that feels safe. I draw on trauma-informed practice, parts work, and practical tools for anxiety — always chosen with you, never applied as a script.",
    "Outside of sessions I am usually outdoors, reading, or making a pot of tea that I then forget to drink. (This paragraph is sample colour — replace it with a short personal note the therapist is comfortable sharing.)"
  ],
  approachTitle: "How I work",
  approach:
    "Therapy with me is collaborative and warm. I will listen closely, ask careful questions, and help you notice patterns with kindness rather than judgment. The goal is not a perfect version of you — it is a life that feels more like your own.",
  values: [
    {
      title: "At your pace",
      text: "You never have to share more than you are ready for. We will move as slowly as your nervous system needs."
    },
    {
      title: "You are the expert",
      text: "I bring training and a steady presence. You bring the knowledge of your own life. We use both."
    },
    {
      title: "Trauma-informed",
      text: "Safety, choice and collaboration come first. I pay attention to how your body and history show up in the room."
    },
    {
      title: "Practical and deep",
      text: "We can work with what is happening this week, and with the older stories underneath it. Both belong."
    }
  ],
  trainingTitle: "Training and credentials",
  trainingNote:
    "The entries below are sample text for the template. Replace them with the therapist's real training, license and professional memberships. Never invent credentials.",
  training: [
    "Licensed Clinical Social Worker (LCSW) — Oregon, Washington (placeholder)",
    "Master of Social Work — Placeholder University (sample text, replace this)",
    "Additional training in trauma-informed care and parts-informed therapy (placeholder)",
    "Member of [professional association — replace with a real membership, or remove]"
  ],

  /* ── Specialties and services ─────────────────────────────────────── */
  specialtiesIntro:
    "I work with adults who want a thoughtful, grounded place to make sense of what they are carrying.",
  specialties: [
    {
      name: "Anxiety and overthinking",
      description: "The tight chest, the looping thoughts, the sense that you should be able to calm down and cannot. We will work gently with both the mind and the body."
    },
    {
      name: "Life transitions",
      description: "A new city, a new role, a relationship ending or beginning, a season of 'I don't recognise my life anymore.' Transitions deserve a place to land."
    },
    {
      name: "Trauma-informed support",
      description: "For people living with the after-effects of overwhelming experiences. We go slowly, with plenty of choice, and we never push past what feels workable."
    },
    {
      name: "Relationship patterns",
      description: "The same argument, the same disappearing act, the same wish to be closer and the same fear of it. Individual therapy can be a place to understand what you bring to your relationships."
    },
    {
      name: "ADHD and feeling overwhelmed",
      description: "For adults navigating attention, executive function, and the exhaustion of trying to keep up. Practical, compassionate, and free of shame."
    },
    {
      name: "Self-worth and identity",
      description: "Who you are when you are not performing, pleasing, or shrinking. A place to meet yourself with more kindness."
    }
  ],
  servicesIntro:
    "Sessions are fifty minutes unless we arrange something different. We can meet in the Portland office or over a secure video call.",
  services: [
    {
      name: "Individual therapy",
      duration: "50 minutes",
      description: "One-to-one sessions for adults. We will set a direction together and revisit it as your needs change."
    },
    {
      name: "A first consult",
      duration: "15–20 minutes, complimentary",
      description: "A short call to ask questions, feel out whether we are a good fit, and decide on next steps. No obligation."
    },
    {
      name: "Couples therapy",
      duration: "60 minutes",
      description: "For partners who want a calmer, more honest way of being together. (This is placeholder — remove this service if the therapist does not offer it.)"
    }
  ],
  whoIWorkWith:
    "I work with adults (18+). I welcome clients of every race, ethnicity, gender identity, sexual orientation, faith, and disability. If you are looking for a therapist for a child or adolescent, I am happy to try to point you toward a colleague.",
  whoIDont:
    "This practice is not a crisis or emergency service, and it is not a substitute for inpatient or intensive outpatient care. If you need that level of support, I will help you find it.",

  /* ── Fees, in plain words ─────────────────────────────────────────── */
  fees: {
    intro:
      "Talking about money in therapy can feel awkward. Here is how fees work in this practice, in plain words. (All figures below are placeholders — replace them with the therapist's real fees.)",
    items: [
      { name: "Individual session, 50 minutes", price: "$165", note: "Placeholder fee." },
      { name: "Couples session, 60 minutes", price: "$195", note: "Placeholder fee. Remove if not offered." },
      { name: "First consult, 15–20 minutes", price: "Complimentary", note: "A short call to see whether we are a good fit." }
    ],
    insuranceTitle: "Insurance, in plain words",
    insurance:
      "I am a private-pay practice, which means you pay me directly and I do not bill insurance for you. If you have out-of-network benefits, I can give you a document called a superbill — an itemised receipt you can send to your insurer yourself, to ask for partial reimbursement. I cannot promise what they will cover. I am always happy to explain this on a call.",
    slidingScaleTitle: "Reduced-fee sessions",
    slidingScale:
      "A small number of reduced-fee places are reserved for clients who could not otherwise afford weekly therapy. Please mention this when you enquire and we can see what is available. (Placeholder policy — replace with the therapist's own.)",
    cancellationTitle: "Cancellations",
    cancellation:
      "Please give at least 24 hours' notice if you need to cancel or move a session. Sessions cancelled later than that, or missed, are charged at the full fee, except in an emergency. (Placeholder policy — replace with the therapist's own.)",
    paymentNote: "Payment is due at the time of the session, by card or another method we agree on."
  },

  /* ── FAQ ──────────────────────────────────────────────────────────── */
  faq: [
    {
      q: "How do I get started?",
      a: "Use the session-request form, or email me directly. I will reply within two business days, and we can arrange a complimentary consult if you would like one, or go straight to a first session."
    },
    {
      q: "What is a first session like?",
      a: "We will talk about what is bringing you to therapy, what you have already tried, and what you hope might feel different. There is no pressure to tell your whole story. By the end we will have a sense of whether we are a good fit and what next steps could look like."
    },
    {
      q: "Do you offer telehealth?",
      a: "Yes. I meet clients over a secure video platform if they are located in Oregon or Washington at the time of the session. In-person sessions take place in my Portland office."
    },
    {
      q: "How often would we meet?",
      a: "Most people begin with weekly sessions. As things settle we may move to every other week. We will decide together."
    },
    {
      q: "Do you take insurance?",
      a: "I do not bill insurance directly. I can provide a superbill for you to submit to your insurer for possible out-of-network reimbursement. There is a fuller explanation on the Fees page."
    },
    {
      q: "Is this a good place if I am in crisis?",
      a: "This practice is not a crisis service and I cannot provide emergency support. If you are in crisis, call or text 988 in the United States, or your local emergency number, or go to your nearest emergency department. You are still welcome to reach out here when you are safe."
    }
  ],

  /* ── First-session timeline ───────────────────────────────────────── */
  firstSessionIntro:
    "Starting therapy can feel like a big step. Here is, simply, what happens next.",
  firstSession: [
    {
      title: "You reach out",
      text: "Fill in the session-request form, or send a short email. You do not need to have the right words. A sentence or two is enough."
    },
    {
      title: "I will be in touch",
      text: "I usually reply within two business days. We can book a complimentary 15-minute consult, or go ahead and schedule a first session."
    },
    {
      title: "A first meeting",
      text: "Fifty minutes, in person or by video. We will go at your pace. You are welcome to bring questions, and you are welcome to decide afterwards whether it felt like a fit."
    },
    {
      title: "Afterward",
      text: "If we both feel it is a good match, we will find a regular time. If not, I will do my best to suggest other places to turn. Either outcome is a good one."
    }
  ],

  /* ── "Is this a good fit?" checklist ──────────────────────────────── */
  fitTitle: "Is this a good fit?",
  fitIntro:
    "A few gentle questions to sit with. There are no right answers, and this is not a test.",
  fitDisclaimer:
    "This is a short personal reflection, not a diagnosis, a screening tool, or a clinical assessment. It cannot tell you whether you 'should' start therapy, and it does not reserve a place in the practice.",
  fitQuestions: [
    "I have been thinking about starting therapy for a while.",
    "I am looking for a warm, collaborative space, not a quick fix.",
    "I want support with anxiety, a life change, relationships, trauma, or feeling stuck.",
    "I can meet in Portland, or by telehealth from Oregon or Washington.",
    "I feel a little nervous about reaching out, and I am ready to try anyway."
  ],
  fitCta:
    "If several of these feel true, you are welcome to request a session. There is no commitment — just a conversation.",
  fitCtaSoft:
    "If even one of these feels true, you are still welcome to reach out. You do not have to be certain.",
  fitCtaEmpty:
    "These are only prompts. Take what is useful, and leave the rest. Whenever you are ready, the request form is here.",

  /* ── Crisis and safety ────────────────────────────────────────────── */
  crisisText:
    "If you are in crisis, call or text 988 (US) or your local emergency number. This website is not a crisis service and cannot provide emergency support.",
  emergencyFormNote:
    "This form is not for emergencies. If you are in crisis, call or text 988 (US) or your local emergency number, or go to your nearest emergency department.",

  /* ── Downloadable resource ────────────────────────────────────────── */
  resource: {
    enabled: true,
    title: "Preparing for your first session",
    description:
      "A short, gentle guide you can download and keep. A few prompts, a little practical information, and nothing you have to finish.",
    file: "assets/preparing-for-your-first-session.pdf",
    label: "Download the guide (PDF)"
  },

  /* ── Testimonials (placeholders only — never invent client words) ── */
  testimonials: {
    show: true,
    heading: "Kind words",
    items: [
      { quote: "Client words will go here.", attribution: "Placeholder — not a real client" },
      { quote: "Client words will go here.", attribution: "Placeholder — not a real client" }
    ]
  },

  /* ── Form ─────────────────────────────────────────────────────────── */
  form: {
    subject: "New session request — Willow River Counseling",
    thankYouPath: "thank-you.html",
    submitLabel: "Send my request",
    autoresponse:
      "Thank you for reaching out to Willow River Counseling. This is an automatic confirmation that your message arrived. I will reply personally within two business days. If you are in crisis, please call or text 988 (US) or your local emergency number — this inbox is not monitored for emergencies.",
    consentText:
      "I understand this form is not for emergencies, and I am happy for the practice to reply to me by email or the method I chose above."
  },

  /* ── Footer credit (Averryl Studio) ───────────────────────────────── */
  footerCredit: {
    show: true,
    text: "Site by Averryl Studio",
    url: "https://averryl.com"
  },

  /* ── Closing CTA ──────────────────────────────────────────────────── */
  closingTitle: "When you are ready, I am here.",
  closingText:
    "Reaching out is often the hardest part. A short message is enough. We can take the next step together."
};
