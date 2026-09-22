import Link from 'next/link'

const facts = [
  { value: '30+', label: 'Years of career and technical education' },
  { value: '1,500', label: 'Students across all five boroughs' },
  { value: '9', label: 'Programs across trades and technology' },
  { value: '17–21', label: 'Ages for shared instruction and graduates' },
]

export function Mission() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-navy-900 sm:text-4xl">Our Mission</h2>
        <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-blue-600" />
        <p className="mt-6 text-base leading-8 text-ink-700 sm:text-lg">
          The{' '}
          <Link href="/about" className="font-semibold text-blue-600 hover:underline">
            School of Cooperative Technical Education
          </Link>{' '}
          exists to provide students with the opportunity to learn both the traditional trades along
          with a variety of{' '}
          <Link href="/programs" className="font-semibold text-blue-600 hover:underline">
            state-of-the-art technology courses
          </Link>
          .
        </p>
        <p className="mt-4 text-base leading-8 text-ink-700 sm:text-lg">
          Our students will develop the skills to become{' '}
          <Link href="/resources" className="font-semibold text-blue-600 hover:underline">
            independent, self-supporting, lifelong learners
          </Link>{' '}
          in an increasingly complex and technologically based society.
        </p>
      </div>
      <dl className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="rounded-2xl bg-fog-50 px-5 py-6 text-center">
            <dt className="text-3xl font-bold text-navy-900">{fact.value}</dt>
            <dd className="mt-2 text-sm leading-6 text-ink-700">{fact.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
