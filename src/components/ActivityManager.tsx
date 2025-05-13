
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

// Define the Activity type
export type Activity = {
  id: number;
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  price: string;
  isFull?: boolean;
};

// This component is for admin use
const ActivityManager = () => {
  const { toast } = useToast();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    price: "",
    isFull: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Function to toggle the form visibility
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setNewActivity({
        ...newActivity,
        [name]: target.checked,
      });
    } else {
      setNewActivity({
        ...newActivity,
        [name]: value,
      });
    }
  };

  // Function to import activities from Google Sheet
  const importFromSheet = async () => {
    setIsLoading(true);
    
    // Replace this URL with your deployed Google Apps Script Web App URL for reading data
    const sheetUrl = "YOUR_GOOGLE_SHEET_READ_URL";
    
    try {
      const response = await fetch(sheetUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      setActivities(data);
      
      toast({
        title: "Success",
        description: `Imported ${data.length} activities from Google Sheet`,
      });
    } catch (error) {
      console.error("Error importing activities:", error);
      toast({
        title: "Error",
        description: "Failed to import activities from Google Sheet",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to add a new activity
  const addActivity = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newActivity.title || !newActivity.date || !newActivity.time || !newActivity.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const activity: Activity = {
      id: Date.now(),
      image: newActivity.image || "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      title: newActivity.title || "",
      date: newActivity.date || "",
      time: newActivity.time || "",
      location: newActivity.location || "",
      description: newActivity.description || "",
      price: newActivity.price || "",
      isFull: newActivity.isFull || false,
    };
    
    setActivities([...activities, activity]);
    
    // Reset form
    setNewActivity({
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      price: "",
      isFull: false,
    });
    
    toast({
      title: "Success",
      description: "Activity added successfully",
    });
  };

  // Function to remove an activity
  const removeActivity = (id: number) => {
    setActivities(activities.filter((activity) => activity.id !== id));
    toast({
      title: "Success",
      description: "Activity removed successfully",
    });
  };

  // Function to export activities to Google Sheet
  const exportToSheet = async () => {
    setIsLoading(true);
    
    // Replace this URL with your deployed Google Apps Script Web App URL for writing data
    const sheetUrl = "YOUR_GOOGLE_SHEET_WRITE_URL";
    
    try {
      await fetch(sheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activities),
      });
      
      toast({
        title: "Success",
        description: "Activities exported to Google Sheet",
      });
    } catch (error) {
      console.error("Error exporting activities:", error);
      toast({
        title: "Error",
        description: "Failed to export activities to Google Sheet",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-lovely-cream py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Activity Manager</h2>
        <p className="mb-6">Add, edit and remove activities here</p>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <Button onClick={toggleForm}>
            {isFormVisible ? "Hide Form" : "Add New Activity"}
          </Button>
          <Button onClick={importFromSheet} disabled={isLoading} variant="outline">
            Import from Google Sheet
          </Button>
          <Button onClick={exportToSheet} disabled={isLoading} variant="outline">
            Export to Google Sheet
          </Button>
        </div>
        
        {isFormVisible && (
          <form onSubmit={addActivity} className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="title" className="block mb-1 font-medium">Title *</label>
                <Input
                  id="title"
                  name="title"
                  value={newActivity.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-1 font-medium">Image URL</label>
                <Input
                  id="image"
                  name="image"
                  value={newActivity.image}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="date" className="block mb-1 font-medium">Date *</label>
                <Input
                  id="date"
                  name="date"
                  value={newActivity.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block mb-1 font-medium">Time *</label>
                <Input
                  id="time"
                  name="time"
                  value={newActivity.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className="block mb-1 font-medium">Location *</label>
                <Input
                  id="location"
                  name="location"
                  value={newActivity.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="price" className="block mb-1 font-medium">Price</label>
                <Input
                  id="price"
                  name="price"
                  value={newActivity.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center pt-6">
                <Input
                  id="isFull"
                  name="isFull"
                  type="checkbox"
                  className="w-4 h-4 mr-2"
                  checked={newActivity.isFull}
                  onChange={(e) => setNewActivity({...newActivity, isFull: e.target.checked})}
                />
                <label htmlFor="isFull" className="font-medium">Mark as full</label>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block mb-1 font-medium">Description</label>
              <Textarea
                id="description"
                name="description"
                value={newActivity.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            
            <Button type="submit" className="bg-lovely-red hover:bg-opacity-90">
              Add Activity
            </Button>
          </form>
        )}
        
        <div className="overflow-x-auto">
          <Table className="w-full bg-white rounded-lg shadow-md">
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No activities found. Add some activities using the form above or import from Google Sheets.
                  </TableCell>
                </TableRow>
              ) : (
                activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.title}</TableCell>
                    <TableCell>{activity.date}, {activity.time}</TableCell>
                    <TableCell>{activity.location}</TableCell>
                    <TableCell>{activity.isFull ? "Full" : "Available"}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeActivity(activity.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ActivityManager;
