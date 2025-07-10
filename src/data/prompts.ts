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
        content: 'A prompt is the input you provide to an AI model to elicit a response. It can be a question, an instruction, or any piece of text. The quality and clarity of your prompt directly determine the quality and relevance of the AI\'s output. Think of it as giving directions: the better the directions, the more likely you are to reach your destination.'
      },
      {
        title: 'Zero-Shot Prompting',
        description: 'Learn how to get responses from a model without providing any examples.',
        content: 'Zero-shot prompting is when you ask an AI model to perform a task it hasn\'t been explicitly trained on with examples. You simply state your request. For example: "Classify this email as spam or not spam: \'...email text...\'" The model uses its general knowledge to complete the task.'
      },
      {
        title: 'Basic Prompt Structure',
        description: 'Learn the key components of an effective prompt: role, task, and format.',
        content: 'A well-structured prompt often includes three elements:\n1. **Role:** Assign a persona to the AI (e.g., "Act as an expert copywriter").\n2. **Task:** Clearly define what you want the AI to do (e.g., "Write three taglines for a new coffee brand.").\n3. **Format:** Specify how you want the output to be presented (e.g., "Provide the answer as a bulleted list.").'
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
        content: 'Few-shot prompting involves including a few examples (the "shots") in your prompt to show the AI exactly what you want. This is highly effective for tasks requiring specific formats or styles. For example, to generate product descriptions, you could provide two examples of descriptions you like before asking it to write one for a new product.'
      },
      {
        title: 'Controlling Tone and Style',
        description: 'Learn how to instruct the AI to adopt a specific tone of voice or writing style.',
        content: 'You can control the AI\'s output by specifying the desired tone. Use adjectives and adverbs like "Write a formal apology," "Explain this in a friendly and encouraging tone," or "Generate a witty and sarcastic response." This helps align the output with your specific audience and context.'
      },
      {
        title: 'Negative Prompting',
        description: 'Tell the AI what to avoid in its response.',
        content: 'Negative prompting is the technique of specifying what you *don\'t* want. It helps to refine outputs and avoid common pitfalls. For example: "Describe the benefits of exercise. Do not use any technical jargon or complex medical terms." This helps constrain the model and produce more useful results.'
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
        content: 'Chain-of-Thought (CoT) prompting guides the AI to break down a problem into sequential steps before giving a final answer. By simply adding "Let\'s think step by step" to your prompt, you can significantly improve its performance on tasks requiring logical, arithmetic, or multi-step reasoning.'
      },
      {
        title: 'Self-Consistency',
        description: 'Improve result accuracy by generating multiple reasoning paths and taking a majority vote.',
        content: 'Self-consistency is an advanced technique built on top of CoT. Instead of just one reasoning path, you ask the model to generate several. You then choose the most common answer among the different paths. This approach is more robust and often yields more accurate results for complex reasoning tasks.'
      },
      {
        title: 'Prompt Chaining and Pipelines',
        description: 'Break down complex tasks into a series of simpler prompts and chain them together.',
        content: 'For highly complex tasks, a single prompt might not be enough. Prompt chaining involves creating a pipeline where the output of one prompt becomes the input for the next. For example, a first prompt could extract key information from a document, a second could summarize it, and a third could format that summary into a report. This modular approach provides more control and produces higher-quality outcomes.'
      },
    ],
  },
};
