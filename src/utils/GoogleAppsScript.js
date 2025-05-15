
// This file is for reference only - Copy this code to Google Apps Script
// This is not used directly in the React application

/**
 * Google Apps Script to handle all operations related to the Lovety application
 * This handles newsletter subscriptions, activities, votes, and participants
 */

// Activities Sheet Configuration
const ACTIVITIES_SHEET_NAME = 'Activities';
const ACTIVITIES_HEADER = [
  'ID', 'Title', 'Date', 'Time', 'Location', 'Description', 'Price', 'Image URL', 'Is Full', 'Is On Sale'
];

// Newsletter Sheet Configuration
const NEWSLETTER_SHEET_NAME = 'Newsletter Subscribers';
const NEWSLETTER_HEADER = ['Timestamp', 'Name', 'Email'];

// Voting Sheet Configuration
const VOTES_SHEET_NAME = 'Activity Votes';
const VOTES_HEADER = ['ID', 'Text', 'Votes'];

// Participants Sheet Configuration
const PARTICIPANTS_SHEET_NAME = 'Activity Participants';
const PARTICIPANTS_HEADER = [
  'Timestamp', 'Activity ID', 'Type', 'Name', 'Email', 'Phone', 'Payment Method', 'Form Data', 'Status'
];

// Participant Fields Sheet Configuration
const PARTICIPANT_FIELDS_SHEET_NAME = 'Participant Fields';
const PARTICIPANT_FIELDS_HEADER = [
  'Activity ID', 'Field ID', 'Field Name', 'Required', 'Type', 'Options', 'Email 1 Week', 'Email 1 Day'
];

/**
 * Initialize or get the specified sheet
 */
function getOrCreateSheet(sheetName, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  
  // Create the sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }
  
  // Check if header exists, add it if not
  const existingHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const headerExists = headers.every(header => existingHeaders.includes(header));
  
  if (!headerExists) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  
  return sheet;
}

/**
 * Set CORS headers for the response
 */
function setCorsHeaders(response) {
  // Allow from any origin
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.setHeader('Access-Control-Max-Age', '3600');
  return response;
}

/**
 * Handle OPTIONS requests for CORS preflight
 */
function doOptions(e) {
  const response = ContentService.createTextOutput('');
  setCorsHeaders(response);
  return response;
}

/**
 * Handle POST requests for all operations
 */
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const contentType = e.parameter.type || data.type || 'newsletter';
  let response;
  
  if (contentType === 'newsletter') {
    response = handleNewsletterData(data);
  } else if (contentType === 'add_vote') {
    response = handleVoteData(data);
  } else if (contentType === 'register_interest') {
    response = handleInterestData(data);
  } else if (contentType === 'purchase_ticket') {
    response = handleTicketPurchaseData(data);
  } else {
    response = ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: 'Unknown content type'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  return setCorsHeaders(response);
}

/**
 * Handle newsletter subscription data
 */
