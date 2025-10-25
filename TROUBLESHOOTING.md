# 🔧 Troubleshooting Guide

## Error: "API error: 500" / "I'm having trouble understanding right now"

This error means the OpenAI API call is failing. Follow these steps:

---

## 🔍 Step 1: Check Your Terminal Console

Look at your terminal (where you ran `pnpm dev`) for emoji logs:

### ✅ Good Output (API Key Found):
```
🔍 API Route called
🔑 API Key exists: true
🔑 API Key prefix: sk-proj-Ab...
📝 Concept: Photosynthesis
💬 Messages count: 1
🚀 Calling OpenAI API...
📊 OpenAI Response Status: 200
✅ OpenAI responded successfully
```

### ❌ Bad Output (No API Key):
```
🔍 API Route called
🔑 API Key exists: false
🔑 API Key prefix: undefined...
❌ OpenAI API key not found in environment variables
```

---

## 🛠️ Solution Based on What You See:

### Problem 1: "API Key exists: false"

**This means your `.env.local` file is missing or not loaded.**

**Fix:**

1. **Check if `.env.local` exists** in your project root:
   ```bash
   # Windows PowerShell
   dir .env.local
   
   # Mac/Linux
   ls -la .env.local
   ```

2. **If it doesn't exist, create it:**
   ```bash
   # Windows PowerShell
   echo "OPENAI_API_KEY=sk-proj-your-key-here" > .env.local
   
   # Mac/Linux
   echo "OPENAI_API_KEY=sk-proj-your-key-here" > .env.local
   ```

3. **IMPORTANT: Restart your dev server!**
   - Press `Ctrl+C` in terminal
   - Run `pnpm dev` again
   - Environment variables only load on startup

---

### Problem 2: "OpenAI Response Status: 401"

**This means your API key is invalid.**

**Fix:**

1. **Get a fresh API key** from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

2. **Update `.env.local`:**
   ```env
   OPENAI_API_KEY=sk-proj-NEW_KEY_HERE
   ```

3. **Make sure there are no extra spaces** before or after the key

4. **Restart dev server:**
   ```bash
   # Press Ctrl+C, then:
   pnpm dev
   ```

---

### Problem 3: "OpenAI Response Status: 429"

**This means you've hit rate limits or quota limits.**

**Fix:**

1. **Check your OpenAI billing** at [platform.openai.com/settings/organization/billing](https://platform.openai.com/settings/organization/billing)
2. **Add credits** if your balance is $0
3. **Wait a few minutes** if you've been testing a lot
4. **Check usage limits** on your API key

---

### Problem 4: "OpenAI Response Status: 400"

**This means the request format is wrong.**

**Console should show more details.** Look for the error message and share it.

---

## 📝 Quick Checklist

Run through this list:

- [ ] `.env.local` file exists in project root (same folder as `package.json`)
- [ ] `.env.local` contains: `OPENAI_API_KEY=sk-proj-...`
- [ ] API key is valid (starts with `sk-proj-` or `sk-`)
- [ ] No extra spaces around the API key
- [ ] OpenAI account has billing enabled
- [ ] Balance > $0 (check at platform.openai.com)
- [ ] Dev server was restarted after creating/editing `.env.local`

---

## 🧪 Test Your API Key Manually

You can test if your API key works outside of the app:

### Windows PowerShell:
```powershell
$headers = @{
    "Authorization" = "Bearer YOUR_API_KEY_HERE"
    "Content-Type" = "application/json"
}

$body = @{
    model = "gpt-4o-mini"
    messages = @(
        @{
            role = "user"
            content = "Say hello"
        }
    )
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://api.openai.com/v1/chat/completions" -Method Post -Headers $headers -Body $body
```

### Mac/Linux:
```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY_HERE" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "Say hello"}]
  }'
```

**If this works**, your API key is valid and the problem is with the environment setup.

**If this fails**, your API key has issues (billing, permissions, etc.).

---

## 🔍 View Full Error Details

1. **Open browser DevTools** (F12)
2. **Go to Console tab**
3. **Try sending a message**
4. **Look for detailed error logs**

The enhanced API route now shows:
- Exact OpenAI error response
- Status codes
- Full error messages

---

## 🆘 Still Not Working?

If you've tried everything above and it still doesn't work:

1. **Share the console output** from your terminal
2. **Share any error messages** from browser console
3. **Confirm:**
   - Which operating system you're using
   - Node.js version (`node -v`)
   - If you can see the `.env.local` file
   - First 10 characters of your API key (e.g., `sk-proj-Ab`)

---

## ✅ Success Indicators

You'll know it's working when you see:

**In Terminal:**
```
🔍 API Route called
🔑 API Key exists: true
🚀 Calling OpenAI API...
📊 OpenAI Response Status: 200
✅ OpenAI responded successfully
✨ Parsed successfully, comprehension: Novice
```

**In App:**
- AI responds with a message
- Learning Note (right panel) updates
- Comprehension level appears

---

## 🎯 Common Mistakes

1. **File named `.env` instead of `.env.local`** ❌
   - Must be `.env.local`

2. **File is in wrong folder** ❌
   - Must be in project root (same level as `package.json`)

3. **Didn't restart dev server** ❌
   - Must restart after creating/editing `.env.local`

4. **Extra quotes around API key** ❌
   ```env
   # WRONG:
   OPENAI_API_KEY="sk-proj-..."
   
   # RIGHT:
   OPENAI_API_KEY=sk-proj-...
   ```

5. **Using an expired or revoked key** ❌
   - Generate a new key at platform.openai.com

---

## 🚀 Quick Fix Command

Try this reset sequence:

```bash
# Stop the server
# Press Ctrl+C

# Check if .env.local exists
cat .env.local  # Mac/Linux
type .env.local  # Windows

# If it doesn't exist or is wrong, create it:
echo "OPENAI_API_KEY=sk-proj-your-actual-key-here" > .env.local

# Restart
pnpm dev
```

---

Need more help? Check the terminal console logs after each message attempt—they'll tell you exactly what's wrong!

