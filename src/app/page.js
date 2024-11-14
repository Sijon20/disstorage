"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CloudIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [webhook,setWebhook]=useState("")
  const handleChange = (event) => {
    setWebhook(event.target.value);
  }
  return (
    <main className="min-h-screen items-center flex justify-center bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="flex items-center space-x-2">
            <CloudIcon className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              CloudVault
            </h1>
          </div>

          <p className="max-w-[600px] text-muted-foreground text-lg sm:text-xl">
            Secure cloud storage with client-side file chunking and seamless file management.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full">
            <Card className="p-6 flex flex-col items-center space-y-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CloudIcon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Secure Storage</h2>
              <p className="text-muted-foreground text-center">
                Files are chunked and encrypted before storage
              </p>
            </Card>

            <Card className="p-6 flex flex-col items-center space-y-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CloudIcon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Easy Management</h2>
              <p className="text-muted-foreground text-center">
                Intuitive dashboard for file organization
              </p>
            </Card>

            <Card className="p-6 flex flex-col items-center space-y-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CloudIcon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Fast Transfers</h2>
              <p className="text-muted-foreground text-center">
                Optimized uploads and downloads
              </p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="">Get Started</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Enter Webhook Link</DialogTitle>
                  <DialogDescription>
                    For your server webhook need to store file. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="webgook" className="text-right">
                      Webhook
                    </Label>
                    <Input id="webhoook" value={webhook} onChange={handleChange}  className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="lg" asChild>
              <Link href="/dashboard">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}