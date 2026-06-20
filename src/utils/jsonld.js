import { person } from '@/data/portfolio.js'

const BASE = 'https://makiz-code.github.io/MKirell'

const stripMd = s => (s || '').replace(/\*\*/g, '').replace(/✦/g, '').trim()

const flagCodeToLang = { gb: 'en', fr: 'fr', tn: 'ar' }

function extractDate(str) {
  const s = (str || '').split('·')[0].trim()
  const mm = s.match(/^(\d{2})\/(\d{4})/)
  if (mm) return `${mm[2]}-${mm[1]}`
  const y = s.match(/^(\d{4})/)
  if (y) return y[1]
  return undefined
}

function parsePeriod(period) {
  const [a, b] = (period || '').split(/\s*[—–]\s*/)
  return {
    startDate: extractDate(a) || undefined,
    endDate:   b ? extractDate(b) || undefined : undefined,
  }
}

export function buildJsonLd(locale, lang) {
  const { experience, projects, education, skills, about } = locale

  return {
    '@context': 'https://schema.org',
    '@graph': [
      /* ── Page ──────────────────────────────────────────────── */
      {
        '@type': 'ProfilePage',
        '@id':   `${BASE}/#webpage`,
        url:     BASE,
        name:    `${person.name} — ${experience.jobs[0].role}`,
        description: stripMd(about.paragraphs[0]),
        inLanguage:  ['en', 'fr', 'ar'],
        mainEntity:  { '@id': `${BASE}/#person` },
      },

      /* ── Person ─────────────────────────────────────────────── */
      {
        '@type':    'Person',
        '@id':      `${BASE}/#person`,
        name:       person.name,
        givenName:  person.givenName,
        familyName: person.familyName,
        email:      `mailto:${person.email}`,
        telephone:  person.phone,
        url:        person.url,
        sameAs:     [person.linkedin],
        jobTitle:   experience.jobs[0].role,
        description: about.paragraphs.map(stripMd).join(' '),
        address: {
          '@type':         'PostalAddress',
          addressLocality: person.addressLocality,
          addressRegion:   person.addressRegion,
          addressCountry:  person.addressCountry,
        },

        /* Work history */
        worksFor: experience.jobs.map(job => {
          const { startDate, endDate } = parsePeriod(job.period)
          const entry = {
            '@type':      'EmployeeRole',
            roleName:     job.role,
            description:  job.bullets.map(stripMd).join(' '),
            worksFor:     { '@type': 'Organization', name: job.company },
          }
          if (startDate) entry.startDate = startDate
          if (!job.current && endDate) entry.endDate = endDate
          return entry
        }),

        /* Education institutions */
        alumniOf: education.degrees.map(deg => ({
          '@type': 'EducationalOrganization',
          name:    deg.school,
        })),

        /* Degrees + certifications */
        hasCredential: [
          ...education.degrees.map(deg => {
            const { startDate, endDate } = parsePeriod(deg.years)
            const cred = {
              '@type':             'EducationalOccupationalCredential',
              credentialCategory:  'degree',
              name:                deg.title,
              recognizedBy:        { '@type': 'EducationalOrganization', name: deg.school },
            }
            if (startDate) cred.startDate = startDate
            if (endDate)   cred.endDate   = endDate
            if (deg.mention) cred.description = stripMd(deg.mention)
            return cred
          }),
          ...education.certs.map(cert => ({
            '@type':            'EducationalOccupationalCredential',
            credentialCategory: 'certification',
            name:               cert.title,
            recognizedBy:       { '@type': 'Organization', name: cert.issuer },
          })),
        ],

        /* Technical skills (always EN tag names) */
        knowsAbout: skills.categories.flatMap(cat => cat.tags),

        /* Spoken languages */
        knowsLanguage: skills.languages.map(l => ({
          '@type':       'Language',
          name:          l.name,
          alternateName: flagCodeToLang[l.flagCode] ?? l.flagCode,
        })),

        /* Awards */
        award: education.awards.map(a => `${a.title} — ${a.event}`),

        /* Volunteering */
        memberOf: education.vols.map(vol => {
          const { startDate, endDate } = parsePeriod(vol.period)
          const role = {
            '@type':      'OrganizationRole',
            roleName:     vol.role,
            description:  stripMd(vol.desc),
            memberOf:     { '@type': 'Organization', name: vol.org },
          }
          if (startDate) role.startDate = startDate
          if (endDate)   role.endDate   = endDate
          return role
        }),
      },

      /* ── Projects ───────────────────────────────────────────── */
      ...projects.items.map(proj => ({
        '@type':               'SoftwareApplication',
        '@id':                 `${BASE}/#project-${proj.title.toLowerCase().replace(/\s+/g, '-')}`,
        name:                  proj.title,
        author:                { '@id': `${BASE}/#person` },
        description:           stripMd(proj.desc),
        applicationCategory:   'Artificial Intelligence',
        keywords:              proj.tags.join(', '),
      })),
    ],
  }
}
