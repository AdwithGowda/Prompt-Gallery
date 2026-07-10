import Prompt from '../models/Prompt.js';

export const getPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find({ user: req.user._id });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPrompt = async (req, res) => {
  try {
    const prompt = new Prompt({
      ...req.body,
      user: req.user._id,
    });

    const createdPrompt = await prompt.save();
    res.status(201).json(createdPrompt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPromptById = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);

    if (prompt) {
      if (prompt.user.toString() !== req.user._id.toString() && !prompt.isPublic) {
        return res.status(401).json({ message: 'Not authorized to view this prompt' });
      }
      res.json(prompt);
    } else {
      res.status(404).json({ message: 'Prompt not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);

    if (prompt) {
      if (prompt.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      Object.assign(prompt, req.body);
      prompt.version += 1; // Increment version on update

      const updatedPrompt = await prompt.save();
      res.json(updatedPrompt);
    } else {
      res.status(404).json({ message: 'Prompt not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);

    if (prompt) {
      if (prompt.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      await prompt.deleteOne();
      res.json({ message: 'Prompt removed' });
    } else {
      res.status(404).json({ message: 'Prompt not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
