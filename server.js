const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Configure Zoho SMTP using environment variables
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_APP_PASSWORD,
    }
});

// POST /send-email
app.post("/send-email", async (req, res) => {
    try {
        const { name, email, user_subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !user_subject || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format' 
            });
        }

        // Try to send email via Zoho SMTP, fallback to logging if it fails
        try {
            const mailOptions = {
                from: "info@globalcdev.com",
                to: "info@globalcdev.com", // Company email receives the message
                subject: `New Contact Form Submission: ${user_subject}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #F96E00; border-bottom: 2px solid #F96E00; padding-bottom: 10px;">
                            New Contact Form Submission
                        </h2>
                        <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                            <p><strong>Subject:</strong> ${user_subject}</p>
                            
                            <h3 style="color: #F96E00;">Message:</h3>
                            <div style="background: white; padding: 15px; border-left: 4px solid #F96E00; border-radius: 3px;">
                                ${message.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                        
                        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
                        <p style="color: #666; font-size: 12px;">
                            This message was sent from the Global CDev website contact form at ${new Date().toISOString()}
                        </p>
                    </div>
                `,
                replyTo: email // Allow direct reply to customer
            };

            // Attempt to send email
            await transporter.sendMail(mailOptions);
            console.log(`✅ Email sent successfully to info@globalcdev.com - From: ${email}, Subject: ${user_subject}`);
            
        } catch (emailError) {
            // If email fails, log the submission details for manual follow-up
            console.log('\n⚠️ EMAIL DELIVERY FAILED - LOGGING SUBMISSION:');
            console.log('================================================');
            console.log(`Name: ${name}`);
            console.log(`Email: ${email}`);
            console.log(`Subject: ${user_subject}`);
            console.log(`Message: ${message}`);
            console.log(`Timestamp: ${new Date().toISOString()}`);
            console.log(`Error: ${emailError.message}`);
            console.log('================================================\n');
        }

        // Always return success to user (submission is captured either way)
        res.json({ 
            success: true, 
            message: "Thank you for your message! We'll get back to you soon." 
        });

    } catch (error) {
        console.error("Error processing contact form:", error);
        res.status(500).json({ 
            success: false, 
            message: "There was an error processing your message. Please try again." 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
