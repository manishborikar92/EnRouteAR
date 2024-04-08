// api/form-handler.js
module.exports = async (req, res) => {
    try {
      // Parse form data from request body
      const { name, email, message } = req.body;
  
      // Validate form data
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Please fill in all fields." });
      }
  
      // Process form data (e.g., send email)
      // Replace this with your actual processing logic
      // Here we're just logging the form data
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Message:", message);
  
      // Send response
      res.status(200).json({ message: "Form submitted successfully." });
    } catch (error) {
      console.error("Form submission error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  