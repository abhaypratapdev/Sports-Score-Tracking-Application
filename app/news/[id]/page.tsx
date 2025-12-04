"use client"

import { Footer } from "@/components/layout/footer"
import { NewsCard } from "@/components/cards/news-card"
import { mockNews } from "@/lib/mock-data"
import Link from "next/link"
import { ArrowLeft, Share2, Bookmark } from "lucide-react"
import { useState } from "react"
import { useParams } from "next/navigation"

export default function ArticlePage() {
  const params = useParams()
  const id = params.id as string
  const article = mockNews.find((a) => a.id === id)
  const [isSaved, setIsSaved] = useState(false)
  const relatedArticles = mockNews.filter((a) => a.category === article?.category && a.id !== article?.id).slice(0, 3)

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Article not found</h1>
            <p className="text-text-secondary mb-6">The article you're looking for doesn't exist.</p>
            <Link
              href="/news"
              className="inline-block px-6 py-2 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300 ease-out"
            >
              Back to News
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="py-8">
          <Link
            href="/news"
            className="flex items-center space-x-2 text-accent hover:text-accent-secondary transition-all duration-300 ease-out font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to News</span>
          </Link>
        </div>

        {/* Article Header */}
        <article className="space-y-8">
          {/* Title & Meta */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-accent text-white text-sm font-medium rounded-full">
                {article.category}
              </span>
              <span className="text-text-secondary">{article.date}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">{article.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span>{article.readTime} read</span>
              <span>•</span>
              <span>Published on {article.date}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
            <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-full object-cover" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out ${
                isSaved ? "bg-accent text-white" : "bg-card-bg text-foreground border border-border hover:border-accent"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-card-bg text-foreground border border-border hover:border-accent transition-all duration-300 ease-out">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            <p className="text-lg leading-relaxed text-text-secondary">{article.excerpt}</p>

            <p className="text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>

            <div className="bg-card-bg border-l-4 border-accent p-6 rounded">
              <p className="font-semibold text-foreground mb-2">Key Takeaways</p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
                <li>Esse cillum dolore eu fugiat nulla pariatur</li>
                <li>Excepteur sint occaecat cupidatat non proident</li>
              </ul>
            </div>

            <p className="text-base leading-relaxed">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo.
            </p>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 border-t border-border mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <NewsCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
