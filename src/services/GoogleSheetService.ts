
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

  // Helper function to format date for early bird display
  private formatEarlyBirdDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = [
      'januari', 'februari', 'mars', 'april', 'maj', 'juni',
      'juli', 'augusti', 'september', 'oktober', 'november', 'december'
    ];
    const month = months[date.getMonth()];
    return `Early Bird pris - gäller till ${day} ${month}`;
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
      return this.getMockActivities();
    }

    try {
      // Add a cache-busting parameter to avoid browser caching
      const cacheBuster = `cacheBust=${new Date().getTime()}`;
      const url = this.activitiesUrl.includes('?')
        ? `${this.activitiesUrl}&${cacheBuster}`
        : `${this.activitiesUrl}?${cacheBuster}`;

      // Use no-cors mode for GET requests to handle CORS preflight issues
      const response = await fetch(url, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      // Since we're using no-cors, we need to handle the response differently
      // We'll create a mock response for development purposes
      // In production, the Google Apps Script should be properly configured for CORS
      if (response.type === 'opaque') {
        console.log("Received opaque response due to CORS. Using mock data for development.");
        return this.getMockActivities();
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch activities: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching activities:", error);
      // Return mock data for development when there's an error
      return this.getMockActivities();
    }
  }

  // Mock activities data for development
  private getMockActivities(): Activity[] {
    const activities = [
      {
        id: 1,
        title: "Fotbollsgolf, 35+",
        date: "23 juni",
        time: "18:30-20:30",
        location: "Hotell Entré Norr",
        address: "Annumark 50, 905 95 Umeå",
        activityHeading:"Lär känna varandra under en kul aktivitet i naturskön lantlig miljö",
        description: 
          "Fartfylld aktivitet för aktiva singlar 35 år och uppåt som gillar att vara ute i naturen. \n\n Vi samlas i receptionen på Hotell Entré Norr, där en aktivitetsvärd från Lovety möter upp.\n\nSen går vi ut till den 10.000 kvadratmeter stora banan och spelar 18 hål tillsammans samtidigt som vi vid de olika hålen får möjlighet att lära känna varandra bättre genom att besvara olika lära-känna-varandra frågor.\n\nKom och var med på en roligt stund i en somrig miljö.\n\nKläder efter väder, vi kör vid både sol och regn :)\n\nTill Hotell Entré Norr hittar du genom att köra E4an mot sävar från stan. Hotellet ligger till höger precis vid Anumark.\nUltras busslinjer 12 och 20 stannar precis utanför hotellet. Hålplatsen heter Anumark.\n\nAnumark 50\nE4, Norra infart\n905 95 Umeå\n\nÄr det färre än 6 deltagare ställer vi in och då betalas hela biljettpriset tillbaka.",
        price: "250 kr",
        earlyBirdPrice: "225 kr",
        earlyBirdExpiryDate: "2025-06-16",
        externalPaymentLink: "https://fotbollsgolf35.confetti.events/signup",
        image: "/lovable-uploads/Fotboll35.png",
        isFull: false,
        isOnSale: true
      },
      {
        id: 2,
        title: "Fotbollsgolf, 50+",
        date: "24 juni",
        time: "18:30-20:30",
        location: "Hotell Entré Norr",
        address: "Annumark 50, 905 95 Umeå",
        activityHeading:"Lär känna varandra under en kul aktivitet i naturskön lantlig miljö",
        description: 
          "Fartfylld aktivitet för aktiva singlar 50 år och uppåt som gillar att vara ute i naturen. \n\n Vi samlas i receptionen på Hotell Entré Norr, där en aktivitetsvärd från Lovety möter upp.\n\nSen går vi ut till den 10.000 kvadratmeter stora banan och spelar 18 hål tillsammans samtidigt som vi vid de olika hålen får möjlighet att lära känna varandra bättre genom att besvara olika lära-känna-varandra frågor.\n\nKom och var med på en roligt stund i en somrig miljö.\n\nKläder efter väder, vi kör vid både sol och regn :)\n\nTill Hotell Entré Norr hittar du genom att köra E4an mot sävar från stan. Hotellet ligger till höger precis vid Anumark.\nUltras busslinjer 12 och 20 stannar precis utanför hotellet. Hålplatsen heter Anumark.\n\nAnumark 50\nE4, Norra infart\n905 95 Umeå\n\nÄr det färre än 6 deltagare ställer vi in och då betalas hela biljettpriset tillbaka.",
        price: "250 kr",
        earlyBirdPrice: "225 kr",
        earlyBirdExpiryDate: "2025-06-16",
        externalPaymentLink: "https://fotbollsgolf35.confetti.events/signup",
        image: "/lovable-uploads/fotboll50.png",
        isFull: false,
        isOnSale: true
      },
      {
        id: 3,
        title: "Kvällspromenad & Fika, 35+",
        date: "2 Juli",
        time: "19:00-21:00",
        location: "Hotell Entré Norr",
        address: "Annumark 50, 905 95 Umeå",
        activityHeading:"Avsluta dagen i härligt sällskap och vacker natur",
        description: "Kom ut i naturen, rör på dig och träffa nya intressanta människor. \n\n Vi samlas i receptionen på Hotell Entré Norr, där en aktivitetsvärd från Lovety möter upp.\n\nSen går vi en härlig promenad bland hästhagar och ängar tillsammans.\n\n Promenaden är en lättsam prommendad på ca 5 km. Vi går i prat-tempo. \n\n Under promenaden får ni möjlighet att lära känna varandra bättre genom att besvara olika lära-känna-varandra frågor.\n\nTillbaka på hotellet avrundar vi kvällen med ett gott kvällsfika.\n\nKom och var med på en härlig aktivitet i en somrig miljö.\n\nKläder efter väder, vi kör vid både sol och regn :)\n\nTill Hotell Entré Norr hittar du genom att köra E4an mot sävar från stan. Hotellet ligger till höger precis vid Anumark.\nUltras busslinjer 12 och 20 stannar precis utanför hotellet. Hålplatsen heter Anumark.\n\nAnumark 50\nE4, Norra infart\n905 95 Umeå\n\nÄr det färre än 6 deltagare ställer vi in och då betalas hela biljettpriset tillbaka.",
        price: "275 kr",
        earlyBirdPrice: "250 kr",
        earlyBirdExpiryDate: "2025-06-18",
        externalPaymentLink: "https://example.com/payment/activity-4",
        image: "/lovable-uploads/walk35.png",
        isFull: false,
        isOnSale: true
      },
      {
        id: 4,
        title: "Kvällspromenad & Fika, 50+",
        date: "3 Juli",
        time: "19:00-21:00",
        location: "Hotell Entré Norr",
        address: "Annumark 50, 905 95 Umeå",
        activityHeading:"Avsluta dagen i härligt sällskap och vacker natur",
        description: "Kom ut i naturen, rör på dig och träffa nya intressanta människor. \n\n Vi samlas i receptionen på Hotell Entré Norr, där en aktivitetsvärd från Lovety möter upp.\n\nSen går vi en härlig promenad bland hästhagar och ängar tillsammans.\n\n Promenaden är en lättsam prommendad på ca 5 km. Vi går i prat-tempo. \n\n Unter promenaden får ni möjlighet att lära känna varandra bättre genom att besvara olika lära-känna-varandra frågor.\n\nTillbaka på hotellet avrundar vi kvällen med ett gott kvällsfika.\n\nKom och var med på en härlig aktivitet i en somrig miljö.\n\nKläder efter väder, vi kör vid både sol och regn :)\n\nTill Hotell Entré Norr hittar du genom att köra E4an mot sävar från stan. Hotellet ligger till höger precis vid Anumark.\nUltras busslinjer 12 och 20 stannar precis utanför hotellet. Hålplatsen heter Anumark.\n\nAnumark 50\nE4, Norra infart\n905 95 Umeå\n\nÄr det färre än 6 deltagare ställer vi in och då betalas hela biljettpriset tillbaka.",
        price: "275 kr",
        earlyBirdPrice: "250 kr",
        earlyBirdExpiryDate: "2025-06-18",
        externalPaymentLink: "https://example.com/payment/activity-5",
        image: "/lovable-uploads/EveningWalk50.png",
        isFull: false,
        isOnSale: true
      },
      {
        id: 5,
        title: "Brunch & Boule, 35+",
        date: "26 Juli",
        time: "11:30-13:30",
        location: "Hotell Entré Norr",
        address: "Annumark 50, 905 95 Umeå",
        activityHeading:"Om lunchpromenaden",
        description: "Ta en paus i vardagen och träffa nya intressanta människor. \n\n Vi ses på GPs där en Lovety värd möter upp.\n\nFörst äter vi en god lunch och sen promennerar vi tillsammans broarna runt. Ett bra tillfälle att lära känna varandra lite bättre.\n\nPerfekt aktivitet för singlar 35 år och uppåt som gillar att ha en aktiv livsstil.\n\nVill du endast vara med på promenaden går det bra att möta upp till den. Då anmäler du dig till aktiviteten 'Lunchpromenenad, 35+ (exkl lunch)'\n\nKläder efter väder, vi kör vid både sol och regn :)\n\nTill Hotell Entré Norr hittar du genom att köra E4an mot sävar från stan. Hotellet ligger till höger precis vid Anumark.\nUltras busslinjer 12 och 20 stannar precis utanför hotellet. Hålplatsen heter Anumark.\n\nAnumark 50\nE4, Norra infart\n905 95 Umeå\n\nÄr det färre än 6 deltagare ställer vi in och då betalas hela biljettpriset tillbaka.",
        price: "350 kr",
        earlyBirdPrice: "325 kr",
        earlyBirdExpiryDate: "2025-06-14",
        externalPaymentLink: "https://example.com/payment/activity-2",
        image: "/lovable-uploads/boule35Landscape.png",
        isFull: false,
        isOnSale: true
      },
      {
        id: 6,
        title: "Brunch & Boule, 50+",
        date: "27 Juli",
        time: "12:30-13:30",
        location: "Hotell Entré Norr",
        address: "Annumark 50, 905 95 Umeå",
        activityHeading:"Om promenaden",
        description: "Ta en paus från jobbet, kom ut och träffa nya intressanta människor. \n\n Vi ses utanför GPs där en Lovety värd möter upp.\n\nSen promenerar vi tillsammans broarna runt. Ett bra tillfälle att lära känna varandra lite bättre.\n\nPerfekt aktivitet för singlar 35 år och uppåt som gillar att ha en aktiv livsstil.\n\nVill också äta en gemensam lunch innan promenaden går det bra. Då anmäler du dig till aktiviteten 'Lunchpromenenad, 35+ (inkl lunch)'\n\nKläder efter väder, vi kör vid både sol och regn :)\n\nTill Hotell Entré Norr hittar du genom att köra E4an mot sävar från stan. Hotellet ligger till höger precis vid Anumark.\nUltras busslinjer 12 och 20 stannar precis utanför hotellet. Hålplatsen heter Anumark.\n\nAnumark 50\nE4, Norra infart\n905 95 Umeå\n\nÄr det färre än 6 deltagare ställer vi in och då betalas hela biljettpriset tillbaka.",
        price: "175 kr",
        earlyBirdPrice: "150 kr",
        earlyBirdExpiryDate: "2025-06-14",
        externalPaymentLink: "https://example.com/payment/activity-3",
        image: "/lovable-uploads/boule50.png",
        isFull: false,
        isOnSale: true
      }
    ];

    // Add the formatted earlyBirdUntil field to each activity
    return activities.map(activity => ({
      ...activity,
      earlyBirdUntil: activity.earlyBirdExpiryDate ? this.formatEarlyBirdDate(activity.earlyBirdExpiryDate) : undefined
    }));
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
      // Add a cache-busting parameter
      const cacheBuster = `cacheBust=${new Date().getTime()}`;
      const url = this.votesUrl.includes('?')
        ? `${this.votesUrl}&${cacheBuster}`
        : `${this.votesUrl}?${cacheBuster}`;

      // Use no-cors mode for GET requests to handle CORS preflight issues
      const response = await fetch(url, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      // Since we're using no-cors, we need to handle the response differently
      if (response.type === 'opaque') {
        console.log("Received opaque response due to CORS. Using mock data for development.");
        return this.getMockVoteActivities();
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch vote activities: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching vote activities:", error);
      // Return mock data for development when there's an error
      return this.getMockVoteActivities();
    }
  }

  // Mock vote activities data for development
  private getMockVoteActivities(): VoteActivity[] {
    return [
      { id: 101, text: "Matlagningskurs - Thailändsk mat", votes: 12 },
      { id: 102, text: "Vandring i nationalparken", votes: 8 },
      { id: 103, text: "Vinprovning - Franska viner", votes: 15 },
      { id: 104, text: "Keramikkurs för nybörjare", votes: 6 },
      { id: 105, text: "Filmkväll under stjärnorna", votes: 10 }
    ];
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
        mode: "no-cors",  // This is needed for CORS issues
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
        mode: "no-cors", // This is needed for CORS issues
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
        mode: "no-cors", // This is needed for CORS issues
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
