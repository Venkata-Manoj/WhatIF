export type Topic = {
  title: string;
  description: string;
  content: string;
};

export type LearningLevel = {
  title: string;
  description: string;
  topics: Topic[];
};

export type LearningContent = {
  [key: string]: LearningLevel;
};

export const learningContent: LearningContent = {
  beginner: {
    title: 'Beginner',
    description: 'Start your journey into the world of prompt engineering. Learn the fundamentals.',
    topics: [
      {
        title: 'What is a Prompt?',
        description: 'Understand the basic concept of a prompt and its role in interacting with AI models.',
        content: `A prompt is the instruction you give to an AI. The AI will try to follow your instructions exactly, so clear and specific prompts lead to better results. It's the starting point for any AI-powered task.

**Example 1: Getting a Specific Recipe**
*   **Vague Prompt:** "Tell me how to make pasta."
*   **Good Prompt:** "Write a simple, step-by-step recipe for a beginner to make spaghetti carbonara for two people. List the ingredients first."

**Example 2: Brainstorming Ideas**
*   **Vague Prompt:** "Give me some blog ideas."
*   **Good Prompt:** "Brainstorm 5 blog post titles about the benefits of remote work for small businesses. The tone should be professional and encouraging."

**Example 3: Explaining a Concept**
*   **Vague Prompt:** "What is photosynthesis?"
*   **Good Prompt:** "Explain the process of photosynthesis to a 10-year-old using a simple analogy. Keep it under 100 words."`
      },
      {
        title: 'Zero-Shot Prompting',
        description: 'Learn how to get responses from a model without providing any examples.',
        content: `Zero-shot prompting is when you ask an AI to perform a task without giving it any examples first. You're relying on the AI's built-in knowledge to understand and complete the request.

**Example 1: Sentiment Classification**
*   **Prompt:** "Classify the sentiment of this customer review as positive, negative, or neutral: 'The delivery was late, but the product quality is excellent.'"
*   **Explanation:** The AI already understands sentiment and can analyze the mixed review without needing prior examples of classified texts.

**Example 2: Text Translation**
*   **Prompt:** "Translate the following English sentence to French: 'Where is the nearest library?'"
*   **Explanation:** The AI has been trained on vast amounts of text in multiple languages, so it can translate directly.

**Example 3: Information Extraction**
*   **Prompt:** "Extract the name of the person and the company they work for from this sentence: 'After her presentation, Sarah from TechCorp answered questions.'"
*   **Explanation:** The AI can identify entities like names and organizations from context alone.`
      },
      {
        title: 'Basic Prompt Structure',
        description: 'Learn the key components of an effective prompt: role, task, and format.',
        content: `A well-structured prompt often contains three key elements: Role, Task, and Format. This helps the AI understand its context, what to do, and how to present the answer.

**1. Role:** Assign a persona to the AI.
**2. Task:** State the specific goal.
**3. Format:** Define the output structure.

**Example 1: Creating a Workout Plan**
*   **Prompt:** "Act as a certified personal trainer (Role). Create a 3-day workout plan for a beginner focused on building muscle (Task). Present the plan in a table with columns for Day, Exercises, and Sets/Reps (Format)."

**Example 2: Writing an Email**
*   **Prompt:** "You are a customer service manager (Role). Write an email to a client apologizing for a service outage (Task). The email should be concise, empathetic, and formatted as plain text (Format)."

**Example 3: Generating Code**
*   **Prompt:** "You are a senior Python developer (Role). Write a Python function that takes a list of numbers and returns the average (Task). Provide only the code, with no explanation (Format)."`
      },
    ],
  },
  intermediate: {
    title: 'Intermediate',
    description: 'Enhance your skills with more advanced prompting techniques.',
    topics: [
      {
        title: 'Few-Shot Prompting',
        description: 'Guide the model by providing a few examples of the desired output format.',
        content: `Few-shot prompting involves giving the AI a few examples (the "shots") of what you want. This helps it learn the specific pattern, style, or format you need for the task.

**Example 1: Generating Product Taglines**
*   **Prompt:** 
    "Product: Eco-friendly water bottle. Tagline: Hydrate sustainably.
    Product: Smart coffee mug. Tagline: Your coffee, your temperature.
    Product: Noise-canceling headphones. Tagline:"
*   **Explanation:** By showing it two examples, the AI learns the pattern of a short, benefit-focused tagline and will generate a similar one for the headphones.

**Example 2: Fixing Grammar**
*   **Prompt:** 
    "Original: 'Me and him went to the store.' Corrected: 'He and I went to the store.'
    Original: 'There is less people here today.' Corrected: 'There are fewer people here today.'
    Original: 'She done it again.' Corrected:"
*   **Explanation:** The examples teach the AI its specific task is to correct grammar, not just rewrite the sentence.

**Example 3: Creating JSON Objects**
*   **Prompt:**
    "Text: 'Add apples (2) and bananas (3) to the cart.' JSON: { "apples": 2, "bananas": 3 }
    Text: 'I need 1 carton of milk.' JSON: { "milk": 1 }
    Text: 'Get 12 eggs and 1 loaf of bread.' JSON:"
*   **Explanation:** This shows the AI the exact JSON structure you want it to extract from unstructured text.`
      },
      {
        title: 'Controlling Tone and Style',
        description: 'Learn how to instruct the AI to adopt a specific tone of voice or writing style.',
        content: `You can direct the AI's personality and writing style by including specific instructions in your prompt. This is vital for creating content that fits a specific audience or brand.

**Example 1: Social Media Posts**
*   **Professional (LinkedIn):** "Write a LinkedIn post about our company's new achievement in AI research. The tone should be formal, professional, and highlight the innovation."
*   **Casual (Twitter):** "Draft a tweet announcing our new AI achievement. Make it exciting and use an emoji. Keep it under 280 characters."

**Example 2: Explaining a Technical Topic**
*   **For an Expert:** "Explain the concept of 'machine learning' to a data scientist, focusing on the mathematical principles behind linear regression. Use a technical and academic tone."
*   **For a Beginner:** "Explain 'machine learning' to a complete beginner using the analogy of a child learning to identify different animals. The tone should be simple, friendly, and encouraging."

**Example 3: Product Descriptions**
*   **Luxurious Tone:** "Write a product description for a high-end leather handbag. Use evocative and sensory language to convey luxury, craftsmanship, and exclusivity."
*   **Playful Tone:** "Write a product description for a colorful, quirky phone case. The tone should be fun, youthful, and use humor."`
      },
      {
        title: 'Negative Prompting',
        description: 'Tell the AI what to avoid in its response.',
        content: `Negative prompting is the technique of explicitly telling the AI what *not* to include in its response. This helps prevent common errors and steers the output toward your desired outcome.

**Example 1: Generating Image Prompts**
*   **Prompt:** "A photorealistic image of a futuristic city skyline at sunset. **Avoid:** flying cars, aliens, oversaturated colors."
*   **Explanation:** This helps the image generation model focus on a more grounded and aesthetically pleasing vision of a futuristic city.

**Example 2: Brainstorming Names**
*   **Prompt:** "Generate 10 name ideas for a new coffee shop. **Avoid:** using the words 'brew' or 'bean', names that are puns, or names longer than two words."
*   **Explanation:** This filters out cliché or overly complex names, leading to more unique and usable suggestions.

**Example 3: Writing a Summary**
*   **Prompt:** "Summarize the following article about climate change in three sentences. **Avoid:** using technical jargon, political commentary, and direct quotes from the article."
*   **Explanation:** This ensures the summary is easy to understand, neutral, and an original synthesis of the information.`
      },
    ],
  },
  professional: {
    title: 'Professional',
    description: 'Master complex prompting strategies for production-level applications.',
    topics: [
      {
        title: 'Chain-of-Thought (CoT) Prompting',
        description: 'Encourage the model to "think step by step" to solve complex reasoning problems.',
        content: `Chain-of-Thought (CoT) prompting guides the AI to break down a complex problem into a sequence of steps before giving a final answer. Simply adding a phrase like "Let's think step by step" can dramatically improve its accuracy on reasoning tasks.

**Example 1: A Math Word Problem**
*   **Prompt:** "A farmer has 15 sheep. She sells 7, then buys 3 new flocks of 12 sheep each. How many sheep does she have now? Let's work this out step by step."
*   **AI's Likely Reasoning:** "1. The farmer starts with 15 sheep. 2. She sells 7, so 15 - 7 = 8 sheep. 3. She buys 3 flocks of 12, so 3 * 12 = 36 new sheep. 4. In total, she has 8 + 36 = 44 sheep. The final answer is 44."

**Example 2: Logical Deduction**
*   **Prompt:** "If it's raining, the ground is wet. The ground is not wet. Is it raining? Explain your reasoning step by step."
*   **AI's Likely Reasoning:** "1. The rule is 'If A (raining), then B (wet ground)'. 2. We are given 'not B' (the ground is not wet). 3. In logic, if 'If A then B' is true, then 'not B' implies 'not A'. 4. Therefore, it is not raining."

**Example 3: Planning a Trip**
*   **Prompt:** "I need to plan a 3-day trip to Paris from London. My budget is $500 after travel. I want to see the Eiffel Tower and the Louvre. Create a possible itinerary. Think it through step by step."
*   **AI's Likely Reasoning:** "1. First, I'll allocate the budget: ~$165/day. 2. Day 1: Visit the Eiffel Tower in the morning... 3. Day 2: Visit the Louvre... I'll look up ticket prices to subtract from the daily budget..." This approach ensures the AI considers constraints before providing a final plan.`
      },
      {
        title: 'Self-Consistency',
        description: 'Improve result accuracy by generating multiple reasoning paths and taking a majority vote.',
        content: `Self-consistency is an advanced technique that builds on Chain-of-Thought. You run the same CoT prompt multiple times, generating several different reasoning paths. The final answer is the one that appears most frequently in the outcomes. This greatly reduces the risk of an error from a single faulty line of reasoning.

**Example 1: Complex Financial Calculation**
*   **Task:** Use an AI to analyze a financial report and calculate the quarterly profit margin.
*   **Process:**
    1.  Run the CoT prompt 5 times.
    2.  Path 1 -> Result: 15.2%
    3.  Path 2 -> Result: 15.1%
    4.  Path 3 -> Result: 15.2%
    5.  Path 4 -> Result: 15.2%
    6.  Path 5 -> Result: 14.8% (Calculation error)
*   **Final Answer:** Take the majority vote, which is 15.2%. This increases confidence in the result.

**Example 2: Ambiguous Logic Puzzle**
*   **Task:** Solve a complex logic puzzle with multiple characters and clues.
*   **Process:** Generate 3 different step-by-step solutions. If two of the three solutions arrive at the same conclusion (e.g., "Mr. Green was the culprit"), you can trust that answer more than a single attempt.

**Example 3: Medical Data Analysis**
*   **Task:** Ask an AI to interpret a set of patient symptoms and suggest potential diagnoses based on medical literature.
*   **Process:** To ensure safety and accuracy, run the prompt multiple times. The diagnoses that consistently appear across different reasoning paths are prioritized, filtering out less likely or erroneous suggestions from a single run.`
      },
      {
        title: 'Prompt Chaining and Pipelines',
        description: 'Break down complex tasks into a series of simpler prompts and chain them together.',
        content: `Prompt chaining, or creating a pipeline, involves breaking down a large, complex task into a sequence of smaller, more manageable prompts. The output of one prompt becomes the input for the next, allowing for more accurate and controllable results.

**Example 1: Creating a Detailed Blog Post**
*   **Chain 1 (Outline):** "Create a detailed, 5-point blog post outline for the topic 'The Benefits of a Mediterranean Diet'."
*   **Chain 2 (Content Generation):** "Take this outline [insert output from Chain 1] and write a 200-word paragraph for each point."
*   **Chain 3 (SEO Keywords):** "Analyze this blog post [insert output from Chain 2] and suggest 5 relevant SEO keywords."

**Example 2: Customer Support Ticket Summarization**
*   **Chain 1 (Summarize):** "Summarize the following customer support email thread into a single paragraph: [email thread text]"
*   **Chain 2 (Extract Key Info):** "From this summary [output from Chain 1], extract the customer's name, issue, and product."
*   **Chain 3 (Draft Reply):** "Using this information [output from Chain 2], draft a polite and empathetic email reply to the customer."

**Example 3: Code Generation and Documentation**
*   **Chain 1 (Code Gen):** "Write a Python script that connects to a public weather API and retrieves the current temperature for a given city."
*   **Chain 2 (Docstrings):** "Add professional Python docstrings to this script [output from Chain 1], explaining what each function does, its parameters, and what it returns."
*   **Chain 3 (README File):** "Write a README.md file for this script [output from Chain 1 & 2], explaining how to install dependencies and run it from the command line."`
      },
    ],
  },
};
