
import { Activity } from "@/types/activities";

export interface VoteActivity {
  id: number;
  text: string;
  votes: number;
}

export interface ParticipantField {
  id: string;
  name: string;
  required: boolean;
  type: 'text' | 'email' | 'phone' | 'select' | 'checkbox';
  options?: string[]; // For select fields
}

export interface ActivityDetails extends Activity {
  participantFields: ParticipantField[];
  reminderEmail1Week: string;
  reminderEmail1Day: string;
}

class GoogleSheetService {
  private activitiesUrl: string;
  private votesUrl: string;
  private participantsUrl: string;
  
  constructor() {
    this.activitiesUrl = import.meta.env.VITE_GOOGLE_ACTIVITIES_SHEET_URL || "";
    this.votesUrl = import.meta.env.VITE_GOOGLE_VOTES_SHEET_URL || "";
    this.participantsUrl = import.meta.env.VITE_GOOGLE_PARTICIPANTS_SHEET_URL || "";
  }

  // Set Google Sheet URLs
  setUrls(activities: string, votes: string, participants: string) {
    this.activitiesUrl = activities;
    this.votesUrl = votes;
    this.participantsUrl = participants;
    
    // Save URLs to localStorage for persistence
    localStorage.setItem('lovety_activities_url', activities);
    localStorage.setItem('lovety_votes_url', votes);
    localStorage.setItem('lovety_participants_url', participants);
    
    console.log("Google Sheet URLs have been updated");
    return true;
  }
  
  // Load URLs from localStorage (if available)
  loadSavedUrls() {
    const activitiesUrl = localStorage.getItem('lovety_activities_url');
    const votesUrl = localStorage.getItem('lovety_votes_url');
    const participantsUrl = localStorage.getItem('lovety_participants_url');
    
    if (activitiesUrl) this.activitiesUrl = activitiesUrl;
    if (votesUrl) this.votesUrl = votesUrl;
    if (participantsUrl) this.participantsUrl = participantsUrl;
    
    return {
      activitiesUrl: this.activitiesUrl,
      votesUrl: this.votesUrl,
      participantsUrl: this.participantsUrl
    };
  }

  // Fetch all activities
  async fetchActivities(): Promise<Activity[]> {
    if (!this.activitiesUrl) {
      console.log("Google Activities Sheet URL not configured");
      return [];
    }

    try {
      const response = await fetch(this.activitiesUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch activities: ${response.status}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching activities:", error);
      return [];
    }
  }

  // Fetch activity details including custom participant fields
  async fetchActivityDetails(id: number): Promise<ActivityDetails | null> {
    try {
      const activities = await this.fetchActivities();
      const activity = activities.find(a => a.id === id);
      
      if (!activity) return null;
      
      // In a real implementation, you would fetch the custom fields from another endpoint
      // This is a placeholder implementation
      const customFields: ParticipantField[] = [
        { id: 'name', name: 'Namn', required: true, type: 'text' },
        { id: 'email', name: 'E-post', required: true, type: 'email' },
        { id: 'phone', name: 'Telefon', required: false, type: 'phone' }
      ];
      
      return {
        ...activity,
        participantFields: customFields,
        reminderEmail1Week: "Välkommen till vår aktivitet nästa vecka!",
        reminderEmail1Day: "Påminnelse: Aktivitet imorgon!"
      };
    } catch (error) {
      console.error("Error fetching activity details:", error);
      return null;
    }
  }

  // Fetch upcoming activities to vote on
  async fetchVoteActivities(): Promise<VoteActivity[]> {
    if (!this.votesUrl) {
      console.log("Google Votes Sheet URL not configured");
      return [];
    }

    try {
      const response = await fetch(this.votesUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch vote activities: ${response.status}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching vote activities:", error);
      return [];
    }
  }

  // Register a vote for an activity
  async addVote(id: number): Promise<boolean> {
    if (!this.votesUrl) {
      console.log("Google Votes Sheet URL not configured");
      return false;
    }

    try {
      const response = await fetch(this.votesUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "add_vote",
          id: id,
          timestamp: new Date().toISOString()
        }),
      });
      
      // Since we're using no-cors, we won't get a proper response status
      return true;
    } catch (error) {
      console.error("Error adding vote:", error);
      return false;
    }
  }

  // Register interest in an activity
  async registerInterest(activityId: number, name: string, email: string): Promise<boolean> {
    if (!this.participantsUrl) {
      console.log("Google Participants Sheet URL not configured");
      return false;
    }

    try {
      const response = await fetch(this.participantsUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "register_interest",
          activity_id: activityId,
          name,
          email,
          timestamp: new Date().toISOString()
        }),
      });
      
      // Since we're using no-cors, we won't get a proper response status
      return true;
    } catch (error) {
      console.error("Error registering interest:", error);
      return false;
    }
  }

  // Purchase ticket for an activity
  async purchaseTicket(
    activityId: number, 
    paymentMethod: 'card' | 'swish',
    formData: Record<string, string>
  ): Promise<boolean> {
    if (!this.participantsUrl) {
      console.log("Google Participants Sheet URL not configured");
      return false;
    }

    try {
      const response = await fetch(this.participantsUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "purchase_ticket",
          activity_id: activityId,
          payment_method: paymentMethod,
          form_data: formData,
          timestamp: new Date().toISOString()
        }),
      });
      
      // Since we're using no-cors, we won't get a proper response status
      return true;
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      return false;
    }
  }
}

export const googleSheetService = new GoogleSheetService();

// Load saved URLs on initialization
googleSheetService.loadSavedUrls();
