import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Newspaper, Calendar, User, ArrowRight } from 'lucide-react'

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: 'The Future of Waste Management: AI-Powered Solutions',
      excerpt: 'Discover how artificial intelligence is revolutionizing the way we sort and manage waste globally.',
      date: '2024-01-15',
      author: 'Sarah Green',
      readTime: '5 min read',
      slug: 'future-waste-management',
    },
    {
      id: 2,
      title: 'Tips for Reducing Your Carbon Footprint',
      excerpt: 'Learn practical strategies to minimize environmental impact through smart waste sorting practices.',
      date: '2024-01-10',
      author: 'Michael Chen',
      readTime: '7 min read',
      slug: 'reducing-carbon-footprint',
    },
    {
      id: 3,
      title: 'How Recycling Changed the World',
      excerpt: 'An inspiring journey through the history of recycling and its impact on our planet.',
      date: '2024-01-05',
      author: 'Emma Johnson',
      readTime: '6 min read',
      slug: 'recycling-history',
    },
    {
      id: 4,
      title: 'Community Success Stories: Making a Difference',
      excerpt: 'Read about real communities transforming their waste management practices with EcoSort.',
      date: '2024-01-01',
      author: 'David Park',
      readTime: '8 min read',
      slug: 'community-stories',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-6 text-center py-12"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">EcoSort Blog</h1>
        <p className="text-xl text-gray-600">
          Insights, tips, and stories about waste management and sustainability
        </p>
      </motion.div>

      {/* Articles Grid */}
      <main className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {articles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Article Content */}
              <div className="p-8">
                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {article.author}
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{article.readTime}</span>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </main>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-green-500 text-white py-16 px-6 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Subscribe for Updates</h2>
        <p className="text-green-50 mb-8 max-w-xl mx-auto">
          Get the latest articles and sustainability tips delivered to your inbox
        </p>
        <form className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none"
          />
          <button className="px-6 py-3 bg-white text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all">
            Subscribe
          </button>
        </form>
      </motion.section>
    </div>
  )
}
