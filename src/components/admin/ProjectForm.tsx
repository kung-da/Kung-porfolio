import { useState } from "react";
import { Project, GRADIENTS } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export const ProjectForm = ({ project, onSubmit, onCancel }: ProjectFormProps) => {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [tags, setTags] = useState<string[]>(project?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || "");
  const [demoUrl, setDemoUrl] = useState(project?.demoUrl || "");
  const [gradient, setGradient] = useState(project?.gradient || GRADIENTS[0]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || tags.length === 0) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    onSubmit({
      title,
      description,
      tags,
      githubUrl,
      demoUrl,
      gradient,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Tên dự án *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tên dự án"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Mô tả *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả chi tiết về dự án"
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="tags">Công nghệ sử dụng *</Label>
        <div className="flex gap-2 mb-2">
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
            placeholder="Thêm công nghệ (Enter để thêm)"
          />
          <Button type="button" onClick={handleAddTag}>
            Thêm
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary-soft text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-500"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="githubUrl">Github URL</Label>
        <Input
          id="githubUrl"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="https://github.com/username/repo"
          type="url"
        />
      </div>

      <div>
        <Label htmlFor="demoUrl">Demo URL</Label>
        <Input
          id="demoUrl"
          value={demoUrl}
          onChange={(e) => setDemoUrl(e.target.value)}
          placeholder="https://demo.com"
          type="url"
        />
      </div>

      <div>
        <Label htmlFor="gradient">Màu gradient</Label>
        <Select value={gradient} onValueChange={setGradient}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {GRADIENTS.map((g) => (
              <SelectItem key={g} value={g}>
                <div className="flex items-center gap-2">
                  <div className={`w-20 h-6 rounded bg-gradient-to-r ${g}`}></div>
                  <span className="text-xs text-muted-foreground">{g}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit">
          {project ? "Cập nhật" : "Tạo mới"}
        </Button>
      </div>
    </form>
  );
};
