import Link from 'next/link'

export function Mission() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-navy-900 sm:text-4xl">Our Mission</h2>
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
    </section>
  )
}
