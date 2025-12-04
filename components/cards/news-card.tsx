import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface NewsCardProps {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: string
}

export function NewsCard({ article }: { article: NewsCardProps }) {
  return (
    <Link href={`/news/${article.id}`}>
      <div className="bg-card-bg rounded-lg overflow-hidden card-shadow hover:card-shadow transition-all duration-300 ease-out hover:scale-[1.02] group cursor-pointer">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-border">
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ease-out"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-accent text-white">
              {article.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="text-base font-semibold text-foreground text-truncate-2 group-hover:text-accent transition-all duration-300 ease-out">
            {article.title}
          </h3>
          <p className="text-sm text-text-secondary text-truncate-2">{article.excerpt}</p>

          {/* Footer */}
          <div className="flex justify-between items-center text-xs text-text-secondary pt-2 border-t border-border">
            <span>{article.date}</span>
            <span>{article.readTime} read</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
