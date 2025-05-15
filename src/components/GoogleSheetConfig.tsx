
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useToast } from "./ui/use-toast";
import { googleSheetService } from "@/services/GoogleSheetService";

const GoogleSheetConfig = () => {
  const [activitiesUrl, setActivitiesUrl] = useState("");
  const [votesUrl, setVotesUrl] = useState("");
  const [participantsUrl, setParticipantsUrl] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved URLs when component mounts
    const savedUrls = googleSheetService.loadSavedUrls();
    setActivitiesUrl(savedUrls.activitiesUrl);
    setVotesUrl(savedUrls.votesUrl);
    setParticipantsUrl(savedUrls.participantsUrl);
  }, []);

  const handleSave = () => {
    // Update URLs in service
    googleSheetService.setUrls(activitiesUrl, votesUrl, participantsUrl);
    
    // Show toast
    toast({
      title: "Inställningar sparade",
      description: "Google Sheet-länkarna har uppdaterats.",
    });
    
    // Close dialog
    setOpen(false);
    
    // Refresh the page to load new data
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-4 right-4 z-50 bg-white opacity-70 hover:opacity-100"
        >
          Konfigurera Google Sheets
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Google Sheet-inställningar</DialogTitle>
          <DialogDescription>
            Konfigurera länkar till Google Sheets som innehåller aktiviteter, röster och deltagare.
            Dessa måste vara publicerade Google Sheets med Web App URL från Google Apps Script.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="activities-url">Aktiviteter URL</Label>
            <Input
              id="activities-url"
              value={activitiesUrl}
              onChange={(e) => setActivitiesUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec?type=activities"
            />
            <p className="text-sm text-gray-500">
              URL till Google Script Web App som returnerar aktiviteter
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="votes-url">Röstnings URL</Label>
            <Input
              id="votes-url"
              value={votesUrl}
              onChange={(e) => setVotesUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec?type=votes"
            />
            <p className="text-sm text-gray-500">
              URL till Google Script Web App som hanterar röster
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="participants-url">Deltagare URL</Label>
            <Input
              id="participants-url"
              value={participantsUrl}
              onChange={(e) => setParticipantsUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
            />
            <p className="text-sm text-gray-500">
              URL till Google Script Web App som hanterar deltagare
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Spara inställningar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleSheetConfig;
