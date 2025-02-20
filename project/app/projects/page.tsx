"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

const initialProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Modernize the company website with new design and features",
    progress: 75,
    tasks: 12,
    completedTasks: 9,
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Create a new mobile app for task management",
    progress: 45,
    tasks: 20,
    completedTasks: 9,
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Q2 marketing campaign planning and execution",
    progress: 30,
    tasks: 15,
    completedTasks: 4,
  },
  {
    id: 4,
    name: "Product Launch",
    description: "Prepare and execute new product launch",
    progress: 60,
    tasks: 18,
    completedTasks: 11,
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects)
  const [newProject, setNewProject] = useState({ name: "", description: "" })
  const { toast } = useToast()

  const handleAddProject = () => {
    if (!newProject.name || !newProject.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const project = {
      id: projects.length + 1,
      name: newProject.name,
      description: newProject.description,
      progress: 0,
      tasks: 0,
      completedTasks: 0,
    }

    setProjects([...projects, project])
    setNewProject({ name: "", description: "" })
    toast({
      title: "Success",
      description: "Project added successfully",
    })
  }

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    value={newProject.name}
                    onChange={(e) =>
                      setNewProject({ ...newProject, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({ ...newProject, description: e.target.value })
                    }
                  />
                </div>
                <Button className="w-full" onClick={handleAddProject}>
                  Create Project
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{project.completedTasks} completed</span>
                    <span>{project.tasks} total tasks</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}