function handleNewsletterData(data) {
  try {
    const sheet = getOrCreateSheet(NEWSLETTER_SHEET_NAME, NEWSLETTER_HEADER);
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Send confirmation email
    sendNewsletterConfirmation(data.email, data.name);
    
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Subscription added successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send confirmation email for newsletter subscription
 */
function sendNewsletterConfirmation(email, name) {
  const subject = 'Välkommen till Lovetys nyhetsbrev!';
  const body = `Hej ${name},\n\nTack för att du prenumererar på vårt nyhetsbrev!\n\nVänliga hälsningar,\nTeamet på Lovety`;
  
  try {
    MailApp.sendEmail(email, subject, body);
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
}

/**
 * Handle vote data
 */
function handleVoteData(data) {
  try {
    const sheet = getOrCreateSheet(VOTES_SHEET_NAME, VOTES_HEADER);
    
    // Find the activity to update
    const values = sheet.getDataRange().getValues();
    let rowIndex = -1;
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === data.id) {
        rowIndex = i + 1; // +1 because sheet rows are 1-indexed
        break;
      }
    }
    
    if (rowIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        result: 'error',
        message: 'Activity not found'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Update vote count
    const currentVotes = values[rowIndex - 1][2];
    sheet.getRange(rowIndex, 3).setValue(currentVotes + 1);
    
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Vote added successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle interest registration data
 */
function handleInterestData(data) {
  try {
    const sheet = getOrCreateSheet(PARTICIPANTS_SHEET_NAME, PARTICIPANTS_HEADER);
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.activity_id,
      'interest',
      data.name || '',
      data.email || '',
      '', // phone
      '', // payment method
      '', // form data
      'registered'
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Get activity details for the email
    const activityTitle = getActivityTitle(data.activity_id);
    
    // Send confirmation email
    sendInterestConfirmation(data.email, data.name, activityTitle);
    
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Interest registered successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get activity title by ID
 */
function getActivityTitle(activityId) {
  try {
    const sheet = getOrCreateSheet(ACTIVITIES_SHEET_NAME, ACTIVITIES_HEADER);
    const values = sheet.getDataRange().getValues();
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === activityId) {
        return values[i][1]; // Return activity title
      }
    }
    
    return 'Aktivitet';
  } catch (error) {
    console.error('Failed to get activity title:', error);
    return 'Aktivitet';
  }
}

/**
 * Send confirmation email for interest registration
 */
function sendInterestConfirmation(email, name, activityTitle) {
  const subject = `Tack för ditt intresse för ${activityTitle}`;
  const body = `Hej ${name},\n\nTack för att du registrerade intresse för ${activityTitle}!\n\nVi meddelar dig så fort aktiviteten blir tillgänglig för bokning.\n\nVänliga hälsningar,\nTeamet på Lovety`;
  
  try {
    MailApp.sendEmail(email, subject, body);
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
}

/**
 * Handle ticket purchase data
 */
function handleTicketPurchaseData(data) {
  try {
    const sheet = getOrCreateSheet(PARTICIPANTS_SHEET_NAME, PARTICIPANTS_HEADER);
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.activity_id,
      'purchase',
      data.form_data.name || '',
      data.form_data.email || '',
      data.form_data.phone || '',
      data.payment_method,
      JSON.stringify(data.form_data),
      'paid'
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Get activity details for the email
    const activityTitle = getActivityTitle(data.activity_id);
    const activityDetails = getActivityDetails(data.activity_id);
    
    // Send confirmation email
    sendPurchaseConfirmation(data.form_data.email, data.form_data.name, activityTitle, activityDetails);
    
    // Schedule reminder emails
    scheduleReminders(data.activity_id, data.form_data.email, data.form_data.name);
    
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Ticket purchased successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get activity details by ID
 */
function getActivityDetails(activityId) {
  try {
    const sheet = getOrCreateSheet(ACTIVITIES_SHEET_NAME, ACTIVITIES_HEADER);
    const values = sheet.getDataRange().getValues();
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === activityId) {
        return {
          title: values[i][1],
          date: values[i][2],
          time: values[i][3],
          location: values[i][4],
          description: values[i][5],
          price: values[i][6]
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get activity details:', error);
    return null;
  }
}

/**
 * Send confirmation email for ticket purchase
 */
function sendPurchaseConfirmation(email, name, activityTitle, activityDetails) {
  if (!activityDetails) return;
  
  const subject = `Bekräftelse av biljettköp: ${activityTitle}`;
  const body = `Hej ${name},\n\nTack för ditt köp av biljett till ${activityTitle}!\n\n` +
               `Datum: ${activityDetails.date}\n` +
               `Tid: ${activityDetails.time}\n` +
               `Plats: ${activityDetails.location}\n` +
               `Pris: ${activityDetails.price}\n\n` +
               `Vi ser fram emot att träffa dig!\n\n` +
               `Vänliga hälsningar,\nTeamet på Lovety`;
  
  try {
    MailApp.sendEmail(email, subject, body);
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
}

/**
 * Schedule reminder emails for an activity
 */
function scheduleReminders(activityId, email, name) {
  try {
    const activityDetails = getActivityDetails(activityId);
    if (!activityDetails) return;
    
    const activityDate = new Date(activityDetails.date);
    if (isNaN(activityDate.getTime())) return;
    
    // Get custom reminder email content
    const reminderEmails = getCustomReminderEmails(activityId);
    
    // Schedule 1-week reminder
    const oneWeekBefore = new Date(activityDate);
    oneWeekBefore.setDate(oneWeekBefore.getDate() - 7);
    
    if (oneWeekBefore > new Date()) {
      ScriptApp.newTrigger('sendOneWeekReminder')
        .timeBased()
        .at(oneWeekBefore)
        .create();
      
      // Store reminder info in Properties service
      PropertiesService.getScriptProperties().setProperty(
        `reminder1week_${activityId}_${email}`,
        JSON.stringify({
          email,
          name,
          activityId,
          activityTitle: activityDetails.title,
          customContent: reminderEmails.oneWeek
        })
      );
    }
    
    // Schedule 1-day reminder
    const oneDayBefore = new Date(activityDate);
    oneDayBefore.setDate(oneDayBefore.getDate() - 1);
    
    if (oneDayBefore > new Date()) {
      ScriptApp.newTrigger('sendOneDayReminder')
        .timeBased()
        .at(oneDayBefore)
        .create();
      
      // Store reminder info in Properties service
      PropertiesService.getScriptProperties().setProperty(
        `reminder1day_${activityId}_${email}`,
        JSON.stringify({
          email,
          name,
          activityId,
          activityTitle: activityDetails.title,
          customContent: reminderEmails.oneDay
        })
      );
    }
    
  } catch (error) {
    console.error('Failed to schedule reminders:', error);
  }
}

/**
 * Get custom reminder email content for an activity
 */
function getCustomReminderEmails(activityId) {
  try {
    const sheet = getOrCreateSheet(PARTICIPANT_FIELDS_SHEET_NAME, PARTICIPANT_FIELDS_HEADER);
    const values = sheet.getDataRange().getValues();
    
    let oneWeek = '';
    let oneDay = '';
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === activityId) {
        oneWeek = values[i][6] || '';
        oneDay = values[i][7] || '';
        break;
      }
    }
    
    return {
      oneWeek,
      oneDay
    };
  } catch (error) {
    console.error('Failed to get custom reminder emails:', error);
    return {
      oneWeek: '',
      oneDay: ''
    };
  }
}

/**
 * Send one-week reminder email
 */
function sendOneWeekReminder() {
  const scriptProperties = PropertiesService.getScriptProperties().getProperties();
  
  for (const key in scriptProperties) {
    if (key.startsWith('reminder1week_')) {
      try {
        const data = JSON.parse(scriptProperties[key]);
        
        // Get activity details
        const activityDetails = getActivityDetails(data.activityId);
        if (!activityDetails) continue;
        
        // Use custom content or default
        const emailContent = data.customContent || 
          `Hej ${data.name},\n\nDetta är en påminnelse om att du har bokat ${data.activityTitle} som äger rum om en vecka.\n\n` +
          `Datum: ${activityDetails.date}\n` +
          `Tid: ${activityDetails.time}\n` +
          `Plats: ${activityDetails.location}\n\n` +
          `Vi ser fram emot att träffa dig!\n\n` +
          `Vänliga hälsningar,\nTeamet på Lovety`;
        
        MailApp.sendEmail(data.email, `Påminnelse: ${data.activityTitle} om en vecka`, emailContent);
        
        // Delete the property
        PropertiesService.getScriptProperties().deleteProperty(key);
        
      } catch (error) {
        console.error('Failed to send one-week reminder:', error);
      }
    }
  }
}

/**
 * Send one-day reminder email
 */
function sendOneDayReminder() {
  const scriptProperties = PropertiesService.getScriptProperties().getProperties();
  
  for (const key in scriptProperties) {
    if (key.startsWith('reminder1day_')) {
      try {
        const data = JSON.parse(scriptProperties[key]);
        
        // Get activity details
        const activityDetails = getActivityDetails(data.activityId);
        if (!activityDetails) continue;
        
        // Use custom content or default
        const emailContent = data.customContent || 
          `Hej ${data.name},\n\nDetta är en påminnelse om att du har bokat ${data.activityTitle} som äger rum imorgon.\n\n` +
          `Datum: ${activityDetails.date}\n` +
          `Tid: ${activityDetails.time}\n` +
          `Plats: ${activityDetails.location}\n\n` +
          `Vi ser fram emot att träffa dig!\n\n` +
          `Vänliga hälsningar,\nTeamet på Lovety`;
        
        MailApp.sendEmail(data.email, `Påminnelse: ${data.activityTitle} imorgon`, emailContent);
        
        // Delete the property
        PropertiesService.getScriptProperties().deleteProperty(key);
        
      } catch (error) {
        console.error('Failed to send one-day reminder:', error);
      }
    }
  }
}

/**
 * Handle GET requests to fetch activities, votes, or field definitions
 */
function doGet(e) {
  const dataType = e.parameter.type || 'activities';
  let response;
  
  try {
    if (dataType === 'activities') {
      response = getActivities();
    } else if (dataType === 'votes') {
      response = getVoteActivities();
    } else if (dataType === 'fields') {
      response = getActivityFields(e.parameter.activityId);
    } else {
      response = ContentService.createTextOutput(JSON.stringify({
        result: 'error',
        message: 'Unknown data type'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    response = ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  return setCorsHeaders(response);
}

/**
 * Get all activities
 */
function getActivities() {
  const sheet = getOrCreateSheet(ACTIVITIES_SHEET_NAME, ACTIVITIES_HEADER);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  // Convert sheet data to array of objects
  const activities = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const activity = {
      id: parseInt(row[0]) || Date.now() + i,
      title: row[1] || '',
      date: row[2] || '',
      time: row[3] || '',
      location: row[4] || '',
      description: row[5] || '',
      price: row[6] || '',
      image: row[7] || 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      isFull: row[8] === 'Yes' || false,
      isOnSale: row[9] === 'Yes'
    };
    activities.push(activity);
  }
  
  return ContentService.createTextOutput(JSON.stringify(activities))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get all vote activities
 */
function getVoteActivities() {
  const sheet = getOrCreateSheet(VOTES_SHEET_NAME, VOTES_HEADER);
  const data = sheet.getDataRange().getValues();
  
  // Convert sheet data to array of objects
  const voteActivities = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const voteActivity = {
      id: parseInt(row[0]) || Date.now() + i,
      text: row[1] || '',
      votes: parseInt(row[2]) || 0
    };
    voteActivities.push(voteActivity);
  }
  
  return ContentService.createTextOutput(JSON.stringify(voteActivities))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get custom fields for a specific activity
 */
function getActivityFields(activityId) {
  if (!activityId) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: 'Activity ID is required'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const sheet = getOrCreateSheet(PARTICIPANT_FIELDS_SHEET_NAME, PARTICIPANT_FIELDS_HEADER);
  const data = sheet.getDataRange().getValues();
  
  const fields = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[0] === parseInt(activityId)) {
      const field = {
        id: row[1] || '',
        name: row[2] || '',
        required: row[3] === 'Yes',
        type: row[4] || 'text',
        options: row[5] ? row[5].split(',').map(o => o.trim()) : []
      };
      fields.push(field);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify(fields))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Install time-based triggers for daily tasks
 */
function setupTriggers() {
  // Clear any existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
  // Create triggers for reminder functions (these will check daily)
  ScriptApp.newTrigger('sendOneWeekReminder')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
  
  ScriptApp.newTrigger('sendOneDayReminder')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
}
