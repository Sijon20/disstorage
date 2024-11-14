'use client'
import React, { useState } from 'react'
import { Bell, ChevronRight, Cloud, File, Folder, Menu, MoreVertical, Plus, Search, Upload, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const fileStructure = [
  {
    name: 'Documents',
    type: 'folder',
    children: [
      { name: 'Project Proposal.docx', type: 'file', size: '2.5 MB', modified: '2 hours ago' },
      { name: 'Meeting Notes.pdf', type: 'file', size: '1.2 MB', modified: 'Yesterday' },
      {
        name: 'Research',
        type: 'folder',
        children: [
          { name: 'Data Analysis.xlsx', type: 'file', size: '3.7 MB', modified: 'Last week' },
          { name: 'Literature Review.docx', type: 'file', size: '1.8 MB', modified: '3 days ago' },
        ],
      },
    ],
  },
  {
    name: 'Images',
    type: 'folder',
    children: [
      { name: 'Profile Picture.jpg', type: 'file', size: '2.1 MB', modified: '1 month ago' },
      { name: 'Vacation Photos', type: 'folder', children: [] },
    ],
  },
  { name: 'budget_2023.xlsx', type: 'file', size: '1.5 MB', modified: '1 week ago' },
]

function FileTreeItem({ item, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(false)

  if (item.type === 'file') {
    return (
      <div className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800">
        <div className="flex items-center">
          <File className="h-4 w-4 mr-2 text-blue-500" />
          <span>{item.name}</span>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>{item.size}</span>
          <span>{item.modified}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className={`flex items-center justify-between py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 ${depth > 0 ? 'ml-4' : ''}`}>
        <div className="flex items-center">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
              <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-90' : ''}`} />
              <span className="sr-only">Toggle folder</span>
            </Button>
          </CollapsibleTrigger>
          <Folder className="h-4 w-4 mx-2 text-yellow-500" />
          <span>{item.name}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open folder menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New Folder</DropdownMenuItem>
            <DropdownMenuItem>Upload Files</DropdownMenuItem>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CollapsibleContent>
        {item.children?.map((child, index) => (
          <FileTreeItem key={index} item={child} depth={depth + 1} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function CloudStorageDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b dark:border-gray-700">
          <span className="text-2xl font-semibold text-gray-800 dark:text-white">CloudStore</span>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Cloud className="h-5 w-5 mr-3" />
            All Files
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center">
            <Input 
              type="search" 
              placeholder="Search files..." 
              className="w-64 mr-4"
            />
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="@johndoe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">All Files</h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setIsUploadDialogOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    <span>Upload Files</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setIsNewFolderDialogOpen(true)}>
                    <Folder className="mr-2 h-4 w-4" />
                    <span>New Folder</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              {/* Storage Usage */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Storage Used
                  </CardTitle>
                  <Cloud className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">75.5GB / 100GB</div>
                  <Progress value={75} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    24.5GB available
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Nested File Structure */}
            <Card>
              <CardHeader>
                <CardTitle>Files and Folders</CardTitle>
                <CardDescription>
                  Your cloud storage file structure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  {fileStructure.map((item, index) => (
                    <FileTreeItem key={index} item={item} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Upload Files Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
              Choose files to upload to your cloud storage.
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file-upload">File</Label>
            <Input id="file-upload" type="file" multiple />
          </div>
          <DialogFooter>
            <Button type="submit">Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Folder Dialog */}
      <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Enter a name for your new folder.
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="folder-name">Folder Name</Label>
            <Input id="folder-name" placeholder="My New Folder" />
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}