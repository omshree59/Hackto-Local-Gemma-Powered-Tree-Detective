// Utility to sanitize and clean AI responses
// Removes asterisks (*, **), hashtags (#, ##), and markdown syntax so text reads like natural human language.

export function cleanAiText(input) {
  if (!input) return '';
  if (Array.isArray(input)) {
    return input.map(item => cleanAiText(item));
  }
  if (typeof input !== 'string') return input;

  return input
    // Remove header symbols (###, ##, #)
    .replace(/^#+\s*/gm, '')
    // Remove inline hashtags
    .replace(/(^|\s)#([a-zA-Z0-9_-]+)/g, '$1$2')
    .replace(/#/g, '')
    // Remove bold & italic asterisks (**text**, *text*, ***text***)
    .replace(/\*{1,3}(.*?)\*{1,3}/g, '$1')
    .replace(/\*/g, '')
    // Remove markdown underscores (__text__, _text_)
    .replace(/_{1,3}(.*?)_{1,3}/g, '$1')
    // Remove backticks (`code`)
    .replace(/`{1,3}(.*?)`{1,3}/g, '$1')
    // Clean excess spaces
    .replace(/[ \t]+/g, ' ')
    .trim();
}
