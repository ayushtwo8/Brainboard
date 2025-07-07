import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Trash2, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ConfirmDeleteModal from "./ConfirmDeleteModal"

interface ContentCardProps {
  id: string
  title: string
  link: string
  type?: string
  description: string
  onDelete?: (id: string) => void
}

const ContentCard: React.FC<ContentCardProps> = ({ id, title, link, type, description, onDelete }) => {
  const [copied, setCopied] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const twitterEmbedRef = useRef<HTMLDivElement | null>(null)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy link:", error)
    }
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id)
    }
    setShowConfirmModal(false)
  }

  useEffect(() => {
    const currentRef = twitterEmbedRef.current
    let isMounted = true

    if (type === "twitter" && (window as any).twttr?.widgets && currentRef) {
      currentRef.innerHTML = ""
      const tweetId = link.split("/").pop()?.split("?")[0]

      if (tweetId) {
        (window as any).twttr.widgets.createTweet(
          tweetId,
          currentRef,
          { theme: "light", align: "center" }
        ).then(el => {
          if (isMounted && !el) {
            console.error("Tweet widget failed to load for ID:", tweetId);
            if (currentRef) {
              currentRef.innerHTML = '<p class="text-center text-sm text-red-500 p-4">Could not load Tweet.</p>';
            }
          }
        }).catch((error: any) => console.error("Failed to create tweet", error));
      }
    }

    return () => {
      isMounted = false;
      if (currentRef) {
        currentRef.innerHTML = ""
      }
    }
  }, [type, link])

  const renderEmbed = () => {
    if (type === "youtube") {
      try {
        const url = new URL(link)
        const videoId = url.searchParams.get("v") || url.pathname.split("/").pop()
        if (videoId) {
          return (
            <div className="aspect-video pt-2">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-xl"
                title={`YouTube video: ${title}`}
              />
            </div>
          )
        }
      } catch (error) {
        console.error("Invalid YouTube URL", error)
      }
    } else if (type === "twitter") {
      return (
        <div
          key={link}
          ref={twitterEmbedRef}
          className="flex justify-center"
        />
      )
    }

    return (
      <div className="p-4">
        <div className="flex items-center p-3 rounded-xl border border-gray-300 bg-gray-50 hover:shadow-sm transition-all">
          <ExternalLink className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline overflow-auto font-sans break-words text-sm sm:text-xs"
          >
            {link}
          </a>
        </div>
        {description && (
          <div className="mt-4 p-3 sm:p-4 bg-white border border-gray-200 rounded-lg shadow-sm text-sm text-gray-700">
            <h1 className="text-black font-semibold">Description</h1>
            <p className="mt-2 sm:text-xs break-words">{description}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <Card className="w-full h-auto sm:h-[470px] shadow-sm shadow-black/20 hover:shadow-lg hover:shadow-black/70 transition-all bg-gray-100 border-2 border-black rounded-2xl flex flex-col justify-between">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="font-bold text-black text-lg sm:text-lg">{title}</CardTitle>
        </CardHeader>

        {/* === THE ONLY LINE THAT CHANGED === */}
        <CardContent className="flex-1 min-h-0 overflow-y-auto p-2">
          {renderEmbed()}
        </CardContent>

        <CardFooter className="flex flex-row sm:flex-row justify-between items-center gap-2 sm:gap-0 pb-4 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyLink}
            className="w-full sm:w-auto text-black/80 bg-blue-200 hover:text-blue-600 hover:bg-blue-100 flex items-center gap-1"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy Link"}
          </Button>

          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirmModal(true)}
              className="w-full sm:w-auto text-red-500 bg-red-100 hover:text-red-700 hover:bg-red-200 flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          )}
        </CardFooter>
      </Card>

      <ConfirmDeleteModal
        open={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
      />
    </>
  )
}

export default ContentCard