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
        content: 'A prompt is simply the instruction you give to an AI. Think of the AI as a super-smart assistant who takes everything you say literally. The more specific your instruction, the better the result.\n\n**Real-World Example:**\n\n*   **Vague Prompt:** "Tell me about dogs."\n    *   *Result:* You might get a very long, general article about the history of canines.\n\n*   **Good Prompt:** "Write a short paragraph for a 5th grader explaining why Dalmatians have spots."\n    *   *Result:* You\'ll get a simple, focused, and easy-to-understand answer tailored to your specific need.'
      },
      {
        title: 'Zero-Shot Prompting',
        description: 'Learn how to get responses from a model without providing any examples.',
        content: 'Zero-shot means you ask the AI to do something without giving it any prior examples of how to do it. You\'re relying on the AI\'s vast pre-existing knowledge to understand your request.\n\n**Real-World Example:**\n\nImagine you have a customer review: "The battery life on this new phone is amazing!" You want to classify its sentiment.\n\n*   **Prompt:** "Classify the sentiment of the following text as positive, negative, or neutral: \'The battery life on this new phone is amazing!\'"\n\nEven without seeing examples of sentiment classification, the AI understands the task and will correctly identify the sentiment as "positive."'
      },
      {
        title: 'Basic Prompt Structure',
        description: 'Learn the key components of an effective prompt: role, task, and format.',
        content: 'A great prompt often tells the AI three things: who it should be, what it should do, and how it should present the answer.\n\n**1. Role:** Assign a persona. "Act as..."\n**2. Task:** State the specific goal. "Write/summarize/explain..."\n**3. Format:** Define the output structure. "in a bulleted list/JSON format..."\n\n**Real-World Example:**\n\n*   **Prompt:** "Act as a professional chef. Write a simple recipe for spaghetti carbonara. Provide the instructions as a numbered list."\n\nThis prompt is effective because it clearly defines the **Role** (chef), the **Task** (write a recipe), and the **Format** (numbered list).'
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
        content: 'Few-shot prompting is when you give the AI a few examples (the "shots") of what you want before asking your actual question. This helps it understand a specific pattern or style.\n\n**Real-World Example:**\n\nLet\'s say you want to extract company names from news headlines in a consistent format.\n\n*   **Prompt:**\n    "Headline: \'Google announces new AI model.\' Company: Google\n    Headline: \'Microsoft reports quarterly earnings.\' Company: Microsoft\n    Headline: \'Apple is set to release a new iPhone.\' Company:"\n\nBy providing examples, you teach the AI the exact input-output pattern. It will reliably respond with "Apple".'
      },
      {
        title: 'Controlling Tone and Style',
        description: 'Learn how to instruct the AI to adopt a specific tone of voice or writing style.',
        content: 'You can make the AI sound however you want by including style instructions in your prompt. This is crucial for matching your brand voice or the context of your communication.\n\n**Real-World Example:**\n\nImagine you need to write an email to a customer about a delayed shipment.\n\n*   **Prompt 1 (Formal):** "Write a formal and apologetic email to a customer about a shipping delay. Mention that their order #12345 will be delayed by 3 business days and offer a 10% discount on their next purchase as a courtesy."\n\n*   **Prompt 2 (Casual):** "Draft a friendly and casual email to our customer, Alex, about a small hiccup with their order. Let them know their package will be a bit late and give them a 10% off code, \'SORRY10\', for the trouble."'
      },
      {
        title: 'Negative Prompting',
        description: 'Tell the AI what to avoid in its response.',
        content: 'Negative prompting is about telling the AI what *not* to do. It helps you steer the AI away from common mistakes or unwanted content, making the output more precise.\n\n**Real-World Example:**\n\nSuppose you\'re generating a list of marketing ideas for a new vegan cheese brand.\n\n*   **Prompt:** "Generate 5 creative marketing ideas for a new vegan cheese brand.\n\n**Things to avoid:**\n- Do not compare it to dairy cheese.\n- Do not use the word \'fake\' or \'alternative.\'\n- Avoid ideas that require a large budget."\n\nThis ensures the AI gives you fresh, positive, and budget-friendly ideas without you having to filter out bad suggestions.'
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
        content: 'Chain-of-Thought (CoT) prompting is a technique where you ask the AI to explain its reasoning process before giving the final answer. Just adding a simple phrase like "Let\'s think step by step" can dramatically improve its ability to solve problems that require logic or calculation.\n\n**Real-World Example:**\n\nA word problem:\n*   **Standard Prompt:** "John has 5 apples. He buys 3 more boxes of apples, and each box contains 4 apples. How many apples does he have now? Just give the final number."\n    *   *Result:* The AI might make a calculation error.\n\n*   **CoT Prompt:** "John has 5 apples. He buys 3 more boxes of apples, and each box contains 4 apples. How many apples does he have now? Let\'s think step by step."\n    *   *Result:* The AI will first calculate the new apples (3 boxes * 4 apples/box = 12 apples), then add them to the initial amount (12 + 5 = 17 apples), leading to a more reliable answer.'
      },
      {
        title: 'Self-Consistency',
        description: 'Improve result accuracy by generating multiple reasoning paths and taking a majority vote.',
        content: 'Self-consistency takes Chain-of-Thought a step further. You run the same CoT prompt multiple times, generating several different reasoning paths. The final answer is then determined by a "majority vote" among the outcomes. This method significantly reduces the chance of a random error in a single reasoning chain.\n\n**Real-World Example:**\n\nFor a complex financial analysis prompt, you might ask the model to perform the calculation three separate times. If two paths lead to an answer of "$1.5M" and one leads to "$1.4M", you would trust the majority answer. This is a powerful way to increase the reliability of AI for critical tasks.'
      },
      {
        title: 'Prompt Chaining and Pipelines',
        description: 'Break down complex tasks into a series of simpler prompts and chain them together.',
        content: 'Instead of trying to solve a huge task with one massive prompt, you break it down into a series of smaller, manageable prompts. The output of one prompt becomes the input for the next, creating a "pipeline." This gives you more control and leads to better results.\n\n**Real-World Example: Summarizing a Business Report**\n\n*   **Prompt 1 (Extract):** "Extract the key financial figures (Revenue, Profit, and Expenses) from the following business report: [report text]"\n*   **Prompt 2 (Summarize):** "Using these figures [output from prompt 1], write a one-paragraph summary of the company\'s financial performance."\n*   **Prompt 3 (Format):** "Format this summary [output from prompt 2] as an HTML snippet inside a `<div>` with a class of \'financial-summary\'."\n\nThis multi-step process is far more reliable than asking the AI to do all three things at once.'
      },
    ],
  },
};
