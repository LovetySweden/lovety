
// This file is for reference only - Copy this code to Google Apps Script
// This is not used directly in the React application

/**
 * Google Apps Script to handle form submissions from the website
 * This handles both newsletter subscriptions and activity management
 */

// Activities Sheet Configuration
const ACTIVITIES_SHEET_NAME = 'Activities';
const ACTIVITIES_HEADER = [
  'ID', 'Title', 'Date', 'Time', 'Location', 'Description', 'Price', 'Image URL', 'Is Full'
];

// Newsletter Sheet Configuration
const NEWSLETTER_SHEET_NAME = 'Newsletter Subscribers';
const NEWSLETTER_HEADER = ['Timestamp', 'Name', 'Email'];

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
 * Handle POST requests for newsletter subscriptions
 */
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const contentType = e.parameter.type || 'newsletter';
  
  if (contentType === 'activities') {
    return handleActivitiesData(data);
  } else {
    return handleNewsletterData(data);
  }
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
 * Handle activities data (import/export)
 */
function handleActivitiesData(data) {
  try {
    const sheet = getOrCreateSheet(ACTIVITIES_SHEET_NAME, ACTIVITIES_HEADER);
    
    // Clear existing data (except header)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.deleteRows(2, lastRow - 1);
    }
    
    // Add new data
    const activities = data || [];
    activities.forEach(activity => {
      sheet.appendRow([
        activity.id,
        activity.title,
        activity.date,
        activity.time,
        activity.location,
        activity.description,
        activity.price,
        activity.image,
        activity.isFull ? 'Yes' : 'No'
      ]);
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: `${activities.length} activities saved`
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests to fetch activities
 */
function doGet() {
  try {
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
        isFull: row[8] === 'Yes' || false
      };
      activities.push(activity);
    }
    
    return ContentService.createTextOutput(JSON.stringify(activities))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
