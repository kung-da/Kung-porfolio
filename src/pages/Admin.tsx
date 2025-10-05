import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectStorage } from "@/lib/projectStorage";
import { Project } from "@/types/project";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, LogOut, Home } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  const loadProjects = () => {
    setProjects(projectStorage.getProjects());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectStorage.verifyPassword(password)) {
      setIsAuthenticated(true);
      toast.success("Đăng nhập thành công!");
    } else {
      toast.error("Mật khẩu không đúng!");
    }
    setPassword("");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.info("Đã đăng xuất");
  };

  const handleCreateProject = (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    projectStorage.addProject(data);
    loadProjects();
    setIsFormOpen(false);
    toast.success("Đã tạo dự án mới!");
  };

  const handleUpdateProject = (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    if (editingProject) {
      projectStorage.updateProject(editingProject.id, data);
      loadProjects();
      setIsFormOpen(false);
      setEditingProject(undefined);
      toast.success("Đã cập nhật dự án!");
    }
  };

  const handleDeleteProject = () => {
    if (deleteProjectId) {
      projectStorage.deleteProject(deleteProjectId);
      loadProjects();
      setDeleteProjectId(null);
      toast.success("Đã xóa dự án!");
    }
  };

  const openEditForm = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const openCreateForm = () => {
    setEditingProject(undefined);
    setIsFormOpen(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Nhập mật khẩu để tiếp tục</p>
            {!projectStorage.hasPassword() && (
              <p className="text-sm text-amber-600 mt-2">
                Mật khẩu mặc định: <strong>admin123</strong>
              </p>
            )}
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate("/")}
            >
              <Home className="mr-2" size={16} />
              Về trang chủ
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Quản lý Dự án</h1>
            <p className="text-muted-foreground mt-1">
              Tổng số: {projects.length} dự án
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="mr-2" size={16} />
              Trang chủ
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2" size={16} />
              Đăng xuất
            </Button>
            <Button onClick={openCreateForm}>
              <Plus className="mr-2" size={16} />
              Tạo dự án mới
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className={`h-24 bg-gradient-to-r ${project.gradient}`}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-primary-soft text-primary px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditForm(project)}
                    className="flex-1"
                  >
                    <Pencil size={14} className="mr-1" />
                    Sửa
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleteProjectId(project.id)}
                    className="flex-1"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Xóa
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Chỉnh sửa dự án" : "Tạo dự án mới"}
            </DialogTitle>
            <DialogDescription>
              Điền thông tin dự án của bạn vào form bên dưới.
            </DialogDescription>
          </DialogHeader>
          <ProjectForm
            project={editingProject}
            onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingProject(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteProjectId} onOpenChange={() => setDeleteProjectId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa dự án này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProject}>
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
