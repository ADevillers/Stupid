# Project STUPID - Setup & Testing Guide

This guide will help you set up and test the project for your hackathon demo.

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Create a `.env.local` file:

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx
```

**Where to get your API key:**
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key and paste it in `.env.local`

> ⚠️ **Important:** You need billing enabled on your OpenAI account. The API uses GPT-4o-mini which costs ~$0.0001-0.001 per message exchange.

### 3. Run the Development Server

```bash
pnpm dev
```

The app will start on [http://localhost:3000](http://localhost:3000)

## ✅ Testing the Application

### Test Scenario 1: Basic Teaching Flow

1. **Open** [http://localhost:3000](http://localhost:3000)
2. **Observe** the landing page with:
   - Hero section with "STUPID" branding
   - Meme gallery showing "dumb AI" examples
   - Knowledge progress (empty initially)
3. **Click** "Start Teaching" button
4. **Click** "New Concept" button
5. **Create a concept:**
   - Name: "Photosynthesis"
   - Category: Biology
   - Click "Create"
6. **Start teaching:**
   - Type: "Photosynthesis is how plants make food using sunlight"
   - Press Enter or click Send
7. **Observe:**
   - AI responds with curiosity/confusion
   - Learning Note (right panel) updates with markdown summary
   - Comprehension Level shows "Novice"
8. **Continue teaching:**
   - Add more details: "Plants use chlorophyll in their leaves to capture light energy. They combine water and carbon dioxide to create glucose and oxygen."
   - Watch the Learning Note become more structured
   - See comprehension level potentially increase
9. **Return to home:**
   - Click Home icon or navigate to homepage
   - See Biology category now shows progress

### Test Scenario 2: Multiple Concepts

1. **Create another concept:**
   - Name: "Recursion"
   - Category: Computer Science
2. **Teach the concept:**
   - Explain: "Recursion is when a function calls itself"
   - Add examples and details
3. **Switch between concepts:**
   - Use the left sidebar to switch between "Photosynthesis" and "Recursion"
   - Verify each maintains its own chat history and learning notes
4. **Check progress:**
   - Return to homepage
   - Verify both Biology and Computer Science categories show progress

### Test Scenario 3: Comprehension Progression

1. **Create a simple concept:**
   - Name: "Primary Colors"
   - Category: General
2. **Teach systematically:**
   - First message: "There are three primary colors"
   - Second message: "They are red, blue, and yellow"
   - Third message: "You can mix them to create all other colors"
   - Fourth message: "Red + blue = purple, red + yellow = orange, blue + yellow = green"
3. **Watch progression:**
   - Novice → Intermediate → (potentially) Expert
   - Learning Note becomes more comprehensive
   - Progress bar fills up

## 🎯 Key Features to Demonstrate

### 1. AI Naivety
- The AI genuinely doesn't know anything at the start
- It asks clarifying questions
- Shows confusion with basic concepts initially

### 2. Learning Note Evolution
- Starts with "I don't know anything about this yet"
- Becomes fragmented as it learns bits and pieces
- Eventually forms coherent, structured markdown

### 3. Visual Consistency
- Kraft paper aesthetic throughout
- Cream/beige backgrounds
- Flat, clean design
- Consistent typography

### 4. No Persistence
- Refresh the page → all concepts are lost
- This is intentional (demonstrate in-memory storage)

### 5. Progress Tracking
- Homepage shows aggregate knowledge by category
- Each category has its own progress indicator
- Visual representation through bars/badges

## 🔧 Troubleshooting

### Issue: "OpenAI API key not configured"
**Solution:** Make sure your `.env.local` file exists and contains a valid API key.

### Issue: API calls failing
**Solutions:**
- Verify your OpenAI account has billing enabled
- Check your API key is correct (no extra spaces)
- Ensure you have internet connection

### Issue: Styles not loading correctly
**Solution:** Try clearing the browser cache and restarting the dev server.

### Issue: Build errors
**Solution:** 
```bash
# Clean install
rm -rf node_modules
rm -rf .next
pnpm install
pnpm dev
```

## 📊 Performance Notes

- First API call may take 2-5 seconds (OpenAI cold start)
- Subsequent calls should be <2 seconds
- Each message costs approximately $0.0001-0.001 (GPT-4o-mini pricing)
- For a full demo, budget ~$0.05-0.20 worth of API credits

## 🎤 Demo Tips

1. **Prepare 2-3 concepts ahead** - Have topics ready to teach
2. **Start simple** - Begin with an easy concept to show progression
3. **Show the evolution** - Emphasize how the learning note changes
4. **Highlight the humor** - Point out the meme gallery and naive AI responses
5. **Demonstrate switching** - Show multiple concepts and category tracking
6. **Explain the philosophy** - "Learning by teaching" approach

## 🚨 Known Limitations

- No data persistence (refresh loses everything)
- Desktop-optimized (mobile experience may be cramped)
- Requires OpenAI API key (costs money)
- Limited to text-based teaching
- No user authentication
- No concept export/import

## 🎉 You're Ready!

If you can complete Test Scenario 1 successfully, your app is fully functional and ready for the hackathon demo.

Good luck! 🚀🧠

