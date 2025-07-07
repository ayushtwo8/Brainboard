
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"

interface AddContentModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ContentData {
  title: string
  link: string
  type: string
  description?: string
  tags?: string[]
}

const AddContentModal = ({ isOpen, onClose }: AddContentModalProps) => {
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [type, setType] = useState("url")
  const [description, setDescription] = useState("")
  const queryClient = useQueryClient()

  const { mutate: addContent, isPending, error } = useMutation({
    mutationFn: async (contentData: ContentData) => {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("No auth token found")

      const response = await axios.post(
        "http://localhost:5000/api/v1/content",
        { ...contentData, tags: [] }, // Ensure `tags` is included
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] })
      setTitle("")
      setLink("")
      setType("url")
      setDescription("")
      onClose()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addContent({ title, link, type, description })
  }

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setLink(url)

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      setType("youtube")
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
      setType("twitter")
    } else {
      setType("url")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[85vw] rounded-xl font-inter">
        <DialogHeader>
          <DialogTitle className="font-satoshi text-xl">Add New Content</DialogTitle>
          <DialogDescription>
            Add a link to your second brain. We'll automatically detect the content type.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
            <p>{(error as Error).message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for this content"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              type="url"
              value={link}
              onChange={handleLinkChange}
              placeholder="https://example.com"
              required
            />
          </div>

          {type === "url" && (
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description for the URL"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="type">Content Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="url">URL</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-6 flex flex-row gap-3 sm:gap-0">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="ml-3 bg-[#3b73ed] hover:bg-[#2a5cc9]">
              {isPending ? "Adding..." : "Add Content"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddContentModal
